// Power Platform & Logic Apps Beat Comic, the mixtape's Track 13 (Matt, 2026-09-28: "these are all insane. please do
// traditional systems now"). The drift: a flow that fires, stalls and fires again, until someone owns it. Routine work
// lives in email, spreadsheets and memory; Power Apps, Power Automate and Logic Apps automate it; the flow runs as the
// person who built it, drifts with live edits and no owner, and the team goes back to email; then the route is chosen,
// environments are kept separate and (the only serious chapter, on the song's breakdown) every flow has an identity, a
// reach and an owner. Claims come from the Power Platform & Logic Apps page (choose the route; connections and identity;
// apps on Dataverse; Logic Apps for integration; development, test and production; a limited group before everyone; an
// owner for every app and flow; the utility's field training: 14 Power Apps, 70+ flows, 30+ Power BI reports, 6,000
// users, 95% completion among 2,000 field staff) and the homepage ("No per-user licensing", "A President's Award").
// No big-firm chapter (homepage only), no slam word twice.
//
// Cut to "Drift Phonk 01" by vjgalaxy (Pixabay): drift phonk, all stop-start, for the flow that stalls and fires again.
// Beat map (wiki/soundtrack-library/profiles/pixabay-436825.json): 129.33 BPM (0.464 s a beat), first downbeat 0.315 s,
// triplet feel over a full-time grid (not half time: the loud rows accent beats 4 and 15 of each 16); a quiet stuttering
// intro 0-19 (stops 1-7, 9-10, 12, 15-19), the drop on 20; loud 20-57; a dead stop 58-62, back on 63; loud 63-94; a dead
// stop 96-103, rising 104-105, loud from 106; loud to 148; the breakdown 149-169 (stops 149-151, 153-155, 159-161,
// 164-169), back on 170; a stop 189-190, back on 191; a dip 223 and a stop 224-231, loud from 234; accents 260, 271,
// 273; the song ends on 277 (129.98 s). The story ends at 276 beats (128.4 s), inside the song file.
// Pace in seconds: a panel about every 1.4 s = 3 beats; 16-beat pages (7.4 s) on the phrases.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

