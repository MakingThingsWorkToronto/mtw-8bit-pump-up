// Information Governance & AI Readiness Beat Comic, the mixtape's Track 11 (Matt, 2026-09-28: "these are all insane.
// please do traditional systems now"). The underground: every file anyone ever shared is still down there, and Copilot
// arrives with a shovel. It adds no access; it digs up what people could already open. Then the controls, one by one
// (permissions debt, a defined corner with its owners, labels, Purview DLP, access reviews, restricted sites, agents and
// their identities, coding agents), the quiet ones on the breakdown (Restricted Content Discovery, the inventory,
// retention), and (the only serious chapter, on the breakdown's dead stops) who decides and who keeps it fixed. Claims
// come from the Information Governance & AI Readiness page: Copilot surfaces content the user already has permission to
// view; old sharing links, broad groups and sites without an active owner; a defined part of the estate with its content
// owners; labels and a manageable set; a DLP policy keeps selected labelled files out of Copilot responses with access
// unchanged; owners review people, groups and the permissions of applications and agents (stays, changes or ends); the
// second condition of restricted site access; delegated or application identity, owner, purpose and connections, and
// "adding an agent does not fix an overshared source"; Claude Code, Codex and GitHub Copilot; this website built with
// Claude Code and Codex under tests and human review; Restricted Content Discovery; the inventory; retention; the two
// offers and four deliverables. The file names and the "spreadsheet nobody was meant to find" are illustrations, not
// client facts. No big-firm chapter (homepage only), no slam word twice.
//
// Cut to "Underground" by phonk_music (Pixabay): dark, bass-heavy phonk for what is buried in the file shares.
// Beat map (wiki/soundtrack-library/profiles/pixabay-189258.json): 86.66 BPM (0.692 s a beat), first downbeat 0.615 s,
// triplet feel (the hats; the grid is read at 86.66, not half or double time); a quiet intro 0-19 (the map lists it as
// stops), the drop on 20; phrases on 20, 36, 52 ... (4 mod 16, so every page here starts a beat-4 bar); the full section
// 20-105 with its loudest beats on 30, 46, 62, 78, 94 (the map's hits are 30 and 62) and 41, 57, 73; the breakdown
// 106-147 with dead stops on 112-113, 115, 118, 122-126, 128, 131, 133-137, 139, 142 and 144-147; back on 148, loud to
// 190 (peak 158); thinner 191-206; the song ends on 212 (157.4 s). The story ends at beat 192 (133.6 s), well inside the
// file, and holds while the music plays on and loops.
// Pace in seconds: a panel about every 1.5 s = 2-2.5 beats; 8-beat pages (5.5 s), 16 on the breakdown.
import type { BeatComicStory } from './types';
import { findSourceImage } from '../../lib/images';
import { card, photo, markPaths } from './sources';
import { track } from './tracklist';

type R = [number, number, number, number];
const tr = track('/traditional-systems/information-governance-ai-readiness/');
const receive = ['SHARING FINDINGS.', 'PROTECTION POLICIES.', 'REVIEW OWNERS.', 'AGENT RULES.'];

