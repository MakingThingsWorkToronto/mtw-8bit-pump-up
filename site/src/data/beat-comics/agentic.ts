// Agentic Systems Beat Comic, the mixtape's Track 02 (Matt, 2026-09-26: "the same ironic 8 bit story telling and that
// story should descend on traditional or classic while also paying homage, it should cycle and ironically narrate a
// superiority over traditional deterministic code, in a give me the tools and i will eat them type way ... be sarcastic
// and serious"). Cut to "Hard Type Beat/Rap Instrumental/Trap - Rodeo" by AlexaStarzBeats (Pixabay), the most dominant
// track in the soundtrack library. Serious claims come from the Agentic Systems pages (someone responsible for results,
// cost per accepted result, quotas by role, shared skills, Claude and Codex under tests and review). The big-firm
// contrast is the homepage's alone (Matt, 2026-09-26), and no slam word repeats.
//
// Pace (Matt: "a bit slower, it needs more scenes to pick up the pace"): Rodeo is 77.33 BPM, so pace is set in seconds,
// not beats: a panel about every two beats (1.5 s, the homepage's rate) and mostly 8-beat pages, with a slam on most
// accents.
//
// Beat map (wiki/soundtrack-library/profiles/pixabay-357226.json): 0.776 s a beat, first downbeat 0.545 s, triplet
// feel; a quiet stuttering intro to beat 19 (stops 7, 9, 14-15, 17, 19); the drop on 20; dead stops on 64, 67 and 96
// (a breakdown to 104); accents 23, 31, 34, 36, 41, 44, 47, 52 ... 169; the song ends on 170. 172 beats = 2:13.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track, tracklist } from './tracklist';

type R = [number, number, number, number];
const services: [string, string][] = [
  ['Second Brain.', 'second-brain'],
  ['Agentic Team Modernization.', 'team-modernization'],
  ['Agentic Cost Planning.', 'cost-planning'],
  ['Agentic DevOps & Scaling.', 'devops-scaling'],
  ['Agent-Ready Websites.', 'agent-ready-websites'],
];
// Each service cell links to its page (Matt, 2026-09-28): the path is the tracklist's for the cell's name.
const pageOf = (name: string) => {
  const t = tracklist.find((x) => `${x.title}.` === name);
  if (!t) throw new Error(`No page for the service cell "${name}" in src/data/beat-comics/tracklist.ts`);
  return t.path;
};
const tools = ['SHAREPOINT.', 'GRAPH API.', 'SQL.', 'EXCEL.'];
const tr = track('/agentic-systems/');
// The "Your turn." photos link where the homepage's Starting Points send each one (src/pages/index.astro; Matt,
// 2026-09-28: "link those to something on the site").
const start = (id: string) => ({ img: photo(id), href: ({
  'starting-point-cloud-security': '/traditional-systems/roadmaps-cloud-planning/',
  'starting-point-m365-ai': '/traditional-systems/information-governance-ai-readiness/',
  'starting-point-rework': '/agentic-systems/agentic-team-modernization/',
  'starting-point-custom-agents': '/agentic-systems/second-brain/',
} as Record<string, string>)[id] });

