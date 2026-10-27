import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { Window } from 'happy-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';

const code = readFileSync(new URL('../public/scripts/motion-progress.js', import.meta.url), 'utf8');
let window;
afterEach(() => window?.happyDOM.abort());
function setup() {
  window = new Window();
  window.document.body.innerHTML = '<div data-motion-progress><input type="range" min="0" max="1" step=".01"></div>';
  vm.runInNewContext(code, { window });
  const element = window.document.querySelector('div'), input = element.querySelector('input');
  input.setPointerCapture = vi.fn();
  const options = { duration: 240, seek: vi.fn(), start: vi.fn(), end: vi.fn() };
  const control = window.MTWProgress.mount(element, options);
  return { element, input, control, options };
}
describe('shared progress clock adapter', () => {
  it('shows absolute story time across a looping music clock, clamps endpoints and accepts keyboard input', () => {
    const { element, input, control, options } = setup();
    control.update(185);
    expect(input.value).toBe('185');
    expect(input.getAttribute('aria-valuetext')).toBe('3:05 of 4:00');
    control.update(400);
    expect(element.style.getPropertyValue('--progress')).toBe('100%');
    input.value = '20'; input.dispatchEvent(new window.Event('input', { bubbles: true }));
    expect(options.seek).toHaveBeenCalledWith(20);
    expect(input.getAttribute('aria-valuetext')).toBe('0:20 of 4:00');
  });
  it('keeps the thumb with the reader during a drag and ends a cancelled gesture only once', () => {
    const { input, control, options } = setup();
    input.dispatchEvent(new window.PointerEvent('pointerdown', { pointerId: 1, bubbles: true }));
    input.value = '120'; input.dispatchEvent(new window.Event('input', { bubbles: true }));
    control.update(3);
    expect(input.value).toBe('120');
    input.dispatchEvent(new window.PointerEvent('pointercancel', { pointerId: 1 }));
    input.dispatchEvent(new window.PointerEvent('lostpointercapture', { pointerId: 1 }));
    expect(options.start).toHaveBeenCalledTimes(1);
    expect(options.end).toHaveBeenCalledTimes(1);
    control.update(25); expect(input.value).toBe('25');
  });
  it('keeps the first touch in charge and never resumes an abandoned player', () => {
    const { input, control, options } = setup();
    input.dispatchEvent(new window.PointerEvent('pointerdown', { pointerId: 1 }));
    input.dispatchEvent(new window.PointerEvent('pointerdown', { pointerId: 2 }));
    input.dispatchEvent(new window.PointerEvent('pointerup', { pointerId: 2 }));
    expect(options.start).toHaveBeenCalledTimes(1);
    expect(options.end).not.toHaveBeenCalled();
    expect(control.isDragging()).toBe(true);
    input.dispatchEvent(new window.PointerEvent('pointerup', { pointerId: 1 }));
    expect(options.end).toHaveBeenCalledTimes(1);
    input.dispatchEvent(new window.PointerEvent('pointerdown', { pointerId: 3 }));
    control.destroy();
    input.dispatchEvent(new window.PointerEvent('pointerup', { pointerId: 3 }));
    expect(options.end).toHaveBeenCalledTimes(1);
  });
  it('isolates touch/key gestures from scene navigation and unregisters all input listeners', () => {
    const { input, control, options } = setup();
    const scene = vi.fn(); window.addEventListener('touchmove', scene); window.addEventListener('keydown', scene);
    input.dispatchEvent(new window.Event('touchmove', { bubbles: true }));
    input.dispatchEvent(new window.KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }));
    expect(scene).not.toHaveBeenCalled();
    control.destroy(); input.dispatchEvent(new window.Event('input'));
    expect(options.seek).not.toHaveBeenCalled();
  });
});
