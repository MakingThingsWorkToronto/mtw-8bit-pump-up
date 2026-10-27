// Roadmaps & Cloud Planning Beat Comic, the mixtape's Track 10 (Matt, 2026-09-28: "these are all insane. please do
// traditional systems now"). A road trip where the map is the product: the ask arrives (move it all, turn on Copilot),
// nobody has a map, then Matt draws one from the decision in front of you and the page's roadmap is the route: four
// ways in, the move, the Copilot test drive (proceed, fix or wait), the valuables (Purview), packing (data migration),
// fuel (resource planning), driver's ed (training) and (the only serious chapter, on the song's breakdown and its dead
// stops) who runs it after: owners, exceptions and the handover. Claims come from the Roadmaps & Cloud Planning page
// (its lede, Four Ways In, cloud modernization, Copilot readiness, Purview audit, data migration, resource planning,
// user training, client handover, what you receive, its starting points). No figures, no client names, no prices, no
// big-firm chapter (homepage only), no slam word twice; one nod to Track 08, on the cover.
//
// Cut to "Pump It Up" by Toucanmusic (Pixabay): bright, driving four-on-the-floor for the road trip.
// Beat map (wiki/soundtrack-library/profiles/pixabay-410806.json): 126.67 BPM (0.474 s a beat), first downbeat 0.43 s,
// read at full time (the 16-beat phrases and their dips on the 2nd, 7th and 12th beats sit on this grid; half time
// would put 32-beat pages at 15 s); a soft start 0-2, the groove from 3 in phrases of 16 (accents 4, 23, 47, 66, 78,
// 87, 130, 132, 142, 152); the breakdown 176-191 with dead stops on 177-178, 183, 188-189 and 193, back on 196; the
// groove again to 303 (accents 206, 215, 218, 258 ...); an outro stop on 305; the song ends on 326.
// The story stops before the song does: 244 beats (0.43 + 244 x 0.4737 = 116.0 s, against a 155.5 s file), then holds
// on the close while the track loops on.
// Pace in seconds: a panel about every 1.4 s = 3 beats; 16-beat pages (7.6 s) on the phrases, 8 before the close.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

type R = [number, number, number, number];
const tr = track('/traditional-systems/roadmaps-cloud-planning/');
// The page's Four Ways In, one word each for a quarter cell.
const ways: [string, string][] = [
  ['MOVE.', 'Move to the cloud.'],
  ['BUILD.', 'Build on the cloud you have.'],
  ['CONNECT.', 'Connect custom agents.'],
  ['PROTOTYPE.', 'Prototype a new experience.'],
];

