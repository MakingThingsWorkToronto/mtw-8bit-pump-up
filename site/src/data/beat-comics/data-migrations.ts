// Data & Migrations Beat Comic, the mixtape's Track 15 (Matt, 2026-09-28: "generate for traditional systems and also
// data and migrations"). A move told as a heist in reverse: the old system nobody dares switch off, the date someone
// else set, the inventory, the plan, the cutover weekend (the only serious chapter, on the song's long breakdown), then
// Monday, when people still have to find the right information. Claims come from the Data & Migrations page and its
// services (owners decide what stays; scans find blocked types, long paths and duplicates; pilot, waves, go/no-go and a
// rollback plan; one switch-over; the helpdesk trained first; the insurer's transpiled site in two weeks; the Azure move
// in two weeks against six; 3 TB; 125+ sites in 14 months; the ten sources migrated). No big-firm chapter (homepage
// only), no slam word twice.
//
// Cut to "Funk Rhythm" by AtlasAudio (Pixabay), sixteenth-note funk that keeps moving.
// Beat map (wiki/soundtrack-library/profiles/pixabay-593046.json): 100 BPM (0.6 s a beat), first downbeat 0.105 s,
// sixteenth feel; a stop on 1, a pickup on 2-3, the groove from 4 (phrases on 4, 20, 36, 52 ...); accents every four
// beats plus 32-36, 40-44 and 64-66; a near-silent breakdown 68-95 (stops through 79, then 81, 83, 84, 86, 88, 90);
// back on 96; the song ends on 165. 168 beats = 1:41.
// Pace in seconds: a panel about every 1.5 s = 2.5 beats; pages of 8-16 beats.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track, tracklist } from './tracklist';

type R = [number, number, number, number];
const services: [string, string][] = [
  ['Migration Planning.', 'migration-planning'],
  ['M365 Migrations.', 'm365-migrations'],
  ['Azure Migrations.', 'azure-migrations'],
];
// Each service cell links to its page (Matt, 2026-09-28): the path is the tracklist's for the cell's name.
const pageOf = (name: string) => {
  const t = tracklist.find((x) => `${x.title}.` === name);
  if (!t) throw new Error(`No page for the service cell "${name}" in src/data/beat-comics/tracklist.ts`);
  return t.path;
};
// The sources on the page's Sources Migrated list (src/data/migration-sources.ts), shortened to fit a cell.
const sources = ['FILE SHARES.', 'SHAREPOINT SERVER.', 'TENANTS.', 'PST.', 'ACONEX.', 'STELLENT.', 'GOOGLE DRIVE.', 'DROPBOX.', 'EVERNOTE.', 'QUIP.'];

