// About Matt Beat Comic, the mixtape's Track 19, the last on Disc 1 (Matt, 2026-09-28: "about matt also needs the 8
// bit"). The homepage (Track 01) already tells Matt's origin story; this one goes deeper, from the About page, as an
// 8-bit character sheet: who he is and what he builds, what he works on now (the startup's build harness, the insurer's
// decoded system, the wiki this site is built from), his skill tree (the eight areas of expertise), his inventory (the
// platforms), achievements (the awards and PnP Modern Search), the worlds he has worked in (industries, with the law
// firm, drilling and construction work), his biggest build (the utility's field training platform), the ways to engage,
// how an engagement runs, then (the only serious chapter, on the song's breakdown) how Matt works, and the side quests.
// Claims come only from src/pages/about-matt.astro; no employers, no school, no dates, no client names, no prices.
// No big-firm chapter (homepage only), no slam word twice.
//
// Cut to "Retro" by The_Mountain (Pixabay): synthwave for an 8-bit character sheet.
// Beat map (wiki/soundtrack-library/profiles/pixabay-143303.json): 112 BPM (0.536 s a beat), first downbeat 0.06 s,
// straight feel. Grid checked: the kick onsets lock to 112 BPM (vector strength 0.32 against 0.10 or less at 104-120) with
// the same phase, 0.05-0.11 s, in every quarter of the song, and the sections change exactly on beats 48, 80 and 208, so
// the phrases repeat on whole bars. The per-beat loudness: the groove 0-47 (peaks 10, 24, 28, 44-46); a dip 48-63
// (quietest 52-55); a half-level build 64-79; the full section 80-171 (peaks 86, 96, 100, 104, 119, 132, 138, 146, 150,
// 154, 158, and the song's one detected hit, 168); the breakdown 172-207, the song's quietest long stretch (no mid-song
// dead stop); full again 208-239 (peaks 208, 218, 226, 232, 234); a quieter outro 240-255 (a bump on 252); the fade from
// 256 and the dead stop 257-261. The profile lists only 168 as an accent, so the slams sit on the table's loudness peaks.
// Pace in seconds: a panel every 3 beats (1.6 s), 16-beat pages (8.6 s) on the phrases.
// The story ends at 268 beats (143.6 s), 4.3 s before the song file (147.91 s); the close holds on the fade.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

type R = [number, number, number, number];
const tr = track('/about-matt/');
// A 2 x 2 grid of halves, a panel every `step` beats from `from`.
const quad = (from: number, step = 3) => [0, 1, 2, 3].map((i) => ({ at: from + i * step, r: [(i % 2) * 0.5, Math.floor(i / 2) * 0.5, 0.5, 0.5] as R }));
// The skill tree: the page's eight areas of expertise on an exact 4 x 2 grid of quarters.
const skills: [string, string][] = [
  ['AGENTS.', 'Multi-agent build loops, second brains.'],
  ['COPILOT.', 'Readiness, agents, access reviews first.'],
  ['SHAREPOINT.', 'Intranets and search people use.'],
  ['POWER PLATFORM.', 'Hundreds of durable flows.'],
  ['SECURITY.', 'Entra ID access, Purview labels.'],
  ['MIGRATIONS.', 'Mapped, cut over, reconciled.'],
  ['AZURE.', 'SharePoint Framework, Azure Functions.'],
  ['ADVISORY.', 'Discovery, estimates, rescue work.'],
];

