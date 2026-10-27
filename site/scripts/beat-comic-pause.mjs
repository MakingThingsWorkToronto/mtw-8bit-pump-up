#!/usr/bin/env node
// Pause and play check for a Beat Comic (skill: mtw-beat-comic). Matt, 2026-09-28: "for all pages add a pause/play button
// to the left of the "Skip Intro" button" (reversing 2026-09-26's "no pause button"). At desktop (1440x900, mouse and
// keyboard) and phone (390x844, touch) size, with the music playing, this checks:
//   - the button is a real <button type="button"> in the motion toolbar, between Previous track and Next track, level
//     with Skip Intro and in its style, icon only (Matt, 2026-09-28: "remove "Pause" text from button"), named "Pause"
//     by its aria-label;
//   - pressing it stops the story clock and the music together, says "Play", and does not enter the page (no collapse);
//   - pressing it again (Enter on desktop, a second tap on a phone) resumes both from the moment they stopped, in sync;
//   - a scroll while paused still enters the page, and the music carries on into it.
// With the browser holding sound back (a cold visit): Pause does not start the music; Play is a gesture and does.
// Exits 1 on any failure.
// Usage: node scripts/beat-comic-pause.mjs <page url>
import { chromium } from 'playwright';
const url = process.argv[2];
if (!url) { console.error('Usage: node scripts/beat-comic-pause.mjs <page url>'); process.exit(2); }
let failed = 0;
const say = (ok, msg) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${msg}`); if (!ok) failed++; };
const SIZES = { desktop: { viewport: { width: 1440, height: 900 } }, phone: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } };
const st = (p) => p.evaluate(() => ({ ...window.MTWBeatComic.status(), label: document.querySelector('.rl-pause').textContent.trim(), reel: document.documentElement.getAttribute('data-reel') }));
const open = async (browser, opts) => {
  const ctx = await browser.newContext(opts), page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction(() => window.MTWBeatComic);
  await page.waitForFunction(() => window.MTWBeatComic.status().T > 1.6, null, { timeout: 20000 });
  await page.waitForTimeout(300);
  return { ctx, page };
};
const press = async (page, size, how) => {
  if (how === 'key') { await page.focus('.rl-pause'); await page.keyboard.press('Enter'); }
  else if (size === 'phone') await page.tap('.rl-pause');
  else await page.click('.rl-pause');
};

let browser = await chromium.launch({ channel: 'chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
try {
  for (const [size, opts] of Object.entries(SIZES)) {
    console.log(`\n--- ${url} at ${size}, music playing`);
    const { ctx, page } = await open(browser, opts);
    await page.waitForFunction(() => { const s = window.MTWBeatComic.status(); return s.audioLive && !s.paused; }, null, { timeout: 15000 }).catch(() => {});
    // Placement and markup.
    const geo = await page.evaluate(() => {
      const b = document.querySelector('.rl-pause'), s = document.querySelector('.rl-skip'), rb = b.getBoundingClientRect(), rs = s.getBoundingClientRect(), pv = b.previousElementSibling, nx = b.nextElementSibling;
      const label = b.querySelector('.rl-pause__label'), lr = label.getBoundingClientRect();
      return { tag: b.tagName, type: b.type, sameDock: b.parentElement === s.parentElement && b.parentElement.classList.contains('rl-dock'), next: !!pv && pv.classList.contains('rl-prev') && !!nx && nx.classList.contains('rl-next') && nx.nextElementSibling === s, name: b.getAttribute('aria-label'),
        right: +rb.right.toFixed(1), skipLeft: +rs.left.toFixed(1), dy: +Math.abs((rb.top + rb.bottom) / 2 - (rs.top + rs.bottom) / 2).toFixed(1), h: [rb.height, rs.height],
        shown: getComputedStyle(b).opacity === '1', text: b.textContent.trim(), labelShown: lr.width > 2, hidden: !!b.closest('[aria-hidden="true"]'),
        bg: [getComputedStyle(b).backgroundColor, getComputedStyle(s).backgroundColor], border: [getComputedStyle(b).borderTopColor, getComputedStyle(s).borderTopColor] };
    });
    say(geo.tag === 'BUTTON' && geo.type === 'button' && !geo.hidden, `a real <button type="button"> outside aria-hidden (${geo.tag})`);
    say(geo.sameDock && geo.next && geo.right <= geo.skipLeft && geo.dy <= 2 && geo.h[0] === geo.h[1], `between Previous and Next, left of Skip Intro in the toolbar, level with it (right ${geo.right} <= ${geo.skipLeft}, dy ${geo.dy}, heights ${geo.h})`);
    say(geo.shown && geo.bg[0] === geo.bg[1] && geo.border[0] === geo.border[1], `shown in Skip Intro's flat style (${geo.bg[0]}, border ${geo.border[0]})`);
    say(geo.text === 'Pause' && geo.name === 'Pause' && !geo.labelShown, `icon only, named "${geo.name}" (label ${geo.labelShown ? 'visible' : 'visually hidden'})`);
    // Pause.
    const a = await st(page);
    await press(page, size, 'click');
    await page.waitForTimeout(250); const b = await st(page);
    await page.waitForTimeout(1200); const c = await st(page);
    say(b.state === 'paused' && b.userPaused && b.paused === true && b.reel === 'play', `pause stops the story and the music (state ${b.state}, music paused ${b.paused}, reel ${b.reel})`);
    say(Math.abs(c.T - b.T) < 0.01 && Math.abs(c.music - b.music) < 0.01, `held while paused (T ${b.T} -> ${c.T}, music ${b.music} -> ${c.music})`);
    say(c.label === 'Play', `the button now says "${c.label}"`);
    say(Math.abs(b.T - a.T) < 0.6, `paused where it was (T ${a.T} before the press, ${b.T} paused)`);
    // Play (the keyboard on desktop, a second tap on a phone).
    await press(page, size, size === 'desktop' ? 'key' : 'click');
    await page.waitForTimeout(150); const d = await st(page);
    await page.waitForTimeout(1500); const e = await st(page);
    say(d.state === 'play' && !d.userPaused && d.paused === false && d.label === 'Pause', `${size === 'desktop' ? 'Enter' : 'a tap'} resumes both (state ${d.state}, music paused ${d.paused}, label "${d.label}")`);
    say(Math.abs(d.T - c.T) < 0.35, `resumed from the moment it stopped (paused at ${c.T}, ${d.T} just after)`);
    say(e.T - d.T > 1.2 && Math.abs(e.music - e.T) < 0.15, `playing on in sync (T ${e.T}, music ${e.music}, drift ${(e.music - e.T).toFixed(3)} s)`);
    say(e.reel === 'play', `the comic is still up (reel ${e.reel})`);
    // Paused, a scroll still enters the page, and the music carries on into it.
    await press(page, size, 'click'); await page.waitForTimeout(200);
    if (size === 'desktop') await page.mouse.wheel(0, 300); else await page.evaluate(() => window.scrollTo(0, 200));
    await page.waitForTimeout(2500); const f = await st(page);
    say(f.state !== 'paused' && f.state !== 'play' && f.paused === false, `paused, a scroll enters the page (state ${f.state}) and the music plays on (paused ${f.paused})`);
    await ctx.close();
  }
  // Held back by the browser: Pause does not start the music; Play is a gesture and does.
  await browser.close();
  browser = await chromium.launch({ channel: 'chrome', args: ['--autoplay-policy=document-user-activation-required'] });
  for (const [size, opts] of Object.entries(SIZES)) {
    console.log(`\n--- ${url} at ${size}, sound held back`);
    const { ctx, page } = await open(browser, opts);
    const a = await st(page);
    await press(page, size, 'click'); await page.waitForTimeout(600); const b = await st(page);
    say(!a.audioLive && !b.audioLive && b.state === 'paused', `Pause does not start held-back music (live ${b.audioLive}, state ${b.state})`);
    await press(page, size, 'click'); await page.waitForTimeout(1500); const c = await st(page);
    say(c.state === 'play' && c.audioLive && c.paused === false && Math.abs(c.music - c.T) < 0.15, `Play starts it in sync (live ${c.audioLive}, T ${c.T}, music ${c.music})`);
    await ctx.close();
  }
} finally { await browser.close(); }
console.log(failed ? `\n${failed} failure(s)` : '\npause and play OK');
process.exit(failed ? 1 : 0);