const tr = track('/data-migrations/');

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's: the track ticker inside the main box. A stop on 1, the groove on 4.
  // A landing page's cover (Matt, 2026-09-28): the section name scrolls as an 8-bit marquee beside the MTW mark in the
  // main box, over the CD ticker, and TRACK nn. sits in the bottom-left box. Both come from the tracklist.
  { b: 0, l: 12, freeze: [[1, 2]], panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `${tr.title.toUpperCase()}.`, scroll: true, ticker: true, cap: 'Previously: the classics came back.', cap2: 'Now: everything moves.', at2: 5 },
    { at: 4, r: [0, 0.74, 0.62, 0.26], pix: `TRACK ${tr.no}.`, small: true },
    { at: 6, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  { b: 12, l: 8, title: 'The old system.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'OLDER THAN THE WEB.', cap: 'Every company has one.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'THE MANUAL.', cap: 'Somewhere. Probably.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'STILL ON.', cap: 'Nobody dared switch it off.' },
  ], sfx: [{ at: 4, w: 'CREAK!', x: 0.26, y: 0.88, r: -6 }] },
  { b: 20, l: 8, title: 'The deadline.', panels: [
    { at: 0.5, r: [0, 0, 1, 0.5], pix: 'DATE SET.', cap: 'A retirement, a merger or a contract sets it.' },
    { at: 3, r: [0, 0.5, 0.5, 0.5], img: card('m365-migrations'), cap: 'Everything has to move.' },
    { at: 5, r: [0.5, 0.5, 0.5, 0.5], pix: 'WHAT MOVES?', cap: 'Nobody is sure what is in there.' },
  ], sfx: [{ at: 4, w: 'TICK TOCK!', sub: 'The date is not moving.', x: 0.76, y: 0.12, r: 6 }] },
  { b: 28, l: 8, title: 'The inventory.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'SCAN.', cap: 'Blocked file types, invalid characters, paths too long.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'DUPLICATES.', cap: 'Found by checksum and date.' },
    { at: 5, r: [0, 0.5, 1, 0.5], pix: 'UNTOUCHED FOR YEARS.', cap: 'Some of it can stay behind.' },
  ], sfx: [{ at: 4, w: 'BEEP!', x: 0.26, y: 0.9, r: -5 }, { at: 6, w: 'FOUND IT!', x: 0.76, y: 0.12, r: 6 }] },
  { b: 36, l: 8, panels: [
    { at: 0, r: [0, 0, 0.5, 1], pix: 'WHO DECIDES?', cap: 'Not IT.' },
    { at: 2.5, r: [0.5, 0, 0.5, 1], pix: 'THE OWNERS.', cap: 'The people who own the content decide what stays.' },
  ], sfx: [{ at: 4, w: 'NOT IT!', x: 0.26, y: 0.88, r: -6 }, { at: 6, w: 'OVERRULED.', x: 0.76, y: 0.12, r: 5 }] },
  { b: 44, l: 16, title: 'The plan.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'MAPPED.', cap: 'Identities, metadata and permissions, tested before cutover.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'PILOT.', cap: 'A small group goes first.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'WAVES.', cap: 'Then the rest, copied in the background.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'GO / NO-GO.', cap: 'Criteria and a rollback plan, agreed first.' },
  ], sfx: [{ at: 12, w: 'CHECKLIST!', sub: 'Signed before anything moves.', x: 0.5, y: 0.5, r: -4 }] },
  { b: 60, l: 8, title: 'Friday.', panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'CUTOVER WEEKEND.', cap: 'Friday, 6 PM.', cap2: 'Pizza: ordered.', at2: 3 },
  ], sfx: [{ at: 4, w: 'HERE WE GO!', x: 0.26, y: 0.86, r: -6 }, { at: 6, w: 'SWITCH!', x: 0.76, y: 0.14, r: 6 }] },
  // The breakdown: the only serious chapter. The motion holds on the stops.
  { b: 68, l: 12, title: 'The switch.', ember: 1.8, freeze: [[0, 12]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: card('migration-planning'), cap: 'Everyone moves at one switch-over.' },
    { at: 4.5, r: [0.46, 0, 0.54, 0.5], pix: 'ONE COPY.', cap: 'So nobody keeps editing the old one.' },
    { at: 8.5, r: [0.46, 0.5, 0.54, 0.5], pix: 'MONDAY.', cap: 'People still need to find the right information.' },
  ] },
  { b: 80, l: 16, ember: 1.6, freeze: [[1, 2], [3, 5], [6, 7], [8, 9], [10, 11]], panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'THE HELPDESK.', cap: 'Trained before the switch, not after.' },
    { at: 6, r: [0.5, 0, 0.5, 1], pix: 'THE LEADERS.', cap: 'Seen backing it. That matters most.' },
  ] },
  // Back on 96.
  { b: 96, l: 12, title: 'Monday.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], pix: 'IT ARRIVED.', cap: 'Checks show what arrived.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'NEEDS ATTENTION.', cap: 'And what needs a second look.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], img: card('migration-planning'), cap: 'Tests and Power BI dashboards. Everyone could see progress.' },
  ], sfx: [{ at: 2, w: 'LANDED!', x: 0.26, y: 0.88, r: -6 }, { at: 8, w: 'ALL GREEN.', x: 0.76, y: 0.12, r: 5 }] },
  { b: 108, l: 16, title: 'Receipts.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: '2 WEEKS.', cap: "A national insurer's website, converted by a purpose-built transpiler." },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: '6 WEEKS?', cap: 'An Azure subscription move, estimated at six.', cap2: 'Done in two.', at2: 12.8 },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: '3 TB.', cap: 'A file share, into SharePoint Online.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: '125+', cap: 'Collaboration sites in 14 months, for foundations.' },
  ], sfx: [{ at: 12, w: 'SPEEDRUN!', sub: 'Six became two.', x: 0.75, y: 0.5, r: -7 }] },
  // Every source on the page: a header row, then an exact 5 x 2 grid of fifths.
  { b: 124, l: 12, title: 'Been there.', panels: [
    { at: 0.5, r: [0, 0, 1, 0.3], pix: 'PROBABLY DONE.', small: true, cap: 'The system you are leaving has probably been done.' },
    ...sources.map((s, i) => ({ at: 2 + i * 0.5, r: [(i % 5) * 0.2, 0.3 + Math.floor(i / 5) * 0.35, 0.2, 0.35] as R, rp: [(i % 2) * 0.5, 0.3 + Math.floor(i / 2) * 0.14, 0.5, 0.14] as R, pix: s, small: true })),
  ], sfx: [{ at: 8, w: 'MOVED THAT.', sub: 'Ten sources.', x: 0.5, y: 0.12, r: 5 }] },
  // The offer: an exact 2 x 2 grid of halves.
  { b: 136, l: 12, title: 'The line-up.', ground: 'teal', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'THREE WAYS IN.' },
    ...services.map(([name, img], i) => {
      const k = i + 1;
      return { at: 2.5 + i * 1.5, r: [(k % 2) * 0.5, Math.floor(k / 2) * 0.5, 0.5, 0.5] as R, img: card(img), name, href: pageOf(name) };
    }),
  ], sfx: [{ at: 8, w: 'PICK ONE.', x: 0.5, y: 0.5, r: -4 }] },
  { b: 148, l: 8, title: 'Your turn.', panels: [
    // Each box links where its question leads (Matt, 2026-09-28: "link those to something on the site").
    { at: 0.5, r: [0, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/data-migrations/migration-planning/', cap: 'A system to retire?' },
    { at: 1.5, r: [0.25, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/data-migrations/m365-migrations/', cap: 'A merger?' },
    { at: 2.5, r: [0.5, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/contact/?service=migration-planning', cap: 'A contract deadline?' },
    { at: 3.5, r: [0.75, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/contact/?service=migration-planning&type=call', cap: 'An unusual source system?' },
  ], sfx: [{ at: 4, w: 'YOUR MOVE.', x: 0.5, y: 0.86, r: -4 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds.
  { b: 156, l: 12, close: true, panels: [] },
];

const art = findSourceImage('service-hero', 'data-migrations-flow');
export const dataMigrationsStory: BeatComicStory = {
  bpm: 100,
  beats: 168,
  close: 156,
  track: track('/data-migrations/'),
  music: { src: '/audio/pixabay-593046-funk-rhythm.mp3', offset: 0.105, credit: 'Music: Funk Rhythm by AtlasAudio', source: 'https://pixabay.com/music/funk-funk-rhythm-593046/' },
  closeScene: { lines: ['Data &', 'Migrations.'], pixelate: 5, lede: 'People still need to find the right information after a move. Matt plans ownership, permissions, metadata, links and cutover alongside the transfer itself, with checks that show what arrived and what needs attention.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};
