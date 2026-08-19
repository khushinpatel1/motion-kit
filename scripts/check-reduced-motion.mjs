#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* tokens.md promises that a JS animation loop consults prefers-reduced-motion
   directly rather than leaning on a zeroed CSS variable — a duration token set
   to 0 stops a transition, but a requestAnimationFrame loop keeps spawning
   work regardless. That promise was kept by review alone, which is to say by
   nobody once an effect lands on a busy afternoon. This is the promise as a
   gate: every module that drives a frame loop has to name the query. */

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* A single positioning frame after the tooltip becomes visible, not a loop —
   there is no sustained motion here for reduced-motion to suppress, and the
   vanilla twin documents the same behaviour in its header. */
const ALLOWED = new Set(["react/AnchoredTooltip.tsx"]);

/* Any of the three is proof enough: the vanilla effects query matchMedia by
   its string, the React ones go through the shared hook, and a few keep the
   result in a variable of their own. */
const CONSULTS = [/prefers-reduced-motion/, /useReducedMotion/, /reducedMotion/];

const sources = ["vanilla", "react"].flatMap((dir) =>
  fs.readdirSync(path.join(root, dir))
    .filter((file) => /\.(js|ts|tsx)$/.test(file))
    .map((file) => `${dir}/${file}`),
);

const drivesFrames = sources.filter((file) =>
  fs.readFileSync(path.join(root, file), "utf8").includes("requestAnimationFrame"),
);

const failures = drivesFrames.filter((file) => {
  if (ALLOWED.has(file)) return false;
  const source = fs.readFileSync(path.join(root, file), "utf8");
  return !CONSULTS.some((pattern) => pattern.test(source));
});

if (failures.length) {
  console.error("reduced-motion check failed — these drive a frame loop without consulting the query:");
  for (const file of failures) console.error(`  ${file}`);
  process.exitCode = 1;
} else {
  console.log(`reduced-motion check — ${drivesFrames.length} rAF modules all consult the media query`);
}
