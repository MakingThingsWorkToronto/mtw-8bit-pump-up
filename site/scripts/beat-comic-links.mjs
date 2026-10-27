#!/usr/bin/env node
// The ways in (skill: mtw-beat-comic). Every panel in a Beat Comic with an `href` is a real link: a service cell in a
// grid to that service's page (Matt, 2026-09-28: "link the ways in boxes to their sections, so a user can click
// through"), and an image panel without a name bar, such as a "Your turn." starting point, to where its question leads
// ("link those to something on the site"). For each page of the story with links, at desktop (1440x900) and phone
// (390x844, touch) size, this checks:
//   - each link exists, points at its panel's `href`, is named by the panel's `name` (or its caption `cap` when it has
//     no name bar), and sits outside the aria-hidden scenes;
//   - once the page has landed, each link is visible, lies over its panel (within 2 px, after the page's camera), a
//     service cell's name over its name bar, and is the element hit at the panel's centre;
//   - before its cell lands and after its page ends it cannot be hit; the cell without a link ("N WAYS IN.") is not a link,
//     and a click there does not navigate (the stage's click or tap for sound still lands there);
//   - hover (desktop) lights the name bar teal-light with ink type (a panel without one: its caption box paper) and shows a
//     pointer; a keyboard Tab shows a focus outline;
//   - a click (desktop), a clean tap and a tap that wobbles a few pixels (phone) each follow a link through the page
//     transition (data-mtw-leaving) to the right page;
//   - with the music playing, following a link hands the track to the next page (the mixtape's DJ crossfade tail).
// Exits 1 on any failure. Screenshots of a hovered and a focused link go to --out (never the repo).
// Usage: node scripts/beat-comic-links.mjs <page url> [--out <dir>] [--all]   (--all follows every link at desktop size)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const url = args.find((a) => /^https?:/.test(a));
const opt = (name) => { const i = args.indexOf(`--${name}`); return i > -1 ? args[i + 1] : null; };
const out = opt('out'), all = args.includes('--all');
if (!url) { console.error('Usage: node scripts/beat-comic-links.mjs <page url> [--out <dir>] [--all]'); process.exit(2); }
if (out) mkdirSync(out, { recursive: true });
const slug = new URL(url).pathname.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
const at = (q) => { const u = new URL(url); for (const [k, v] of Object.entries(q)) u.searchParams.set(k, v); return u.href; };
let failed = 0;
const say = (ok, msg) => { console.log(`${ok ? 'ok  ' : 'FAIL'} ${msg}`); if (!ok) failed++; };
const SIZES = { desktop: { viewport: { width: 1440, height: 900 } }, phone: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } };

// Everything about one grid page's links at the current story time, measured in the page.
const probe = (page, pi) => page.evaluate((pi) => {
  const story = JSON.parse(document.getElementById('reel-story').textContent), pg = story.pages[pi];
  const pageEl = document.querySelectorAll('.rl-book > .rl-page')[pi], cells = pageEl.querySelectorAll(':scope > .rl-panel');
  const box = (e) => { const r = e.getBoundingClientRect(); return [r.left, r.top, r.right, r.bottom].map((v) => +v.toFixed(1)); };
  const hitAt = (b) => { const e = document.elementFromPoint((b[0] + b[2]) / 2, (b[1] + b[3]) / 2); const a = e && e.closest('a'); return a ? a.getAttribute('href') : e ? (typeof e.className === 'string' && e.className) || e.tagName : null; };
  return pg.panels.map((d, ki) => {
    const cell = cells[ki], a = document.querySelector(`.rl-links__page[data-page="${pi}"] a[data-panel="${ki}"]`), cb = box(cell);
    const r = { ki, href: d.href || null, name: d.name || d.cap || null, bar: !!d.name, pix: d.pix || null, cell: cb, hit: hitAt(cb) };
    if (a) {
      const cs = getComputedStyle(a), span = a.querySelector('span'), nameBar = cell.querySelector('.rl-name');
      Object.assign(r, { link: true, linkHref: a.getAttribute('href'), text: a.textContent.trim(), hidden: !!a.closest('[aria-hidden="true"]'), vis: cs.visibility, pe: cs.pointerEvents, box: box(a), span: span && box(span), barBox: nameBar && box(nameBar) });
    }
    return r;
  });
}, pi);
const near = (a, b, tol = 2) => a && b && a.every((v, i) => Math.abs(v - b[i]) <= tol);

