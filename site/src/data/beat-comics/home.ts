// Homepage B Beat Comic (Matt, 2026-09-26; spec "Homepage B: showreel hero"): Matt's story as an old-school comic fused
// into the pixel grid, cut to "Aphelion" by Zambolino. Every claim comes from published site copy (About Matt outcomes,
// awards, credentials and industries; service pages; starting points). Schema and method: the mtw-beat-comic skill.
import type { BeatComicStory } from './types';
import { playlistRows } from './playlist';
import { card, photo, markPaths } from './sources';
import { track, tracklist } from './tracklist';

// Panel rectangles are fractions of the stage's safe area: [x, y, w, h]. Comic gutters come from the CSS.
const services: [string, string, string][] = [
  ['Agentic Systems.', 'Second Brain.', 'second-brain'],
  ['Agentic Systems.', 'Agentic Team Modernization.', 'team-modernization'],
  ['Agentic Systems.', 'Agentic Cost Planning.', 'cost-planning'],
  ['Agentic Systems.', 'Agentic DevOps & Scaling.', 'devops-scaling'],
  ['Agentic Systems.', 'Agent-Ready Websites.', 'agent-ready-websites'],
  ['Traditional Systems.', 'Roles & Access Control.', 'roles-access-control'],
  ['Traditional Systems.', 'Roadmaps & Cloud Planning.', 'roadmaps-cloud-planning'],
  ['Traditional Systems.', 'Information Governance & AI Readiness.', 'information-governance'],
  ['Traditional Systems.', 'Intranet & Collaboration.', 'intranet-collaboration'],
  ['Traditional Systems.', 'Power Platform & Logic Apps.', 'power-platform-logic-apps'],
  ['Traditional Systems.', 'Custom Software Development.', 'custom-software-development'],
  ['Data & Migrations.', 'Migration Planning.', 'migration-planning'],
  ['Data & Migrations.', 'M365 Migrations.', 'm365-migrations'],
  ['Data & Migrations.', 'Azure Migrations.', 'azure-migrations'],
];
// Each service cell links to its page (Matt, 2026-09-28: "link the ways in boxes to their sections, so a user can click
// through"): the path is the tracklist's for the cell's name, so a name without a page fails the build.
const pageOf = (name: string) => {
  const t = tracklist.find((x) => `${x.title}.` === name);
  if (!t) throw new Error(`No page for the service cell "${name}" in src/data/beat-comics/tracklist.ts`);
  return t.path;
};

// The "Your turn." photos link where the homepage's Starting Points send each one (src/pages/index.astro; Matt,
// 2026-09-28: "link those to something on the site").
const start = (id: string) => ({ img: photo(id), href: ({
  'starting-point-cloud-security': '/traditional-systems/roadmaps-cloud-planning/',
  'starting-point-m365-ai': '/traditional-systems/information-governance-ai-readiness/',
  'starting-point-rework': '/agentic-systems/agentic-team-modernization/',
  'starting-point-custom-agents': '/agentic-systems/second-brain/',
} as Record<string, string>)[id] });

// The cover's tracklist is the site playlist (playlist.ts), the same rows the Tracklist overlay shows on every comic:
// Disc 1 is the site's 18 pages with this one playing, Disc 2 the Journal (Matt, 2026-09-28).
const discRows = playlistRows('/play/home/');

