// Agent-Ready Websites Beat Comic, the mixtape's Track 07 (Matt, 2026-09-28: "you may dispatch sub agents to build all
// the agentic systems animations"). A rap battle for the website's attention: humans and crawlers were the old crowd,
// then an agent walks in reading for someone else. Round one, the site spits buzzwords and loses; round two, plain,
// linked, current facts; the brain behind the site; one serious chapter on the breakdown (search, training and browser
// actions are separate decisions; one task; no file guarantees a citation); round three, the WebMCP tools, with Send
// kept by the person; this very site as Exhibit A; the verdict: it was never a battle, the reader wins. Claims come from
// the Agent-Ready Websites page (its lede, sections and deliverables) and wiki/site/discoverability.md (this site's
// Markdown reading view, llms.txt and WebMCP tools). No big-firm chapter (homepage only), no slam word twice.
//
// Cut to "Street47 Rap Battle [[FREE]] Rap Beat" by AEXBEATS (Pixabay): a rap battle beat for a battle of readers.
// Beat map (wiki/soundtrack-library/profiles/pixabay-531530.json): 165.75 BPM on the map's grid (0.362 s a beat, first
// downbeat 0.005 s). The loudness repeats every 8 beats (kick on 0, accents on 0 and 5), so it feels half time (82.9
// BPM, a bar of four is 8 map beats); the story uses the map's grid so the checker and engine agree, and sets pace in
// seconds: a panel about every 4 beats (1.45 s), 16-beat pages (5.8 s), slabs held 4 beats (1.45 s).
// Sections: a quiet intro 0-31 (stops 2, 29, 31); the beat drops on 32 and runs to 127 (a stop on 95); a lighter
// section 128-159; a quiet breakdown 160-187 with a dead stop 188-190 (the serious chapter); full again 192-255 (accents
// on 0, 3 and 5 of every 8); lighter 256-319; the song ends on 320. 324 beats = 1:57.
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
// A slab held about 1.45 s, the homepage's 2.6 beats at 100 BPM in seconds.
const slam = (at: number, w: string, x: number, y: number, r: number, sub?: string) => ({ at, w, x, y, r, len: 4, ...(sub ? { sub } : {}) });

