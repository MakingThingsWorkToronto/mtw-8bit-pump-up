// Azure Migrations Beat Comic, the mixtape's Track 18 (Matt, 2026-09-28: "Do the same for Data & Migration. this is
// baller."). The big move of a whole application, told calmly, as a blockbuster trailer that refuses to explode: one
// application runs the business and has to move to Azure; the cast it cannot live without; where it is moving from;
// the twist (it has to keep working after); the prep; the sidekick (AI helps, a person decides each release); the box
// office (one subscription move, told with its own fine print); then (the only serious chapter, on the song's one quiet
// stretch) recovery limits agreed and tested before cutover; the premiere; the sequel. Claims come from the Azure
// Migrations page (its database, overnight jobs and the systems that call it; on premises, tenant to tenant, between
// subscriptions, AWS to Azure; a merger changes who controls access; a dependency map, a path for each workload, a
// landing zone, access reviewed; AI helps organize discovery, estimate, package and validate the work, a person decides
// each release; the Azure subscription move in two weeks against a six-week estimate, "one project against its own
// estimate, not a rate for every move"; data loss and downtime limits choose and test the recovery approach before
// cutover; connectivity and recovery planned together; tested in Azure with access reviewed; a handover; the decisions
// written down; who operates the shared platform and who owns each application). No big-firm chapter (homepage only),
// no slam word twice.
//
// Cut to "Dramatic Rock" by Playsound (Pixabay): a trailer-sized rock build for a move told as a blockbuster.
// Beat map (wiki/soundtrack-library/profiles/pixabay-558083.json), read at full time: 108 BPM (0.556 s a beat), first
// downbeat 0.43 s, straight feel; a sparse intro 0-31 (hits on 0-2 and 9-10 of each 16, the build from 27); a steady,
// slowly rising groove 32-127 (louder beats 44, 54, 59, 75, 78, 83, 93, 103, 110, 115, 123); the song's only quiet
// stretch 130-134, back on 135 (no dead stops in the profile); loud 135-201 with accents 139-200; the song ends on 203
// (113.42 s). 204 beats would outrun the file, so the story is 202 beats (ends 112.65 s, 0.77 s clear).
// Pace in seconds: a panel about every 1.7 s = 3 beats; 16-beat pages (8.9 s) on the phrases, 10 for the close.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

