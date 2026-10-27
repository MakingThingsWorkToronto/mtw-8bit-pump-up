#!/usr/bin/env node
// Story check for a Beat Comic (skill: mtw-beat-comic). Reads the story a page actually ships (#reel-story) and the song's
// beat map (scripts/analyze-song.mjs), and checks the rules the Homepage B demo was built to:
//   the grid matches the song; the story is one pass of the song; chapters start on bars (phrases preferred); slams sit
//   on accents; the song's dead stops are frozen; the final silence carries the still "TO BE CONTINUED." gag; captions
//   have reading time; a slab does not cover a panel that lands under it; a big-firm chapter exists; the close and the
//   collapse target exist; the credit names the track and links to its own page.
// Usage: node scripts/beat-comic-check.mjs --url http://127.0.0.1:8791/ --map src/data/beat-comics/aphelion.beat-map.json
// Exit code 1 on any ERROR; WARN lines are judgement calls to look at, not failures.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i > -1 ? args[i + 1] : def; };
const url = opt('url', 'http://127.0.0.1:8791/');
const mapFile = opt('map', null);
if (!mapFile) { console.error('Usage: node scripts/beat-comic-check.mjs --url <page> --map <beat-map.json>'); process.exit(2); }
const raw = JSON.parse(readFileSync(mapFile, 'utf8'));
let map = raw.beatMap || raw; // a soundtrack-library profile carries its beat map under beatMap
// A checked grid in the soundtrack library wins over the profile's detected one (2026-09-28: three songs' detected
// tempo was wrong, so their stories were cut to a hand-checked `grid` in sources.json, and this check reported false
// grid errors). The profile's accents, stops and ending are moved onto the checked grid by their times; a `meter` of 3
// makes the bar three beats and the phrase twelve.
let gridFrom = 'the profile', bar = 4;
{
  const lib = path.join(path.dirname(path.resolve(mapFile)), '..', 'sources.json');
  const id = raw.id || path.basename(mapFile, '.json');
  const lt = existsSync(lib) ? (JSON.parse(readFileSync(lib, 'utf8')).tracks || []).find((t) => t.id === id) : null;
  if (lt && lt.grid) {
    const g = lt.grid, toBeat = (b) => (map.offset + b * 60 / map.bpm - g.offset) * g.bpm / 60;
    const move = (list) => [...new Set((list || []).map((b) => Math.round(toBeat(b))).filter((b) => b >= 0))];
    bar = g.meter || 4;
    const endBeat = Math.round(toBeat(map.endBeat));
    map = { ...map, bpm: g.bpm, offset: g.offset, hits: move(map.hits), stops: move(map.stops), endBeat, loopBeats: Math.ceil((endBeat + 1) / bar) * bar };
    gridFrom = `the checked grid in sources.json (${g.bpm} BPM, ${g.offset} s${g.meter ? `, ${g.meter} beats a bar` : ''}${g.confirmedByEar ? '' : ', not yet confirmed by ear'})`;
  }
}
const html = await (await fetch(`${url}${url.includes('?') ? '&' : '?'}reel=off`)).text();
const m = html.match(/<script type="application\/json" id="reel-story">([\s\S]*?)<\/script>/);
if (!m) { console.error(`No #reel-story on ${url}`); process.exit(2); }
const story = JSON.parse(m[1]);
// The site playlist the page's motion toolbar ships for its Tracklist dialog (MotionToolbar.astro, #mtw-playlist).
const pl = html.match(/<script type="application\/json" id="mtw-playlist">([\s\S]*?)<\/script>/);
const playlist = pl ? JSON.parse(pl[1]) : null;

const out = [];
const err = (msg) => out.push(['ERROR', msg]);
const warn = (msg) => out.push(['WARN', msg]);
const ok = (msg) => out.push(['ok', msg]);
const near = (b, list, tol) => list.some((x) => Math.abs(x - b) <= tol);

