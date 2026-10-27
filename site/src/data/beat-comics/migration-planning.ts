// Migration Planning Beat Comic, the mixtape's Track 16 (Matt, 2026-09-28: "Do the same for Data & Migration. this is
// baller."). The groove: the unglamorous plan that makes the move boring on the day. Someone asks to just move it all
// this weekend; the plan counts what you hold (files and versions, not size), decides what is worth moving and what
// stays behind, rehearses on your own content, sets the waves, the go/no-go and the access model before anything moves,
// and names what must work on day one; the cutover comes and nothing happens; then (the only serious chapter, on the
// song's dead stop) the move is proved. Claims come from the Migration Planning page (the inventory with business teams;
// file and version counts drive the timeline; checksums and dates; owners decide what stays, moves or is archived; a test
// run on your own content, no published speed, weekday throttling; pilot, waves, go/no-go and rollback; background
// passes and one switch-over; the helpdesk trained first, workshops and sponsorship, Prosci; reconciliation, exception
// owners, the insurer's automated tests and Power BI dashboards) and the Data & Migrations landing page (the date set by
// a retirement, merger or contract; what must work on the first day people return; the destination access model before
// permissions; links, deny permissions and flows). No big-firm chapter (homepage only), no slam word twice.
//
// Cut to "Funky Rock Groove" by -WATERMEL0N- (Pixabay): a four-square rock groove that never gets flashy.
// The library profile (wiki/soundtrack-library/profiles/pixabay-556625.json) reads 124.68 BPM, and its loudness does not
// repeat on whole bars at that tempo (its dips fall 21 beats apart). The onsets fix the true grid at 95.05 BPM (0.631 s a
// beat), first downbeat 0.045 s (kicks on 1, snares on 2 and 4; the 16-beat loudness rows repeat exactly), read at full
// time; this story is cut to that grid, proposed as the track's checked `grid` for the library.
// On that grid: a quiet intro 0-15 (accent 15); the groove 16-47 (accent 28); a build 48-63 (accents 56, 58, 60, 62);
// the chorus 64-95 (accents 72, 76, 84, 87, 90, 93); the groove 96-127 (accents 96, 100, 108, 124); loud 128-137 (accents
// 129, 131, 135), a stop on 138, back on 140; stops on 146 and 154 (accents 148, 156); a dead stop 169-175, a quiet rise
// 176-183, back on 184 (accents 184, 186, 188); the chorus 192-223; an outro from 224; the song ends on 245 (158.3 s).
// The story ends at 204 beats (128.8 s), well inside the song; the close holds while the music plays on.
// Pace in seconds: a panel about every 1.6 s = 2.5 beats; 16-beat pages (10.1 s) of four panels, as the homepage's.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

type R = [number, number, number, number];
const tr = track('/data-migrations/migration-planning/');
// A 2 x 2 grid of halves, a panel every 2.5 beats from `from`.
const quad = (from: number, step = 2.5) => [0, 1, 2, 3].map((i) => ({ at: from + i * step, r: [(i % 2) * 0.5, Math.floor(i / 2) * 0.5, 0.5, 0.5] as R }));

