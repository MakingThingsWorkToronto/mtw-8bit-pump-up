// Custom Software Development Beat Comic, the mixtape's Track 14 (Matt, 2026-09-28: "these are all insane. please do
// traditional systems now"). A goodbye to the legacy app, said with respect: the old custom code that still runs and
// that nobody touches, the C# and .NET era Matt built in, the cloud move it blocks, then the drop: build the missing
// piece (SharePoint Framework web parts, integrations with an identity and an owner), with Claude Code, Codex and GitHub
// Copilot under tests and review, the same controls for people and agents, and the smallest build rather than a
// rewrite. The breakdown reads the old code, plans its replacement and shows the record; the only serious chapter
// retires it with care, and on the song's dead stop it is switched off, the replacement live on the drop. Claims come
// from the Custom Software Development page (the lede; the panels; the offers and deliverables; the law firm's 10 C# web
// parts and 3 web-service applications; the insurer's transpiled website in two weeks with no specialist needed) and
// the homepage (Matt's C# and .NET systems for financial services and the public sector). No numbers beyond those, no
// client names, no prices. One nod to Track 02 (the agents' appetite). No big-firm chapter (homepage only), no slam
// word twice.
//
// Cut to "Goodbye_[[FREE]] Rap Beat" by AEXBEATS (Pixabay): a farewell beat for the farewell to the old app.
// Beat map (wiki/soundtrack-library/profiles/pixabay-485508.json): 140.24 BPM on the analyser's grid (0.428 s a beat),
// first downbeat 0.265 s. The loudness repeats every 8 grid beats and the accents fall every 4 (the backbeat), so it
// feels like 70 BPM half time; the story keeps the 140 grid and sets pace in seconds. A quiet rising intro 0-62 (stops
// 1-8 and 10), the drop on 63; the full section 63-157 (accents every 4 beats from 63 to 119, then 122, 127, 130, 135,
// 138, 143, 146, 151, 154); a quiet breakdown 158-220, a dead stop on 221, the drop on 222; the full section 222-285
// (accents every 4 beats, 222 to 282); the outro fades from 286, stops on 292, 295 and 298-304; the song ends on 305.
// 308 beats = 2:12, ending 4.2 s inside the file.
// Pace in seconds: a panel about every 1.5 s = 3.5 beats; 16-beat pages (6.8 s) on the bars.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track, tracklist } from './tracklist';