// Grid and length.
if (Math.abs(story.bpm - map.bpm) > 0.01) err(`bpm ${story.bpm} differs from the map's ${map.bpm}`); else ok(`bpm ${story.bpm}, from ${gridFrom}`);
if (Math.abs(story.music.offset - map.offset) > 0.03) err(`music offset ${story.music.offset} s differs from the map's first downbeat ${map.offset} s`); else ok(`offset ${story.music.offset} s`);
// The story may not outrun its song file: a held story cut past the song's end would wrap with the music (2026-09-28).
const storyEnd = story.music.offset + story.beats * 60 / story.bpm - 0.02;
if (map.duration && storyEnd > map.duration) err(`the story ends at ${storyEnd.toFixed(2)} s (offset + beats), past the song file's ${map.duration} s; shorten beats to at most ${Math.floor((map.duration - story.music.offset + 0.02) * story.bpm / 60)}`);
else if (map.duration) ok(`the story ends at ${storyEnd.toFixed(2)} s, inside the song's ${map.duration} s`);
if (story.beats !== map.loopBeats) warn(`story is ${story.beats} beats; one pass of the song is ${map.loopBeats}`); else ok(`one pass of the song: ${story.beats} beats`);

// Pages.
const pages = story.pages.slice().sort((a, b) => a.b - b.b);
let at = 0;
for (const p of pages) {
  const name = p.title || (p.close ? 'close' : `page@${p.b}`);
  if (p.b !== at) err(`${name} starts on beat ${p.b}; the previous page ends on ${at}`);
  if (p.b % bar) err(`${name} starts off the bar (beat ${p.b})`);
  else if (p.b % (bar * 4) && p.b % (bar * 2)) warn(`${name} starts on beat ${p.b}, not on a phrase or half phrase`);
  at = p.b + p.l;
}
if (at !== story.beats) err(`pages end on beat ${at}, the story on ${story.beats}`); else ok(`${pages.length} pages cover the loop without gaps`);
const titles = pages.filter((p) => p.title).map((p) => p.title);
// The big-firm contrast is the homepage's (Matt, 2026-09-26: "do not repeat the big firm vs matt slogan in the service
// pages that is homepage only").
const homepage = new URL(url).pathname === '/';
const bigFirm = pages.some((p) => /big[- ]firm/i.test(p.title || '') || (p.panels || []).some((q) => /MANAGER\./.test(q.pix || '')));
if (homepage && !bigFirm) err('no big-firm chapter (the homepage spins against the big firm)');
else if (!homepage && bigFirm) err('a big-firm chapter on a page other than the homepage (it is the homepage\'s alone)');
else ok(homepage ? 'big-firm chapter present (homepage)' : 'no big-firm chapter (not the homepage)');
const close = pages.find((p) => p.close);
if (!close || close.b !== story.close) err('no close page at story.close'); else ok(`close at beat ${close.b}`);
if (!story.collapseTo) err('no collapseTo selector (the page hero panel the stage folds into)');
else if (!html.includes(`class="${story.collapseTo.replace(/^\./, '')}`) && !html.includes(story.collapseTo.replace(/^\./, ''))) warn(`collapseTo ${story.collapseTo} not found in the page HTML`);
else ok(`collapses into ${story.collapseTo}`);

// SFX on accents.
const sfx = pages.flatMap((p) => (p.sfx || []).map((s) => ({ ...s, page: p, abs: p.b + s.at })));
// A slam still on screen when the next chapter card flashes must sit high or low, clear of the card's middle band.
for (const s of sfx) {
  const end = s.abs + (s.len || 2.6), next = pages.find((p) => p.b > s.page.b && p.title && p.b < end);
  if (next && s.y > 0.25 && s.y < 0.75) err(`${s.w} (beat ${s.abs}) is still up when "${next.title}" flashes at ${next.b}, across the card's band (y ${s.y}); place it high or low`);
}
// No slogan twice (Matt, 2026-09-26: "not to repeat the same pow slogan in the same video").
const seen = new Map();
for (const s of sfx) { const k = s.w.toUpperCase().replace(/[^A-Z0-9]/g, ''); if (seen.has(k)) err(`${s.w} slams twice (beats ${seen.get(k)} and ${s.abs}); every slam word is used once`); else seen.set(k, s.abs); }
if (seen.size === sfx.length) ok(`${sfx.length} slams, no word repeated`);
let onHit = 0;
for (const s of sfx) {
  if (s.still) continue;
  if (near(s.abs, map.hits, 0.5)) onHit++;
  else if (s.abs % 1) warn(`${s.w} on beat ${s.abs} is neither on an accent nor on a beat`);
  else warn(`${s.w} on beat ${s.abs} is on a beat but not on an accent (${map.hits.join(', ')})`);
}
ok(`${onHit} of ${sfx.filter((s) => !s.still).length} slams on the song's accents`);
const unused = map.hits.filter((h) => !sfx.some((s) => Math.abs(s.abs - h) <= 0.5));
if (unused.length) warn(`accents with no slam: ${unused.join(', ')}`);