const pages: BeatComicStory['pages'] = [
  // The first layout, with the track ticker inside the main box like a CD player (Matt, 2026-09-27: "revert the first
  // scene to previous layout and add the track ticker inside the main box so it looks like a cd player"); the intro
  // stutters, so the cover does too.
  // A landing page's cover (Matt, 2026-09-28): the section name scrolls as an 8-bit marquee beside the MTW mark in the
  // main box, over the CD ticker, and TRACK nn. sits in the bottom-left box. Both come from the tracklist.
  { b: 0, l: 8, freeze: [[7, 8]], panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `${tr.title.toUpperCase()}.`, scroll: true, ticker: true, cap: 'Previously: better systems, capable teams.', cap2: 'Now: the agents.', at2: 4 },
    { at: 3, r: [0, 0.74, 0.62, 0.26], pix: `TRACK ${tr.no}.`, small: true },
    { at: 5, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // Homage, played straight, while the song is still quiet; the old code halts on every stop.
  { b: 8, l: 12, title: 'The old ways.', freeze: [[1, 2], [6, 8], [9, 10], [11, 12]], panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'IF / ELSE.', cap: 'In the beginning was the IF.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'CRON 2:00 AM.', cap: 'It ran payroll while you slept.' },
    { at: 5, r: [0, 0.5, 0.5, 0.5], pix: 'STORED PROC.', cap: 'It moved the money. Exactly as written.' },
    { at: 7, r: [0.5, 0.5, 0.5, 0.5], chart: true, cap: 'Deterministic. Tested. It built the world.' },
  ], sfx: [{ at: 9, w: 'RESPECT.', sub: 'Genuinely.', x: 0.5, y: 0.5, r: -4 }] },
  // The drop.
  { b: 20, l: 8, title: 'Enter the agent.', panels: [
    { at: 1, r: [0, 0, 1, 0.38], pix: 'GIVE ME THE TOOLS.', cap: 'Then something hungry walked in.' },
    ...tools.map((t, i) => ({ at: 1.5 + i * 0.5, r: [i * 0.25, 0.4, 0.25, 0.3] as R, rp: [(i % 2) * 0.5, 0.4 + Math.floor(i / 2) * 0.15, 0.5, 0.15] as R, pix: t })),
    { at: 5, r: [0, 0.72, 1, 0.28], pix: 'AND I WILL EAT THEM.' },
  ], sfx: [{ at: 3, w: 'CHOMP!', sub: 'Tools: consumed.', x: 0.5, y: 0.55, r: -6 }] },
  { b: 28, l: 4, panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'GOT ANY MORE?', cap: 'Still hungry.' },
  ], sfx: [{ at: 3, w: 'NOM.', x: 0.8, y: 0.8, r: 8 }] },
  { b: 32, l: 8, title: 'The rulebook.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: '10,000 RULES.', cap: 'The flow chart grew a flow chart.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'IF (TUESDAY).', cap: 'One more branch.' },
    { at: 5, r: [0, 0.5, 1, 0.5], pix: 'ELSE IF. ELSE IF.', cap: 'And another.' },
  ], sfx: [{ at: 2, w: 'IF!', x: 0.26, y: 0.9, r: -8 }, { at: 4, w: 'ELSE!', x: 0.8, y: 0.12, r: 7 }] },
  { b: 40, l: 8, panels: [
    { at: 0, r: [0, 0, 1 / 3, 1], chat: true, cap: 'Then the request came as an email.' },
    { at: 2, r: [1 / 3, 0, 1 / 3, 1], pix: 'READ IT.', cap: 'The agent reads the mess.' },
    { at: 5, r: [2 / 3, 0, 1 / 3, 1], pix: 'EXACT.', cap: 'Code keeps the numbers exact.' },
  ], sfx: [{ at: 1, w: 'EDGE CASE!', sub: 'There is always one more.', x: 0.17, y: 0.85, r: 5 }, { at: 4, w: 'HANDLED.', x: 0.5, y: 0.9, r: -4 }, { at: 7, w: 'CHECKMATE.', x: 0.5, y: 0.1, r: 6 }] },
  // The confident machine.
  { b: 48, l: 8, title: 'The hallucination.', panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'CONFIDENT.', cap: 'It always has an answer.' },
    { at: 3, r: [0.5, 0, 0.5, 1], pix: 'ALSO WRONG.', cap: 'Sometimes one it made up.' },
  ], sfx: [{ at: 4, w: 'OOPS!', sub: 'Made that up.', x: 0.5, y: 0.86, r: -5 }, { at: 7, w: 'SURE?', x: 0.26, y: 0.14, r: 6 }] },
  { b: 56, l: 8, panels: [
    { at: 0, r: [0, 0, 0.5, 1], img: card('second-brain'), cap: 'Unless it reads your knowledge first.' },
    { at: 2, r: [0.5, 0, 0.5, 0.5], pix: 'SOURCES.', cap: 'Answers from your own documents.' },
    { at: 4.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'KNOWLEDGE.', cap: 'Build the knowledge behind the agent.' },
  ], sfx: [{ at: 4, w: 'SOURCED.', x: 0.26, y: 0.86, r: 6 }, { at: 7, w: 'FACT CHECK!', x: 0.26, y: 0.14, r: -5 }] },
  // The song stops dead: the serious bit.
  { b: 64, l: 8, title: 'The serious bit.', ember: 1.7, freeze: [[0, 1], [3, 4]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: photo('starting-point-custom-agents'), cap: 'OK. Serious for a second.' },
    { at: 4, r: [0.46, 0, 0.54, 1], pix: 'JUDGEMENT.', cap: 'The agent drafts. A person decides.' },
  ] },
  { b: 72, l: 8, ember: 1.4, panels: [
    { at: 0, r: [0, 0, 0.5, 1], pix: 'RESPONSIBLE.', cap: 'Every result has someone responsible for it.' },
    { at: 3, r: [0.5, 0, 0.5, 1], pix: 'YOUR CALL.', cap: 'The final say stays with your people.' },
  ], sfx: [{ at: 7, w: 'SIGNED OFF.', x: 0.5, y: 0.88, r: 4 }] },
  // An exact 3 x 2 grid of equal cells, as the homepage's offer grid (Matt, 2026-09-27: "the items are different sizes
  // and not aligned ... the home animation is your benchmark").
  { b: 80, l: 16, title: 'The line-up.', ground: 'teal', panels: [
    { at: 1, r: [0, 0, 1 / 3, 0.5], pix: 'FIVE WAYS IN.' },
    ...services.map(([name, img], i) => {
      const k = i + 1;
      return { at: 2 + i * 1.5, r: [(k % 3) / 3, Math.floor(k / 3) * 0.5, 1 / 3, 0.5] as R, img: card(img), name, href: pageOf(name) };
    }),
  ], sfx: [{ at: 14, w: 'TRACKLIST.', x: 0.5, y: 0.9, r: -4 }] },
  // The breakdown: the plot twist, and the homage comes back.
  { b: 96, l: 8, title: 'The cycle.', freeze: [[0, 1]], panels: [
    { at: 1, r: [0, 0, 0.5, 1], pix: 'PLOT TWIST.', cap: 'Give an agent the same job twice.' },
    { at: 4, r: [0.5, 0, 0.5, 1], pix: 'IF / ELSE.', cap: 'It writes the code. Boring on purpose.' },
  ] },
  { b: 104, l: 8, panels: [
    { at: 0, r: [0, 0, 0.5, 1], img: card('custom-software-development'), cap: 'Claude and Codex write it, under tests and review.' },
    { at: 2, r: [0.5, 0, 0.5, 1], pix: 'FULL CIRCLE.', cap: 'The old ways were right. About that part.' },
  ], sfx: [{ at: 4, w: 'SALUTE.', sub: 'Still genuinely.', x: 0.26, y: 0.86, r: -5 }, { at: 7, w: 'CLASSIC.', x: 0.74, y: 0.14, r: 6 }] },
  { b: 112, l: 8, title: 'Eat. Test. Repeat.', panels: [
    { at: 1, r: [0, 0, 1 / 3, 1], pix: 'EAT.', cap: 'Agents use the tools.' },
    { at: 2, r: [1 / 3, 0, 1 / 3, 1], pix: 'TEST.', cap: 'Tests keep them honest.' },
    { at: 3, r: [2 / 3, 0, 1 / 3, 1], pix: 'REPEAT.', cap: 'Again.' },
  ], sfx: [{ at: 4, w: 'BOOM!', x: 0.5, y: 0.9, r: 6 }, { at: 7, w: 'BURP.', x: 0.84, y: 0.2, r: 9 }] },
  { b: 120, l: 8, panels: [
    { at: 0, r: [0, 0, 0.5, 1], pix: 'SKILLS.', cap: 'Useful work becomes a shared skill.' },
    { at: 2, r: [0.5, 0, 0.5, 1], pix: 'NEXT TIME: FASTER.', cap: 'Every team reuses it.' },
  ], sfx: [{ at: 4, w: 'AGAIN!', x: 0.26, y: 0.86, r: -6 }, { at: 7, w: 'LEVEL UP!', x: 0.74, y: 0.14, r: 5 }] },
  { b: 128, l: 12, title: 'The bill.', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'TOKENS.', cap: 'Somebody pays for every prompt.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], img: card('cost-planning'), cap: 'Quotas by role.' },
    { at: 5, r: [0, 0.5, 1, 0.5], pix: 'COST PER RESULT.', cap: 'Count the accepted result, not the prompt.' },
  ], sfx: [{ at: 2, w: 'TICK.', x: 0.26, y: 0.9, r: -6 }, { at: 4, w: 'TOCK.', x: 0.76, y: 0.12, r: 6 }, { at: 9, w: 'KA-CHING!', x: 0.76, y: 0.28, r: 5 }] },
  { b: 140, l: 4, panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'BUDGET.', cap: 'Planned before prices change.' },
  ], sfx: [{ at: 3, w: 'PLANNED.', x: 0.8, y: 0.8, r: -5 }] },
  { b: 144, l: 16, title: 'Your turn.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], ...start('starting-point-rework'), cap: "Tried an agent. It didn't stick?" },
    { at: 2, r: [0.25, 0, 0.25, 1], ...start('starting-point-m365-ai'), cap: 'Copilot bought. Nobody using it?' },
    { at: 3, r: [0.5, 0, 0.25, 1], ...start('starting-point-cloud-security'), cap: 'Data not ready yet?' },
    { at: 4.5, r: [0.75, 0, 0.25, 1], ...start('starting-point-custom-agents'), cap: 'Ready for real work?' },
  ], sfx: [{ at: 7, w: 'YOU?', x: 0.5, y: 0.5, r: 6 }, { at: 10, w: 'START HERE.', x: 0.5, y: 0.86, r: -4 }, { at: 15, w: 'GO!', x: 0.84, y: 0.2, r: 8 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading (the transition in tech
  // Matt has lived through), then holds with the embers rising. No High Scores or "TO BE CONTINUED." here (Matt,
  // 2026-09-27: "delete the high score and to be continued").
  { b: 160, l: 12, close: true, panels: [] },
];

const art = findSourceImage('service-hero', 'agentic-systems-agents');
export const agenticStory: BeatComicStory = {
  bpm: 77.33,
  beats: 172,
  close: 160,
  track: track('/agentic-systems/'),
  music: { src: '/audio/pixabay-357226-hard-type-beat-rap-instrumental-trap-rodeo.mp3', offset: 0.545, credit: 'Music: Hard Type Beat/Rap Instrumental/Trap - Rodeo by AlexaStarzBeats', source: 'https://pixabay.com/music/beats-hard-type-beatrap-instrumentaltrap-rodeo-357226/' },
  closeScene: { lines: ['Agentic', 'Systems.'], pixelate: 5, lede: 'A useful agent needs the right information, a defined task and someone responsible for its results. Matt helps you choose where agents fit, build the knowledge behind them and plan how the work will run.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};