const browser = await chromium.launch({ channel: 'chrome', args: ['--autoplay-policy=no-user-gesture-required'] });
try {
  // The story, and its pages with links (pages whose panels carry an href).
  let story;
  { const ctx = await browser.newContext(SIZES.desktop), page = await ctx.newPage(); await page.goto(at({ reel: 'off' }), { waitUntil: 'load' }); story = await page.evaluate(() => JSON.parse(document.getElementById('reel-story').textContent)); await ctx.close(); }
  const B = 60 / story.bpm;
  const grids = story.pages.map((pg, pi) => ({ pg, pi, cells: pg.panels.filter((d) => d.href) })).filter((g) => g.cells.length);
  say(grids.length > 0, `${grids.length} page(s) with links (${grids.map((g) => `"${g.pg.title || g.pi}": ${g.cells.length}`).join(', ')})`);

  for (const { pg, pi, cells } of grids) {
    const landed = (pg.b + Math.max(...cells.map((d) => d.at))) * B + 0.4, end = (pg.b + pg.l) * B;
    for (const [size, opts] of Object.entries(SIZES)) {
      console.log(`\n--- ${url} "${pg.title || pi}" at ${size} (landed at ${landed.toFixed(2)} s)`);
      const ctx = await browser.newContext(opts), page = await ctx.newPage();
      const load = async (t) => {
        await page.goto(at({ t: t.toFixed(3), hold: '', mute: '' }), { waitUntil: 'load' });
        await page.waitForFunction(() => window.MTWBeatComic);
        await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(250);
      };
      const seek = async (t) => { await page.evaluate((t) => window.MTWBeatComic.seek(t), t); await page.waitForTimeout(60); };
      await load(landed);
      const now = await probe(page, pi);
      for (const r of now.filter((x) => x.href)) {
        const tag = `"${r.name}"`;
        if (!r.link) { say(false, `${tag}: no link`); continue; }
        say(r.linkHref === r.href && r.text === r.name && !r.hidden, `${tag}: link to ${r.linkHref}, named "${r.text}", outside aria-hidden`);
        say(r.vis === 'visible' && r.pe === 'auto', `${tag}: live once landed (visibility ${r.vis}, pointer-events ${r.pe})`);
        say(near(r.box, r.cell) && (!r.bar || near(r.span, r.barBox)), `${tag}: over its panel (link ${r.box}, panel ${r.cell})${r.bar ? ' and its name bar' : ''}`);
        say(r.hit === r.href, `${tag}: hit at the cell's centre (${r.hit})`);
      }
      for (const r of now.filter((x) => !x.href)) say(!r.link && r.hit !== null && !String(r.hit).startsWith('/'), `cell ${r.ki} ${r.pix || r.name || ''}: not a link (hit ${r.hit})`);
      // Before its cell lands, and after the page ends, a link cannot be hit.
      const first = now.find((x) => x.href), firstD = pg.panels[first.ki];
      await seek((pg.b + firstD.at) * B - 0.05);
      const early = (await probe(page, pi)).find((x) => x.ki === first.ki);
      say(early.vis === 'hidden' && early.hit !== first.href, `"${first.name}": not live before it lands (visibility ${early.vis}, hit ${early.hit})`);
      await seek(Math.min(end + 0.2, story.beats * B - 0.1));
      const late = await probe(page, pi);
      say(late.every((x) => !x.link || x.vis === 'hidden'), `no link live after the page ends`);
      await seek(landed);
      // A click on the cell without a link stays on the page.
      const plain = now.find((x) => !x.href);
      if (plain && size === 'desktop') {
        const c = plain.cell; await page.mouse.click((c[0] + c[2]) / 2, (c[1] + c[3]) / 2); await page.waitForTimeout(900);
        say(new URL(page.url()).pathname === new URL(url).pathname, `a click on "${plain.pix || plain.ki}" stays on the page`);
      }
      const links = page.locator(`.rl-links__page[data-page="${pi}"] a.rl-link`), n = await links.count();
      if (size === 'desktop') {
        const h = links.nth(Math.min(2, n - 1));
        await h.hover();
        const look = await h.evaluate((a, pi) => {
          const ki = +a.dataset.panel, cell = document.querySelectorAll('.rl-book > .rl-page')[pi].querySelectorAll(':scope > .rl-panel')[ki];
          const bar = !a.classList.contains('rl-link--cap'), s = getComputedStyle(bar ? a.querySelector('span') : cell.querySelector('.rl-cap'));
          return { bar, bg: s.backgroundColor, color: s.color, cursor: getComputedStyle(a).cursor, frame: getComputedStyle(a).boxShadow };
        }, pi);
        if (look.bar) say(look.bg === 'rgb(95, 196, 201)' && look.color === 'rgb(11, 20, 25)' && look.cursor === 'pointer', `hover lights the name bar (${look.bg} on ${look.color}, cursor ${look.cursor})`);
        else say(look.bg === 'rgb(242, 242, 239)' && /95, 196, 201/.test(look.frame) && look.cursor === 'pointer', `hover lights the caption box paper and the frame teal-light (${look.bg}, frame ${look.frame}, cursor ${look.cursor})`);
        if (out) await page.screenshot({ path: join(out, `${slug}-${size}-hover.png`) });
        await page.mouse.move(5, 5);
      }
      // Keyboard: Tab from one link to the next shows the focus outline.
      await links.nth(0).focus(); await page.keyboard.press('Tab');
      const foc = await page.evaluate(() => { const a = document.activeElement; return { cls: a.className, href: a.getAttribute('href'), fv: a.matches(':focus-visible'), ol: getComputedStyle(a).outlineStyle }; });
      say(foc.cls.includes('rl-link') && foc.fv && foc.ol === 'solid', `Tab focuses the next link (${foc.href}) with a visible outline (${foc.ol})`);
      if (out) await page.screenshot({ path: join(out, `${slug}-${size}-focus.png`) });
      await page.evaluate(() => document.activeElement && document.activeElement.blur());
      // Follow links: click at desktop size (first and last, or every one with --all); a clean tap and a wobbling tap at phone size.
      const follow = size === 'desktop' ? (all ? [...Array(n).keys()] : [0, n - 1]) : [Math.floor(n / 2), n - 1];
      for (const [j, k] of follow.entries()) {
        if (page.url() !== at({ t: landed.toFixed(3), hold: '', mute: '' })) await load(landed);
        const a = links.nth(k), href = await a.getAttribute('href'), name = (await a.textContent()).trim(), b = await a.boundingBox(), x = b.x + b.width / 2, y = b.y + b.height / 2;
        const how = size === 'desktop' ? 'click' : j === 0 ? 'tap' : 'wobbling tap';
        const went = page.waitForURL((u) => u.pathname + u.search === href, { timeout: 15000 }).then(() => true, () => false);
        if (how === 'click') await page.mouse.click(x, y);
        else if (how === 'tap') await page.touchscreen.tap(x, y);
        else {
          // A real finger: down, a 3 px drift delivered as touchmove (as iOS Safari does), up.
          const cdp = await ctx.newCDPSession(page), pt = (x, y) => [{ x, y, id: 1, radiusX: 8, radiusY: 8, force: 1 }];
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pt(x, y) });
          await page.evaluate(([x, y]) => { const t = new Touch({ identifier: 1, target: document.body, clientX: x + 3, clientY: y + 2 }); document.body.dispatchEvent(new TouchEvent('touchmove', { touches: [t], changedTouches: [t], bubbles: true, cancelable: true })); }, [x, y]);
          await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
        }
        const leaving = await page.waitForFunction(() => document.documentElement.hasAttribute('data-mtw-leaving'), null, { timeout: 1500 }).then(() => true, () => false);
        const ok = await went;
        say(ok && leaving, `${how} on "${name}" follows it through the page transition to ${href} (leaving ${leaving})`);
      }
      await ctx.close();
    }
    // The mixtape: with the music playing, following a link hands the track to the next page.
    {
      const ctx = await browser.newContext(SIZES.desktop), page = await ctx.newPage();
      await page.goto(at({ t: landed.toFixed(3) }), { waitUntil: 'load' });
      await page.waitForFunction(() => window.MTWBeatComic && window.MTWBeatComic.status().audioLive && !window.MTWBeatComic.status().paused, null, { timeout: 15000 }).catch(() => {});
      // Loading the track can take a while: bring the story (and the music with it) back to the landed grid.
      await page.evaluate((t) => window.MTWBeatComic.seek(t), landed); await page.waitForTimeout(200);
      const a = page.locator(`.rl-links__page[data-page="${pi}"] a.rl-link.is-on`).first();
      const live = await a.count();
      if (!live) say(false, 'mixtape: no live link while playing');
      else {
        const href = await a.getAttribute('href'), st = await page.evaluate(() => window.MTWBeatComic.status());
        // The camera keeps pushing while it plays, so click the link's centre rather than wait for it to be still.
        const b = await a.boundingBox(); await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
        const tail = await page.waitForFunction(() => { try { return JSON.parse(sessionStorage.getItem('mtw-mixtape') || '{}').tail; } catch (e) { return null; } }, null, { timeout: 1500 }).then((h) => h.jsonValue(), () => null);
        const went = await page.waitForURL((u) => u.pathname + u.search === href, { timeout: 15000 }).then(() => true, () => false);
        say(st.audioLive && !!tail && went, `mixtape: playing (music ${st.music} s), a click hands the track over (tail ${tail ? tail.src : 'none'}) and reaches ${href}`);
      }
      await ctx.close();
    }
  }

  // A tracklist panel (the homepage cover, 2026-09-28): each row with an href is a real link over its painted row, live
  // only once the disc plays (`tracks.live`, after the sound box), lit on hover, and followed by a click or a tap.
  const lists = story.pages.flatMap((pg, pi) => pg.panels.map((d, ki) => ({ pg, pi, d, ki })).filter((x) => x.d.tracks));
  for (const { pg, pi, d, ki } of lists) {
    const rows = d.tracks.rows.map((r, ri) => ({ ...r, ri })).filter((r) => r.href);
    const liveT = (pg.b + (d.tracks.live ?? d.at)) * B, landed = Math.max(liveT, (pg.b + d.at) * B + 0.16 + d.tracks.rows.length * 0.2 * B) + 0.4;
    for (const [size, opts] of Object.entries(SIZES)) {
      console.log(`\n--- ${url} tracklist on "${pg.title || 'the cover'}" at ${size} (live at ${liveT.toFixed(2)} s)`);
      const ctx = await browser.newContext(opts), page = await ctx.newPage();
      await page.goto(at({ t: landed.toFixed(3), hold: '', mute: '' }), { waitUntil: 'load' });
      await page.waitForFunction(() => window.MTWBeatComic); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(250);
      const probeRows = () => page.evaluate(({ pi, ki }) => {
        const pan = document.querySelectorAll('.rl-book > .rl-page')[pi].querySelectorAll(':scope > .rl-panel')[ki], pb = pan.getBoundingClientRect();
        return [...document.querySelectorAll(`.rl-links__page[data-page="${pi}"] a[data-panel="${ki}"][data-row]`)].map((a) => {
          const r = a.getBoundingClientRect(), cs = getComputedStyle(a), e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2), hit = e && e.closest('a');
          return { ri: +a.dataset.row, href: a.getAttribute('href'), name: a.textContent.trim(), vis: cs.visibility, hidden: !!a.closest('[aria-hidden="true"]'), color: cs.color, inPanel: r.left >= pb.left - 1 && r.right <= pb.right + 1 && r.top >= pb.top - 1 && r.bottom <= pb.bottom + 1 && r.height > 8, hit: hit ? hit.getAttribute('href') : null };
        });
      }, { pi, ki });
      const now = await probeRows();
      say(now.length === rows.length && now.every((x, i) => x.href === rows[i].href && x.ri === rows[i].ri), `${now.length} row links, one per linked row, in order`);
      say(now.every((x) => !x.hidden && x.name && x.color === 'rgba(0, 0, 0, 0)'), 'outside aria-hidden, named, their own text invisible (the rows are painted pixels)');
      say(now.every((x) => x.vis === 'visible' && x.inPanel && x.hit === x.href), `live once the disc plays, each over its row and hit there (${now.filter((x) => !(x.vis === 'visible' && x.inPanel && x.hit === x.href)).map((x) => x.href).join(', ') || 'all'})`);
      // Disc 2, the Journal (2026-09-28): its label and each entry's row are live links over their rows.
      const d2 = rows.filter((r) => (r.discNo || 1) > 1);
      if (d2.length) say(d2.filter((r) => r.no).length > 0 && d2.every((r) => now.some((x) => x.ri === r.ri && x.href === r.href && x.vis === 'visible' && x.inPanel && x.hit === r.href)), `Disc 2: its label and ${d2.filter((r) => r.no).length} Journal rows are live links over their rows (${d2.map((r) => r.href).join(', ')})`);
      await page.evaluate((t) => window.MTWBeatComic.seek(t), liveT - 0.7); await page.waitForTimeout(80);
      const early = await probeRows();
      say(early.every((x) => x.vis === 'hidden' && x.hit !== x.href), 'not live before the disc plays (the click for sound is not a link)');
      await page.evaluate((t) => window.MTWBeatComic.seek(t), landed); await page.waitForTimeout(80);
      const a = page.locator(`.rl-links__page[data-page="${pi}"] a[data-panel="${ki}"][data-row]`);
      if (size === 'desktop') {
        const k = Math.min(4, rows.length - 1);
        await a.nth(k).hover(); await page.waitForTimeout(80);
        const hot = await page.evaluate(({ pi, ki }) => document.querySelectorAll('.rl-book > .rl-page')[pi].querySelectorAll(':scope > .rl-panel')[ki].getAttribute('data-hot'), { pi, ki });
        say(+hot === rows[k].ri, `hover lights its row (data-hot ${hot})`);
        if (out) await page.screenshot({ path: join(out, `${slug}-tracklist-${size}-hover.png`) });
        await page.mouse.move(5, 5);
      }
      // A click on a Disc 1 row (desktop) and a tap on a Disc 2 row (phone, when the list has one).
      const last2 = rows.map((r, i) => ((r.discNo || 1) > 1 && r.no ? i : -1)).filter((i) => i > -1).pop();
      const k = size === 'desktop' ? 0 : last2 != null ? last2 : rows.length - 2, href = rows[k].href, b = await a.nth(k).boundingBox();
      const went = page.waitForURL((u) => u.pathname + u.search === href, { timeout: 15000 }).then(() => true, () => false);
      if (size === 'desktop') await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2); else await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2);
      const leaving = await page.waitForFunction(() => document.documentElement.hasAttribute('data-mtw-leaving'), null, { timeout: 1500 }).then(() => true, () => false);
      say((await went) && leaving, `a ${size === 'desktop' ? 'click' : 'tap'} on "${rows[k].title}" follows it through the page transition to ${href}`);
      await ctx.close();
    }
  }
} finally { await browser.close(); }
console.log(failed ? `\n${failed} failure(s)` : '\nways in OK');
process.exit(failed ? 1 : 0);