// Freezes on the dead stops; the final silence gag.
const freezes = pages.flatMap((p) => (p.freeze || []).map(([a, b]) => [p.b + a, p.b + b]));
const stopRuns = [];
for (const s of map.stops) { const last = stopRuns[stopRuns.length - 1]; if (last && s - last[1] <= 1) last[1] = s; else stopRuns.push([s, s]); }
for (const [a, b] of stopRuns) {
  if (a < 2) continue;
  if (!freezes.some(([f0, f1]) => f0 <= a + 1 && f1 >= b)) warn(`the song stops dead on beats ${a}${b > a ? '-' + b : ''} with no freeze`);
}
for (const [f0, f1] of freezes) if (!stopRuns.some(([a, b]) => f0 <= b + 1 && f1 >= a - 1) && !(f0 >= map.endBeat - 1)) warn(`freeze ${f0}-${f1} has no stop in the song under it`);
ok(`${freezes.length} freezes, ${stopRuns.length} stops`);
// The standard (Matt, 2026-09-27): every comic is a numbered track with a ticker or marquee on its cover, ends on its
// heading resolving from 8-bit into the page's own type with the embers rising, and never says "press start".
// "TO BE CONTINUED." and the High Scores board are retired.
const gag = sfx.find((s) => s.still);
if (!story.track) err('no track (every comic is a numbered track: track("<page path>") from tracklist.ts)'); else ok(`${(story.track.disc || 1) > 1 ? `Disc ${story.track.disc} ` : ''}Track ${story.track.no}: ${story.track.title}`);
const cover = pages[0];
// The homepage cover's tracklist carries the track too: its playing row is the page's track (2026-09-28).
if (!(cover.panels || []).some((q) => q.ticker || q.marquee || (q.tracks && story.track && q.tracks.rows.some((r) => r.now && r.no === story.track.no)))) warn('the cover has no track ticker, marquee or tracklist playing the track'); else ok('the cover carries the track');
// A section landing page's cover (Matt, 2026-09-28): the section name scrolls as a marquee in the main box (with the
// ticker) and "TRACK nn." sits in the bottom-left box. Other pages keep the homepage's TRACK nn. main box.
// A section landing page is a top-level page with services under it (About Matt, Track 19, is top-level without any).
const here = new URL(url).pathname;
const landing = /^\/[^/]+\/$/.test(here) && (playlist ? playlist.some((r) => r.href && r.href !== here && r.href.startsWith(here)) : here !== '/about-matt/');
if (landing && story.track) {
  const main = (cover.panels || []).find((q) => q.r[1] === 0 && q.r[2] >= 0.99), low = (cover.panels || []).find((q) => q.r[0] === 0 && q.r[1] > 0.5);
  const name = `${story.track.title.toUpperCase()}.`, no = `TRACK ${story.track.no}.`;
  if (!main || !main.scroll || main.pix !== name || !main.ticker) err(`landing cover: the main box should scroll "${name}" (pix + scroll) over the ticker (has ${main ? JSON.stringify({ pix: main.pix, scroll: !!main.scroll, ticker: !!main.ticker }) : 'none'})`);
  else if (!low || low.pix !== no) err(`landing cover: the bottom-left box should read "${no}" (has ${low ? low.pix : 'none'})`);
  else ok(`landing cover: "${name}" scrolls in the main box, "${no}" bottom left`);
}
// One image kind per page (Matt, 2026-09-28: "if the basic is a cinematic image then all boxes should use that"): a
// page's image panels are all cinematic photos (cover) or all holograms (contain).
for (const p of pages) {
  const kinds = new Set((p.panels || []).filter((q) => q.img).map((q) => q.img.fit));
  if (kinds.size > 1) err(`${p.title || 'page@' + p.b}: mixes cinematic photos and holograms in its image panels; use one kind per scene`);
}
if (!story.closeScene.pixelate) err('the close does not resolve the heading from 8-bit to modern type (closeScene.pixelate)');
if (!story.holdLive) warn('the hold does not keep the embers rising (holdLive)');
if (story.highScores) err('a High Scores board (retired 2026-09-27)');
const said = pages.flatMap((p) => [p.title, ...(p.panels || []).flatMap((q) => [q.pix, q.cap, q.cap2, ...(q.tracks ? q.tracks.rows.map((r) => r.title) : [])]), ...(p.sfx || []).flatMap((x) => [x.w, x.sub])]).filter(Boolean);
const press = said.find((t) => /press\s*(start|play)/i.test(t));
if (press) err(`"${press}": no press start anywhere (Matt, 2026-09-27)`);
if (gag) err(`${gag.w} (a still slab on the final silence): "TO BE CONTINUED." is retired; end on the heading`);
else if (story.closeScene.pixelate) ok('the close ends on the heading resolving from pixels');

