// <Page> Beat Comic, [Disc 2] Track <nn> (<who asked, date>; spec paragraph). Copy to site/src/data/beat-comics/<slug>.ts and
// fill every <...>. This is the standard (SKILL.md "The standard"), filled in: the cover with the track ticker, pace in
// seconds, the close resolving the heading through the ages (8-bit, 16-bit, screen pixels, then the page's type) before
// its image fades in. Models: agentic.ts (a service page), journal-report-evidence.ts (a Journal entry, Disc 2). Check with
// node scripts/beat-comic-check.mjs --url <page> --map <profile.json>, then beat-comic-bench.mjs and beat-comic-hold.mjs.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
// A box with a caption or a name bar is a cinematic photo: card('<service>') or photo('<starting point>'), never
// hero() (a hologram letterboxed under its label; Matt, 2026-09-28). A hologram only in a box with no label.
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

type R = [number, number, number, number];
// The cover's disc, TRACK nn. and title come from here, never retyped: { disc, no, title }. A Journal entry is on Disc 2
// (add it to Disc 2 in tracklist.ts and to journal.ts, the slug map JournalEntryPage renders from).
const tr = track('/<pillar>/<page>/');

// Beat map summary (from the profile): <bpm> BPM (<s> s a beat), first downbeat <offset> s, <feel>; phrases from <n>;
// stops <...>; accents <...>; the song ends on <endBeat>; <loopBeats> beats = <m:ss>.
// Pace in seconds: a panel about every 1.5 s = <n> beats at this tempo; pages of <8-16> beats.
const pages: BeatComicStory['pages'] = [
  // Cover: the track, homepage layout (a service page). Freeze on an intro stop if the song has one.
  { b: 0, l: 8, freeze: [[/* stop */ 7, /* re-entry */ 8]], panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: '<Previously: ...>', cap2: '<Now: ...>', at2: 4 },
    { at: 3, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 5, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // A section landing page (/agentic-systems/, /traditional-systems/, /data-migrations/; Matt, 2026-09-28) swaps them:
  // the section name scrolls beside the mark in the main box and TRACK nn. sits bottom left (beat-comic-check fails
  // a landing cover without this):
  //   { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `${tr.title.toUpperCase()}.`, scroll: true, ticker: true, cap: .., cap2: .., at2: 4 },
  //   { at: 3, r: [0, 0.74, 0.62, 0.26], pix: `TRACK ${tr.no}.`, small: true },
  // A Journal entry (Disc 2) keeps the service layout with its disc in the main box (the ticker adds "DISC 2 *" itself):
  //   { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `DISC ${tr.disc}. TRACK ${tr.no}.`, ticker: true, cap: .., cap2: .., at2: 4 },
  // Chapters: homage, swagger, the turn. Panels about 1.5 s apart; a slam on the phrase's accents (each word once).
  { b: 8, l: 12, title: '<Short title.>', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: '<THING.>', cap: '<Narration.>' },
    // One image kind per page: all holograms (hero) or all photos (photo), never mixed (beat-comic-check fails it).
    { at: 3, r: [0.5, 0, 0.5, 0.5], img: card('<service slug>'), cap: '<Narration.>' },
    { at: 5, r: [0, 0.5, 0.5, 0.5], img: card('<another service slug>'), cap: '<Narration.>' },
    { at: 7, r: [0.5, 0.5, 0.5, 0.5], pix: '<CLAIM.>', cap: '<Set-up.>' },
  ], sfx: [{ at: /* accent */ 9, w: '<WORD!>', sub: '<Two words.>', x: 0.5, y: 0.5, r: -4 }] },
  // A grid of services: exact cells (thirds here), never overlapping. Each service cell links to its page (`href`), from
  // the tracklist by the cell's name: const pageOf = (name: string) => tracklist.find((x) => `${x.title}.` === name)!.path
  // (home.ts throws on a name without a page). The "N WAYS IN." cell has none.
  // { b: .., l: 16, title: '<The line-up.>', ground: 'teal', panels: [
  //   { at: 1, r: [0, 0, 1 / 3, 0.5], pix: '<N WAYS IN.>' },
  //   ...services.map(([name, img], i) => ({ at: 2 + i * 1.5, r: [((i + 1) % 3) / 3, Math.floor((i + 1) / 3) * 0.5, 1 / 3, 0.5] as R, img: card(img), name, href: pageOf(name) })),
  // ] },
  // ... more chapters; one only serious, on the song's dead stop (freeze on it) ...
  // "Your turn.": four photos, each once, each a link to where the site answers its question (its caption names it).
  // { b: .., l: 8, title: 'Your turn.', panels: [
  //   { at: 0.5, r: [0, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '<a service page or /contact/?service=..>', cap: '<A question?>' },
  //   ... three more photos ...
  // ] },
  // The close: the page's own hero; the heading resolves through the ages to the page's type, then the image fades in;
  // no slab.
  { b: /* close */ 160, l: 12, close: true, panels: [] },
];

const art = findSourceImage('service-hero', '<page hero id>');
export const slugStory: BeatComicStory = {
  bpm: 0, // from the profile
  beats: 0, // loopBeats
  close: 160, // the close page's b
  track: tr,
  music: { src: '/audio/<file>.mp3', offset: 0, credit: 'Music: <Title> by <Artist>', source: '<the track page URL>' },
  // pixelate: the close beat the resolve starts (5 in a 12-beat close, 4 in 10, 3 in 8). A page whose hero image is
  // full-bleed behind its heading (a Journal entry, About Matt) adds layout: 'full-bleed' (beat-comic-audit.mjs checks it).
  closeScene: { lines: ['<Heading line one>', '<line two.>'], pixelate: 5, lede: '<The page lede, exactly.>', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art', // a Journal entry: '.journal-entry-hero .page-title' (no scroll reveal: the fold hands over at once)
  markPaths,
  pages,
};
