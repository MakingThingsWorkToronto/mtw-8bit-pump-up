#!/usr/bin/env node
// Cross-comic audit for every Beat Comic on the mixtape (skill: mtw-beat-comic). beat-comic-check.mjs checks one story
// against its song; this checks every story on both discs against each other and against the pages they sit on, so comics written
// by different hands stay one experience (Matt, 2026-09-28: "we need to enable the user to stay in the 8 bit experience.
// i may export it to stand alone so ensure consistency. also i note some box images are hidden behind labels because we
// use the holo not the cinematic, so we ne never see it").
//
// It reads the story each page actually ships (#reel-story, fetched with ?reel=off from a running server, as the other
// checks do) and the page's own hero (h1, lede, hero image), the soundtrack library (sources.json and the profiles), and
// checks, per comic:
//   the track (from the tracklist, its disc and number unique, every track has a comic; a Journal track's title is its
//   entry's own), songs unique across comics, the credit
//   (the library's exact title, artist and track page), the song's grid (a checked `grid` in sources.json wins over the
//   profile), the story ending at least 0.3 s before its song file, the cover layout by page type (homepage, section
//   landing page, service page, About Matt, a Journal entry: "DISC 2. TRACK nn." in the main box), chapter titles, box grammar (art in every panel, no overlaps, exact thirds, captions
//   that fit their box), a hologram (contain) never under a label (a caption or name bar covers most of what shows), one
//   image kind per scene, the service grids and "Your turn." scenes the same grid everywhere and all cinematic, slams
//   clear of the next chapter card, one serious chapter without slams, the close (last page, 12 beats where possible,
//   the page hero's exact heading lines, lede and image, pixelate 5 for 12 beats / 3 for 8 / proportional, holdEnd and
//   holdLive, collapseTo the page's hero; a full-bleed hero (a Journal entry, About Matt) closes full-bleed:
//   closeScene.layout 'full-bleed'), and every exit (href) going to a page with a Beat Comic or to the contact
//   form, never to the page itself, never through a #fragment (a scroll on arrival folds the comic away).
// Usage (from site/, with the dev server running): node scripts/beat-comic-audit.mjs [--base http://localhost:8791]
//   [--only /path/] [--quiet]   (--quiet prints only WARN and ERROR lines)
// Exit code 1 on any ERROR; WARN lines are judgement calls to look at, not failures.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i > -1 ? args[i + 1] : def; };
const base = opt('base', 'http://localhost:8791').replace(/\/$/, '');
const only = opt('only', null);
const quiet = args.includes('--quiet');
const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(here, '..');
const lib = path.resolve(site, '..', 'wiki', 'soundtrack-library');

// The tracklist, both discs, imported from its source (it has no imports; Node strips its types).
const { tracklist } = await import(pathToFileURL(path.join(site, 'src', 'data', 'beat-comics', 'tracklist.ts')).href);
const tkey = (t) => `${t.disc || 1}:${t.no}`, tname = (t) => ((t.disc || 1) > 1 ? `Disc ${t.disc} Track ${t.no}` : `Track ${t.no}`);
const library = JSON.parse(readFileSync(path.join(lib, 'sources.json'), 'utf8')).tracks;

const decode = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;|&#x27;|&apos;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const landingPath = (p) => /^\/[^/]+\/$/.test(p);
// About Matt (Track 19) has a service-style cover but its own hero: a full-bleed portrait scene, no .page-art. A Journal
// entry (Disc 2) has a service-style cover with its disc ("DISC 2. TRACK nn.") and a full-bleed cover behind its title.
const kindOf = (p) => (p === '/' ? 'home' : p === '/about-matt/' ? 'about' : p.startsWith('/journal/') ? 'journal' : landingPath(p) ? 'landing' : 'service');
const bleedKinds = new Set(['about', 'journal']);
const near = (a, b, t = 0.002) => Math.abs(a - b) <= t;
const rectEq = (a, b) => a && b && a.every((v, i) => near(v, b[i]));
const pageName = (p) => p.title || (p.close ? 'close' : `page@${p.b}`);

