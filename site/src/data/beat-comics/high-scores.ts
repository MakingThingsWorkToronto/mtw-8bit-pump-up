// The High Scores board on a Beat Comic's "TO BE CONTINUED." hold (Matt, 2026-09-26: "add a high scores menu, and make
// it keep changing as the animation holds ... ironic names for each service, and each should be clickable and should
// navigate to the associated service page and mix the music, each service page should have a high score on to be
// continued that lists the related services, and only the homepage shall cycle through all, the scores shall use funny
// numbers and can increment and change the longer the user waits").
//
// One entry per service page: an ironic player name and a starting score that is a joke on its own (Excel's row limit,
// HTTP 451 for governance, a low score for the cost planner). The engine re-sorts and bumps the scores while it holds.
import type { HighScores, HighScoreEntry } from './types';

const A = '/agentic-systems/', D = '/data-migrations/', T = '/traditional-systems/';
export const arcade: HighScoreEntry[] = [
  { player: 'TOOL EATER', service: 'Agentic Systems.', href: A, score: 8675309 },
  { player: 'TOTAL RECALL', service: 'Second Brain.', href: `${A}second-brain/`, score: 2718281 },
  { player: 'PROMPT WHISPERER', service: 'Agentic Team Modernization.', href: `${A}agentic-team-modernization/`, score: 1337000 },
  { player: 'TOKEN MISER', service: 'Agentic Cost Planning.', href: `${A}agentic-cost-planning/`, score: 1 },
  { player: 'SKILL HOARDER', service: 'Agentic DevOps & Scaling.', href: `${A}agentic-devops-scaling/`, score: 65536 },
  { player: 'ROBOTS WELCOME', service: 'Agent-Ready Websites.', href: `${A}agent-ready-websites/`, score: 200 },
  { player: 'LIFT & SHIFT', service: 'Data & Migrations.', href: D, score: 999999 },
  { player: 'WORKS ON PREM', service: 'Azure Migrations.', href: `${D}azure-migrations/`, score: 3389 },
  { player: 'INBOX ZERO', service: 'M365 Migrations.', href: `${D}m365-migrations/`, score: 0 },
  { player: 'SPREADSHEET SAGE', service: 'Migration Planning.', href: `${D}migration-planning/`, score: 1048576 },
  { player: 'IF/ELSE ELDER', service: 'Traditional Systems.', href: T, score: 1970 },
  { player: 'SHIPS ON FRIDAY', service: 'Custom Software Development.', href: `${T}custom-software-development/`, score: 3141592 },
  { player: 'LABEL MAKER', service: 'Information Governance & AI Readiness.', href: `${T}information-governance-ai-readiness/`, score: 451 },
  { player: 'WHERE IS THAT FILE', service: 'Intranet & Collaboration.', href: `${T}intranet-collaboration/`, score: 404 },
  { player: 'FLOW STATE', service: 'Power Platform & Logic Apps.', href: `${T}power-platform-logic-apps/`, score: 7777 },
  { player: 'FIVE YEAR PLAN', service: 'Roadmaps & Cloud Planning.', href: `${T}roadmaps-cloud-planning/`, score: 5555555 },
  { player: 'ACCESS DENIED', service: 'Roles & Access Control.', href: `${T}roles-access-control/`, score: 403 },
];

const pillars = [A, D, T];
const pillarOf = (href: string) => pillars.find((p) => href.startsWith(p)) ?? '';

/** The homepage cycles through every service; a pillar lists its services; a service lists its pillar and siblings. */
export function highScores(page: string | 'all'): HighScores {
  if (page === 'all') return { cycle: true, entries: arcade };
  const pillar = pillarOf(page);
  const entries = page === pillar
    ? arcade.filter((e) => e.href !== pillar && pillarOf(e.href) === pillar)
    : arcade.filter((e) => e.href !== page && pillarOf(e.href) === pillar);
  return { cycle: false, entries };
}