// The tracklist (Matt, 2026-09-28: the homepage cover's tracklist and every comic's Tracklist dialog, the comics' global
// navigation): the rows are the site playlist in order, the page's own track playing and not a link, every link a real
// page; a cover's tracklist goes live only after its page's sound box has gone, so the click for sound is never a link.
const lists = [...pages.flatMap((p) => (p.panels || []).filter((q) => q.tracks).map((q) => ({ name: `${p.title || 'cover'} tracklist`, rows: q.tracks.rows, page: p, q }))), ...(playlist ? [{ name: 'Tracklist dialog', rows: playlist }] : [])];
if (!playlist) err('no #mtw-playlist on the page (the motion toolbar ships it for the Tracklist dialog)');
const checked = new Map();
for (const L of lists) {
  // Each disc numbers its own tracks from 01 (Disc 2, the Journal, 2026-09-28), so the playing row matches on the disc too.
  const now = L.rows.filter((r) => r.now), nums = L.rows.filter((r) => r.no).map((r) => r.no);
  const tDisc = (story.track && story.track.disc) || 1, tName = story.track ? `${tDisc > 1 ? `Disc ${tDisc} ` : ''}Track ${story.track.no}` : 'none';
  if (now.length !== 1 || !story.track || now[0].no !== story.track.no || (now[0].discNo || 1) !== tDisc || now[0].href) err(`${L.name}: the playing row should be this page's ${tName}, once, without a link`);
  const discs = L.rows.filter((r) => r.disc).length;
  const byDisc = new Map();
  for (const r of L.rows.filter((x) => x.no)) { const d = r.discNo || 1; if (!byDisc.has(d)) byDisc.set(d, []); byDisc.get(d).push(r.no); }
  for (const [d, ns] of byDisc) if (ns[0] !== '01' || ns.some((n, i) => i && +n !== +ns[i - 1] + 1)) err(`${L.name}: Disc ${d}'s track numbers are not 01 onward in order (${ns.join(' ')})`);
  if (L.rows.filter((r) => r.disc).some((r, i, a) => (r.discNo || i + 1) !== i + 1)) err(`${L.name}: the discs are not 1 onward in order`);
  const hrefs = L.rows.filter((r) => r.href).map((r) => r.href);
  if (new Set(hrefs).size !== hrefs.length) err(`${L.name}: a page is linked twice`);
  const dead = [];
  for (const h of hrefs) {
    if (!checked.has(h)) checked.set(h, (await fetch(new URL(h, url), { redirect: 'manual' })).status);
    if (checked.get(h) !== 200) dead.push(`${h} (${checked.get(h)})`);
  }
  if (dead.length) err(`${L.name}: rows link to pages that do not answer 200: ${dead.join(', ')}`);
  if (L.q) {
    const box = (L.page.panels || []).find((q) => q.sound), live = L.q.tracks.live != null ? L.q.tracks.live : L.q.at;
    if (box && live < (box.until != null ? box.until : L.page.l)) err(`${L.name}: its links go live on page beat ${live}, while the sound box still shows (until ${box.until})`);
  }
  if (!dead.length) ok(`${L.name}: ${nums.length} tracks on ${discs} discs (${[...byDisc].map(([d, ns]) => `Disc ${d}: ${ns.length}`).join(', ')}), ${tName} playing, ${hrefs.length} links all answer 200`);
}