const here = '/agentic-systems/agent-ready-websites/';
const tr = track(here);

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's: TRACK 07. in the main box with the CD ticker; the page title small below. The intro
  // stops on 2.
  { b: 0, l: 16, freeze: [[2, 3]], panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Previously: the agents scaled up.', cap2: 'Now: they read your website.', at2: 5 },
    { at: 8, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 11, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // The quiet intro: the old crowd, played straight. The motion holds on the stops (29, 31).
  { b: 16, l: 16, title: 'The crowd.', freeze: [[13, 14], [15, 16]], panels: [
    { at: 1.5, r: [0, 0, 0.5, 0.5], pix: 'HUMANS.', cap: 'They skim. They scroll. They click.' },
    { at: 5.5, r: [0.5, 0, 0.5, 0.5], pix: 'CRAWLERS.', cap: 'Search engines read every page.' },
    { at: 9.5, r: [0, 0.5, 0.5, 0.5], chart: true, cap: 'The old game: rank, then get the click.' },
    { at: 12, r: [0.5, 0.5, 0.5, 0.5], pix: 'GOOD TIMES.', cap: 'It worked for years.' },
  ] },
  // The drop.
  { b: 32, l: 16, title: 'New challenger.', panels: [
    { at: 1, r: [0, 0, 1, 0.4], pix: 'AGENTS.', cap: 'Then a third reader walked in.' },
    { at: 4, r: [0, 0.42, 0.5, 0.58], img: photo('starting-point-custom-agents'), cap: 'It reads your site for someone else.' },
    { at: 8.5, r: [0.5, 0.42, 0.5, 0.58], pix: 'ON A MISSION.', cap: 'It wants one answer. Fast.' },
  ], sfx: [slam(5, 'YO!', 0.5, 0.2, -6, 'Who invited the bot?'), slam(13, 'BEEP BOOP.', 0.26, 0.88, 5)] },
  { b: 48, l: 16, panels: [
    { at: 0, r: [0, 0, 0.5, 1], chat: true, cap: 'A customer asks ChatGPT about you.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'BEFORE THE CLICK.', cap: 'Before they open your site at all.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'OR CLAUDE.', cap: 'Either way, they need a clear, current answer.' },
  ], sfx: [slam(5, 'PSST!', 0.26, 0.88, -5), slam(13, 'NEXT!', 0.74, 0.12, 6)] },
  // Round one: the site spits buzzwords.
  { b: 64, l: 16, title: 'Round one.', panels: [
    { at: 1.5, r: [0, 0, 0.5, 0.5], pix: 'HERO VIDEO.', cap: 'Your site opens with its best verse.' },
    { at: 5.5, r: [0.5, 0, 0.5, 0.5], pix: 'SYNERGY.', cap: 'Solutions. Leverage. Innovation.' },
    { at: 9.5, r: [0, 0.5, 1, 0.5], pix: 'SO WHAT DO YOU DO?', cap: 'The agent, unmoved.' },
  ], sfx: [slam(5, 'HYPE!', 0.26, 0.88, -6), slam(13, 'YAWN.', 0.26, 0.12, 5)] },
  // The song stops on 95: the page is still loading.
  { b: 80, l: 16, freeze: [[15, 16]], panels: [
    { at: 0, r: [0, 0, 1 / 3, 1], pix: 'SKIPPED.', cap: 'It wants facts, not a vibe.' },
    { at: 4, r: [1 / 3, 0, 1 / 3, 1], pix: 'NOTHING TO QUOTE.', cap: 'Nice video, though.' },
    { at: 9, r: [2 / 3, 0, 1 / 3, 1], pix: 'LOADING...', cap: 'Still loading.' },
  ], sfx: [slam(5, 'SKIP!', 0.17, 0.88, -5), slam(13, 'BUFFERING!', 0.5, 0.88, 4)] },
  // Round two: plain facts, linked and current.
  { b: 96, l: 16, title: 'Round two.', panels: [
    { at: 1.5, r: [0, 0, 0.5, 0.5], pix: 'SAY WHAT YOU DO.', cap: 'Clear service descriptions.' },
    { at: 5.5, r: [0.5, 0, 0.5, 0.5], pix: 'LINK IT UP.', cap: 'Services linked to examples.' },
    { at: 9.5, r: [0, 0.5, 0.5, 0.5], pix: 'MATCH THE PAGE.', cap: 'Structured data that matches what people see.' },
    { at: 13, r: [0.5, 0.5, 0.5, 0.5], pix: 'KEEP IT CURRENT.', cap: 'And consistent.' },
  ], sfx: [slam(5, 'FACTS!', 0.26, 0.88, -5), slam(13, 'MIC CHECK!', 0.26, 0.12, 6)] },
  { b: 112, l: 16, panels: [
    { at: 0, r: [0, 0, 0.5, 1], img: card('agent-ready-websites'), cap: 'Now there is something worth quoting.' },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'PLAIN WORDS.', cap: 'On the page, for people first.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'SAME ANSWER.', cap: 'For the person and the agent.' },
  ], sfx: [slam(5, 'QUOTABLE!', 0.26, 0.88, -6), slam(13, 'CRYSTAL.', 0.74, 0.12, 5)] },
  // The lighter section: the knowledge behind the words.
  { b: 128, l: 16, title: 'Behind the site.', ember: 1.3, panels: [
    { at: 1.5, r: [0, 0, 0.5, 1], img: card('second-brain'), cap: 'Behind the words: one agreed source.' },
    { at: 5.5, r: [0.5, 0, 0.5, 0.5], pix: 'ONE SOURCE.', cap: 'Services, experience and decisions, in one place.' },
    { at: 9.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'ONE FIX.', cap: 'Corrections start there and carry through.' },
  ], sfx: [slam(8, 'SYNCED!', 0.26, 0.88, -5)] },
  { b: 144, l: 16, ember: 1.3, panels: [
    { at: 0, r: [0, 0, 1 / 3, 1], img: card('custom-software-development'), cap: 'Claude and Codex use it between sessions.' },
    { at: 4, r: [1 / 3, 0, 1 / 3, 1], pix: 'MATT REVIEWS.', cap: 'A person checks the result.' },
    { at: 8.5, r: [2 / 3, 0, 1 / 3, 1], pix: 'NO AMNESIA.', cap: 'Less explaining it all again.' },
  ], sfx: [slam(8, 'CHECKED.', 0.5, 0.88, 4)] },
  // The breakdown and its dead stop (188-190): the only serious chapter, no slams.
  { b: 160, l: 16, title: 'Real talk.', ember: 1.8, panels: [
    { at: 1.5, r: [0, 0, 0.46, 1], img: card('information-governance'), cap: 'No jokes for a minute.' },
    { at: 5.5, r: [0.46, 0, 0.54, 1 / 3], pix: 'SEARCH.', cap: 'Who may search your site.' },
    { at: 9.5, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'TRAINING.', cap: 'Who may train on it.' },
    { at: 13, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'ACTIONS.', cap: 'What an agent may do there.' },
  ] },
  { b: 176, l: 16, ember: 1.8, freeze: [[12, 15]], panels: [
    { at: 0, r: [0, 0, 1, 0.5], pix: 'SEPARATE DECISIONS.', cap: 'Make each one deliberately.' },
    { at: 4.5, r: [0, 0.5, 0.5, 0.5], pix: 'ONE TASK.', cap: 'Start with one task a visitor needs to complete.' },
    { at: 9, r: [0.5, 0.5, 0.5, 0.5], pix: 'NO GUARANTEE.', cap: 'No special file makes an assistant cite you.' },
  ] },
  // Back to full: round three, the tools.
  { b: 192, l: 16, title: 'Round three.', panels: [
    { at: 1.5, r: [0, 0, 1, 0.4], pix: 'WEBMCP.', cap: 'A page can describe its tools to browser agents.' },
    { at: 5.5, r: [0, 0.42, 0.5, 0.58], pix: 'GET-SERVICE.', cap: 'Ask for a service. Get the facts.' },
    { at: 9.5, r: [0.5, 0.42, 0.5, 0.58], pix: 'SEARCH-JOURNAL.', cap: 'Ask for the thinking. Get the entry.' },
  ], sfx: [slam(8, 'TOOLED UP!', 0.5, 0.2, -5), slam(13, 'WHICH BROWSER?', 0.74, 0.12, 5, 'Support varies.')] },
  { b: 208, l: 16, panels: [
    { at: 0, r: [0, 0, 0.5, 1], chat: true, cap: "An agent fills in the Let's talk form." },
    { at: 4, r: [0.5, 0, 0.5, 0.5], pix: 'READY TO SEND.', cap: 'It reaches for the button.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'NOT YOURS.', cap: 'Send stays with the person.' },
  ], sfx: [slam(8, 'HANDS OFF!', 0.26, 0.88, -6), slam(13, 'NICE TRY, BOT.', 0.74, 0.12, 5)] },
  // This very website is the working example.
  { b: 224, l: 16, title: 'Exhibit A.', panels: [
    { at: 1.5, r: [0, 0, 0.5, 0.5], pix: 'THIS SITE.', cap: 'The working example is the page you are on.' },
    { at: 5.5, r: [0.5, 0, 0.5, 0.5], pix: 'READING VIEW.', cap: 'Each public page in Markdown, for agents.' },
    { at: 9.5, r: [0, 0.5, 0.5, 0.5], pix: 'LLMS.TXT.', cap: 'A map of the lot.' },
    { at: 13, r: [0.5, 0.5, 0.5, 0.5], pix: 'CHECK IT.', cap: 'Built from the published pages. Compare them.' },
  ], sfx: [slam(8, 'PROOF!', 0.74, 0.88, 5), slam(13, 'LIVE.', 0.26, 0.12, -5)] },
  // The Agentic Systems services: an exact 3 x 2 grid of thirds, as Track 02's line-up.
  { b: 240, l: 16, title: 'The crew.', ground: 'teal', panels: [
    { at: 1, r: [0, 0, 1 / 3, 0.5], pix: 'THE CREW.' },
    ...services.map(([name, img], i) => {
      const k = i + 1;
      // This page's own cell names it but does not link (it would link to the page it is on).
      return { at: 2 + i * 1.5, r: [(k % 3) / 3, Math.floor(k / 3) * 0.5, 1 / 3, 0.5] as R, img: card(img), name, ...(pageOf(name) === here ? {} : { href: pageOf(name) }) };
    }),
  ], sfx: [slam(13, 'SQUAD!', 0.5, 0.9, -4)] },
  // The lighter outro: it was never a battle.
  { b: 256, l: 16, title: 'The verdict.', panels: [
    { at: 1.5, r: [0, 0, 1, 0.4], pix: 'WHO WON?', cap: 'Humans, crawlers or agents?' },
    { at: 5.5, r: [0, 0.42, 0.5, 0.58], pix: 'THE READER.', cap: 'Person or agent, the answer is clear.' },
    { at: 9.5, r: [0.5, 0.42, 0.5, 0.58], pix: 'NO BATTLE.', cap: 'One website. Every reader.' },
  ], sfx: [slam(8, 'WINNER!', 0.5, 0.2, 5)] },
  { b: 272, l: 8, panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'MIC DROP.', cap: 'The website leaves the stage.', cap2: 'Send button untouched.', at2: 4 },
  ] },
  // One image kind per scene: four cinematic photos, each linking where its question leads.
  { b: 280, l: 32, title: 'Your turn.', panels: [
    { at: 1.5, r: [0, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/contact/?service=agent-ready-websites', cap: 'Customers asking an assistant first?' },
    { at: 5.5, r: [0.25, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/agentic-systems/second-brain/', cap: 'Facts that change every month?' },
    { at: 9.5, r: [0.5, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/contact/?service=agent-ready-websites&type=call', cap: 'One task an agent could help with?' },
    { at: 13.5, r: [0.75, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/traditional-systems/information-governance-ai-readiness/', cap: 'Unsure what AI may reach?' },
  ], sfx: [slam(16, 'YOUR VERSE.', 0.5, 0.88, -4, 'Bring one visitor task.'), slam(24, 'ENCORE!', 0.84, 0.2, 6)] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds.
  { b: 312, l: 12, close: true, panels: [] },
];

const art = findSourceImage('service-hero', 'agent-ready-websites');
export const agentReadyWebsitesStory: BeatComicStory = {
  bpm: 165.75,
  beats: 324,
  close: 312,
  track: tr,
  music: { src: '/audio/pixabay-531530-street47-rap-battle-free-rap-beat.mp3', offset: 0.005, credit: 'Music: Street47 Rap Battle [[FREE]] Rap Beat by AEXBEATS', source: 'https://pixabay.com/music/beats-street47-rap-battle-free-rap-beat-531530/' },
  closeScene: { lines: ['Agent-Ready', 'Websites.'], pixelate: 5, lede: 'Your next visitor may arrive through an AI assistant. Help them find a clear answer about your business, then take a useful next step on the website you already have.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};