const fetched = new Map();
async function get(p) {
  if (!fetched.has(p)) {
    const res = await fetch(`${base}${p}${p.includes('?') ? '&' : '?'}reel=off`, { redirect: 'manual' });
    fetched.set(p, { status: res.status, html: res.status === 200 ? await res.text() : '' });
  }
  return fetched.get(p);
}
const storyOf = (html) => { const m = html.match(/<script type="application\/json" id="reel-story">([\s\S]*?)<\/script>/); return m ? JSON.parse(m[1]) : null; };

function heroOf(html) {
  const h = html.match(/<h1[^>]*>([\s\S]*?)<span class="accent"[^>]*>([\s\S]*?)<\/span>\s*<\/h1>/);
  const lede = html.match(/<p class="lede"[^>]*>([\s\S]*?)<\/p>/);
  const at = ['class="page-art"', 'about-hero__scene', 'about-hero__art', 'journal-entry-hero__scene'].map((k) => html.indexOf(k)).find((i) => i > -1) ?? -1;
  const img = at > -1 ? html.slice(at).match(/<img[^>]*\ssrc="([^"]+)"/) : null;
  return { lines: h ? [decode(h[1]), decode(h[2])] : null, lede: lede ? decode(lede[1]) : null, image: img ? img[1] : null };
}