type R = [number, number, number, number];
const tr = track('/traditional-systems/custom-software-development/');
// The page's SharePoint Framework examples: "a directory, a personalized launcher, a registration process or a search
// experience".
const parts = ['A DIRECTORY.', 'A LAUNCHER.', 'REGISTRATION.', 'SEARCH.'];
// The services this page links to, each cell linked to its page (Matt, 2026-09-28): the path is the tracklist's for the
// cell's name.
const neighbours: [string, string][] = [
  ['Intranet & Collaboration.', 'intranet-collaboration'],
  ['Roles & Access Control.', 'roles-access-control'],
  ['Information Governance & AI Readiness.', 'information-governance'],
  ['Azure Migrations.', 'azure-migrations'],
  ['Agentic DevOps & Scaling.', 'devops-scaling'],
];
const pageOf = (name: string) => {
  const t = tracklist.find((x) => `${x.title}.` === name);
  if (!t) throw new Error(`No page for the service cell "${name}" in src/data/beat-comics/tracklist.ts`);
  return t.path;
};

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's: the mark and TRACK 14. with the CD ticker inside the main box. The intro stops dead on
  // 1-8 and 10.
  { b: 0, l: 16, freeze: [[1, 9], [10, 11]], panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Previously: the platform did most of it.', cap2: 'Now: the missing piece.', at2: 12 },
    { at: 4.5, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 8, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // Homage, on the quiet intro.
  { b: 16, l: 16, title: 'The old app.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'THE OLD APP.', cap: 'Custom code, written years ago.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.5], pix: 'STILL RUNNING.', cap: 'Every day. Without complaint.' },
    { at: 8, r: [0, 0.5, 0.5, 0.5], chart: true, cap: 'Years of service. Not one page of documentation.' },
    { at: 11.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'DO NOT TOUCH.', cap: 'The one rule everyone follows.' },
  ], sfx: [{ at: 12, w: 'DUSTY!', x: 0.5, y: 0.5, r: -5 }] },
  { b: 32, l: 16, title: 'Fluent in legacy.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'C# AND .NET.', cap: 'Matt built C# and .NET systems for financial services and the public sector.' },
    { at: 4.5, r: [0, 0.5, 1 / 3, 0.5], pix: 'HE CAN READ IT.', cap: 'He has built this kind of code.' },
    { at: 8, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'TYPESCRIPT.', cap: 'Now TypeScript and React too.' },
    { at: 11.5, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'BILINGUAL.', cap: 'Old code and new, in one person.' },
  ], sfx: [{ at: 13, w: 'FLUENT!', x: 0.5, y: 0.12, r: 5 }] },
  { b: 48, l: 16, title: 'The blocker.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], img: card('azure-migrations'), cap: 'Then the move to the cloud.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.5], pix: 'ALL PACKED.', cap: 'Everything else is ready to go.' },
    { at: 8, r: [0.5, 0.5, 0.5, 0.5], pix: 'EXCEPT THAT.', cap: 'Older custom code often blocks a move to the cloud.' },
  ], sfx: [{ at: 15, w: 'STUCK!', sub: 'Blocking the move.', x: 0.26, y: 0.88, r: -6 }] },
  // The drop on 63.
  { b: 64, l: 16, title: 'The missing piece.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'MICROSOFT 365.', cap: 'The platform does a lot.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.5], pix: 'NOT THAT.', cap: 'Not the one thing the work needs.' },
    { at: 8, r: [0, 0.5, 1, 0.5], pix: 'BUILD THE MISSING PIECE.', cap: 'When the platform does not do what the work needs.' },
  ], sfx: [
    { at: 7, w: 'NOPE!', sub: 'Not in the box.', x: 0.5, y: 0.5, r: -6 },
    { at: 11, w: 'SNAP!', x: 0.76, y: 0.12, r: 6 },
    { at: 15, w: 'BUILT!', x: 0.26, y: 0.12, r: -4 },
  ] },
  // SharePoint Framework: a header row, then an exact row of quarters.
  { b: 80, l: 16, title: 'Web parts.', panels: [
    { at: 1, r: [0, 0, 1, 0.4], pix: 'SHAREPOINT FRAMEWORK.', cap: 'Web parts and extensions add what SharePoint lacks.', cap2: 'Inside SharePoint and Teams, with your own permissions.', at2: 11 },
    ...parts.map((w, i) => ({ at: 4 + i * 1.5, r: [i * 0.25, 0.4, 0.25, 0.6] as R, rp: [(i % 2) * 0.5, 0.4 + Math.floor(i / 2) * 0.3, 0.5, 0.3] as R, pix: w })),
  ], sfx: [{ at: 11, w: 'CUSTOM!', x: 0.5, y: 0.2, r: -5 }, { at: 15, w: 'SHIPPED!', x: 0.5, y: 0.88, r: 5 }] },
  { b: 96, l: 16, title: 'Integrations.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'CONNECT IT.', cap: 'Microsoft 365, joined to the systems the business already runs.' },
    { at: 4.5, r: [0, 0.5, 1 / 3, 0.5], pix: 'APIS.', cap: 'APIs, Azure Functions and custom connectors.' },
    { at: 8, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'ONE IDENTITY.', cap: 'Only the access its job requires.' },
    { at: 11.5, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'AN OWNER.', cap: 'Who knows it exists.', cap2: 'Unlike last time.', at2: 14 },
  ], sfx: [
    { at: 3, w: 'HANDSHAKE!', x: 0.5, y: 0.12, r: -5 },
    { at: 7, w: 'CONNECTED!', x: 0.17, y: 0.9, r: 6 },
    { at: 15, w: 'OWNED.', x: 0.5, y: 0.12, r: -4 },
  ] },
  { b: 112, l: 16, title: 'Built with agents.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'CLAUDE CODE. CODEX.', cap: 'Matt builds with Claude Code, Codex and GitHub Copilot.' },
    { at: 4.5, r: [0, 0.5, 1 / 3, 0.5], pix: 'VERSIONED.', cap: 'The code lives in a repository.' },
    { at: 8, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'TESTED.', cap: 'It passes the tests.' },
    { at: 11.5, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'REVIEWED.', cap: 'A person reviews it before release.' },
  ], sfx: [
    { at: 3, w: 'CLACK!', x: 0.5, y: 0.12, r: 5 },
    { at: 7, w: 'GREEN!', sub: 'Tests passed.', x: 0.17, y: 0.9, r: -6 },
    { at: 15, w: 'APPROVED!', x: 0.5, y: 0.12, r: 4 },
  ] },
  { b: 128, l: 16, title: 'House rules.', panels: [
    { at: 1, r: [0, 0, 1, 0.4], pix: 'THE AGENTS SPEED IT UP.', cap: 'The tests and the review decide what ships.' },
    { at: 4.5, r: [0, 0.4, 1 / 3, 0.6], pix: 'REPOSITORIES.', cap: 'Which ones coding agents may use.' },
    { at: 8, r: [1 / 3, 0.4, 1 / 3, 0.6], pix: 'CREDENTIALS.', cap: 'And which environments.' },
    { at: 11.5, r: [2 / 3, 0.4, 1 / 3, 0.6], pix: 'SAME RULES.', cap: 'The same controls for the people and the agents.' },
  ], sfx: [{ at: 7, w: 'NO SHORTCUTS.', x: 0.17, y: 0.9, r: -5 }, { at: 15, w: 'SAME FOR ALL!', x: 0.5, y: 0.12, r: 5 }] },
  // The nod to Track 02: the agents' appetite, turned down.
  { b: 144, l: 16, title: 'Big rewrite?', panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'REWRITE IT ALL!', cap: 'Somebody always suggests it.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.5], chat: true, cap: 'Since Track 02, the agents want the whole app.' },
    { at: 8, r: [0.5, 0.5, 0.5, 0.5], pix: 'SMALLEST BUILD.', cap: 'The smallest build that closes the gap.' },
  ], sfx: [
    { at: 2, w: 'KABOOM?', x: 0.26, y: 0.88, r: -6 },
    { at: 7, w: 'OVERKILL!', x: 0.76, y: 0.5, r: 5 },
    { at: 10, w: 'VETOED!', x: 0.26, y: 0.12, r: -4 },
  ] },
  // The quiet breakdown: reading the old code.
  { b: 160, l: 16, title: 'The dig.', ember: 1.4, panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'WHAT DOES IT DO?', cap: 'Find out before anything replaces it.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.5], chat: true, cap: 'Ask whoever wrote it.', cap2: 'They left years ago.', at2: 7 },
    { at: 8, r: [0, 0.5, 0.5, 0.5], pix: 'READ EVERY LINE.', cap: 'With AI assisting.' },
    { at: 11.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'ALSO THIS.', cap: 'It quietly sends a report every Friday.' },
  ], sfx: [{ at: 12, w: 'DIG!', x: 0.5, y: 0.5, r: 5 }] },
  { b: 176, l: 16, title: 'The plan.', ember: 1.4, panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'A REPLACEMENT PLAN.', cap: 'Planned before a line of new code.' },
    { at: 4.5, r: [0, 0.5, 1 / 3, 0.5], pix: 'WEB PARTS.', cap: 'To SharePoint Framework.' },
    { at: 8, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'WEB SERVICES.', cap: 'To Azure Functions.' },
    { at: 11.5, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'VALIDATED.', cap: 'Before each release.' },
  ], sfx: [{ at: 14, w: 'BLUEPRINT!', x: 0.5, y: 0.12, r: -5 }] },
  // The record, from the page.
  { b: 192, l: 16, title: 'The record.', ember: 1.4, panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: '10 C# WEB PARTS.', count: { from: 1, step: 1, every: 0.3, to: 10, fmt: '# C# WEB PARTS.', fmt1: '1 C# WEB PART.' }, cap: 'For a law firm, converted to SharePoint Framework.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.5], pix: '3 WEB SERVICES.', cap: 'Applications, into Azure Functions.' },
    { at: 8, r: [0, 0.5, 0.5, 0.5], pix: '2 WEEKS.', cap: "A national insurer's website, moved between platforms." },
    { at: 11.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'TRANSPILER.', cap: 'Purpose-built. No specialist needed.' },
  ], sfx: [{ at: 14, w: 'CASE CLOSED.', x: 0.5, y: 0.12, r: 4 }] },
  // The end of the breakdown: the only serious chapter, no slams.
  { b: 208, l: 12, title: 'Goodbye.', ember: 1.8, panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: card('custom-software-development'), cap: 'The old app did its job. Retire it with care.' },
    { at: 4.5, r: [0.46, 0, 0.54, 0.5], pix: 'KNOW WHAT IT DOES.', cap: 'Then validate the replacement before it goes live.' },
    { at: 8, r: [0.46, 0.5, 0.54, 0.5], pix: 'A PERSON DECIDES.', cap: 'AI assists. A person decides the release.' },
  ] },
  // The dead stop on 221 and the drop on 222.
  { b: 220, l: 4, freeze: [[1, 2]], panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'SWITCHED OFF.', cap: 'Thank you for your service.' },
  ], sfx: [{ at: 2, w: 'HELLO!', sub: 'The replacement is live.', x: 0.5, y: 0.14, r: -5 }] },
  { b: 224, l: 16, title: 'What you get.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'WORKING SOFTWARE.', cap: 'Built for your environment and tested.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.5], pix: 'A REPOSITORY.', cap: 'The code, its history and its tests.' },
    { at: 8, r: [0, 0.5, 0.5, 0.5], pix: 'ACCESS RULES.', cap: 'The identity each component uses, and what it can reach.' },
    { at: 11.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'A HANDOVER.', cap: 'What your team needs to run and change it.' },
  ], sfx: [{ at: 6, w: 'UNBOXED!', x: 0.5, y: 0.5, r: 5 }, { at: 14, w: 'YOURS!', sub: 'Run it. Change it.', x: 0.5, y: 0.88, r: -5 }] },
  // The page's two offers.
  { b: 240, l: 16, title: 'Two jobs.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.6], pix: 'BUILD A SOLUTION.', cap: 'A gap the platform does not fill.' },
    { at: 4.5, r: [0.5, 0, 0.5, 0.6], pix: 'MODERNIZE LEGACY CODE.', cap: 'Custom code blocking a cloud move.' },
    { at: 8, r: [0, 0.6, 1, 0.4], pix: 'AGREED ON A CALL.', cap: 'Scope first. Then the build.' },
  ], sfx: [
    { at: 6, w: 'THIS ONE!', x: 0.5, y: 0.12, r: -5 },
    { at: 10, w: 'OR THAT!', x: 0.5, y: 0.3, r: 6 },
    { at: 14, w: 'DIAL IN!', x: 0.5, y: 0.88, r: -4 },
  ] },
  // The services this page connects to: an exact 3 x 2 grid of thirds, each cell a link.
  { b: 256, l: 16, title: 'The neighbours.', ground: 'teal', panels: [
    { at: 1, r: [0, 0, 1 / 3, 0.5], pix: 'IT PLUGS IN.' },
    ...neighbours.map(([name, img], i) => {
      const k = i + 1;
      return { at: 2.5 + i * 1.5, r: [(k % 3) / 3, Math.floor(k / 3) * 0.5, 1 / 3, 0.5] as R, img: card(img), name, href: pageOf(name) };
    }),
  ], sfx: [{ at: 10, w: 'NEXT DOOR!', x: 0.5, y: 0.5, r: -4 }, { at: 14, w: 'NEIGHBOURLY.', x: 0.5, y: 0.12, r: 5 }] },
  { b: 272, l: 16, title: 'Your turn.', panels: [
    // Four cinematic photos, each once; each box links where its question leads (Matt, 2026-09-28: "link those to
    // something on the site").
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/contact/?service=custom-software', cap: 'A gap the platform does not fill?' },
    { at: 3.5, r: [0.25, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/data-migrations/azure-migrations/', cap: 'Old code blocking the move?' },
    { at: 6, r: [0.5, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/traditional-systems/intranet-collaboration/', cap: 'A web part SharePoint lacks?' },
    { at: 8.5, r: [0.75, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/traditional-systems/roles-access-control/', cap: 'An integration nobody owns?' },
  ], sfx: [{ at: 6, w: 'ASK AWAY!', x: 0.375, y: 0.12, r: -5 }, { at: 10, w: 'YOUR BUILD.', x: 0.5, y: 0.88, r: 4 }] },
  // The outro fades; the motion holds on its stops.
  { b: 288, l: 8, freeze: [[4, 5], [7, 8]], panels: [
    { at: 0, r: [0, 0, 1, 1], pix: "TODAY'S NEW CODE.", cap: "Is tomorrow's legacy app.", cap2: 'Be kind to it.', at2: 4 },
  ] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds. The song's
  // last stops (298-304) freeze the embers; the hold brings them back.
  { b: 296, l: 12, close: true, freeze: [[2, 9]], panels: [] },
];

// The hero image as the page resolves it: the Custom Software image, or the Traditional Systems shield until it exists.
const art = (() => { try { return findSourceImage('service-hero', 'custom-software-development'); } catch { return findSourceImage('service-hero', 'traditional-systems-shield'); } })();
export const customSoftwareStory: BeatComicStory = {
  bpm: 140.24,
  beats: 308,
  close: 296,
  track: tr,
  music: { src: '/audio/pixabay-485508-goodbye-free-rap-beat.mp3', offset: 0.265, credit: 'Music: Goodbye_[[FREE]] Rap Beat by AEXBEATS', source: 'https://pixabay.com/music/rap-goodbye-free-rap-beat-485508/' },
  closeScene: { lines: ['Custom Software', 'Development.'], pixelate: 5, lede: 'When the platform does not do what the work needs, build the missing piece. Matt designs and develops SharePoint Framework solutions, Azure Functions and integrations, with Claude Code and Codex working under tests and human review.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};