const pages: BeatComicStory['pages'] = [
  // The cover, as the homepage's and the service pages': the mark and TRACK 11. with the CD ticker inside the main box.
  // The quiet intro stutters under it.
  { b: 0, l: 12, freeze: [[1, 2], [9, 10]], panels: [
    { at: 0, r: [0, 0, 1, 0.74], mark: true, pix: `TRACK ${tr.no}.`, ticker: true, cap: 'Down here: every file anyone ever shared.', cap2: 'Still shared.', at2: 6 },
    { at: 4, r: [0, 0.74, 0.62, 0.26], pix: `${tr.title.toUpperCase()}.`, small: true },
    { at: 8, r: [0.62, 0.74, 0.38, 0.26], chat: true, cap: 'Sarcastic. Also serious.' },
  ] },
  // Still the quiet intro: the archive, before anyone digs.
  { b: 12, l: 8, title: 'Down here.', freeze: [[2, 3], [6, 7]], panels: [
    { at: 0.5, r: [0, 0, 1 / 3, 1], pix: 'THE S: DRIVE.', cap: 'Where old projects went to rest.' },
    { at: 3, r: [1 / 3, 0, 1 / 3, 1], pix: 'FINAL_V7.', cap: 'Last opened: nobody remembers.' },
    { at: 5.5, r: [2 / 3, 0, 1 / 3, 1], pix: 'LINK: ANYONE.', cap: 'Made for one meeting. Never switched off.' },
  ] },
  // The drop: Copilot arrives. One image kind here: the photo, the rest pixel type.
  { b: 20, l: 8, title: 'The dig.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], img: photo('starting-point-m365-ai'), cap: 'Then Copilot arrived with a shovel.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'ASK IT ANYTHING.', cap: 'It answers from what you can already open.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'ANYTHING.', cap: 'Including the basement.' },
  ], sfx: [{ at: 2, w: 'DIG!', x: 0.26, y: 0.88, r: -6 }] },
  { b: 28, l: 8, title: 'Unearthed.', panels: [
    { at: 0, r: [0, 0, 1, 0.5], pix: 'UNEARTHED.', cap: 'The spreadsheet nobody was meant to find.' },
    { at: 3.5, r: [0, 0.5, 0.5, 0.5], pix: 'NO BREAK-IN.', cap: 'Copilot adds no access.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'ALREADY OPEN.', cap: 'Broad sharing shows once people ask questions.' },
  ], sfx: [{ at: 2, w: 'CLANG!', sub: 'Struck a file.', x: 0.84, y: 0.14, r: 6 }] },
  { b: 36, l: 8, title: 'Permissions debt.', panels: [
    { at: 0.5, r: [0, 0, 1 / 3, 1], pix: 'OLD LINKS.', cap: 'Shared for projects long finished.' },
    { at: 3, r: [1 / 3, 0, 1 / 3, 1], pix: 'BROAD GROUPS.', cap: 'A whole department, for one file.' },
    { at: 5.5, r: [2 / 3, 0, 1 / 3, 1], pix: 'NO OWNER.', cap: 'Sites without an active owner.' },
  ], sfx: [{ at: 5, w: 'INTEREST!', sub: 'Compounding.', x: 0.17, y: 0.88, r: -5 }] },
  { b: 44, l: 8, title: 'Pick a corner.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], img: card('roles-access-control'), cap: 'Not the whole estate at once.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'ONE CORNER.', cap: 'A defined part, with its content owners.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'FINDINGS.', cap: 'Each one goes to an owner.' },
  ], sfx: [{ at: 2, w: 'SCOPED.', x: 0.26, y: 0.88, r: 5 }] },
  { b: 52, l: 8, title: 'Labels.', panels: [
    { at: 0.5, r: [0, 0, 1 / 3, 1], pix: 'CONFIDENTIAL.', cap: 'A label says how sensitive it is.' },
    { at: 3, r: [1 / 3, 0, 1 / 3, 1], pix: 'PROTECTED.', cap: 'It can apply the protection you configured.' },
    { at: 5.5, r: [2 / 3, 0, 1 / 3, 1], pix: 'A FEW.', cap: 'Start with a set people can maintain.' },
  ], sfx: [{ at: 5, w: 'LABELLED!', x: 0.17, y: 0.88, r: -6 }] },
  { b: 60, l: 8, title: 'Keep it out.', panels: [
    { at: 0, r: [0, 0, 0.5, 0.5], pix: 'PURVIEW DLP.', cap: 'A policy for selected labelled files.' },
    { at: 2.5, r: [0.5, 0, 0.5, 0.5], pix: 'NOT IN ANSWERS.', cap: 'Kept out of Copilot responses.' },
    { at: 5, r: [0, 0.5, 1, 0.5], pix: 'ACCESS: UNCHANGED.', cap: 'The person can still open the file. Test it where your team works.' },
  ], sfx: [{ at: 2, w: 'BLOCKED!', x: 0.26, y: 0.12, r: -5 }] },
  { b: 68, l: 8, title: 'Still need it?', panels: [
    { at: 0.5, r: [0, 0, 0.5, 0.5], pix: 'ACCESS REVIEW.', cap: 'Owners confirm who still needs access.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'PEOPLE. GROUPS.', cap: 'Reviewed side by side.' },
    { at: 5.5, r: [0, 0.5, 1, 0.5], pix: 'APPS AND AGENTS TOO.', cap: 'Their permissions are reviewed as well.', cap2: 'Stays, changes or ends.', at2: 7 },
  ], sfx: [{ at: 5, w: 'TICK!', sub: 'Or cross.', x: 0.26, y: 0.12, r: 6 }] },
  { b: 76, l: 8, title: 'Two keys.', panels: [
    { at: 0, r: [0, 0, 1 / 3, 1], img: photo('starting-point-cloud-security'), cap: 'For business-critical sites.' },
    { at: 2.5, r: [1 / 3, 0, 1 / 3, 1], pix: 'KEY ONE.', cap: 'Permission to the content.' },
    { at: 5, r: [2 / 3, 0, 1 / 3, 1], pix: 'KEY TWO.', cap: "Membership in the site's control group." },
  ], sfx: [{ at: 2, w: 'KNOCK KNOCK.', sub: 'Both keys, please.', x: 0.17, y: 0.88, r: -5 }] },
  { b: 84, l: 8, title: 'Agent sprawl.', panels: [
    { at: 0.5, r: [0, 0, 0.5, 1], img: photo('starting-point-custom-agents'), cap: 'Then everyone wanted to build an agent.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'WHO BUILDS?', cap: 'Decide who can build agents.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'ON THE RECORD.', cap: 'Each agent: its owner, purpose and connections.' },
  ], sfx: [{ at: 6, w: 'SPRAWL!', x: 0.26, y: 0.88, r: 6 }] },
  { b: 92, l: 8, title: 'Whose access?', panels: [
    { at: 0, r: [0, 0, 1 / 3, 1], pix: 'DELEGATED.', cap: "Working with a person's access." },
    { at: 2.5, r: [1 / 3, 0, 1 / 3, 1], pix: 'APP IDENTITY.', cap: 'Or an identity of its own.' },
    { at: 5, r: [2 / 3, 0, 1 / 3, 1], pix: 'SAME MESS.', cap: 'Adding an agent does not fix an overshared source.' },
  ], sfx: [{ at: 2, w: 'ID, PLEASE.', x: 0.17, y: 0.88, r: -5 }] },
  // The last loud page; the song drops away on 106.
  { b: 100, l: 8, title: 'Coding agents.', panels: [
    { at: 0.5, r: [0, 0, 1, 0.5], pix: 'RULES TOO.', cap: 'Claude Code, Codex and GitHub Copilot.' },
    { at: 3, r: [0, 0.5, 0.5, 0.5], pix: 'WHICH KEYS?', cap: 'Credentials and environments they may use.' },
    { at: 5.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'THIS SITE.', cap: 'Built with Claude Code and Codex, under tests and human review.' },
  ], sfx: [{ at: 4, w: 'MERGE?', sub: 'After review.', x: 0.76, y: 0.12, r: 5 }] },
  // The breakdown, quiet: out of sight is not out of reach.
  { b: 108, l: 8, title: 'Out of sight.', ember: 1.4, freeze: [[4, 6], [7, 8]], panels: [
    { at: 0.5, r: [0, 0, 0.5, 0.5], pix: 'HIDE IT?', cap: 'Restricted Content Discovery.' },
    { at: 3, r: [0.5, 0, 0.5, 0.5], pix: 'OUT OF SEARCH.', cap: 'Out of organization-wide search and Copilot, while you review.' },
    { at: 5.5, r: [0, 0.5, 1, 0.5], pix: 'STILL OPEN.', cap: 'Anyone with access can still open it.', cap2: 'Hidden is not removed.', at2: 7 },
  ], sfx: [{ at: 4, w: 'SHH.', x: 0.26, y: 0.12, r: -4 }] },
  { b: 116, l: 16, title: 'The inventory.', ember: 1.4, freeze: [[2, 3], [6, 11], [12, 13], [15, 16]], panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'EVERY SITE.', cap: 'One inventory of the sites your teams use.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'WHY IT EXISTS.', cap: 'An owner who can say who needs it.' },
    { at: 6, r: [0, 0.5, 0.5, 0.5], pix: 'RETENTION.', cap: 'How long it is kept. Not who can open it.' },
    { at: 8.5, r: [0.5, 0.5, 0.5, 0.5], pix: 'DUPLICATES.', cap: 'Reviewed before anything is removed.', cap2: 'Yes, every copy.', at2: 11 },
  ] },
  // The breakdown's dead stops: the only serious chapter, no slams.
  { b: 132, l: 16, title: 'Straight talk.', ember: 1.8, freeze: [[1, 6], [7, 8], [10, 11], [12, 16]], panels: [
    { at: 1, r: [0, 0, 0.46, 1], img: card('information-governance'), cap: 'No jokes down here.' },
    { at: 4, r: [0.46, 0, 0.54, 1 / 3], pix: 'SHOULD THEY SEE IT?', cap: 'Check before an assistant helps people find more.' },
    { at: 8, r: [0.46, 1 / 3, 0.54, 1 / 3], pix: 'SOMEONE DECIDES.', cap: 'An owner for every finding.' },
    { at: 11.5, r: [0.46, 2 / 3, 0.54, 1 / 3], pix: 'SOMEONE KEEPS IT.', cap: 'Fixed before wider AI use, and kept that way.' },
  ] },
  // Back on 148: the page's two offers, then its four deliverables in an exact row of quarters.
  { b: 148, l: 16, title: 'How Matt can help.', ground: 'teal', panels: [
    { at: 1, r: [0, 0, 0.5, 0.5], pix: 'REVIEW READINESS.', cap: 'Sharing, labels and ownership, then a prioritized list of changes.' },
    { at: 3.5, r: [0.5, 0, 0.5, 0.5], pix: 'RULES FOR AGENTS.', cap: 'Who builds them, what they reach, how coding agents are reviewed.' },
    ...receive.map((w, i) => ({ at: 6 + i, r: [i * 0.25, 0.5, 0.25, 0.5] as R, pix: w })),
  ], sfx: [{ at: 10, w: 'SORTED.', x: 0.5, y: 0.12, r: -4 }] },
  { b: 164, l: 8, title: 'Your turn.', panels: [
    // One image kind: four cinematic photos, each once; each box links where its question leads.
    { at: 0.5, r: [0, 0, 0.25, 1], img: photo('starting-point-m365-ai'), href: '/contact/?service=info-governance', cap: 'A Copilot rollout that stalled?' },
    { at: 2, r: [0.25, 0, 0.25, 1], img: photo('starting-point-cloud-security'), href: '/traditional-systems/roles-access-control/', cap: 'Guest links nobody owns?' },
    { at: 3.5, r: [0.5, 0, 0.25, 1], img: photo('starting-point-custom-agents'), href: '/contact/?service=info-governance&type=call', cap: 'Who may build agents?' },
    { at: 5, r: [0.75, 0, 0.25, 1], img: photo('starting-point-rework'), href: '/agentic-systems/agentic-devops-scaling/', cap: 'Coding agents without rules?' },
  ], sfx: [{ at: 7, w: 'YOUR SHOVEL.', x: 0.5, y: 0.88, r: 5 }] },
  { b: 172, l: 8, panels: [
    { at: 0, r: [0, 0, 1, 1], pix: 'START SMALL.', cap: 'Start with the content and audiences to review first.', cap2: 'Then let it dig.', at2: 4 },
  ], sfx: [{ at: 5, w: 'ALL CLEAR.', x: 0.8, y: 0.12, r: -5 }] },
  // The page's own hero: its heading lands in 8-bit type and resolves into the modern heading, then holds.
  { b: 180, l: 12, close: true, panels: [] },
];

// The hero image as the page resolves it.
const art = (() => { try { return findSourceImage('service-hero', 'information-governance'); } catch { return findSourceImage('service-hero', 'traditional-systems-shield'); } })();
export const informationGovernanceStory: BeatComicStory = {
  bpm: 86.66,
  beats: 192,
  close: 180,
  track: tr,
  music: { src: '/audio/pixabay-189258-underground.mp3', offset: 0.615, credit: 'Music: Underground by phonk_music', source: 'https://pixabay.com/music/beats-underground-189258/' },
  closeScene: { lines: ['Information Governance &', 'AI Readiness.'], pixelate: 5, lede: 'Before an assistant helps people find more information, check whether that information should be available to them. Review sharing, content protection and ownership, then set the rules for the agents you intend to use.', image: { src: art.src, width: art.width, height: art.height } },
  // Play once, then hold on the modern heading, embers rising, until the reader scrolls in.
  holdEnd: true,
  holdLive: true,
  collapseTo: '.page-art',
  markPaths,
  pages,
};
