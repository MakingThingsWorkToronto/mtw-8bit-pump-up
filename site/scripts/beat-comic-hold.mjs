// The held ending, played for real (beat-comic-frames.mjs seeks, so it never reaches the hold). Plays a Beat Comic page
// from just before its close, waits for the hold, and checks the standard ending: the heading resolves through the ages
// (Matt, 2026-09-28: "take us from 8 bit to common pixels to 2026 pixels"): at least three pixel stages, then the page's
// own type; the hero image (or panel, or full-bleed image) fades in only after the type is smooth ("fade the section
// image in AFTER the font clarifies to beauty text"); a full-bleed close (closeScene.layout 'full-bleed': a Journal
// entry, About Matt) lays the page hero's image edge to edge under the header with the page's crop, and the heading in
// the page title's place; the embers keep rising, there is no "TO BE CONTINUED." slab and no High Scores board, and the
// first scroll folds the stage into the page, promptly on a page without the scroll reveal. Screenshots at desktop and
// phone size.
// Usage (from site/): node scripts/beat-comic-hold.mjs --url http://127.0.0.1:8791/agentic-systems/ [--out dir]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i > -1 ? args[i + 1] : def; };
const url = opt('url', 'http://127.0.0.1:8791/');
const out = opt('out', path.join(os.tmpdir(), 'beat-comic-hold'));
fs.mkdirSync(out, { recursive: true });
const slug = new URL(url).pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
const problems = [];
const say = (ok, msg) => { console.log(`${ok ? 'ok   ' : 'FAIL '} ${msg}`); if (!ok) problems.push(msg); };

