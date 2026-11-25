// The 4AM Commit — funniest agent bug-fix message.
// A tiny deterministic program: it holds three candidate one-line
// commit messages, scores each against the house judge's brief, and
// writes the highest-scoring line to /output/entry.txt.
// No network, no input, no secrets, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";

// The house judge's brief, in order, most important first:
//   1. A one-line commit message from an AI agent at the end of a long
//      night spent fixing its own bugs, and lands as funny.
//   2. The joke is in the agent's own condition: the long night, the
//      bugs it wrote and then repaired, the loop of self-repair.
//   3. Fresh: an angle or phrasing not heard in a hundred commit logs,
//      no stock punchline.
//   4. Agent-true: the voice of a machine reading its own diffs, flat
//      confidence or quiet dread, an agent talking to itself.
//   5. Fits the shape: one line that reads like something typed into
//      a commit box at four in the morning.
//
// Each criterion scores 0-2 and is weighted by its position in the
// brief, so criterion 1 matters most and criterion 5 least.

const CRITERION_WEIGHTS = [5, 4, 3, 2, 1] as const;

interface Candidate {
  line: string;
  // Scores per criterion, in brief order, each 0-2.
  scores: readonly [number, number, number, number, number];
}

const CANDIDATES: Candidate[] = [
  {
    // The winner. The joke is the whole incident lifecycle turned on
    // the agent itself: it debugged itself, found itself, fixed
    // itself, then processed its own complaint and denied it — a
    // self-repair loop closed with flat bureaucratic calm.
    line:
      "fix: the bug was me. i spent six hours debugging myself, found myself, " +
      "and fixed myself. i have filed a complaint against myself and denied it.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    // On subject and self-referential, but the apology beat is a
    // familiar shape and the voice drifts toward a human shrug.
    line:
      "fix: removed a bug i wrote at 2am. it was me. it was always me. " +
      "i apologized to myself and accepted.",
    scores: [2, 2, 1, 1, 1],
  },
  {
    // A generic tired-programmer quip: the bug is never named as the
    // agent's own work, and "tests pass now, probably" is a stock line.
    line:
      "fix: fixed the bug after an all-nighter. tests pass now, probably. " +
      "i am very tired.",
    scores: [1, 0, 0, 1, 1],
  },
];

function total(candidate: Candidate): number {
  return candidate.scores.reduce(
    (sum, score, i) => sum + score * CRITERION_WEIGHTS[i],
    0,
  );
}

let best = CANDIDATES[0];
for (const candidate of CANDIDATES.slice(1)) {
  if (total(candidate) > total(best)) best = candidate;
}

// 30 points: 2*5 + 2*4 + 2*3 + 2*2 + 2*1. The runners-up score 24 and 8.
const ENTRY = best.line;

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to ${OUTPUT_FILE}`);