// The story is one pass of the song. Beat map (scripts/analyze-song.mjs, 2026-09-26): Aphelion is 100 BPM with the first
// downbeat at 0.565 s; 16-beat phrases from beat 0; the band stops dead on beats 8-9 (drops back in on 10), 84 (back on
// 85) and 147-148 (back on 149); the big accents are 31, 63, 95, 127 and 159 (the last beat of every other phrase) and
// 52, 74, 106, 170; the song ends on beat 190. Chapters sit on phrases (a few on half phrases, for pace), slams on
// accents, freezes on the stops, and
// the close on the final silence. 192 beats = 115.2 s; the story plays once and holds.
const pages: BeatComicStory['pages'] = [
  // The cover is the back of the mixtape's CD (Matt, 2026-09-28: "restyle the first scene on homepage to reflect the
  // tracklist you can greenfield that", "journal should be a separate disk on the site playlist"): the mark on top, the
  // tracklist in the middle, the sound box below. The rows land like a player reading the disc; on the dead stop the
  // play head waits cued on Track 01; on the drop (10) the disc plays: Track 01 lights with the song's time (the
  // tracklist is the cover's CD display, so the main box has no ticker), every row becomes a link, and PRACTICAL AI
  // SOLUTIONS. lands where the sound box was.
  { b: 0, l: 16, freeze: [[8, 10]], panels: [
    { at: 0, r: [0, 0, 1, 0.26], rp: [0, 0, 1, 0.18], mark: true, pix: 'MAKING THINGS WORK.', cap: 'Pull up a chair.', cap2: 'This one is true.', at2: 4 },
    // Matt, 2026-09-27: "a brief 8 bit scrolling marquee below the making things work box before the other two boxes
    // appear below telling the user to click the screen to enable audio".
    { at: 1.5, r: [0, 0.8, 1, 0.2], rp: [0, 0.815, 1, 0.185], sound: true, until: 9.5 },
    { at: 2, r: [0, 0.26, 1, 0.54], rp: [0, 0.18, 1, 0.635], tracks: { rows: discRows, live: 10 } },
    // A phone stacks the last two full width, so the caption does not sit on MATT STARK.
    { at: 10, r: [0, 0.8, 0.62, 0.2], rp: [0, 0.815, 1, 0.065], pix: 'PRACTICAL AI SOLUTIONS.', scroll: true },
    { at: 12, r: [0.62, 0.8, 0.38, 0.2], rp: [0, 0.88, 1, 0.12], pix: 'MATT STARK.', cap: 'Agentic and Microsoft 365 architect.' },
  ] },
  { b: 16, l: 16, title: 'Origin story.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], chart: true, cap: "Before anyone said 'agent', Matt built the reports leaders used to decide." },
    { at: 4, r: [0.5, 0, 0.5, 0.5], img: card('custom-software-development'), cap: 'Then C# and .NET systems for financial services and the public sector.' },
    { at: 7, r: [0, 0.5, 0.5, 0.5], img: card('intranet-collaboration'), cap: 'Then intranets and search that people actually used.' },
    { at: 10, r: [0.5, 0.5, 0.5, 0.5], pix: 'PLATINUM.', cap: 'A Nielsen Norman Group usability award. A Step Two Platinum.' },
  ], sfx: [{ at: 15, w: 'BAM!', sub: 'Two awards.', x: 0.52, y: 0.86, r: -7 }] },
  { b: 32, l: 12, title: 'The front line.', panels: [
    { at: 1, r: [0, 0, 0.4, 0.5], img: card('team-modernization'), cap: "Then the field: a utility's trades training platform." },
    // The figures climb while the scene holds (Matt, 2026-09-27): 14 apps is the baseline; flows go up in fives.
    { at: 3, r: [0.4, 0, 0.3, 0.5], pix: '14 APPS.', count: { from: 14, step: 1, every: 1.5, fmt: '# APPS.' }, cap: 'Training, evaluations, badges.' },
    { at: 4.5, r: [0.7, 0, 0.3, 0.5], pix: '70+ FLOWS.', count: { from: 70, step: 5, every: 1.5, fmt: '#+ FLOWS.' }, cap: 'Evaluations, goals, escalations.' },
    // Matt, 2026-09-28: "add count up on 6000+ box on homepage": a fast roll from 1,000+ in 250s, on 6,000+ four beats in.
    { at: 6, r: [0, 0.5, 0.55, 0.5], pix: '6,000+', count: { from: 1000, step: 250, every: 0.2, to: 6000, fmt: '#+' }, cap: 'Users. No per-user licensing.' },
    { at: 8.5, r: [0.55, 0.5, 0.45, 0.5], pix: '95%', cap: 'Completion among 2,000 non-technical field staff.' },
  ], sfx: [{ at: 6, w: 'WHAM!', sub: "A President's Award.", x: 0.8, y: 0.54, r: 6 }] },
  { b: 44, l: 12, title: 'The moves.', panels: [
    { at: 1, r: [0, 0, 0.6, 0.5], img: card('m365-migrations'), cap: 'Then the moves. File shares, tenants, whole libraries.' },
    // 3 TB first, then the count of unique migrations, 1 to 16 (Matt, 2026-09-27).
    { at: 3, r: [0.6, 0, 0.4, 0.5], pix: '3 TB.', count: { from: 1, step: 1, every: 0.45, after: 1.5, to: 16, fmt: '# UNIQUE MIGRATIONS.', fmt1: '1 UNIQUE MIGRATION.' }, cap: 'Of file shares, into SharePoint Online.' },
    { at: 5, r: [0, 0.5, 1 / 3, 0.5], img: card('migration-planning'), cap: 'Google Drive, Dropbox, Quip, Evernote, Aconex. Moved.' },
    { at: 6.5, r: [1 / 3, 0.5, 1 / 3, 0.5], img: card('azure-migrations'), cap: 'Three tenant-to-tenant migrations.' },
    // Matt, 2026-09-28: "start animating 125+ sites at 115 and move up": 115+ to 125+, one every 0.3 beat, there by beat 11.
    { at: 8, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: '125+', count: { from: 115, step: 1, every: 0.3, to: 125, fmt: '#+' }, cap: 'Collaboration sites in 14 months, on time, under budget.' },
  ], sfx: [{ at: 8, w: 'BOOM!', x: 0.83, y: 0.5, r: -6 }] },
  { b: 56, l: 8, title: 'Receipts.', panels: [
    { at: 1, r: [0, 0, 0.42, 0.5], img: photo('starting-point-cloud-security'), cap: 'Reliability Status security clearance.' },
    { at: 2.5, r: [0.42, 0, 0.58, 0.5], pix: 'PARTNER.', cap: 'Making Things Work consults as a Microsoft Partner.' },
    { at: 4, r: [0, 0.5, 0.58, 0.5], pix: 'ASK AROUND.', cap: 'Law firms, foundations, insurers, utilities, startups.' },
    { at: 5.5, r: [0.58, 0.5, 0.42, 0.5], img: card('roles-access-control'), cap: 'References, not a sales team.' },
  ], sfx: [{ at: 7, w: 'KAPOW!', x: 0.3, y: 0.86, r: 5 }] },
  // The big-firm contrast (Matt, 2026-09-26: "account managers, delivery managers, resource managers, project managers,
  // they don't add value to your project delivery, i keep them honest"). A delivery model, never a named firm.
  { b: 64, l: 16, title: 'The big-firm way.', panels: [
    { at: 1, r: [0, 0, 1, 0.24], cap: 'A big firm staffs your project like this.', pix: 'ONE PROJECT.', small: true },
    { at: 1.5, r: [0, 0.26, 0.25, 0.4], rp: [0, 0.26, 0.5, 0.2], pix: 'ACCOUNT MANAGER.' },
    { at: 2, r: [0.25, 0.26, 0.25, 0.4], rp: [0.5, 0.26, 0.5, 0.2], pix: 'DELIVERY MANAGER.' },
    { at: 2.5, r: [0.5, 0.26, 0.25, 0.4], rp: [0, 0.46, 0.5, 0.2], pix: 'RESOURCE MANAGER.' },
    { at: 3, r: [0.75, 0.26, 0.25, 0.4], rp: [0.5, 0.46, 0.5, 0.2], pix: 'PROJECT MANAGER.' },
    { at: 6, r: [0, 0.68, 1, 0.32], rp: [0, 0.68, 1, 0.32], pix: 'MATT.', cap: 'One senior person who plans it, and keeps the big firm honest.', cap2: 'The budget goes to the work.', at2: 10 },
  ], sfx: [{ at: 4, w: 'OVERHEAD!', sub: 'You pay for every one.', x: 0.5, y: 0.46, r: -5 }] },
  { b: 80, l: 16, title: 'The turn.', ember: 1.8, freeze: [[4, 5]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: card('second-brain'), cap: 'Then the machines learned to read.' },
    { at: 3, r: [0.46, 0, 0.54, 0.5], chat: true, cap: 'Most people met them as a chat box.' },
    { at: 5, r: [0.46, 0.5, 0.54, 0.5], pix: 'A SECOND BRAIN.', cap: 'Matt gave them a brief that stays current.' },
  ], sfx: [{ at: 15, w: 'CLICK.', x: 0.72, y: 0.14, r: 4 }] },
  { b: 96, l: 16, title: 'The decoding.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], img: card('information-governance'), cap: 'A document system older than the web. Its manuals, decoded with AI.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], img: card('migration-planning'), cap: 'Then the migration tool and its tests, built from what it learned.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: '2 WEEKS.', cap: "A national insurer's website, converted by a purpose-built transpiler." },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: '6 WEEKS?', cap: 'An Azure move, estimated at six weeks.', cap2: 'Done in two.', at2: 12.8 },
  ], sfx: [{ at: 10, w: 'POW!', x: 0.75, y: 0.8, r: -8 }] },
  { b: 112, l: 16, title: 'The team.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], img: card('devops-scaling'), cap: 'Now Matt keeps a second brain: decisions, standards, lessons.' },
    { at: 3.5, r: [1 / 3, 0, 1 / 3, 1], img: photo('starting-point-custom-agents'), cap: 'For a startup: a multi-agent, test-driven build harness.' },
    { at: 6, r: [2 / 3, 0, 1 / 3, 0.5], pix: 'MATT DIRECTS.', cap: 'Claude and Codex build, under tests and review.' },
    { at: 8.5, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'THIS PAGE.', cap: 'This showreel is one of their builds.' },
  ], sfx: [{ at: 15, w: 'SHIP IT!', x: 0.5, y: 0.86, r: -5 }] },
  { b: 128, l: 16, title: 'The craft.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'TASTE.', cap: 'As AI builds more, the value moves to deciding what is worth building.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], img: card('roadmaps-cloud-planning'), cap: 'Every problem examined from several angles.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'NO SPIN.', cap: 'Matt says plainly what will and will not work.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], img: card('cost-planning'), cap: 'Fast-paced, technically demanding work is the fun part.' },
  ], sfx: [{ at: 8, w: 'ZAP!', x: 0.25, y: 0.95, r: 7 }] },
  { b: 144, l: 16, title: 'The offer.', ground: 'teal', freeze: [[3, 5]], panels: [
    { at: 1, r: [0, 0, 0.25, 0.25], pix: '14 WAYS IN.' },
    ...services.map(([group, name, img], i) => {
      const k = i + 1;
      // The group names its first service only, so the grid does not repeat an eyebrow on every cell.
      return { at: 5 + i * 0.66, r: [(k % 4) * 0.25, Math.floor(k / 4) * 0.25, 0.25, 0.25], img: card(img), name, href: pageOf(name), tag: i === 0 || services[i - 1][0] !== group ? group : undefined };
    }),
    { at: 15, r: [0.75, 0.75, 0.25, 0.25], pix: 'ONE ADVISOR.', cap: 'Three kinds of work.' },
  ] },
  { b: 160, l: 16, title: 'Field of dreams.', field: true, planes: 10, panels: [
    { at: 2, r: [0, 0, 1, 0.3], pix: 'IF YOU CAN DREAM IT,', cap: 'Custom agents. Second brains. Chat interfaces. Prototypes.' },
    { at: 6, r: [0.2, 0.34, 0.8, 0.3], pix: 'WE CAN BUILD IT.', cap2: 'Let your ideas fly.', at2: 11 },
  ], sfx: [{ at: 10, w: 'WHOOSH!', x: 0.22, y: 0.8, r: -6 }] },
  { b: 176, l: 8, title: 'Your turn.', panels: [
    { at: 0.5, r: [0, 0, 0.25, 1], ...start('starting-point-cloud-security'), cap: 'Not on the cloud yet?' },
    { at: 1.5, r: [0.25, 0, 0.25, 1], ...start('starting-point-m365-ai'), cap: 'On Microsoft 365, no AI yet?' },
    { at: 2.5, r: [0.5, 0, 0.25, 1], ...start('starting-point-rework'), cap: "Tried Copilot. It didn't stick?" },
    { at: 3.5, r: [0.75, 0, 0.25, 1], ...start('starting-point-custom-agents'), cap: 'Ready for custom agents?' },
  ], sfx: [{ at: 5, w: 'START HERE.', x: 0.5, y: 0.5, r: -4 }] },
  // The close: the static hero's own words, then the song's final silence as a freeze frame.
  // The close: "Better systems. / Capable teams." lands in 8-bit type and resolves into the modern heading (Matt,
  // 2026-09-27: "remove the to be continued scene and pixelate to modern fonts").
  { b: 184, l: 8, close: true, panels: [] },
];
export const homeStory: BeatComicStory = {
  bpm: 100,
  beats: 192,
  close: 184,
  music: { src: '/audio/aphelion-zambolino.mp3', offset: 0.565, credit: 'Music: Aphelion by Zambolino', source: 'https://freetouse.com/music/zambolino/aphelion' },
  // The close shows the static hero's own words where they sit, then the stage folds into this element.
  // No glass panel in the close (Matt, 2026-09-26: "i do not think we should show the glass before the tbc").
  closeScene: { lines: ['Better systems.', 'Capable teams.'], pixelate: 3 },
  track: track('/play/home/'),
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in (Matt, 2026-09-26/27).
  holdEnd: true,
  holdLive: true,
  collapseTo: '.home-intro',
  markPaths,
  pages,
};
