#!/usr/bin/env node
// Autoplay check for a Beat Comic (skill: mtw-beat-comic). Browsers refuse audible autoplay until the visitor's first
// click, tap or key, so a cold visit must show "Tap for sound" and one gesture must start the music in sync with the
// story. Runs installed Chrome with the real gesture policy forced on: a desktop click, a clean phone tap, and a phone
// tap that wobbles a few pixels the way a real finger does (it fires touchmove; Playwright's tap never does, which is
// how a tap that folded the comic away instead of starting the sound passed here, 2026-09-28). On a page with the sound
// prompt (the homepage), the prompt must still be up just after the gesture: it leaves with its `until`, not the click.
// A 120 px swipe must still enter the page.
// The sound box shows from its `at` to its `until` whatever the sound state (Matt, 2026-09-28: "ensure the click to play
// sound box is loaded no matter if the user has sound or not"): held back by the browser or muted by the site setting it
// asks for a click or tap (data-say "prompt"); with the music audible it says SOUND ON (data-say "on"). Muted, a tap or
// click while it shows turns sound on (and the site setting with it); a click after its `until` does not.
// Exits 1 on any failure.
// Usage: node scripts/beat-comic-autoplay.mjs <page url>
import { chromium } from 'playwright';
const url = process.argv[2];
let browser = await chromium.launch({ channel: 'chrome', args: ['--autoplay-policy=document-user-activation-required'] });
const st = (p) => p.evaluate(() => {
  const prompt = document.querySelector('.rl-panel--sound');
  let pref = null; try { pref = localStorage.getItem('mtw-sound'); } catch (e) {}
  return { ...window.MTWBeatComic.status(), tag: document.querySelector('.rl-tag').className, prompt: prompt ? +getComputedStyle(prompt).opacity : null, say: prompt ? prompt.dataset.say || null : null, pref };
});
let failed = 0;
const PHONE = { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }, DESK = { viewport: { width: 1440, height: 900 } };
try {
  for (const mode of ['click', 'tap', 'wobble', 'swipe']) {
    const touch = mode !== 'click';
    const ctx = await browser.newContext(touch ? { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } : { viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForFunction(() => window.MTWBeatComic);
    // The story starts with the page transition's reveal: wait for it to run, then a moment more.
    await page.waitForFunction(() => window.MTWBeatComic.status().T > 1.2, null, { timeout: 15000 });
    const before = await st(page);
    if (mode === 'click') await page.mouse.click(700, 450);
    else if (mode === 'tap') await page.tap('.rl-book');
    else {
      // A real finger: down, a 5 px drift, up. Chrome swallows touchmove inside its ~15 px tap slop but iOS Safari
      // delivers every move, so the drift is delivered to the page as Safari would; the down and up are real input.
      const cdp = await ctx.newCDPSession(page);
      const at = (x, y) => [{ x, y, id: 1, radiusX: 8, radiusY: 8, force: 1 }];
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: at(195, 420) });
      const path = mode === 'swipe' ? [[195, 400], [195, 360], [195, 300]] : [[197, 423], [198, 425]];
      await page.evaluate((path) => {
        for (const [x, y] of path) {
          const t = new Touch({ identifier: 1, target: document.body, clientX: x, clientY: y });
          document.body.dispatchEvent(new TouchEvent('touchmove', { touches: [t], changedTouches: [t], bubbles: true, cancelable: true }));
        }
      }, path);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    }
    await page.waitForTimeout(400);
    const just = await st(page);
    await page.waitForTimeout(2100);
    const after = await st(page);
    const drift = after.music != null ? +(after.music - after.T).toFixed(2) : null;
    const errs = [];
    if (mode === 'swipe') {
      // A real swipe still enters the page (the music plays on into it).
      if (after.state === 'play') errs.push('a 120 px swipe did not enter the page');
    } else {
      if (after.state !== 'play') errs.push(`the ${mode} ended the comic (state ${after.state}) instead of starting the sound`);
      if (!after.audioLive || after.paused) errs.push(`the ${mode} did not start the music`);
      if (before.prompt > 0.5 && !(just.prompt > 0.5)) errs.push(`the sound prompt vanished on the ${mode}; it should leave with its until`);
      if (drift != null && Math.abs(drift) > 0.15) errs.push(`music drifts ${drift}s from the story`);
    }
    console.log(`${errs.length ? 'FAIL' : 'ok  '} ${mode.toUpperCase().padEnd(6)}`, JSON.stringify({ before: { live: before.audioLive, prompt: before.prompt, tag: before.tag }, justAfter: { prompt: just.prompt }, after: { live: after.audioLive, paused: after.paused, drift, state: after.state, tag: after.tag } }));
    errs.forEach((e) => console.log('       ERROR ' + e));
    failed += errs.length;
    await ctx.close();
  }

  // The sound box in every sound state (pages with one: the homepage cover).
  const soundWindow = async (page) => page.evaluate(() => {
    const s = JSON.parse(document.getElementById('reel-story').textContent), B = 60 / s.bpm;
    for (const pg of s.pages) for (const d of pg.panels || []) if (d.sound) return { at: (pg.b + d.at) * B, until: (pg.b + (d.until ?? pg.l)) * B };
    return null;
  });
  const open = async (opts, muted) => {
    const ctx = await browser.newContext(opts);
    if (muted) await ctx.addInitScript(() => { try { localStorage.setItem('mtw-sound', 'off'); } catch (e) {} });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForFunction(() => window.MTWBeatComic);
    return { ctx, page, win: await soundWindow(page) };
  };
  const at = (page, t) => page.waitForFunction((t) => window.MTWBeatComic.status().T >= t, t, { timeout: 20000 });
  const tap = async (ctx, page, x, y) => {
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1, radiusX: 8, radiusY: 8, force: 1 }] });
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  };
  // Samples the box early and late in its window; `say` is what it must say at the late sample.
  const shows = async (page, win, errs, name, say) => {
    await at(page, win.at + 0.5); const a = await st(page);
    await at(page, win.until - 0.4); const b = await st(page);
    if (!(a.prompt > 0.5) || !(b.prompt > 0.5)) errs.push(`${name}: the sound box is not showing inside its window (opacity ${a.prompt} at T ${a.T}, ${b.prompt} at T ${b.T})`);
    if (say && b.say !== say) errs.push(`${name}: the sound box says "${b.say}", expected "${say}"`);
    return b;
  };
  // The dev server reloads the page when a story file changes under it: run that case again.
  const retry = async (fn) => { for (let i = 0; ; i++) { try { return await fn(); } catch (e) { if (i < 2 && /context was destroyed|navigat/i.test(e.message)) { console.log('--   the page reloaded under the check; running the case again'); continue; } throw e; } } };
  const report = (name, errs, o) => { console.log(`${errs.length ? 'FAIL' : 'ok  '} ${name.padEnd(12)}`, JSON.stringify(o)); errs.forEach((e) => console.log('       ERROR ' + e)); failed += errs.length; };

  const probe = await open(DESK, false), win = probe.win; await probe.ctx.close();
  if (!win) console.log('--   no sound box on this page: state checks skipped');
  else {
    // Held back: a cold visit, no gesture.
    for (const [name, opts] of [['HELD desk', DESK], ['HELD phone', PHONE]]) await retry(async () => {
      const { ctx, page } = await open(opts, false), errs = [];
      const b = await shows(page, win, errs, name, 'prompt');
      if (b.audioLive && !b.paused && !b.muted) errs.push(`${name}: music audible without a gesture; the held-back state was not tested`);
      report(name, errs, { live: b.audioLive, prompt: b.prompt, say: b.say }); await ctx.close();
    });
    // Muted by the site setting: the box asks; a tap (phone) or click (desktop) inside its window turns sound on.
    for (const [name, opts] of [['MUTED tap', PHONE], ['MUTED click', DESK]]) await retry(async () => {
      const { ctx, page } = await open(opts, true), errs = [];
      const b = await shows(page, win, errs, name, 'prompt');
      if (!b.muted) errs.push(`${name}: the site sound setting "off" did not mute the comic`);
      if (opts === PHONE) await tap(ctx, page, 195, 420); else await page.mouse.click(700, 450);
      await page.waitForTimeout(600); const c = await st(page);
      if (c.muted || !c.audioLive || c.paused) errs.push(`${name}: the gesture inside the window did not turn sound on (muted ${c.muted}, live ${c.audioLive}, paused ${c.paused})`);
      if (c.pref !== 'on') errs.push(`${name}: the site sound setting did not follow (mtw-sound ${c.pref})`);
      if (c.state !== 'play') errs.push(`${name}: the gesture ended the comic (state ${c.state})`);
      report(name, errs, { before: { muted: b.muted, prompt: b.prompt, say: b.say }, after: { muted: c.muted, live: c.audioLive, pref: c.pref, state: c.state, say: c.say } }); await ctx.close();
    });
    // Muted, a click after the window: the visitor's choice stands.
    await retry(async () => {
      const name = 'MUTED late', { ctx, page } = await open(DESK, true), errs = [];
      await at(page, win.until + 0.6);
      await page.mouse.click(700, 450); await page.waitForTimeout(600); const c = await st(page);
      if (!c.muted || c.pref !== 'off') errs.push(`${name}: a click after the sound box's until turned sound on (muted ${c.muted}, mtw-sound ${c.pref})`);
      report(name, errs, { T: c.T, muted: c.muted, pref: c.pref, state: c.state }); await ctx.close();
    });
    // Already audible: a browser that allows autoplay (a returning visitor, the mixtape arriving unlocked).
    await browser.close();
    browser = await chromium.launch({ channel: 'chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
    await retry(async () => {
      const name = 'AUDIBLE', { ctx, page } = await open(DESK, false), errs = [];
      const b = await shows(page, win, errs, name, 'on');
      if (!b.audioLive || b.paused || b.muted) errs.push(`${name}: the music was not audible; the audible state was not tested`);
      report(name, errs, { live: b.audioLive, muted: b.muted, prompt: b.prompt, say: b.say }); await ctx.close();
    });
  }
} finally { await browser.close(); }
process.exit(failed ? 1 : 0);