type R = [number, number, number, number];
const tr = track('/data-migrations/azure-migrations/');
const sidekick = ['DISCOVER.', 'ESTIMATE.', 'PACKAGE.', 'VALIDATE.'];

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's: the mark and TRACK 18. with the CD ticker inside the main box. Hits on 0-2 and 9-10.
  { b: 0, l: 16, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Previously: the files moved.', cap2: 'Now: the whole application.', at2: 9 },
    { at: 4, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 7, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // The intro's second phrase: the trailer voice.
  { b: 16, l: 16, title: 'Coming soon.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'IN A WORLD...', cap: 'One application runs the business.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], pix: 'ONE MOVE.', cap: 'Into Azure, by a date.' },
    { at: 7, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'NO EXPLOSIONS.', cap: 'Rated calm. On purpose.' },
    { at: 10, r: [2 / 3, 0.5, 1 / 3, 0.5], chat: true, cap: 'Can it be down for an hour?' },
  ], sfx: [{ at: 9, w: 'DUN DUN DUN!', x: 0.5, y: 0.12, r: -5 }] },
  // The groove: what keeps the application running.
  { b: 32, l: 16, title: 'The cast.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], pix: 'THE DATABASE.', cap: 'The one it cannot live without.' },
    { at: 4, r: [0.25, 0, 0.25, 1], pix: 'OVERNIGHT JOBS.', cap: 'They run while everyone sleeps.' },
    { at: 7, r: [0.5, 0, 0.25, 1], pix: 'THE CALLERS.', cap: 'Other systems call it all day.' },
    { at: 10, r: [0.75, 0, 0.25, 1], pix: 'WHO GETS IN.', cap: 'The people and apps that need access.' },
  ], sfx: [{ at: 12, w: 'STAR-STUDDED!', sub: 'Every one a dependency.', x: 0.5, y: 0.12, r: 5 }] },
  { b: 48, l: 16, title: 'Where from.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'ON-PREMISES.', cap: 'Out of the server room, into Azure.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'TENANT TO TENANT.', cap: 'A merger changes who controls access.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'SUBSCRIPTIONS.', cap: 'Costs separated, ownership reorganized.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'AWS.', cap: 'Each workload assessed before it gets a destination.' },
  ], sfx: [{ at: 11, w: 'ROAD TRIP!', x: 0.5, y: 0.5, r: -6 }] },
  { b: 64, l: 16, title: 'The plot.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], img: card('azure-migrations'), cap: 'Moving it is one thing.' },
    { at: 4, r: [0.5, 0, 0.5, 1 / 3], pix: 'THE TWIST.', cap: 'It has to keep working after.' },
    { at: 7, r: [0.5, 1 / 3, 0.5, 1 / 3], pix: 'WHAT CANNOT BREAK?', cap: 'Everything, apparently.' },
    { at: 10, r: [0.5, 2 / 3, 0.5, 1 / 3], pix: 'ACCESS.', cap: 'People and apps still have to sign in.' },
  ], sfx: [{ at: 11, w: 'GULP!', x: 0.25, y: 0.12, r: -6 }, { at: 14, w: 'DRAMA!', sub: 'Cue the strings.', x: 0.25, y: 0.88, r: 5 }] },
  // The calm answer.
  { b: 80, l: 16, title: 'The prep.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'DEPENDENCY MAP.', cap: 'What each application needs to keep working.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'A PATH EACH.', cap: 'Move it as it is, or modernize it.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'LANDING ZONE.', cap: 'Identity, network, security and management, first.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'ACCESS REVIEWED.', cap: 'Before the move is scheduled.' },
  ], sfx: [{ at: 3, w: 'CALM.', sub: 'Deep breaths.', x: 0.25, y: 0.88, r: -4 }, { at: 13, w: 'PREPPED!', x: 0.75, y: 0.12, r: 6 }] },
  // How AI helps a migration, at the page's own level: it helps with the work; a person decides each release.
  { b: 96, l: 16, title: 'The sidekick.', panels: [
    { at: 1, r: [0, 0, 1, 0.3], pix: 'THE SIDEKICK: AI.', cap: 'It helps organize the work.' },
    ...sidekick.map((w, i) => ({ at: 3.5 + i * 1.5, r: [i * 0.25, 0.3, 0.25, 0.4] as R, rp: [(i % 2) * 0.5, 0.3 + Math.floor(i / 2) * 0.2, 0.5, 0.2] as R, pix: w })),
    { at: 11, r: [0, 0.7, 1, 0.3], pix: 'A HUMAN DECIDES.', cap: 'Every release. Not the sidekick.' },
  ], sfx: [{ at: 7, w: 'BEEP BOOP!', sub: 'Validated.', x: 0.5, y: 0.12, r: -5 }, { at: 14, w: 'GREENLIT.', sub: 'By a person.', x: 0.8, y: 0.86, r: 5 }] },
  // The one attested number, told with the page's own fine print.
  { b: 112, l: 16, title: 'Box office.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: '6 WEEKS.', cap: 'The estimate for one Azure subscription move.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: '2 WEEKS.', cap: 'Matt delivered it in two.' },
    { at: 8, r: [0.5, 0.5, 0.5, 0.5], pix: 'NOT A RATE.', cap: 'One project against its own estimate, not every move.' },
  ], sfx: [{ at: 11, w: 'FINE PRINT!', sub: 'Read it.', x: 0.25, y: 0.88, r: -5 }] },
  // The song's only quiet stretch (130-134): the only serious chapter, no slams.
  { b: 128, l: 16, title: 'The quiet part.', ember: 1.8, panels: [
    { at: 1, r: [0, 0, 0.46, 1], chart: true, cap: 'Agree how much data loss and downtime the business can tolerate.' },
    { at: 4.5, r: [0.46, 0, 0.54, 1 / 3], pix: 'THE APPROACH.', cap: 'Those limits choose backup and recovery.' },
    { at: 8, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'CONNECTIVITY.', cap: 'Planned together with recovery.' },
    { at: 11.5, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'TESTED FIRST.', cap: 'Before cutover, not after.' },
  ] },
  // Loud from 135: the move itself.
  { b: 144, l: 16, title: 'Premiere.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'CUTOVER.', cap: 'The working system moves.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'TESTED IN AZURE.', cap: 'With access reviewed.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'SIGNED IN.', cap: 'People and applications get back in.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'STILL WORKING.', cap: 'Which was the whole plot.' },
  ], sfx: [
    { at: 3, w: 'ROLLING!', x: 0.25, y: 0.88, r: -5 },
    { at: 8, w: 'ACTION!', x: 0.25, y: 0.12, r: 6 },
    { at: 14, w: 'CUT! PRINT!', sub: "That's the take.", x: 0.75, y: 0.88, r: -4 },
  ] },
  { b: 160, l: 16, title: 'The sequel.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'HANDOVER.', cap: 'Your team can run it.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'WRITTEN DOWN.', cap: 'The decisions behind it, too.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'WHO RUNS WHAT.', cap: 'An operator for the platform, an owner for each application.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'THE NEXT ONE.', cap: 'Lands in the same landing zone.' },
  ], sfx: [{ at: 4, w: 'SEQUEL!', x: 0.75, y: 0.12, r: 5 }, { at: 10, w: 'FRANCHISE!', sub: 'Same plan, next app.', x: 0.25, y: 0.88, r: -6 }] },
  { b: 176, l: 16, title: 'Your turn.', panels: [
    // Each box links where its question leads (Matt, 2026-09-28: "link those to something on the site").
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/contact/?service=azure-migrations', cap: 'Leaving AWS?' },
    { at: 4, r: [0.25, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/data-migrations/m365-migrations/', cap: 'A merger changing tenants?' },
    { at: 7, r: [0.5, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/traditional-systems/roadmaps-cloud-planning/', cap: 'Ready for a landing zone?' },
    { at: 10, r: [0.75, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/contact/?service=azure-migrations&type=call', cap: 'Moving by a deadline?' },
  ], sfx: [{ at: 11, w: 'YOUR SCENE.', x: 0.5, y: 0.88, r: -4 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds.
  // Ten beats, the longest close the song allows: it resolves on beat 4 (5 in a 12-beat close, 3 in an 8).
  { b: 192, l: 10, close: true, panels: [] },
];

// The hero image as the page resolves it: the Azure Migrations image, or the Data & Migrations flow figure.
const art = (() => { try { return findSourceImage('service-hero', 'azure-migrations'); } catch { return findSourceImage('service-hero', 'data-migrations-flow'); } })();
export const azureMigrationsStory: BeatComicStory = {
  bpm: 108,
  beats: 202,
  close: 192,
  track: tr,
  music: { src: '/audio/pixabay-558083-dramatic-rock.mp3', offset: 0.43, credit: 'Music: Dramatic Rock by Playsound', source: 'https://pixabay.com/music/rock-dramatic-rock-558083/' },
  closeScene: { lines: ['Azure', 'Migrations.'], pixelate: 4, lede: 'Your application needs to keep working after the move. Plan its dependencies, identity and access together, whether you are moving into Azure, changing tenants, reorganizing subscriptions or leaving AWS.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};