const pages: BeatComicStory['pages'] = [
  // The cover, a service page's (as Track 06's): the mark and TRACK 10. with the CD ticker inside the main box.
  { b: 0, l: 16, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Previously: the classics answered back.', cap2: 'Now: the road trip.', at2: 8 },
    { at: 4, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 7, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ], sfx: [{ at: 4, w: 'VROOM!', sub: 'Map not included.', x: 0.8, y: 0.12, r: -6 }] },
  // The ask: the page's lede, as three requests at once.
  { b: 16, l: 16, title: 'The ask.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'MOVE IT ALL.', cap: 'Off the file server. Soon.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'TURN ON COPILOT.', cap: 'Also soon.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'THE TRIAL.', cap: 'An early AI trial. Still a trial.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], chat: true, cap: 'Can we just switch it on?' },
  ], sfx: [{ at: 7, w: 'FLOOR IT!', sub: 'By Friday.', x: 0.76, y: 0.12, r: 6 }] },
  { b: 32, l: 16, title: 'No map.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'FILE SERVER.', cap: 'Apps, data and people depend on it.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'OWNER?', cap: 'Everyone looks at IT.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'WHICH WAY?', cap: 'Nobody drew a map.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'ARE WE THERE YET?', cap: 'Nobody knows where "there" is.' },
  ], sfx: [{ at: 15, w: 'U-TURN!', sub: 'Recalculating.', x: 0.5, y: 0.88, r: -5 }] },
  // Matt arrives with the map: the page's lede, the decision first.
  { b: 48, l: 16, title: 'The navigator.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], img: card('roadmaps-cloud-planning'), cap: 'Then Matt unfolds a map.' },
    { at: 4, r: [0.5, 0, 0.5, 1 / 3], pix: 'THE DECISION.', cap: 'Start with the one in front of you.' },
    { at: 7, r: [0.5, 1 / 3, 0.5, 1 / 3], pix: 'WHAT IT NEEDS.', cap: 'Data, access, people and running costs.' },
    { at: 10, r: [0.5, 2 / 3, 0.5, 1 / 3], pix: 'YOUR ROUTE.', cap: 'In an order that fits your systems.' },
  ] },
  // Four Ways In: an exact 2 x 2 grid of halves.
  { b: 64, l: 16, title: 'Four ways in.', panels: [
    ...ways.map(([w, cap], i) => ({ at: 1 + i * 3, r: [(i % 2) * 0.5, Math.floor(i / 2) * 0.5, 0.5, 0.5] as R, pix: w, cap })),
  ], sfx: [
    { at: 2, w: 'FORK!', sub: 'Four roads.', x: 0.74, y: 0.88, r: -6 },
    { at: 14, w: 'PICK A LANE.', sub: 'Each starts with a different decision.', x: 0.5, y: 0.12, r: 5 },
  ] },
  // Cloud modernization.
  { b: 80, l: 16, title: 'The move.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], img: card('azure-migrations'), cap: 'Agree the destination and the access model.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], img: card('roles-access-control'), cap: 'Who can open what when it lands.' },
    { at: 7, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'SMALL STEPS.', cap: 'Release in manageable steps.' },
    { at: 10, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'CHECKS.', cap: 'Between every release.' },
  ], sfx: [{ at: 7, w: 'CHECKPOINT!', x: 0.5, y: 0.12, r: -5 }] },
  // Copilot readiness: the pilot ends at a traffic light.
  { b: 96, l: 16, title: 'Test drive.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'ONE TASK.', cap: 'Pilot Copilot on one useful piece of work.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'GAPS.', cap: 'The pilot finds gaps in content, access and ownership.' },
    { at: 7.5, r: [0, 0.5, 1 / 3, 0.5], pix: 'PROCEED.', cap: 'Green.' },
    { at: 9, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'FIX.', cap: 'Amber.' },
    { at: 10.5, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'WAIT.', cap: 'Red.', cap2: 'Every pilot ends in a decision.', at2: 12.5 },
  ] },
  // Purview audit and configuration.
  { b: 112, l: 16, title: 'Valuables.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], img: card('information-governance'), cap: 'Start with what the business must protect.' },
    { at: 4, r: [1 / 3, 0, 1 / 3, 1], pix: 'LABELS.', cap: 'Review the labels and policies you already have.' },
    { at: 7, r: [2 / 3, 0, 1 / 3, 0.5], pix: 'TESTED.', cap: 'On a pilot first.' },
    { at: 10, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'NAMED.', cap: 'The people who maintain the controls.' },
  ], sfx: [{ at: 14, w: 'LOCKED IN.', x: 0.5, y: 0.12, r: 5 }] },
  // Data migration.
  { b: 128, l: 16, title: 'Packing.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], img: card('m365-migrations'), cap: 'Decide what belongs in the new system.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'OWNERS.', cap: 'And who owns it.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'MAPPED EARLY.', cap: 'Content, identities and access.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'A SAMPLE.', cap: 'Tested on a representative sample.', cap2: 'People and AI both depend on what arrives.', at2: 12.5 },
  ], sfx: [
    { at: 2, w: 'PACKED!', x: 0.74, y: 0.88, r: -6 },
    { at: 4, w: 'TOSSED!', sub: 'Not everything makes the trip.', x: 0.26, y: 0.88, r: 6 },
    { at: 14, w: 'UNPACKED!', x: 0.5, y: 0.12, r: -4 },
  ] },
  // Resource planning.
  { b: 144, l: 16, title: 'Fuel.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'WHO DELIVERS.', cap: 'People to do the work.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], chart: true, cap: 'Cloud capacity, licensing and model use.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'AGENTS TOO.', cap: 'Development, model use and human review.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'RUNNING COSTS.', cap: 'Planned before the trip, not after.' },
  ], sfx: [{ at: 8, w: 'FILL IT UP!', sub: 'Capacity and costs.', x: 0.74, y: 0.12, r: 5 }] },
  // User training.
  { b: 160, l: 16, title: "Driver's ed.", panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], img: card('team-modernization'), cap: 'Prepare people for the tasks that change.' },
    { at: 4, r: [1 / 3, 0, 1 / 3, 1], pix: 'THEIR OWN ROLE.', cap: 'Examples from their own work.' },
    { at: 7, r: [2 / 3, 0, 1 / 3, 1], pix: 'IS IT USED?', cap: 'Agree how you will check.' },
  ], sfx: [{ at: 12, w: 'LICENSED!', sub: 'To drive.', x: 0.5, y: 0.88, r: -5 }] },
  // The breakdown and its dead stops: the only serious chapter, no slams.
  { b: 176, l: 16, title: 'After the trip.', ember: 1.8, freeze: [[1, 3], [7, 8], [12, 14]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: photo('starting-point-cloud-security'), cap: 'The trip ends. The work does not.' },
    { at: 4, r: [0.46, 0, 0.54, 1 / 3], pix: 'WHO RUNS IT.', cap: 'Plan for the people who run the work afterward.' },
    { at: 8, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'WHO DECIDES.', cap: 'Agree who decides the exceptions.' },
    { at: 11, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'THE HANDOVER.', cap: 'The plan, its decisions and the knowledge behind them pass to your team.' },
  ] },
  // The stop on 193, back on 196: client handover.
  { b: 192, l: 16, title: 'Your team drives.', freeze: [[1, 2]], panels: [
    { at: 2, r: [0, 0, 1, 0.5], pix: 'YOUR KEYS.', cap: 'Your team takes the plan forward.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'MATT RIDES ALONG.', cap: 'Alongside, where that helps.' },
    { at: 9, r: [0.5, 0.5, 0.5, 0.5], chat: true, cap: 'Are we there yet?', cap2: 'Check the map.', at2: 12 },
  ], sfx: [{ at: 14, w: 'HONK!', sub: 'Shotgun.', x: 0.3, y: 0.12, r: -6 }] },
  { b: 208, l: 16, title: 'Your turn.', panels: [
    // The page's own four starting points, one cinematic photo each; each box links where its question leads.
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/traditional-systems/roles-access-control/', cap: 'Not on the cloud yet?' },
    { at: 4, r: [0.25, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/contact/?service=roadmaps-cloud&type=call&starting-point=m365-no-ai', cap: 'On Microsoft 365, not using AI?' },
    { at: 7, r: [0.5, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/traditional-systems/information-governance-ai-readiness/', cap: "Tried Copilot, and it didn't stick?" },
    { at: 10, r: [0.75, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/contact/?service=roadmaps-cloud', cap: 'Ready for custom work?' },
  ], sfx: [
    { at: 7, w: 'BUCKLE UP!', x: 0.125, y: 0.12, r: -5 },
    { at: 10, w: 'YOUR CALL.', x: 0.375, y: 0.12, r: 5 },
  ] },
  { b: 224, l: 8, panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'NEXT DECISION.', cap: 'A plan your team can use to make the next decision.', cap2: 'Then the one after.', at2: 4 },
  ], sfx: [{ at: 6, w: 'ARRIVED.', x: 0.8, y: 0.12, r: -5 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds.
  { b: 232, l: 12, close: true, panels: [] },
];

// The hero image as the page resolves it (roadmaps-cloud-planning, the shield standing in if it is ever missing).
const art = (() => { try { return findSourceImage('service-hero', 'roadmaps-cloud-planning'); } catch { return findSourceImage('service-hero', 'traditional-systems-shield'); } })();
export const roadmapsCloudPlanningStory: BeatComicStory = {
  bpm: 126.67,
  beats: 244,
  close: 232,
  track: tr,
  music: { src: '/audio/pixabay-410806-pump-it-up.mp3', offset: 0.43, credit: 'Music: Pump It Up by Toucanmusic', source: 'https://pixabay.com/music/upbeat-pump-it-up-410806/' },
  closeScene: { lines: ['Roadmaps &', 'Cloud Planning.'], pixelate: 5, lede: 'You may be moving off a file server, preparing for Copilot or trying to turn an early AI trial into useful work. Start with the decision in front of you, then plan the data, access, people and running costs it depends on.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};
