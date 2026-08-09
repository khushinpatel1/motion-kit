#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const failures = [];
const npmCache = fs.mkdtempSync(path.join(os.tmpdir(), "motion-kit-npm-cache-"));
const run = spawnSync("npm", ["pack", "--dry-run", "--json"], {
  cwd: root,
  encoding: "utf8",
  env: { ...process.env, npm_config_cache: npmCache },
});
if (run.status !== 0) {
  console.error(run.stdout || run.stderr);
  fs.rmSync(npmCache, { recursive: true, force: true });
  process.exit(run.status ?? 1);
}

const jsonStart = run.stdout.indexOf("[");
const report = JSON.parse(run.stdout.slice(jsonStart));
const files = new Set(report[0].files.map(({ path: file }) => file.replaceAll("\\", "/")));
const has = (file) => files.has(file);
const required = [
  "README.md",
  "LICENSE",
  "manifest.json",
  "tokens.css",
  "gallery/index.html",
  "dist/react/index.js",
  "dist/react/index.d.ts",
  "dist/react/css-modules.d.ts",
];
for (const effect of manifest) {
  required.push(effect.vanillaPath);
  if (effect.vanillaJsPath) required.push(effect.vanillaJsPath);
  if (effect.reactPath) {
    const component = path.basename(effect.reactPath, ".tsx");
    required.push(`dist/react/${component}.js`);
    required.push(`dist/react/${component}.d.ts`);
    required.push(`dist/react/${component}.module.css`);
  }
}
for (const file of required) if (!has(file)) failures.push(`packed artifact is missing ${file}`);

const forbidden = [
  /^node_modules\//,
  /(^|\/)\.env(?:\.|$)/i,
  /(^|\/)(?:AGENTS|CLAUDE|NORTH)\.md$/i,
  /^\.agents\//,
  /^\.codex\//,
  /^docs\//,
  /^scripts\//,
  /^react\/.*\.(?:tsx|ts)$/,
  /(?:^|\/)(?:secret|prompt|credential|cache)/i,
];
for (const file of files) {
  if (forbidden.some((pattern) => pattern.test(file))) failures.push(`forbidden packed file: ${file}`);
}
if (!Array.isArray(packageJson.files) || packageJson.files.includes("scripts")) {
  failures.push("package files must stay on the explicit runtime/doc allowlist");
}
if (!files.has("dist/react/index.js") || !files.has("dist/react/index.d.ts")) {
  failures.push("compiled React entrypoint is not packable");
}

const bytes = report[0].files.reduce((total, file) => total + file.size, 0);
if (bytes < 10_000) failures.push(`packed artifact is implausibly small: ${bytes} bytes`);
if (failures.length) {
  console.error(failures.map((failure) => `✗ ${failure}`).join("\n"));
  fs.rmSync(npmCache, { recursive: true, force: true });
  process.exitCode = 1;
} else {
  console.log(`package check — ${files.size} files, ${(bytes / 1024).toFixed(1)} KiB dry-run package`);
  fs.rmSync(npmCache, { recursive: true, force: true });
}