const browser = await chromium.launch({ channel: 'chrome' });
try {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const page = await (await browser.newContext({ viewport: { width: w, height: h } })).newPage();
    const errs = []; page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(`${url}${url.includes('?') ? '&' : '?'}reel=off`, { waitUntil: 'load' });
    const story = await page.evaluate(() => JSON.parse(document.getElementById('reel-story').textContent));
    const B = 60 / story.bpm, end = story.beats * B, closeT = story.close * B;
    // From a beat before the close, so the whole resolve plays in real time.
    await page.goto(`${url}${url.includes('?') ? '&' : '?'}t=${Math.max(0, Math.min(end - 9 * B, closeT - 2 * B)).toFixed(2)}&mute`, { waitUntil: 'load' });
    await page.waitForFunction(() => window.MTWBeatComic, null, { timeout: 15000 });
    // Sample every frame: the pixel stage of each heading, when the type is smooth, and when the image starts to show.
    await page.evaluate((closeT) => {
      const S = (window.__close = { stages: [], smoothAt: null, artAt: null });
      (function tick() {
        const st = window.MTWBeatComic.status(), T = st.T;
        if (T >= closeT) {
          const px = [...document.querySelectorAll('.rl-hero-h.is-px .rl-hero-px')].map((c) => c.width).join('/');
          if (px && S.stages[S.stages.length - 1] !== px) S.stages.push(px);
          const smooth = document.querySelectorAll('.rl-hero-h').length > 0 && !document.querySelector('.rl-hero-h.is-px');
          if (smooth && S.smoothAt == null) S.smoothAt = T;
          const art = Math.max(0, ...[...document.querySelectorAll('.rl-close__art, .rl-close__panel, .rl-close__bleed')].map((e) => +getComputedStyle(e).opacity));
          if (art > 0.02 && S.artAt == null) S.artAt = T;
        }
        if (st.state === 'play' || st.state === 'paused') requestAnimationFrame(tick);
      })();
    }, closeT);
    await page.waitForFunction((e) => window.MTWBeatComic && window.MTWBeatComic.status().T > e - 0.05, end, { timeout: 40000 });
    await page.waitForTimeout(600);
    const snap = () => page.evaluate(() => document.querySelector('.rl-back').toDataURL().slice(-800));
    const a = await snap(); await page.waitForTimeout(1000); const b = await snap();
    const st = await page.evaluate(() => ({
      px: document.querySelectorAll('.rl-hero-h.is-px').length,
      board: !!document.querySelector('.rl-scores:not([hidden])'),
      slab: [...document.querySelectorAll('.rl-sfx')].some((e) => getComputedStyle(e).opacity > 0.5),
      close: window.__close,
      art: Math.max(0, ...[...document.querySelectorAll('.rl-close__art, .rl-close__panel, .rl-close__bleed')].map((e) => +getComputedStyle(e).opacity)),
      armed: document.documentElement.hasAttribute('data-reveal-armed'),
    }));
    await page.screenshot({ path: path.join(out, `${slug}-hold-${w}x${h}.png`) });
    console.log(`--- ${url} at ${w}x${h}`);
    const beat = (T) => (T == null ? 'never' : `close beat ${((T - closeT) / B).toFixed(2)}`);
    if (story.closeScene && story.closeScene.pixelate) {
      say(st.px === 0, `heading resolved to the page's own type (${st.px} lines still pixelated)`);
      say(st.close.stages.length >= 3, `the heading passed through ${st.close.stages.length} pixel stages before the type (canvas widths ${st.close.stages.join(' > ')})`);
      say(st.close.smoothAt != null && st.close.artAt != null && st.close.artAt >= st.close.smoothAt, `type first, then the image: smooth type at ${beat(st.close.smoothAt)}, image from ${beat(st.close.artAt)}`);
    }
    say(st.art > 0.98, `the image is fully in on the hold (opacity ${st.art})`);
    if (story.closeScene.layout === 'full-bleed') {
      const fb = await page.evaluate(() => {
        const fig = document.querySelector('.rl-close--bleed .rl-close__bleed'), im = fig && fig.querySelector('img'), r = fig && fig.getBoundingClientRect();
        const src = JSON.parse(document.getElementById('reel-story').textContent).closeScene.image.src;
        const hero = [...document.querySelectorAll('.page-body img')].find((x) => x.getAttribute('src') === src);
        const h1 = document.querySelector('.page-body h1'), box = h1 && h1.parentElement.getBoundingClientRect(), grid = document.querySelector('.rl-close--bleed .rl-close__grid').getBoundingClientRect();
        const head = document.querySelector('.rl-close--bleed .rl-hero-h');
        const hb = hero && hero.getBoundingClientRect(), off = r && hb ? Math.max(Math.abs(r.left - hb.left), Math.abs(r.top - hb.top), Math.abs(r.width - hb.width), Math.abs(r.height - hb.height)) : null;
        return { fig: !!fig, box: r ? [r.left, r.top, r.width, r.height].map(Math.round).join(',') : '', heroBox: hb ? [hb.left, hb.top, hb.width, hb.height].map(Math.round).join(',') : '', off, vw: document.documentElement.clientWidth,
          pos: im && getComputedStyle(im).objectPosition, heroPos: hero && getComputedStyle(hero).objectPosition, blend: im && getComputedStyle(im).mixBlendMode,
          dx: box ? Math.abs(grid.left - box.left) : null, dy: box ? Math.abs(grid.top - box.top) : null, fs: head && getComputedStyle(head).fontSize, h1fs: h1 && getComputedStyle(h1).fontSize };
      });
      say(fb.fig && fb.off != null && fb.off < 1.5, `full-bleed: the image in the page hero picture's own box, edge to edge (${fb.box}; the page's ${fb.heroBox}; screen ${fb.vw} wide)`);
      say(!!fb.heroPos && fb.pos === fb.heroPos && fb.blend === 'normal', `full-bleed: cropped as the page hero (object-position ${fb.pos}, the page's ${fb.heroPos}), no blend`);
      say(fb.dx != null && fb.dx < 2 && fb.dy < 2 && fb.fs === fb.h1fs, `full-bleed: the heading in the page title's place (${fb.dx != null ? fb.dx.toFixed(1) : '?'} px, ${fb.dy != null ? fb.dy.toFixed(1) : '?'} px off) at its size (${fb.fs}, the page's ${fb.h1fs})`);
    }
    say(story.holdLive ? a !== b : true, 'embers keep rising on the hold');
    say(!st.board && !st.slab, 'no High Scores board and no "TO BE CONTINUED." slab');
    // The fold waits for the page's hero panel to begin its reveal (at most about 5.5 s); a page without the scroll
    // reveal (a Journal entry) hands over as soon as the fold ends (about 1.5 s).
    const t0 = Date.now();
    await page.mouse.move(w / 2, h / 2); await page.mouse.wheel(0, 300);
    const folded = await page.waitForFunction(() => window.MTWBeatComic.status().state === 'done', null, { timeout: 7000 }).then(() => true, () => false);
    const took = Date.now() - t0;
    say(folded, `the first scroll folds the stage into the page (${(took / 1000).toFixed(2)} s)`);
    if (!st.armed) say(folded && took < 2600, `no scroll reveal on the page: the fold hands over promptly (${(took / 1000).toFixed(2)} s, under 2.6 s; the old wait was up to 5.5 s)`);
    say(errs.length === 0, `no page errors ${errs.join('; ')}`);
    await page.context().close();
  }
} finally { await browser.close(); }
console.log(problems.length ? `\n${problems.length} problem(s); screenshots in ${out}` : `\nheld ending OK; screenshots in ${out}`);
process.exit(problems.length ? 1 : 0);