// Contact form keys (the service, type and starting-point values its links may preselect).
const contact = await get('/contact/');
const contactKeys = new Set([...contact.html.matchAll(/<option[^>]*value="([^"]+)"/g)].map((m) => m[1]));

const results = [];
const usedSongs = new Map();
const usedNos = new Map();
const grids = new Map(); // service-grid signature by cell count, across comics

for (const t of tracklist) {
  if (only && t.path !== only) continue;
  const out = [];
  const err = (m) => out.push(['ERROR', m]);
  const warn = (m) => out.push(['WARN', m]);
  const ok = (m) => out.push(['ok', m]);
  const page = await get(t.path);
  const story = page.status === 200 ? storyOf(page.html) : null;
  results.push({ t, out });
  if (!story) { err(`no Beat Comic on ${t.path} (HTTP ${page.status}); every track has one`); continue; }
  const kind = kindOf(t.path);
  const pages = story.pages.slice().sort((a, b) => a.b - b.b);
  const TITLE = `${t.title.toUpperCase()}.`, NO = `${t.disc > 1 ? `DISC ${t.disc}. ` : ''}TRACK ${t.no}.`;

  // Track: from the tracklist (its disc too), unique.
  if (!story.track || story.track.no !== t.no || story.track.title !== t.title || (story.track.disc || 1) !== t.disc) err(`track ${JSON.stringify(story.track)} is not the tracklist's ${tname(t)} "${t.title}" (use track('${t.path}'))`);
  else ok(`${tname(t)}: ${t.title}`);
  if (story.track) { const k = tkey(story.track); if (usedNos.has(k)) err(`${tname(story.track)} is also ${usedNos.get(k)}'s`); usedNos.set(k, t.path); }
  // A Journal track is named by its entry's own title, never retyped.
  if (kind === 'journal') {
    const slug = t.path.split('/')[2], jf = path.join(site, 'src', 'data', 'journal', `${slug}.json`);
    const entry = existsSync(jf) ? JSON.parse(readFileSync(jf, 'utf8')) : null;
    if (!entry) err(`no entry data for ${t.path} (${jf})`);
    else if (entry.title !== t.title) err(`the tracklist names ${t.path} "${t.title}"; its entry is "${entry.title}"`);
    else ok(`the track title is the entry's own`);
  }

  // Song: unique across comics, the library's exact credit, the checked grid, the story ending before the song.
  let maxBeats = Infinity; // the most beats the song file allows, 0.3 s clear
  const src = story.music.src;
  if (usedSongs.has(src)) err(`song ${src} is also ${usedSongs.get(src)}'s; every comic has its own song`); else usedSongs.set(src, t.path);
  const file = path.basename(src);
  const lt = library.find((x) => file.startsWith(x.id) || file === x.file || (x.file && file.startsWith(x.file.replace(/\.mp3$/, ''))) || (x.usedBy || []).some((u) => u.startsWith(`${t.path} `)))
    || library.find((x) => story.music.credit === `Music: ${x.title} by ${x.artist}`);
  if (!lt) err(`song ${src} is not in the soundtrack library (wiki/soundtrack-library/sources.json)`);
  else if (lt.status !== 'approved') err(`song ${src} is ${lt.status} in the soundtrack library, not approved`);
  else {
    const credit = `Music: ${lt.title} by ${lt.artist}`;
    if (story.music.credit !== credit) err(`credit "${story.music.credit}" is not the library's "${credit}"`);
    else if (story.music.source !== lt.source) err(`credit link ${story.music.source} is not the library's ${lt.source}`);
    else ok(`credit "${credit}" -> ${lt.source}`);
    const profFile = path.join(lib, 'profiles', `${lt.id}.json`);
    const prof = existsSync(profFile) ? JSON.parse(readFileSync(profFile, 'utf8')) : null;
    const map = prof ? (prof.beatMap || prof) : null;
    const grid = lt.grid || map;
    const from = lt.grid ? 'checked grid in sources.json' : 'profile';
    if (!grid) err(`no profile for ${lt.id}`);
    else if (Math.abs(story.bpm - grid.bpm) > 0.01 || Math.abs(story.music.offset - grid.offset) > 0.03) err(`grid ${story.bpm} BPM / ${story.music.offset} s differs from the ${from}'s ${grid.bpm} BPM / ${grid.offset} s`);
    else ok(`grid ${story.bpm} BPM, first downbeat ${story.music.offset} s (${from})`);
    const dur = map && map.duration;
    const end = story.music.offset + story.beats * 60 / story.bpm;
    if (dur) maxBeats = Math.floor((dur - 0.3 - story.music.offset) * story.bpm / 60);
    if (!dur) warn(`no song duration in the profile of ${lt.id}`);
    else if (end > dur - 0.3) err(`the story ends at ${end.toFixed(2)} s, less than 0.3 s before the song file ends (${dur} s); at most ${Math.floor((dur - 0.3 - story.music.offset) * story.bpm / 60)} beats`);
    else ok(`the story ends at ${end.toFixed(2)} s, ${(dur - end).toFixed(2)} s before the song (${dur} s)`);
  }

  // Pages cover the loop.
  let at = 0;
  for (const p of pages) { if (p.b !== at) err(`${pageName(p)} starts on beat ${p.b}; the previous page ends on ${at}`); at = p.b + p.l; }
  if (at !== story.beats) err(`pages end on beat ${at}, the story on ${story.beats}`);

  // Cover by page type.
  const cover = pages[0], cp = cover.panels || [];
  const find = (r) => cp.find((q) => rectEq(q.r, r));
  if (kind === 'home') {
    if (!cp.some((q) => q.tracks && q.tracks.rows.some((r) => r.now && r.no === t.no))) err('home cover: no tracklist playing Track 01');
    else ok('home cover: the tracklist with Track 01 playing');
  } else {
    const main = find([0, 0, 1, 0.74]), low = find([0, 0.74, 0.62, 0.26]), chat = find([0.62, 0.74, 0.38, 0.26]);
    const want = kind === 'landing' ? { main: TITLE, scroll: true, low: NO } : { main: NO, scroll: false, low: TITLE };
    const bad = [];
    if (!main || !main.mark || !main.ticker || main.pix !== want.main || !!main.scroll !== want.scroll) bad.push(`main box [0,0,1,0.74] should be mark + ${want.scroll ? 'scrolling ' : ''}"${want.main}" + ticker (has ${main ? JSON.stringify({ pix: main.pix, mark: !!main.mark, ticker: !!main.ticker, scroll: !!main.scroll }) : 'none'})`);
    if (!low || low.pix !== want.low || !low.small) bad.push(`bottom-left box [0,0.74,0.62,0.26] should be small "${want.low}" (has ${low ? JSON.stringify(low.pix) : 'none'})`);
    if (!chat || !chat.chat || chat.cap !== 'Sarcastic. Also serious.') bad.push('bottom-right box [0.62,0.74,0.38,0.26] should be the chat "Sarcastic. Also serious."');
    if (cp.length !== 3) bad.push(`the cover has ${cp.length} panels, not 3`);
    if (bad.length) bad.forEach((b) => err(`${kind} cover: ${b}`)); else ok(`${kind} cover: "${want.main}" in the main box, "${want.low}" bottom left, the tone chat`);
    // The disc on the cover's CD ticker comes from story.track (the engine prints "DISC 2 * TRACK nn" after Disc 1).
    if (t.disc > 1 && !(story.track && story.track.disc === t.disc)) err(`${kind} cover: the ticker cannot show Disc ${t.disc}: story.track has no disc`);
  }

  // Chapter titles: short, one line, a full stop.
  for (const p of pages.filter((q) => q.title)) {
    if (!/[.?!]$/.test(p.title)) err(`chapter "${p.title}" has no full stop`);
    // Headings end in a full stop; a heading ending in ? or ! keeps it (Matt, 2026-09-26, the heading full-stop rule).
    else if (!/[.?!]$/.test(p.title)) warn(`chapter "${p.title}" ends in "${p.title.slice(-1)}", not a full stop`);
    if (p.title.length > 18) warn(`chapter "${p.title}" is ${p.title.length} characters (the homepage's longest is 17; it will be shrunk to one line)`);
  }
  const dupTitles = pages.filter((p) => p.title).map((p) => p.title).filter((x, i, a) => a.indexOf(x) !== i);
  if (dupTitles.length) warn(`chapter titles repeat: ${dupTitles.join(', ')}`);

  // Box grammar.
  const imgPages = [];
  for (const p of pages) {
    const ps = p.panels || [];
    for (const q of ps) {
      if (!(q.img || q.pix || q.chart || q.chat || q.mark || q.marquee || q.sound || q.cd || q.ticker || q.tracks)) err(`${pageName(p)}: the panel at beat ${p.b + q.at} has no art`);
      // Columns (x and width) are exact thirds, not 0.33/0.34/0.67 (Matt, 2026-09-27: "the items are different sizes and not
      // aligned"); a y below a 0.3 row with its gutter is not a third.
      for (const v of [q.r[0], q.r[2]]) if (!near(v, 1 / 3) && !near(v, 2 / 3) && (near(v, 1 / 3, 0.012) || near(v, 2 / 3, 0.012))) { warn(`${pageName(p)}: panel at beat ${p.b + q.at} uses ${v}, not an exact third`); break; }
      if (q.img && q.img.fit === 'contain' && (q.cap || q.name)) err(`${pageName(p)}: a hologram under a ${q.name ? 'name bar' : 'caption'} at beat ${p.b + q.at} ("${(q.name || q.cap).slice(0, 36)}"): use the cinematic photo (card() / photo())`);
      const w = q.r[2];
      for (const c of [q.cap, q.cap2].filter(Boolean)) {
        const max = w <= 0.26 ? 40 : w <= 0.34 ? 62 : 80;
        if (c.length > max && !q.chat) warn(`${pageName(p)}: caption "${c.slice(0, 40)}..." is ${c.length} characters in a ${w.toFixed(2)}-wide box (keep it under ${max})`);
      }
    }
    for (const key of ['r', 'rp']) for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
      const a = ps[i][key], b = ps[j][key];
      if (!a || !b) continue;
      const end = (q) => (q.until != null ? q.until : p.l);
      if (Math.min(end(ps[i]), end(ps[j])) <= Math.max(ps[i].at, ps[j].at)) continue;
      const ox = Math.min(a[0] + a[2], b[0] + b[2]) - Math.max(a[0], b[0]), oy = Math.min(a[1] + a[3], b[1] + b[3]) - Math.max(a[1], b[1]);
      if (ox > 0.002 && oy > 0.002) err(`${pageName(p)}: panels at beats ${p.b + ps[i].at} and ${p.b + ps[j].at} overlap (${key})`);
    }
    const kinds = new Set(ps.filter((q) => q.img).map((q) => q.img.fit));
    const pics = ps.filter((q) => q.img).map((q) => q.img.src);
    if (new Set(pics).size !== pics.length) warn(`${pageName(p)}: a picture repeats within the scene`);
    if (kinds.size > 1) err(`${pageName(p)}: mixes cinematic photos and holograms; one image kind per scene`);
    if (ps.some((q) => q.img)) imgPages.push(p);
  }
  const holo = imgPages.flatMap((p) => p.panels.filter((q) => q.img && q.img.fit === 'contain').map((q) => `${pageName(p)}@${p.b + q.at}`));
  ok(`${imgPages.reduce((n, p) => n + p.panels.filter((q) => q.img).length, 0)} image boxes, ${holo.length} holograms${holo.length ? ` (${holo.join(', ')})` : ''}`);

  // Service grids (cells with a name bar) and "Your turn." scenes: one grid per count, all cinematic, links from the tracklist.
  for (const p of pages) {
    const cells = (p.panels || []).filter((q) => q.name);
    if (!cells.length) continue;
    const lead = p.panels.find((q) => q.pix && !q.name && q.r[0] === 0 && q.r[1] === 0);
    const w = cells[0].r[2], h = cells[0].r[3];
    const cols = Math.round(1 / w), rows = Math.round(1 / h);
    const exact = cells.every((q) => near(q.r[2], w) && near(q.r[3], h) && near((q.r[0] / w) % 1, 0, 0.01) && near((q.r[1] / h) % 1, 0, 0.01)) && near(w * cols, 1) && near(h * rows, 1);
    if (!exact) err(`${pageName(p)}: the service grid is not an exact grid of equal cells`);
    if (!lead || !near(lead.r[2], w) || !near(lead.r[3], h)) err(`${pageName(p)}: the grid has no lead cell (pix) in its first cell`);
    else if (kind === 'landing' && !/ WAYS IN\.$/.test(lead.pix)) warn(`${pageName(p)}: a landing page's lead cell reads "${lead.pix}", not "N WAYS IN."`);
    if (p.ground !== 'teal') warn(`${pageName(p)}: a service grid on the ink ground (the others are on the teal band)`);
    const sig = `${cols}x${rows}`;
    const g = grids.get(cells.length);
    if (g && g.sig !== sig) err(`${pageName(p)}: ${cells.length} services on a ${sig} grid; ${g.path} lays ${cells.length} out on ${g.sig}`);
    else if (!g) grids.set(cells.length, { sig, path: t.path });
    for (const q of cells) {
      const tt = tracklist.find((x) => `${x.title}.` === q.name);
      if (!tt) err(`${pageName(p)}: "${q.name}" is not a track title`);
      else if (tt.path === t.path) { if (q.href) err(`${pageName(p)}: "${q.name}" links to the page it is on`); }
      else if (q.href !== tt.path) err(`${pageName(p)}: "${q.name}" links to ${q.href}, not its page ${tt.path}`);
      if (!q.img) err(`${pageName(p)}: "${q.name}" has no picture; the ways in are cinematic photos`);
      // A hologram cell is already reported above: its name bar covers it.
    }
    ok(`${pageName(p)}: ${cells.length} services on an exact ${sig} grid`);
  }
  const turns = pages.filter((p) => p.title === 'Your turn.');
  if (turns.length !== 1) err(`${turns.length} "Your turn." scenes (every comic has one)`);
  for (const p of turns) {
    const ps = p.panels || [], bad = [];
    if (ps.length !== 4) bad.push(`${ps.length} panels, not 4`);
    ps.forEach((q, i) => {
      if (!rectEq(q.r, [i * 0.25, 0, 0.25, 1])) bad.push(`panel ${i + 1} is ${JSON.stringify(q.r)}, not quarter ${i + 1}`);
      if (!q.img || q.img.fit !== 'cover') bad.push(`panel ${i + 1} is not a cinematic photo`);
      if (!q.cap || !/\?$/.test(q.cap)) bad.push(`panel ${i + 1}'s caption is not a question`);
      if (!q.href) bad.push(`panel ${i + 1} has no link`);
    });
    const srcs = ps.filter((q) => q.img).map((q) => q.img.src);
    if (new Set(srcs).size !== srcs.length) bad.push('a photo repeats');
    if (bad.length) bad.forEach((b) => err(`Your turn.: ${b}`)); else ok('Your turn.: four quarter columns of cinematic photos, question captions, each a link');
    const after = pages.filter((q) => q.b > p.b && !q.close);
    if (after.length) warn(`Your turn. is followed by ${after.map(pageName).join(', ')} before the close`);
  }

  // Slams: clear of the next chapter card; the serious chapter has none.
  const sfx = pages.flatMap((p) => (p.sfx || []).map((s) => ({ ...s, page: p, abs: p.b + s.at })));
  for (const s of sfx) {
    const end = s.abs + (s.len || 2.6), next = pages.find((p) => p.b > s.page.b && p.title && p.b < end);
    if (next && s.y > 0.25 && s.y < 0.75) err(`${s.w} (beat ${s.abs}) is still up when "${next.title}" flashes, across the card's band (y ${s.y})`);
    if (s.x < 0 || s.x > 1 || s.y < 0 || s.y > 1) err(`${s.w} sits off the page (${s.x}, ${s.y})`);
  }
  const serious = pages.filter((p) => p.title && (p.ember || 1) >= 1.7);
  if (kind !== 'home') {
    if (serious.length !== 1) warn(`${serious.length} serious chapters (ember 1.7 or more): ${serious.map(pageName).join(', ') || 'none'}; one chapter only is serious`);
    for (const p of serious) if ((p.sfx || []).length) warn(`${pageName(p)} (the serious chapter) carries slams: ${p.sfx.map((s) => s.w).join(', ')}`);
    if (serious.length === 1 && !(serious[0].sfx || []).length) ok(`one serious chapter, "${serious[0].title}", no slams`);
  }

  // The close.
  const close = pages[pages.length - 1];
  if (!close.close || close.b !== story.close) err('the last page is not the close at story.close');
  else {
    const expect = Math.round(5 * close.l / 12);
    const room = Math.min(12, maxBeats - close.b);
    if (close.l < room) warn(`the close is ${close.l} beats; the song allows ${room} (12 where possible)`);
    else if (close.l < 12) ok(`the close is ${close.l} beats, the longest the song allows (12 where possible)`);
    if (story.closeScene.pixelate !== expect) err(`closeScene.pixelate is ${JSON.stringify(story.closeScene.pixelate)}; a ${close.l}-beat close resolves on beat ${expect}`);
    if ((close.panels || []).length || (close.sfx || []).length) err('the close carries panels or slams');
  }
  if (!story.holdEnd || !story.holdLive) err('the close does not hold with the embers rising (holdEnd, holdLive)');
  if (story.highScores) err('a High Scores board (retired)');
  const hero = heroOf(page.html);
  const wantCollapse = kind === 'home' ? '.home-intro' : kind === 'about' ? '.about-hero .lede' : kind === 'journal' ? '.journal-entry-hero .page-title' : '.page-art';
  if (story.collapseTo !== wantCollapse) err(`collapseTo ${story.collapseTo}; the ${kind} page's hero is ${wantCollapse}`);
  else if (!wantCollapse.split(' ').every((c) => page.html.includes(c.slice(1)))) err(`collapseTo ${wantCollapse} is not on the page`);
  // A full-bleed hero (the image edge to edge behind the heading) closes full-bleed; a side image closes beside it.
  const bleed = story.closeScene.layout === 'full-bleed';
  if (bleedKinds.has(kind) && !bleed) err(`the ${kind} page's hero is full-bleed; its close should be too (closeScene.layout 'full-bleed')`);
  else if (!bleedKinds.has(kind) && bleed) err(`closeScene.layout 'full-bleed' on a ${kind} page, whose hero image sits beside its heading`);
  else if (bleed) ok('the close is full-bleed, as the page hero');
  const cs = story.closeScene, bad = [];
  if (!hero.lines) bad.push('the page has no two-line h1');
  else if (!cs.lines || cs.lines[0] !== hero.lines[0] || cs.lines[1] !== hero.lines[1]) bad.push(`lines ${JSON.stringify(cs.lines)} are not the page h1 ${JSON.stringify(hero.lines)}`);
  if (kind !== 'home') {
    if (cs.lede !== hero.lede) bad.push(`the lede differs from the page's ("${(hero.lede || '').slice(0, 50)}...")`);
    if (!cs.image || cs.image.src !== hero.image) bad.push(`the image ${cs.image && cs.image.src} is not the page hero's ${hero.image}`);
  }
  if (bad.length) bad.forEach((b) => err(`close: ${b}`)); else ok(`close: the page hero exactly ("${cs.lines.join(' ')}"${kind !== 'home' ? ', lede, image' : ''}), ${close.l} beats, resolving on ${cs.pixelate}`);

  // Exits: every link stays in the 8-bit experience (a page with a Beat Comic) or goes to the contact form.
  const links = pages.flatMap((p) => (p.panels || []).filter((q) => q.href).map((q) => ({ href: q.href, where: `${pageName(p)}@${p.b + q.at}` })));
  let good = 0;
  for (const { href, where } of links) {
    if (href.startsWith('#')) { err(`${where}: anchor-only link ${href}`); continue; }
    if (!href.startsWith('/')) { err(`${where}: ${href} leaves the site`); continue; }
    const u = new URL(href, base);
    if (u.hash) err(`${where}: ${href} carries ${u.hash}; landing scrolled folds the comic away (link the page itself)`);
    if (u.pathname === t.path) { err(`${where}: ${href} links to the page it is on`); continue; }
    if (u.pathname === '/contact/') {
      const bad = [...u.searchParams.values()].filter((v) => !contactKeys.has(v));
      if (bad.length) err(`${where}: ${href} preselects ${bad.join(', ')}, not a contact form option`); else good++;
      continue;
    }
    if (!tracklist.some((x) => x.path === u.pathname)) { err(`${where}: ${href} is not a page on the tracklist (no Beat Comic)`); continue; }
    const target = await get(u.pathname);
    if (target.status !== 200 || !storyOf(target.html)) err(`${where}: ${href} has no Beat Comic (HTTP ${target.status})`); else if (!u.hash) good++;
  }
  ok(`${good} of ${links.length} links go to a Beat Comic page or the contact form`);
}

// Report.
let errors = 0, warns = 0;
for (const { t, out } of results) {
  const e = out.filter(([k]) => k === 'ERROR').length, w = out.filter(([k]) => k === 'WARN').length;
  errors += e; warns += w;
  console.log(`\n== ${tname(t)} ${t.title} (${t.path}): ${e ? 'ERROR' : w ? 'WARN' : 'ok'} (${e} errors, ${w} warnings)`);
  for (const [k, m] of out) if (!quiet || k !== 'ok') console.log(`${k.padEnd(5)} ${m}`);
}
if (!only) {
  const missing = tracklist.filter((x) => !usedNos.has(tkey(x)));
  if (missing.length) { errors++; console.log(`ERROR tracks without a comic: ${missing.map(tname).join(', ')}`); }
}
console.log(`\n${results.length} comics: ${errors} errors, ${warns} warnings`);
process.exit(errors ? 1 : 0);
