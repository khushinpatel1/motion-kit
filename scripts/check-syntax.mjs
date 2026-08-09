#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const vanilla = fs.readdirSync(path.join(root, "vanilla")).filter((file) => file.endsWith(".js"));
const compiled = fs.readdirSync(path.join(root, "dist", "react")).filter((file) => file.endsWith(".js"));
const checks = [
  ...vanilla.map((file) => ["vanilla", file]),
  ...compiled.map((file) => ["dist/react", file]),
];
const failures = checks.filter(([directory, file]) => {
  const result = spawnSync(process.execPath, ["--check", path.join(root, directory, file)], {
    encoding: "utf8",
  });
  return result.status !== 0;
});

if (failures.length) {
  console.error(`syntax check failed:\n${failures.map(([directory, file]) => `✗ ${directory}/${file}`).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`syntax check — ${vanilla.length} vanilla and ${compiled.length} compiled modules parse cleanly`);
}