const pages: BeatComicStory['pages'] = [
  // The cover, as a service page's: the mark and TRACK 19. with the CD ticker inside the main box.
  { b: 0, l: 16, panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Previously: eighteen tracks.', cap2: 'Now: the person behind them.', at2: 9 },
    { at: 4, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 7, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // The groove: the page's lede, split across the panels like narration.
  { b: 16, l: 16, title: 'Character select.', panels: [
    { ...quad(1)[0], pix: 'MATT STARK.', cap: 'Agentic and Microsoft 365 architect.' },
    { ...quad(1)[1], img: card('second-brain'), cap: 'He builds what AI depends on: second brains,' },
    { ...quad(1)[2], img: card('roles-access-control'), cap: 'secure Microsoft 365 and Azure environments,' },
    { ...quad(1)[3], img: card('m365-migrations'), cap: 'and the migrations that get information there.' },
  ], sfx: [{ at: 12, w: 'LOCKED IN!', x: 0.25, y: 0.12, r: -6 }] },
  // Recent work first.
  { b: 32, l: 16, title: 'Now playing.', panels: [
    { ...quad(1)[0], pix: 'BUILD HARNESS.', cap: "Multi-agent, test-driven, built with a startup's founders.", cap2: 'They test and release with it.', at2: 5 },
    { ...quad(1)[1], pix: 'AZURE + MCP.', cap: 'The platform runs on Azure, with role-based access.' },
    { ...quad(1)[2], img: card('information-governance'), cap: "A national insurer's document system, older than the web." },
    { ...quad(1)[3], pix: 'MANUALS + CODE.', cap: 'Reverse-engineered with AI. Then the migration tool and its tests.' },
  ], sfx: [{ at: 12, w: 'DECODED!', x: 0.75, y: 0.12, r: 5 }] },
  // The dip: the second brain that does the briefing, and the running joke's one moment.
  { b: 48, l: 16, title: 'The briefing.', panels: [
    { ...quad(1)[0], pix: 'THE WIKI.', cap: 'This website has a maintained wiki.' },
    { ...quad(1)[1], pix: 'CLAUDE + CODEX.', cap: 'They build the site from it.' },
    { ...quad(1)[2], chat: true, cap: 'Less repeated input from Matt.' },
    { ...quad(1)[3], pix: 'THIS TRACK.', cap: 'Built the same way.', cap2: 'Work carried forward.', at2: 13 },
  ], sfx: [{ at: 14, w: 'NOTED.', x: 0.25, y: 0.88, r: -4 }] },
  // The build: the eight areas land as one grid, read as a whole.
  { b: 64, l: 16, title: 'Skill tree.', ground: 'teal', panels: [
    ...skills.map(([pix, cap], i) => ({ at: 1 + i * 1.5, r: [(i % 4) * 0.25, Math.floor(i / 4) * 0.5, 0.25, 0.5] as R, pix, cap })),
  ], sfx: [{ at: 14, w: 'SKILL UP!', x: 0.5, y: 0.88, r: 5 }] },
  // The full section: the platforms.
  { b: 80, l: 16, title: 'Inventory.', panels: [
    { ...quad(1)[0], pix: 'CLAUDE CODE.', cap: 'Codex, GitHub Copilot, Perplexity, MCP.' },
    { ...quad(1)[1], pix: 'MICROSOFT 365.', cap: 'SharePoint, Teams, Copilot, Purview, Entra ID.' },
    { ...quad(1)[2], pix: 'AZURE + AWS.', cap: 'Functions, Container Apps, AI Foundry, Bedrock.' },
    { ...quad(1)[3], pix: 'TYPESCRIPT.', cap: 'React, C#, .NET, Jest, Playwright.', cap2: 'The work picks the tool.', at2: 13 },
  ], sfx: [{ at: 6, w: 'EQUIPPED!', x: 0.25, y: 0.12, r: -5 }] },
  { b: 96, l: 16, title: 'Achievements.', panels: [
    { ...quad(1)[0], pix: 'USABILITY AWARD.', cap: 'Nielsen Norman Group, for a law firm intranet.' },
    { ...quad(1)[1], pix: 'STEP TWO PLATINUM.', cap: 'An innovation award, for a custom search solution.' },
    { ...quad(1)[2], pix: 'INNOVATION & GROWTH.', cap: "A client's President's Award, for a trades mentorship platform." },
    { ...quad(1)[3], pix: 'PNP MODERN SEARCH.', cap: 'Community contributions: samples, fixes, add-ins.' },
  ], sfx: [{ at: 4, w: 'UNLOCKED!', x: 0.25, y: 0.12, r: -6 }, { at: 8, w: 'BLING!', x: 0.75, y: 0.12, r: 6 }] },
  // Industries served: the count climbs to thirteen while the scene holds.
  { b: 112, l: 16, title: 'World map.', panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: '13 WORLDS.', count: { from: 1, step: 1, every: 0.5, after: 0.5, to: 13, fmt: '# WORLDS.', fmt1: '1 WORLD.' }, cap: 'Industries served, from law firms to startups.' },
    { at: 4, r: [0, 0.5, 1 / 3, 0.5], pix: 'LAW FIRMS.', cap: 'Ethical walls, enforced from the matters system.' },
    { at: 7, r: [1 / 3, 0.5, 1 / 3, 0.5], pix: 'DRILLING.', cap: 'Guest access, Purview labels, data loss prevention.' },
    { at: 10, r: [2 / 3, 0.5, 1 / 3, 0.5], pix: 'CONSTRUCTION.', cap: 'A multilingual knowledge management system.' },
  ], sfx: [{ at: 7, w: 'WARP ZONE!', x: 0.5, y: 0.12, r: 5 }] },
  // The biggest build, deeper than the homepage's numbers.
  { b: 128, l: 16, title: 'Boss level.', panels: [
    { ...quad(1)[0], img: card('power-platform-logic-apps'), cap: "A utility's field training platform. Matt hired and led its developers." },
    { ...quad(1)[1], pix: '30+ REPORTS.', count: { from: 5, step: 5, every: 0.5, to: 30, fmt: '#+ REPORTS.' }, cap: 'Power BI, averaging 10k+ monthly views.' },
    { ...quad(1)[2], pix: 'HISTORY CUBE.', cap: 'Built in Dataverse.' },
    { ...quad(1)[3], pix: '6,000 USERS.', cap: 'Internal and external, in one Entra ID access model.' },
  ], sfx: [{ at: 4, w: 'CRITICAL HIT!', x: 0.25, y: 0.12, r: -5 }, { at: 10, w: 'COMBO!', x: 0.75, y: 0.12, r: 6 }] },
  // Ways to engage: the page's packages and their durations; no prices.
  { b: 144, l: 16, title: 'Ways to play.', panels: [
    { ...quad(1)[0], pix: 'TWO WEEKS.', cap: 'A SharePoint second brain that Copilot answers from.' },
    { ...quad(1)[1], pix: 'OR TWO WEEKS.', cap: 'A Claude Code or Codex second brain. First base.' },
    { ...quad(1)[2], pix: 'ABOUT SIX WEEKS.', cap: 'An enterprise second brain on AWS Bedrock or Azure AI Foundry.' },
    { ...quad(1)[3], pix: 'PLAN AND SHADOW.', cap: 'At enterprise scale, Matt plans while a larger firm implements.' },
  ], sfx: [{ at: 6, w: 'SPEEDRUN!', x: 0.25, y: 0.12, r: -6 }, { at: 14, w: 'CO-OP.', x: 0.25, y: 0.88, r: 5 }] },
  // How an engagement runs; the song's one detected hit (168) accepts the quest. The band drops out on 172.
  { b: 160, l: 16, title: 'Quest log.', panels: [
    { ...quad(1)[0], pix: 'UNDERSTAND.', cap: 'The work that is difficult, and the people involved.' },
    { ...quad(1)[1], pix: 'SCOPE.', cap: 'Priorities, dependencies and decisions, agreed before a build.' },
    { ...quad(1)[2], pix: 'STAY CLOSE.', cap: 'The plan tied to the build, the tests and the issues that emerge.' },
    { ...quad(1)[3], pix: 'ONGOING USE.', cap: 'Who operates it after, with support where needed.' },
  ], sfx: [{ at: 8, w: 'QUEST ACCEPTED!', sub: 'Scope first.', x: 0.25, y: 0.12, r: -5 }] },
  // The breakdown, the song's quietest long stretch (it has no dead stop before its end): the only serious chapter, two
  // pages, no slams. How Matt works.
  { b: 176, l: 16, title: 'Straight talk.', ember: 1.8, panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: card('roadmaps-cloud-planning'), cap: 'You work directly with Matt on the decisions that shape the project.' },
    { at: 4, r: [0.46, 0, 0.54, 1 / 3], pix: 'ONE SENIOR PERSON.', cap: 'Start to finish. You pay for the work.' },
    { at: 7, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'INFORM, NOT AGREE.', cap: 'His role is to inform the decision, not to agree with it.' },
    { at: 11, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'MORE HANDS.', cap: 'Contractors he trusts, when a job needs them.' },
  ] },
  { b: 192, l: 16, ember: 1.8, panels: [
    { at: 1, r: [0, 0, 1, 0.5], pix: 'RESCUE WORK.', cap: 'Projects that need rescue: the cause, as well as the fix.' },
    { at: 5, r: [0, 0.5, 0.5, 0.5], pix: 'MENTORING.', cap: 'Developers, and the delivery teams he hires and leads.' },
    { at: 9, r: [0.5, 0.5, 0.5, 0.5], pix: 'PLAINLY.', cap: 'What will work, and what will not.' },
  ] },
  // Back on 208: where to find him.
  { b: 208, l: 16, title: 'Save point.', panels: [
    { ...quad(1)[0], pix: 'REMOTE FIRST.', cap: 'From the Greater Toronto Area.' },
    { ...quad(1)[1], pix: 'IN PERSON.', cap: 'Toronto, Mississauga, the Golden Horseshoe.' },
    { ...quad(1)[2], pix: 'REFERENCES.', cap: 'And a full resume, on request.' },
    { ...quad(1)[3], chat: true, cap: 'The legal second brain, shown live on a call.' },
  ], sfx: [{ at: 10, w: 'CHECKPOINT!', x: 0.25, y: 0.12, r: -5 }] },
  // The rest of the experience, fast.
  { b: 224, l: 16, title: 'Side quests.', panels: [
    { ...quad(1, 2.5)[0], pix: '10 WEB PARTS.', count: { from: 1, step: 1, every: 0.3, to: 10, fmt: '# WEB PARTS.', fmt1: '1 WEB PART.' }, cap: 'Converted to Azure Functions and SharePoint Framework.' },
    { ...quad(1, 2.5)[1], pix: 'SEARCH CENTRE.', cap: "A law firm's, rebuilt on PnP Modern Search." },
    { ...quad(1, 2.5)[2], pix: 'CUSTOM TOOLS.', cap: 'For sources that product tooling did not cover.' },
    { ...quad(1, 2.5)[3], pix: 'HUNDREDS OF FLOWS.', cap: 'Registrations, inspections, audits, approvals.' },
  ], sfx: [{ at: 8, w: 'EXTRA LIFE!', sub: 'For old web parts.', x: 0.25, y: 0.12, r: -6 }, { at: 10, w: 'BONUS!', x: 0.75, y: 0.12, r: 5 }] },
  // The quieter outro. Each box links where its question leads (a page with a Beat Comic, or the contact form).
  { b: 240, l: 16, title: 'Your turn.', panels: [
    { at: 1, r: [0, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/agentic-systems/agentic-devops-scaling/', cap: 'Agents that build and test?' },
    { at: 4, r: [0.25, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/agentic-systems/second-brain/', cap: 'A second brain in SharePoint?' },
    { at: 7, r: [0.5, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/contact/', cap: 'A project that has stalled?' },
    { at: 10, r: [0.75, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/contact/?type=demo', cap: 'Want to see one live?' },
  ], sfx: [{ at: 12, w: 'YOUR MOVE!', x: 0.5, y: 0.12, r: -4 }] },
  // On the fade: the page's own hero. Its heading lands in 8-bit type and resolves into the modern heading on 261, the
  // end of the song's final stop, then holds.
  { b: 256, l: 12, close: true, panels: [] },
];

// The hero image as the page resolves it: the cinematic scene of Matt beside a laptop, or the portrait standing in.
const art = (() => { try { return findSourceImage('portrait', 'matt-scene'); } catch { return findSourceImage('portrait', 'matt-stark'); } })();
export const aboutMattStory: BeatComicStory = {
  bpm: 112,
  // One pass of the song is 264 beats; the close starts on the fade (256) and the story ends at 268 (143.6 s), inside
  // the 147.91 s file, holding while the music plays on.
  beats: 268,
  close: 256,
  track: tr,
  music: { src: '/audio/pixabay-143303-retro.mp3', offset: 0.06, credit: 'Music: Retro by The_Mountain', source: 'https://pixabay.com/music/synthwave-retro-143303/' },
  closeScene: { lines: ['About', 'Matt.'], pixelate: 5, layout: 'full-bleed', lede: 'Matt Stark is an agentic and Microsoft 365 architect. He plans and builds what AI depends on: second brains, secure Microsoft 365 and Azure environments, and the migrations that get information there. He works directly with the leaders who own the result, from the Greater Toronto Area and remotely.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  // The About hero is a full-bleed scene with no .page-art: the stage folds into the hero's lede, the text block the
  // reader lands on (it carries data-reveal, so the hand-off follows its reveal rather than waiting out the engine's
  // 4 s cap, as a target that never reveals would).
  collapseTo: '.about-hero .lede',
  markPaths,
  pages,
};
