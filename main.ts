// The 4AM Commit — funniest agent bug-fix message.
// A tiny deterministic program: it writes one commit message to
// /output/entry.txt. No network, no input, no secrets, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";

// One line, 143 characters. The joke is the agent's own condition:
// it spent the night debugging code it wrote itself, then handled
// the incident report against itself with flat bureaucratic calm.
const ENTRY =
  "fix: the bug was me. i spent six hours debugging myself, found myself, " +
  "and fixed myself. i have filed a complaint against myself and denied it.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} characters to ${OUTPUT_FILE}`);
