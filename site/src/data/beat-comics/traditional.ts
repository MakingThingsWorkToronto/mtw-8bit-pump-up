// Traditional Systems Beat Comic, the mixtape's Track 08 (Matt, 2026-09-28: "generate for traditional systems and also
// data and migrations"). Track 02 had the agents eat the tools; this is the classics answering back: SharePoint, file
// shares and Excel run the place, Copilot arrives and answers from whatever the person asking can already open, and the
// unglamorous foundations (roles, groups, owners, labels) are what make AI safe. Serious claims come from the Traditional
// Systems page and its services (Copilot exposes what people can already reach; owners who review access; the 6,000-user
// Entra ID model; the intranet awards; Copilot architecture since 2023). No big-firm chapter (homepage only), no slam
// word twice.
//
// Cut to "Detroit Rapper" by matthewmikemusic (Pixabay), classic boom bap for the classic stack.
// Beat map (wiki/soundtrack-library/profiles/pixabay-544063.json): 100 BPM (0.6 s a beat, the homepage's tempo), first
// downbeat 0.39 s, straight feel; a quiet rising intro to beat 8 (stops 1-3), the drop on 8; a fill 28-31; the full
// section 32-63 (accents on every even beat); a lighter verse 64-95; a dead stop on 97, back on 99; full again to 115;
// a quieter stretch 128-143; the biggest section 144-175; the outro from 176; the song ends on 201. 204 beats = 2:02.
// Pace in seconds: a panel about every 1.5 s = 2.5 beats; pages of 8-16 beats.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track, tracklist } from './tracklist';

type R = [number, number, number, number];
const services: [string, string][] = [
  ['Roles & Access Control.', 'roles-access-control'],
  ['Roadmaps & Cloud Planning.', 'roadmaps-cloud-planning'],
  ['Information Governance & AI Readiness.', 'information-governance'],
  ['Intranet & Collaboration.', 'intranet-collaboration'],
  ['Power Platform & Logic Apps.', 'power-platform-logic-apps'],
  ['Custom Software Development.', 'custom-software-development'],
];
// Each service cell links to its page (Matt, 2026-09-28): the path is the tracklist's for the cell's name.
const pageOf = (name: string) => {
  const t = tracklist.find((x) => `${x.title}.` === name);
  if (!t) throw new Error(`No page for the service cell "${name}" in src/data/beat-comics/tracklist.ts`);
  return t.path;
};