const pages: BeatComicStory['pages'] = [
  // The cover, as a service page's: the mark and TRACK 16. with the CD ticker inside the main box. The quiet intro.
  { b: 0, l: 16, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Previously: everything moves.', cap2: 'Now: nothing moves. Yet.', at2: 9 },
    { at: 4, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 7, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // The groove comes in: the request every migration starts with.
  { b: 16, l: 16, title: 'Just move it.', panels: [
    { ...quad(1, 3)[0], chat: true, cap: 'Can we just move it all this weekend?' },
    { ...quad(1, 3)[1], pix: 'ALL OF IT.', cap: 'Every file. Every version. The folder called OLD.' },
    { ...quad(1, 3)[2], pix: 'THE DATE.', cap: 'Set by a retirement, a merger or a contract. Not by you.' },
    { ...quad(1, 3)[3], pix: 'THE PLAN?', cap: 'Pending.' },
  ], sfx: [{ at: 12, w: 'WING IT!', sub: 'Copy and hope.', x: 0.25, y: 0.12, r: -6 }] },
  // What you hold: the number everyone quotes is not the one that sets the clock.
  { b: 32, l: 16, title: 'Count it.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], pix: 'TOTAL SIZE.', cap: 'The number everyone quotes.' },
    { at: 4, r: [0.25, 0, 0.25, 1], pix: 'FILE COUNT.', cap: 'The number that sets the timeline.' },
    { at: 7, r: [0.5, 0, 0.25, 1], pix: 'VERSIONS.', cap: 'How deep the history goes.' },
    { at: 10, r: [0.75, 0, 0.25, 1], pix: 'OWNERS.', cap: 'Named with the business teams, not only IT.' },
  ], sfx: [{ at: 15, w: 'RECOUNT!', sub: 'Files and versions, not size.', x: 0.25, y: 0.88, r: 5 }] },
  // The build: the verdicts stamp on its accents.
  { b: 48, l: 16, title: 'Worth moving?', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'THE SCAN.', cap: 'Checksums and dates find the duplicates and the forgotten.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], pix: 'MOVES.', cap: 'Still in use.' },
    { at: 6.5, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'ARCHIVED.', cap: 'Kept, not moved.' },
    { at: 9, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'LEFT BEHIND.', cap: 'Unopened for years. Nobody cried.' },
  ], sfx: [{ at: 10, w: 'STAMPED!', sub: 'The owners decide.', x: 0.25, y: 0.12, r: -5 }, { at: 14, w: 'DECLUTTERED!', x: 0.75, y: 0.12, r: 6 }] },
  // The chorus: the estimate comes from a rehearsal, not a brochure.
  { b: 64, l: 16, title: 'Rehearsal.', panels: [
    { ...quad(1)[0], pix: 'TEST RUN.', cap: 'On your own content.' },
    { ...quad(1)[1], pix: 'NO SPEED CHART.', cap: 'Microsoft publishes no speed to plan on.' },
    { ...quad(1)[2], pix: 'PILOT GROUP.', cap: 'It tests the speed and the messages to staff.' },
    { ...quad(1)[3], pix: 'WEEKDAYS: SLOW.', cap: 'SharePoint slows migration traffic in business hours.' },
  ], sfx: [{ at: 8, w: 'CLOCKED!', sub: 'The estimate to trust.', x: 0.25, y: 0.12, r: -5 }, { at: 12, w: 'THROTTLED!', x: 0.25, y: 0.88, r: 6 }] },
  { b: 80, l: 16, title: 'Waves.', panels: [
    { ...quad(1)[0], pix: 'WAVE 1.', count: { from: 1, step: 1, every: 3, to: 4, fmt: 'WAVE #.' }, cap: 'The rest, copied in the background.' },
    { ...quad(1)[1], pix: 'CRITERIA FIRST.', cap: 'Go/no-go, agreed before anything moves.' },
    { ...quad(1)[2], pix: 'ROLLBACK.', cap: 'The way back, planned before the way in.' },
    { ...quad(1)[3], pix: 'ACCESS MODEL.', cap: 'Agreed at the destination before permissions are mapped.' },
  ], sfx: [{ at: 4, w: "SURF'S UP!", sub: 'Wave after wave.', x: 0.25, y: 0.12, r: -6 }, { at: 13, w: 'NO SURPRISES.', x: 0.25, y: 0.88, r: 5 }] },
  // The groove again: what the plan has to protect.
  { b: 96, l: 16, title: 'Day one.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'WHAT MUST WORK?', cap: 'On the first day people come back to it.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], pix: 'LINKS.', cap: 'From a file share, links inside documents are not updated.' },
    { at: 7, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'PERMISSIONS.', cap: 'Advanced and deny permissions are removed.' },
    { at: 10, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'FLOWS.', cap: 'Between tenants, workflows and flows need rebuilding.' },
  ], sfx: [{ at: 4, w: 'FINE PRINT!', sub: 'Read before, not after.', x: 0.5, y: 0.12, r: -5 }, { at: 12, w: 'PLANNED FOR.', x: 0.5, y: 0.12, r: 5 }] },
  { b: 112, l: 16, title: 'People.', panels: [
    { ...quad(1)[0], pix: 'TOLD EARLY.', cap: 'Nobody hears about it on the day.' },
    { ...quad(1)[1], pix: 'WORKSHOPS.', cap: 'Business teams decide where their content lives.' },
    { ...quad(1)[2], img: card('team-modernization'), cap: 'Then training and support.' },
    { ...quad(1)[3], pix: 'THE SPONSOR.', cap: "Prosci's research: weak sponsorship is the top obstacle to change." },
  ], sfx: [{ at: 12, w: 'ON BOARD!', x: 0.25, y: 0.12, r: -5 }] },
  // Loud to the stop on 138, back on 140: the switch-over, and the running joke's one strong moment.
  { b: 128, l: 16, title: 'Cutover.', freeze: [[10, 11]], panels: [
    { ...quad(1)[0], pix: 'EARLY PASSES.', cap: 'Already copied, in the background.' },
    { ...quad(1)[1], pix: 'FINAL PASS.', cap: 'Mostly, the only part people feel.' },
    { ...quad(1)[2], pix: 'ONE SWITCH-OVER.', cap: 'Everyone at once, so nobody edits a duplicate.' },
    { ...quad(1)[3], pix: 'AND THEN...', cap: 'Brace for it.', cap2: 'Nothing happened.', at2: 12 },
  ], sfx: [{ at: 3, w: 'SYNCED!', x: 0.25, y: 0.12, r: -5 }, { at: 7, w: 'FLIPPED!', x: 0.75, y: 0.12, r: 6 }, { at: 12, w: 'CRICKETS.', x: 0.25, y: 0.88, r: -4 }] },
  // The stops on 146 and 154 freeze the quiet morning.
  { b: 144, l: 16, title: 'Day two.', freeze: [[2, 3], [10, 11]], panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'PHONES: QUIET.', cap: 'The helpdesk was trained before the switch.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'FILES: FOUND.', cap: 'Right where the workshops put them.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'OLD DRIVE: IDLE.', cap: 'Nobody is editing a duplicate.' },
    { at: 11, r: [0.5, 0.5, 0.5, 0.5], pix: 'BORING.', cap: 'The best review a cutover gets.' },
  ], sfx: [{ at: 4, w: 'RING RING?', sub: 'Nope.', x: 0.25, y: 0.88, r: 5 }, { at: 12, w: 'YAWN!', x: 0.25, y: 0.12, r: -6 }] },
  // The dead stop 169-175: the only serious chapter, no slams. The move is proved, not assumed.
  { b: 160, l: 16, title: 'Prove it.', ember: 1.8, freeze: [[9, 16]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: card('m365-migrations'), cap: 'The inventory, reconciled against what arrived.' },
    { at: 4, r: [0.46, 0, 0.54, 1 / 3], pix: 'EVERY EXCEPTION.', cap: 'Has an owner.' },
    { at: 7, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'TESTS.', cap: "A national insurer's move off a legacy document system: automated tests." },
    { at: 11, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'DASHBOARDS.', cap: 'Power BI, so everyone could see progress and test coverage.' },
  ] },
  // The quiet rise, back on 184. Each box links where its question leads.
  { b: 176, l: 16, title: 'Your turn.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/contact/?service=migration-planning', cap: 'A deadline and no plan yet?' },
    { at: 4, r: [0.25, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/traditional-systems/roles-access-control/', cap: 'Who gets access at the destination?' },
    { at: 7, r: [0.5, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/data-migrations/m365-migrations/', cap: 'Moving into Microsoft 365?' },
    { at: 10, r: [0.75, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/contact/?service=migration-planning&type=call', cap: 'A source system nobody recognizes?' },
  ], sfx: [{ at: 8, w: 'OVER TO YOU!', x: 0.375, y: 0.12, r: -4 }, { at: 12, w: 'BOOK IT!', sub: 'Bring the deadline.', x: 0.375, y: 0.88, r: 5 }] },
  // On the chorus: the page's own hero. Its heading lands in 8-bit type and resolves into the modern heading, then holds.
  { b: 192, l: 12, close: true, panels: [] },
];

// The hero image as the page resolves it: the Migration Planning hero, or the Data & Migrations flow standing in.
const art = (() => { try { return findSourceImage('service-hero', 'migration-planning'); } catch { return findSourceImage('service-hero', 'data-migrations-flow'); } })();
export const migrationPlanningStory: BeatComicStory = {
  // The checked grid from the onsets (see above), not the profile's 124.68.
  bpm: 95.05,
  // The song runs 245 beats; the story ends at 204 (128.8 s) and holds on the close while the music plays on.
  beats: 204,
  close: 192,
  track: tr,
  music: { src: '/audio/pixabay-556625-funky-rock-groove.mp3', offset: 0.045, credit: 'Music: Funky Rock Groove by -WATERMEL0N-', source: 'https://pixabay.com/music/rock-funky-rock-groove-556625/' },
  closeScene: { lines: ['Migration', 'Planning.'], pixelate: 5, lede: 'A migration is decided before anything moves: what you hold, what is worth moving, how it runs and how you will prove it arrived. Matt plans Microsoft 365 and Azure migrations with timelines and costs your leaders can follow.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};