type R = [number, number, number, number];
const tr = track('/traditional-systems/power-platform-logic-apps/');
const lap = ['MAPPED.', 'BUILT.', 'TESTED.', 'OWNED.'];

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's: the mark and TRACK 13. with the CD ticker inside the main box. The intro stutters.
  { b: 0, l: 16, freeze: [[9, 11], [12, 13]], panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'This one runs on autopilot.', cap2: 'Mostly.', at2: 9 },
    { at: 4, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 7, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // The stop before the drop: one gag.
  { b: 16, l: 4, freeze: [[0, 4]], panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'WAITING.', cap: 'Flow run status:', cap2: 'Still waiting.', at2: 2 },
  ] },
  // On the drop: where routine work lives.
  { b: 20, l: 12, title: 'The old way.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], pix: 'EMAIL.', cap: 'Approval by reply-all.' },
    { at: 4, r: [1 / 3, 0, 1 / 3, 1], pix: 'SPREADSHEETS.', cap: 'The one called FINAL v7.' },
    { at: 7, r: [2 / 3, 0, 1 / 3, 1], pix: 'MEMORY.', cap: 'Ask the one person who knows.' },
  ], sfx: [{ at: 8, w: 'CC: EVERYONE!', x: 0.17, y: 0.12, r: -6 }, { at: 11, w: 'HUH?', sub: 'Who has the latest?', x: 0.5, y: 0.88, r: 5 }] },
  { b: 32, l: 16, title: 'Automate it.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], img: card('power-platform-logic-apps'), cap: 'So the process gets mapped and built.' },
    { at: 4, r: [0.5, 0, 0.5, 1 / 3], pix: 'POWER APPS.', cap: 'Forms, approvals and tracking.' },
    { at: 7, r: [0.5, 1 / 3, 0.5, 1 / 3], pix: 'POWER AUTOMATE.', cap: 'The flow does the chasing.' },
    { at: 10, r: [0.5, 2 / 3, 0.5, 1 / 3], pix: 'LOGIC APPS.', cap: 'Integration that runs in Azure.' },
  ], sfx: [{ at: 4, w: 'FIRED!', sub: 'First run: succeeded.', x: 0.25, y: 0.88, r: -5 }, { at: 15, w: 'ON AUTOPILOT!', x: 0.25, y: 0.12, r: 6 }] },
  { b: 48, l: 8, title: 'The drift.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'RUN 1: OK.', cap: 'It worked.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'RUN 2: OK.', count: { from: 2, step: 1, every: 0.25, fmt: 'RUN #: OK.' }, cap: 'It kept working.' },
    { at: 6, r: [0, 0.5, 1, 0.5], pix: 'IT RAN AS ONE PERSON.', cap: 'The person who built it signed it in.' },
  ], sfx: [{ at: 4, w: 'SMOOTH.', x: 0.25, y: 0.12, r: -4 }] },
  // The dead stop 58-62: the flow stalls with the music.
  { b: 56, l: 8, freeze: [[2, 7]], panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'CONNECTION BROKEN.', cap: 'Then that person moved on.', cap2: 'Their account went with them.', at2: 3 },
  ], sfx: [{ at: 7, w: 'CRASH!', x: 0.5, y: 0.88, r: -6 }] },
  { b: 64, l: 16, title: 'Fires again.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'QUICK FIX.', cap: 'Someone signed it in with their own account.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'FIXED.', cap: 'It fired again.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], chat: true, cap: 'Who owns this flow?' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'NOBODY.', cap: 'Everybody uses it.' },
  ], sfx: [{ at: 4, w: 'REBOOT!', x: 0.25, y: 0.12, r: -5 }, { at: 15, w: 'NOT IT!', x: 0.75, y: 0.88, r: 6 }] },
  { b: 80, l: 16, title: 'Test in production.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'ONE ENVIRONMENT.', cap: 'Built, tested and changed in the same place.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], pix: 'EDIT.', cap: 'A small change, live.' },
    { at: 7, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'SAVE.', cap: 'On a Friday.' },
    { at: 10, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'OOPS.', cap: 'Every run since, a little off.' },
  ], sfx: [{ at: 4, w: 'LIVE!', x: 0.5, y: 0.12, r: 5 }, { at: 9, w: 'SIDEWAYS!', x: 0.5, y: 0.12, r: -6 }] },
  // The dead stop 96-103: it stalls again, and the team goes back to where it started.
  { b: 96, l: 16, title: 'Stalled.', freeze: [[0, 8]], panels: [
    { at: 1, r: [0, 0, 0.25, 1], pix: 'RUN FAILED.', cap: 'No failure path. It just stopped.' },
    { at: 4, r: [0.25, 0, 0.25, 1], pix: 'NO ALERT.', cap: 'The alert went to someone who left.' },
    { at: 7, r: [0.5, 0, 0.25, 1], pix: 'EMAIL AGAIN.', cap: 'So the team went back to email.' },
    { at: 11, r: [0.75, 0, 0.25, 1], pix: 'FINAL v8.', cap: 'And the spreadsheet came back.' },
  ], sfx: [{ at: 10, w: 'GROUNDHOG DAY!', sub: 'Reply-all returns.', x: 0.375, y: 0.88, r: -5 }, { at: 15, w: 'SIGH.', x: 0.62, y: 0.12, r: 6 }] },
  // The turn: the page's "Choose the route."
  { b: 112, l: 16, title: 'Plan it.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'CHOOSE THE ROUTE.', cap: 'Not every process should be automated.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'JUDGEMENT: PEOPLE.', cap: 'Keep judgement with people.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], pix: 'REPEATS: FLOWS.', cap: 'Automate the routes that repeat.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'START WITH ONE.', cap: 'One repeatable process first.' },
  ], sfx: [{ at: 4, w: 'SORTED!', x: 0.25, y: 0.12, r: -5 }, { at: 12, w: 'ROUTED!', x: 0.25, y: 0.88, r: 5 }] },
  { b: 128, l: 16, title: 'Environments.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 0.6], pix: 'DEVELOPMENT.', cap: 'Build it here.' },
    { at: 4, r: [1 / 3, 0, 1 / 3, 0.6], pix: 'TEST.', cap: 'Break it here.' },
    { at: 7, r: [2 / 3, 0, 1 / 3, 0.6], pix: 'PRODUCTION.', cap: 'Kept separate.' },
    { at: 10, r: [0, 0.6, 1, 0.4], pix: 'A LIMITED GROUP FIRST.', cap: 'Then everyone.' },
  ], sfx: [{ at: 4, w: 'SANDBOXED!', x: 0.17, y: 0.12, r: -6 }, { at: 15, w: 'RELEASED!', x: 0.5, y: 0.12, r: 5 }] },
  // The breakdown 149-169: the only serious chapter, no slams. The picture links to Roles & Access Control.
  { b: 144, l: 16, title: 'Somebody owns it.', ember: 1.8, freeze: [[5, 8], [9, 12], [15, 16]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: card('roles-access-control'), href: '/traditional-systems/roles-access-control/', cap: 'Every flow and connector acts as someone.' },
    { at: 4, r: [0.46, 0, 0.54, 1 / 3], pix: 'AN IDENTITY.', cap: 'A person, or an application with permissions of its own.' },
    { at: 8, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'ITS REACH.', cap: 'Reviewed like any other access.' },
    { at: 12, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'AN OWNER.', cap: 'Someone responsible for every app and flow.' },
  ] },
  { b: 160, l: 16, ember: 1.6, freeze: [[0, 2], [4, 10]], panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'A FAILURE PATH.', cap: 'Decide when a failure should stop it.' },
    { at: 5, r: [0, 0.5, 0.5, 0.5], pix: 'A RELEASE PATH.', cap: 'Development to production, with support after.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'KEEPS RUNNING.', cap: 'After launch, too.' },
  ] },
  // Back on 170: the record, from the page. The stop 189-190 freezes before the award lands on 191.
  { b: 176, l: 16, title: 'The receipts.', freeze: [[13, 15]], panels: [
    { at: 1, r: [0, 0, 0.4, 0.5], img: card('team-modernization'), cap: "A utility's field training." },
    { at: 3, r: [0.4, 0, 0.3, 0.5], pix: '14 POWER APPS.', cap: 'Built on Power Platform.' },
    { at: 5.5, r: [0.7, 0, 0.3, 0.5], pix: '70+ FLOWS.', cap: 'And 30+ Power BI reports.' },
    { at: 8, r: [0, 0.5, 0.55, 0.5], pix: '6,000 USERS.', cap: 'No per-user licensing.' },
    { at: 11, r: [0.55, 0.5, 0.45, 0.5], pix: '95%', cap: 'Completion among 2,000 field staff.' },
  ], sfx: [{ at: 9, w: 'PROOF!', x: 0.2, y: 0.12, r: -5 }, { at: 15, w: 'TROPHY!', sub: "A President's Award.", x: 0.55, y: 0.12, r: 6 }] },
  { b: 192, l: 16, title: 'Pick the tool.', panels: [
    { at: 1, r: [0, 0, 1, 0.4], pix: 'POWER AUTOMATE OR LOGIC APPS?', cap: 'Three questions decide it.' },
    { at: 4, r: [0, 0.4, 1 / 3, 0.6], pix: 'WHO MAINTAINS IT?', cap: 'The team, or IT.' },
    { at: 7, r: [1 / 3, 0.4, 1 / 3, 0.6], pix: 'WHERE DOES IT RUN?', cap: 'Microsoft 365, or Azure.' },
    { at: 10, r: [2 / 3, 0.4, 1 / 3, 0.6], pix: 'WHAT DOES IT CONNECT?', cap: 'Business systems, APIs, data services.' },
  ], sfx: [{ at: 4, w: 'CROSSROADS!', x: 0.5, y: 0.12, r: -4 }, { at: 15, w: 'CHOSEN!', x: 0.5, y: 0.88, r: 5 }] },
  // The page's "What you receive."
  { b: 208, l: 16, title: 'Handed over.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], pix: 'A WORKING PROCESS.', cap: 'Apps and flows your team uses.' },
    { at: 4, r: [0.25, 0, 0.25, 1], pix: 'ENVIRONMENTS.', cap: 'Development, test and production.' },
    { at: 7, r: [0.5, 0, 0.25, 1], pix: 'CONNECTION RULES.', cap: 'Which identity each connection uses.' },
    { at: 10, r: [0.75, 0, 0.25, 1], pix: 'OWNERS.', cap: 'Named, for every app and flow.' },
  ], sfx: [{ at: 4, w: 'HANDOFF!', x: 0.125, y: 0.88, r: -5 }, { at: 9, w: 'NO MYSTERIES.', x: 0.25, y: 0.12, r: 5 }] },
  // The stop 224-231: the questions land in the quiet. Each box links where its question leads.
  { b: 224, l: 16, title: 'Your turn.', freeze: [[0, 8]], panels: [
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/contact/?service=power-platform', cap: 'A process that runs on email?' },
    { at: 4, r: [0.25, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/contact/?service=power-platform&type=call', cap: 'Makers joining across teams?' },
    { at: 7, r: [0.5, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/traditional-systems/roles-access-control/', cap: 'Who does your flow run as?' },
    { at: 10, r: [0.75, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/traditional-systems/custom-software-development/', cap: 'A process that needs custom code?' },
  ], sfx: [{ at: 10, w: 'YOUR MOVE.', x: 0.375, y: 0.88, r: -4 }, { at: 15, w: 'GO TIME!', x: 0.5, y: 0.12, r: 5 }] },
  // The loud run to the end: the drift, controlled.
  { b: 240, l: 16, title: 'Full throttle.', panels: [
    ...lap.map((w, i) => ({ at: 1 + i * 2, r: [i * 0.25, 0, 0.25, 0.6] as R, rp: [(i % 2) * 0.5, Math.floor(i / 2) * 0.3, 0.5, 0.3] as R, pix: w })),
    { at: 10, r: [0, 0.6, 1, 0.4], pix: 'ON TIME, EVERY TIME.', cap: 'Automation that keeps running after launch.' },
  ], sfx: [{ at: 4, w: 'SKRRT!', sub: 'Controlled drift.', x: 0.5, y: 0.88, r: -6 }, { at: 12, w: 'LOCKED IN!', x: 0.5, y: 0.12, r: 5 }] },
  { b: 256, l: 8, panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'START WITH THE ONE.', cap: 'The process your team repeats most.', cap2: 'Owner included.', at2: 2.5 },
  ], sfx: [{ at: 4, w: 'AUTOMATED!', x: 0.8, y: 0.8, r: -5 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds.
  { b: 264, l: 12, close: true, panels: [] },
];

// The hero image as the page resolves it: the Power Platform hero, or the Traditional Systems shield standing in.
const art = (() => { try { return findSourceImage('service-hero', 'power-platform-logic-apps'); } catch { return findSourceImage('service-hero', 'traditional-systems-shield'); } })();
export const powerPlatformStory: BeatComicStory = {
  bpm: 129.33,
  // One pass is 280 beats, but the song file ends at 129.98 s: 276 beats end at 128.4 s, inside it.
  beats: 276,
  close: 264,
  track: tr,
  music: { src: '/audio/pixabay-436825-drift-phonk-01.mp3', offset: 0.315, credit: 'Music: Drift Phonk 01 by vjgalaxy', source: 'https://pixabay.com/music/upbeat-drift-phonk-01-436825/' },
  closeScene: { lines: ['Power Platform &', 'Logic Apps.'], pixelate: 5, lede: 'Routine processes often live in email, spreadsheets and memory. Matt designs apps and automation on Power Platform, with Azure Logic Apps for integration, and plans the environments, identities and owners that keep them running.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};