// Panels on a page never overlap: a grid is exact cells, as the homepage's offer grid (Matt, 2026-09-27: "the items are
// different sizes and not aligned"). Checked in the landscape layout and in each panel's portrait rectangle.
for (const p of pages) {
  const ps = p.panels || [];
  for (const key of ['r', 'rp']) for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
    const a = ps[i][key], b = ps[j][key];
    if (!a || !b) continue;
    // Only while both are on screen: a panel with `until` leaves before a later one lands.
    const end = (q) => (q.until != null ? q.until : p.l);
    if (Math.min(end(ps[i]), end(ps[j])) <= Math.max(ps[i].at, ps[j].at)) continue;
    const ox = Math.min(a[0] + a[2], b[0] + b[2]) - Math.max(a[0], b[0]), oy = Math.min(a[1] + a[3], b[1] + b[3]) - Math.max(a[1], b[1]);
    if (ox > 0.002 && oy > 0.002) err(`${p.title || 'page@' + p.b}: panels at beats ${p.b + ps[i].at} and ${p.b + ps[j].at} overlap (${key})`);
  }
}
// No empty panels: a caption alone reads as an empty box (Matt, 2026-09-26, on two caption-only panels).
for (const p of pages) for (const q of p.panels || []) {
  if (!(q.img || q.pix || q.chart || q.chat || q.mark || q.marquee || q.sound || q.cd || q.ticker || q.tracks)) err(`${p.title || 'page@' + p.b}: the panel at beat ${p.b + q.at} has no art or pixel type ("${(q.cap || '').slice(0, 40)}")`);
}

// Reading time and slab placement.
for (const p of pages) {
  const caps = (p.panels || []).filter((q) => q.cap).sort((a, b) => a.at - b.at);
  if (p.ground === 'teal') continue; // the service grid is read as a whole
  for (let i = 1; i < caps.length; i++) {
    const gap = caps[i].at - caps[i - 1].at, words = caps[i - 1].cap.split(/\s+/).length;
    if (gap < 1.5 && words > 6) warn(`${p.title || 'page@' + p.b}: "${caps[i - 1].cap.slice(0, 40)}" gets ${gap} beats before the next caption`);
  }
  for (const s of p.sfx || []) {
    if (s.still) continue;
    const hold = s.len || 2.6;
    for (const q of p.panels || []) {
      const [x, y, w, h] = q.r;
      if (s.x > x && s.x < x + w && s.y > y && s.y < y + h && q.at > s.at - 0.5 && q.at < s.at + hold - 0.5 && !(q.pix && Math.abs(q.at - s.at) < 0.5))
        warn(`${p.title || 'page@' + p.b}: ${s.w} sits on a panel that lands under it (beat ${p.b + q.at})`);
    }
  }
}

// Credit.
const src = story.music.source || '';
if (!/^Music: .+ by .+/.test(story.music.credit || '')) err(`credit "${story.music.credit}" is not "Music: <Title> by <Artist>"`);
else if (!/^https:\/\/[^/]+\/.+/.test(src)) err(`credit link ${src} is not the track's own page`);
else ok(`credit "${story.music.credit}" -> ${src}`);

for (const [k, msg] of out) console.log(`${k.padEnd(5)} ${msg}`);
process.exit(out.some(([k]) => k === 'ERROR') ? 1 : 0);