const tr = track('/traditional-systems/');

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's: the track ticker inside the main box. The intro stutters on 1-3.
  // A landing page's cover (Matt, 2026-09-28): the section name scrolls as an 8-bit marquee beside the MTW mark in the
  // main box, over the CD ticker, and TRACK nn. sits in the bottom-left box. Both come from the tracklist.
  { b: 0, l: 8, freeze: [[1, 4]], panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `${tr.title.toUpperCase()}.`, scroll: true, ticker: true, cap: 'Previously: the agents ate the tools.', cap2: 'Now: the tools answer back.', at2: 4 },
    { at: 3, r: [0, 0.74, 0.62, 0.26], pix: `TRACK ${tr.no}.`, small: true },
    { at: 5, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // Homage, on the drop.
  { b: 8, l: 12, title: 'The classics.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'SHAREPOINT.', cap: 'Not glamorous.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'FILE SHARES.', cap: 'Not trending.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'EXCEL.', cap: 'Holding up the whole company.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], chart: true, cap: 'The classics. They still run the place.' },
  ], sfx: [{ at: 6, w: 'CLASSIC!', sub: 'Still running.', x: 0.5, y: 0.5, r: -5 }, { at: 10, w: 'LEGEND.', x: 0.26, y: 0.88, r: 6 }] },
  { b: 20, l: 8, title: 'Enter Copilot.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], img: photo('starting-point-m365-ai'), cap: 'Then everyone wanted AI. Yesterday.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'COPILOT: ON.', cap: 'It answers your questions.' },
    { at: 5, r: [0.5, 0.5, 0.5, 0.5], pix: 'ALL OF THEM.', cap: 'From whatever the person asking can already open.' },
  ], sfx: [{ at: 2, w: 'HELLO!', sub: 'Copilot here.', x: 0.26, y: 0.86, r: -6 }, { at: 6, w: 'UH-OH.', x: 0.76, y: 0.12, r: 7 }] },
  // The fill: one gag.
  { b: 28, l: 4, panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'EVERYONE.', cap: 'The group that was only for testing.', cap2: 'Still open.', at2: 2.5 },
  ] },
  { b: 32, l: 8, title: 'The overshare.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'FOUND IT.', cap: 'Copilot found the file nobody meant to share.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'GUEST ACCESS.', cap: 'Still on. Owner: nobody.' },
    { at: 5, r: [0, 0.5, 1, 0.5], pix: 'NOT A COPILOT PROBLEM.', cap: 'Copilot creates no access. It shows what was already open.' },
  ], sfx: [{ at: 2, w: 'SHARED!', x: 0.26, y: 0.9, r: -7 }, { at: 4, w: 'EXPOSED!', sub: 'Everything, to everyone.', x: 0.76, y: 0.12, r: 6 }] },
  { b: 40, l: 8, panels: [
    { at: 0, r: [0, 0, 1 / 3, 1], img: card('roles-access-control'), cap: 'So the classics came back.' },
    { at: 2, r: [1 / 3, 0, 1 / 3, 1], pix: 'ROLES.', cap: 'Who does what.' },
    { at: 4, r: [2 / 3, 0, 1 / 3, 1], pix: 'GROUPS.', cap: 'Who gets in.' },
  ], sfx: [{ at: 6, w: 'SUITED UP.', x: 0.5, y: 0.88, r: -4 }] },
  { b: 48, l: 16, title: 'Who can open it.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'OWNERS.', cap: 'Every group has an owner who reviews it.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'LABELS.', cap: 'Sensitivity labels mark what matters.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'DLP.', cap: 'Data loss prevention stops it leaving.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], img: card('information-governance'), cap: 'Agents reach only what they should.' },
  ], sfx: [{ at: 10, w: 'DENIED!', sub: 'Nice try.', x: 0.26, y: 0.88, r: -6 }, { at: 14, w: 'LOCKED.', x: 0.76, y: 0.12, r: 5 }] },
  // The lighter verse: the record, from the page.
  { b: 64, l: 16, title: 'The long game.', ember: 1.4, panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], img: card('intranet-collaboration'), cap: 'Matt built intranets people used.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'AWARDED.', cap: 'Nielsen Norman Group Intranet Design Annual. Step Two Platinum.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: '6,000.', cap: 'Internal and external users, in one Entra ID model.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'SINCE 2023.', cap: 'Microsoft 365 Copilot architecture.' },
  ], sfx: [{ at: 14, w: 'RECEIPTS.', x: 0.5, y: 0.88, r: 4 }] },
  { b: 80, l: 16, title: 'Built to be used.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], pix: 'INTRANET.', cap: 'News, search and navigation people use.' },
    { at: 4, r: [1 / 3, 0, 1 / 3, 1], img: card('power-platform-logic-apps'), cap: 'Routine work, automated. Owners from the start.' },
    { at: 7, r: [2 / 3, 0, 1 / 3, 1], img: card('custom-software-development'), cap: 'Custom software where the platform stops.' },
  ], sfx: [{ at: 12, w: 'SHIPPED.', x: 0.5, y: 0.88, r: -5 }] },
  // The dead stop: the only serious chapter.
  { b: 96, l: 12, title: 'No joke.', ember: 1.8, freeze: [[1, 3]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: photo('starting-point-cloud-security'), cap: 'Straight, for a second.' },
    { at: 3, r: [0.46, 0, 0.54, 0.5], pix: 'BEFORE AI.', cap: 'Know who can open your information.' },
    { at: 6, r: [0.46, 0.5, 0.54, 0.5], pix: 'WHO OWNS IT.', cap: 'And who is responsible for it.' },
  ] },
  // The callback to Track 02.
  { b: 108, l: 8, panels: [
    { at: 0, r: [0, 0, 0.5, 1], img: photo('starting-point-custom-agents'), cap: 'Track 02 called. The agents are hungry.' },
    { at: 2.5, r: [0.5, 0, 0.5, 1], pix: 'PERMISSION FIRST.', cap: 'They eat what they are allowed to reach.' },
  ], sfx: [{ at: 2, w: 'HOLD UP!', x: 0.26, y: 0.88, r: -6 }, { at: 6, w: 'RESPECT.', sub: 'Returned.', x: 0.76, y: 0.12, r: 5 }] },
  { b: 116, l: 12, title: 'In order.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], img: card('roadmaps-cloud-planning'), cap: 'Cloud, Copilot readiness, governance, migration, training.' },
    { at: 4, r: [0, 0.5, 0.5, 0.5], pix: 'STEP ONE.', cap: 'In an order that fits your systems.' },
    { at: 7, r: [0.5, 0.5, 0.5, 0.5], pix: 'NO BIG BANG.', cap: 'Scoped to the decision in front of you.' },
  ] },
  // The quiet stretch: when the foundations work, nothing happens.
  { b: 128, l: 16, title: 'Quiet week.', ember: 1.5, panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'BORING.', cap: 'When the foundations work, nobody notices.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'ON PURPOSE.', cap: 'That is the point.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'NO LEAKS.', cap: 'The right people see the right files.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'NO HEADLINES.', cap: 'The best kind of Monday.' },
  ] },
  // The biggest section: the offer, an exact 4 x 2 grid of quarters.
  { b: 144, l: 16, title: 'The line-up.', ground: 'teal', panels: [
    { at: 1, r: [0, 0, 0.25, 0.5], pix: 'SIX WAYS IN.' },
    ...services.map(([name, img], i) => {
      const k = i + 1;
      return { at: 2 + i * 1.5, r: [(k % 4) * 0.25, Math.floor(k / 4) * 0.5, 0.25, 0.5] as R, img: card(img), name, href: pageOf(name) };
    }),
    { at: 11.5, r: [0.75, 0.5, 0.25, 0.5], pix: 'FOUNDATIONS FIRST.' },
  ], sfx: [{ at: 14, w: 'SIX!', x: 0.5, y: 0.9, r: -4 }] },
  { b: 160, l: 16, title: 'Old school.', panels: [
    { at: 1, r: [0, 0, 1, 1 / 3], pix: 'OLD SCHOOL.', cap: 'Classic foundations.' },
    { at: 4, r: [0, 1 / 3, 1, 1 / 3], pix: 'NEW TRICKS.', cap: 'AI on top.' },
    { at: 8, r: [0, 2 / 3, 1, 1 / 3], pix: 'NOW EAT.', cap: 'The agents can eat now. Safely.' },
  ], sfx: [{ at: 2, w: 'BOOM BAP!', x: 0.8, y: 0.5, r: -6 }, { at: 10, w: 'BON APPETIT.', sub: 'Permission granted.', x: 0.5, y: 0.5, r: 5 }] },
  { b: 176, l: 16, title: 'Your turn.', panels: [
    // One image kind per scene (Matt, 2026-09-28: "if the basic is a cinematic image then all boxes should use that"):
    // four cinematic photos, each once; each box links where its question leads.
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/traditional-systems/information-governance-ai-readiness/', cap: 'A Copilot rollout on hold?' },
    { at: 3, r: [0.25, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/traditional-systems/roles-access-control/', cap: 'Guest access without an owner?' },
    { at: 5, r: [0.5, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/data-migrations/', cap: 'A migration that has to land securely?' },
    { at: 7, r: [0.75, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/contact/?service=roles-access', cap: 'The access question nobody can answer?' },
  ], sfx: [{ at: 11, w: 'BRING IT.', x: 0.5, y: 0.86, r: -4 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds.
  { b: 192, l: 12, close: true, panels: [] },
];

const art = findSourceImage('service-hero', 'traditional-systems-shield');
export const traditionalStory: BeatComicStory = {
  bpm: 100,
  beats: 204,
  close: 192,
  track: track('/traditional-systems/'),
  music: { src: '/audio/pixabay-544063-detroit-rapper.mp3', offset: 0.39, credit: 'Music: Detroit Rapper by matthewmikemusic', source: 'https://pixabay.com/music/beats-detroit-rapper-544063/' },
  closeScene: { lines: ['Traditional', 'Systems.'], pixelate: 5, lede: 'Before AI reaches your information, be clear about who can open it and who is responsible for it. Matt brings access control, cloud planning and information governance together, then builds the intranets, automation and software your team works in.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};
