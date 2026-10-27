#!/usr/bin/env node
// The dock and the Tracklist (skill: mtw-beat-comic). Matt, 2026-09-28: "give the user a button similar to "Skip Intro"
// to open tracklist on each page reveal, this will be the perm way to stay in the 8-bit experience. We should also add a
// "Let's Talk" button to the left of that in 8 bit please, on all pages." At desktop (1440x900, mouse and keyboard) and
// phone (390x844, touch) size, with the music playing, this checks:
//   - the motion toolbar (MotionToolbar.astro; Matt, 2026-09-28: "this toolbar shall be canonical in all motion graphic
//     experiences"), left to right: Let's Talk, Tracklist, Previous track, Pause/Play, Next track, Skip Intro, the music
//     tag; shown, level, inside the screen and not overlapping; Let's Talk a real link to /contact/ with its pixel words
//     painted; Tracklist a button that says it opens a dialog; Previous, Pause/Play and Next icon only, named by
//     aria-label (Previous and Next "Previous track: <title>" and "Next track: <title>", links to the tracks either side
//     in the whole playlist, Disc 1 then Disc 2, wrapping round); Tab walks the toolbar in that order; a click or tap on Next follows it through the
//     page transition;
//   - Tracklist opens the dialog: focus moves into it, the comic keeps playing (not folded), its music keeps playing; the
//     rows: one real link per playlist row with an href, each over its painted row, every href a real page (200), the
//     page's own track marked "Now playing" and not a link; Tab stays inside, the arrow keys walk the rows; a wheel over
//     it does not fold the comic; Escape, Close and a click on the scrim each close it and focus returns to the button;
//   - a click (desktop) or tap (phone) on a row follows it through the page transition, handing the music over;
//     Let's Talk reaches /contact/;
//   - after the comic folds into the page (Skip Intro), Let's Talk, Tracklist, Previous, Next and the music tag stay
//     pinned bottom right in that order, and the pinned Tracklist opens and closes the same dialog.
// Exits 1 on any failure. Screenshots (the open dialog, the pinned set) go to --out, never the repo.
// Usage: node scripts/beat-comic-dock.mjs <page url> [--out <dir>]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const url = args.find((a) => /^https?:/.test(a));
const outI = args.indexOf('--out'), out = outI > -1 ? args[outI + 1] : null;
if (!url) { console.error('Usage: node scripts/beat-comic-dock.mjs <page url> [--out <dir>]'); process.exit(2); }
if (out) mkdirSync(out, { recursive: true });
const slug = new URL(url).pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
let failed = 0;
const say = (ok, msg) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${msg}`); if (!ok) failed++; };
// The phone at a real phone's 3 device pixels a CSS px: the Tracklist's scale is whole device pixels (5/3 CSS px there).
const SIZES = { desktop: { viewport: { width: 1440, height: 900 } }, phone: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 3 } };
const origin = new URL(url).origin;

const browser = await chromium.launch({ channel: 'chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
try {
  // Every playlist link is a real page.
  let playlist, track;
  {
    const ctx = await browser.newContext(SIZES.desktop), page = await ctx.newPage();
    await page.goto(`${url}${url.includes('?') ? '&' : '?'}reel=off`, { waitUntil: 'load' });
    ({ playlist, track } = await page.evaluate(() => ({ playlist: JSON.parse(document.getElementById('mtw-playlist').textContent), track: JSON.parse(document.getElementById('reel-story').textContent).track })));
    await ctx.close();
  }
  say(Array.isArray(playlist) && playlist.length > 0, `the toolbar carries the playlist (${playlist ? playlist.length : 0} rows)`);
  const hrefs = playlist.filter((r) => r.href).map((r) => r.href);
  say(new Set(hrefs).size === hrefs.length, `${hrefs.length} row links, none repeated`);
  const bad = [];
  for (const h of hrefs) { const r = await fetch(origin + h, { redirect: 'manual' }); if (r.status !== 200) bad.push(`${h} ${r.status}`); }
  say(!bad.length, `every row link is a real page${bad.length ? ': ' + bad.join(', ') : ''}`);
  const now = playlist.filter((r) => r.now);
  // Each disc numbers from 01 (Disc 2, the Journal): a track is its disc and its number.
  const tDisc = (track && track.disc) || 1, tLabel = track ? `${tDisc > 1 ? `Disc ${tDisc}, ` : ''}Track ${track.no}` : '';
  say(now.length === 1 && track && now[0].no === track.no && (now[0].discNo || 1) === tDisc && !now[0].href, `the playing row is this page's ${tLabel} and not a link`);
  // Previous and Next: the tracks either side of this one in the whole playlist, Disc 1 then Disc 2, wrapping round
  // (Disc 1's last steps on to Disc 2 Track 01; Disc 2's last back to Disc 1 Track 01).
  const all = playlist.filter((r) => r.no), at = all.findIndex((r) => r.now);
  const want = { prev: all[(at - 1 + all.length) % all.length], next: all[(at + 1) % all.length] };
  const discs = [...new Set(all.map((r) => r.discNo || 1))];
  say(discs.length > 1 || all.length === 19, `the playlist carries ${discs.length} disc(s): ${discs.map((d) => `Disc ${d} ${all.filter((r) => (r.discNo || 1) === d).length} tracks`).join(', ')}`);

  for (const [size, opts] of Object.entries(SIZES)) {
    console.log(`\n--- ${url} at ${size}`);
    const ctx = await browser.newContext(opts), page = await ctx.newPage();
    const open = async () => {
      await page.goto(url, { waitUntil: 'load' });
      await page.waitForFunction(() => window.MTWBeatComic && window.MTWBeatComic.status().T > 1.6, null, { timeout: 20000 });
      await page.waitForTimeout(700); // the dock slides in 1.2 s after the start
    };
    const press = async (sel) => { if (size === 'phone') await page.tap(sel); else await page.click(sel); };
    const st = () => page.evaluate(() => ({ ...window.MTWBeatComic.status(), reel: document.documentElement.getAttribute('data-reel'), open: !document.getElementById('rl-tracklist').hidden, expanded: document.querySelector('.rl-list').getAttribute('aria-expanded'), focusIn: !!document.activeElement.closest('#rl-tracklist'), focus: document.activeElement.className }));
    await open();

    // The dock.
    const dock = await page.evaluate(() => {
      const kids = [...document.querySelector('.rl-dock').children].map((e) => { const r = e.getBoundingClientRect(); return { cls: e.className.split(' ')[0], tag: e.tagName, op: +getComputedStyle(e).opacity, l: r.left, r: r.right, cy: r.top + r.height / 2, h: r.height }; });
      const talk = document.querySelector('.rl-talk'), cv = talk.querySelector('canvas'), d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
      let lit = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) lit++;
      const list = document.querySelector('.rl-list');
      const ico = (sel) => { const e = document.querySelector(sel); return { href: e.getAttribute('href'), name: e.getAttribute('aria-label'), title: e.getAttribute('title'), words: [...e.childNodes].filter((n) => n.nodeType === 3 || (n.nodeType === 1 && !n.classList.contains('rl-vh') && n.tagName !== 'svg')).map((n) => n.textContent.trim()).join(''), svg: !!e.querySelector('svg'), w: Math.round(e.getBoundingClientRect().width) }; };
      return { prev: ico('.rl-prev'), next: ico('.rl-next'), pause: ico('.rl-pause'), kids, talk: { href: talk.getAttribute('href'), name: talk.textContent.trim(), lit }, list: { tag: list.tagName, pop: list.getAttribute('aria-haspopup'), ctl: list.getAttribute('aria-controls'), name: list.textContent.trim() }, vw: innerWidth };
    });
    const order = dock.kids.map((k) => k.cls).join(', ');
    say(order === 'rl-talk, rl-list, rl-prev, rl-pause, rl-next, rl-skip, rl-tag', `toolbar order: ${order}`);
    for (const k of ['prev', 'next']) {
      const b = dock[k], w = want[k], label = `${k === 'prev' ? 'Previous' : 'Next'} track: ${w.title}`;
      say(b.href === w.href && b.name === label && b.title === label && !b.words && b.svg && b.w === 36, `${label}: icon only, a link to ${b.href}`);
    }
    say(dock.pause.name === 'Pause' && dock.pause.title === 'Pause' && !dock.pause.words && dock.pause.svg && dock.pause.w === 36, `Pause/Play: icon only, named "${dock.pause.name}"`);
    say(dock.kids.every((k) => k.op > 0.95), `all shown (${dock.kids.map((k) => k.op).join(', ')})`);
    say(dock.kids.every((k) => Math.abs(k.cy - dock.kids[0].cy) < 2), 'all level');
    say(dock.kids.every((k, i) => k.l >= 0 && k.r <= dock.vw && (i === 0 || k.l >= dock.kids[i - 1].r)), `inside the screen, not overlapping (${dock.kids.map((k) => `${Math.round(k.l)}-${Math.round(k.r)}`).join(' ')})`);
    say(dock.talk.href === '/contact/' && dock.talk.name === "Let's Talk" && dock.talk.lit > 40, `Let's Talk links to ${dock.talk.href}, named "${dock.talk.name}", pixel words painted (${dock.talk.lit} px)`);
    say(dock.list.tag === 'BUTTON' && dock.list.pop === 'dialog' && dock.list.ctl === 'rl-tracklist' && dock.list.name === 'Tracklist', `Tracklist is a button that opens the dialog ("${dock.list.name}")`);

    if (size === 'desktop') {
      await page.focus('.rl-talk'); const seen = [];
      for (let k = 0; k < 5; k++) { await page.keyboard.press('Tab'); seen.push(await page.evaluate(() => document.activeElement.className.split(' ')[0])); }
      say(seen.join(', ') === 'rl-list, rl-prev, rl-pause, rl-next, rl-skip', `Tab walks the toolbar in order (${seen.join(', ')})`);
      await page.evaluate(() => document.activeElement.blur());
    }
    // Open.
    await press('.rl-list');
    await page.waitForTimeout(700);
    let s = await st();
    say(s.open && s.expanded === 'true' && s.focusIn, `Tracklist opens the dialog, focus inside it (${s.focus})`);
    say(s.state === 'play' && s.reel === 'play' && (!s.audioLive || !s.paused), `the comic and its music keep playing under it (state ${s.state}, music paused ${s.paused})`);
    const rows = await page.evaluate(() => {
      const box = document.querySelector('.rl-tl__list').getBoundingClientRect();
      return [...document.querySelectorAll('.rl-tl__a')].map((a) => { const r = a.getBoundingClientRect(); const hit = document.elementFromPoint(r.left + Math.min(20, r.width / 2), r.top + r.height / 2); return { tag: a.tagName, href: a.getAttribute('href'), name: a.textContent.trim(), in: r.width > 20 && r.height > 8 && r.left >= box.left - 1 && r.right <= box.right + 1 && r.top >= box.top - 1 && r.bottom <= box.bottom + 1, hit: hit && hit.closest('a') ? hit.closest('a').getAttribute('href') : null }; });
    });
    const links = rows.filter((r) => r.tag === 'A');
    say(links.length === hrefs.length && links.every((r, i) => r.href === hrefs[i]), `${links.length} row links in playlist order`);
    say(links.every((r) => r.in), 'every row link lies over its row inside the list');
    say(links.every((r) => r.hit === r.href), 'every row link is what a click on its row hits');
    // The listing is painted pixels: the links' own words are invisible, the rows are on the canvas.
    const paint = await page.evaluate(() => {
      const cv = document.querySelector('.rl-tl__px'), d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
      let lit = 0; for (let i = 0; i < d.length; i += 4) if (d[i] > 60) lit++;
      return { lit, clear: [...document.querySelectorAll('.rl-tl__a')].every((a) => getComputedStyle(a).color === 'rgba(0, 0, 0, 0)' && a.querySelector('.rl-vh')) };
    });
    say(paint.clear && paint.lit > 2000, `the rows are painted pixels (${paint.lit} lit), the links' own words invisible`);
    const nowRow = rows.find((r) => r.tag !== 'A' && /^Now playing:/.test(r.name));
    say(!!nowRow && nowRow.name.includes(`${tLabel}:`), `"${nowRow && nowRow.name}"`);
    if (out) { await page.waitForTimeout(600); await page.screenshot({ path: join(out, `${slug}-${size}-tracklist.png`) }); }
    // Keyboard (desktop): Tab and the arrows stay inside, Escape closes and returns focus.
    if (size === 'desktop') {
      const f0 = await page.evaluate(() => document.activeElement.getAttribute('href'));
      await page.keyboard.press('ArrowDown');
      const f1 = await page.evaluate(() => document.activeElement.getAttribute('href'));
      say(f1 && f1 === hrefs[hrefs.indexOf(f0) + 1], `ArrowDown walks to the next row (${f0} -> ${f1})`);
      for (let i = 0; i < hrefs.length + 2; i++) await page.keyboard.press('Tab');
      s = await st(); say(s.focusIn, 'Tab stays inside the dialog');
      await page.mouse.move(700, 450); await page.mouse.wheel(0, 400); await page.waitForTimeout(300);
      s = await st(); say(s.state === 'play' && s.open, `a wheel over it does not fold the comic (state ${s.state})`);
      await page.keyboard.press('Escape'); await page.waitForTimeout(200);
      s = await st(); say(!s.open && s.expanded === 'false' && /rl-list/.test(s.focus) && s.state === 'play', `Escape closes it, focus back on Tracklist (${s.focus}), comic still playing`);
      await press('.rl-list'); await page.waitForTimeout(300);
      await page.mouse.click(8, 8); await page.waitForTimeout(200);
      s = await st(); say(!s.open, 'a click on the scrim closes it');
      await press('.rl-list'); await page.waitForTimeout(300);
    }
    await press('.rl-tl__close'); await page.waitForTimeout(200);
    s = await st(); say(!s.open && /rl-list/.test(s.focus), `Close closes it, focus back on Tracklist (${s.focus})`);

    // Follow a row (the music hands over), then Let's Talk.
    await press('.rl-list'); await page.waitForTimeout(700);
    const pick = page.locator('a.rl-tl__a').nth(size === 'phone' ? 5 : 2), href = await pick.getAttribute('href');
    const went = page.waitForURL((u) => u.pathname === href, { timeout: 15000 }).then(() => true, () => false);
    if (size === 'phone') await pick.tap(); else await pick.click();
    const leaving = await page.waitForFunction(() => document.documentElement.hasAttribute('data-mtw-leaving'), null, { timeout: 1500 }).then(() => true, () => false);
    const tail = await page.evaluate(() => { try { return JSON.parse(sessionStorage.getItem('mtw-mixtape') || '{}').tail; } catch (e) { return null; } }).catch(() => null);
    say((await went) && leaving, `a ${size === 'phone' ? 'tap' : 'click'} on a row follows it through the page transition to ${href}${tail ? ', handing the music over' : ''}`);
    await open();
    const wentT = page.waitForURL((u) => u.pathname === '/contact/', { timeout: 15000 }).then(() => true, () => false);
    await press('.rl-talk');
    say(await wentT, "Let's Talk reaches /contact/");
    await open();
    const wentN = page.waitForURL((u) => u.pathname === want.next.href, { timeout: 15000 }).then(() => true, () => false);
    await press('.rl-next');
    const leavingN = await page.waitForFunction(() => document.documentElement.hasAttribute('data-mtw-leaving'), null, { timeout: 1500 }).then(() => true, () => false);
    say((await wentN) && leavingN, `Next follows it through the page transition to ${want.next.href}`);

    // After the fold: the pinned set.
    await open();
    await press('.rl-skip');
    await page.waitForFunction(() => document.documentElement.getAttribute('data-reel') === 'done', null, { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(400);
    const pin = await page.evaluate(() => {
      const p = document.querySelector('body > .rl-pin'); if (!p) return null;
      const r = p.getBoundingClientRect();
      return { kids: [...p.children].map((e) => e.className.split(' ')[0]), pos: getComputedStyle(p).position, right: innerWidth - r.right, left: r.left, bottom: innerHeight - r.bottom, vis: [...p.children].every((e) => +getComputedStyle(e).opacity > 0.95 && e.getBoundingClientRect().width > 0) };
    });
    say(!!pin && pin.kids.join(', ') === 'rl-talk, rl-list, rl-prev, rl-next, rl-tag' && pin.pos === 'fixed' && pin.vis && pin.right >= 0, `after the fold: pinned ${pin ? pin.kids.join(', ') : 'nothing'} (${pin ? pin.pos : ''}, ${pin ? Math.round(pin.right) + ' px from the right, ' + Math.round(pin.bottom) + ' from the bottom' : ''})`);
    if (out) await page.screenshot({ path: join(out, `${slug}-${size}-pinned.png`) });
    await press('.rl-pin .rl-list'); await page.waitForTimeout(1300);
    s = await st(); say(s.open && s.focusIn, 'the pinned Tracklist opens the dialog over the page');
    if (out) await page.screenshot({ path: join(out, `${slug}-${size}-pinned-tracklist.png`) });
    await press('.rl-tl__close'); await page.waitForTimeout(200);
    s = await st(); say(!s.open && /rl-list/.test(s.focus), 'and closes it, focus back on the pinned button');
    await ctx.close();
  }
} finally { await browser.close(); }
console.log(failed ? `\n${failed} failure(s)` : '\ndock and tracklist OK');
process.exit(failed ? 1 : 0);
