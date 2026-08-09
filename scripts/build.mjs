#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceReact = path.join(root, "react");
const outputReact = path.join(root, "dist", "react");

fs.rmSync(path.join(root, "dist"), { recursive: true, force: true });

const tsc = path.join(root, "node_modules", "typescript", "bin", "tsc");
const result = spawnSync(process.execPath, [tsc, "--project", path.join(root, "tsconfig.json")], {
  cwd: root,
  encoding: "utf8",
  stdio: "inherit",
});
if (result.status !== 0) process.exit(result.status ?? 1);

for (const entry of fs.readdirSync(sourceReact)) {
  if (entry.endsWith(".module.css") || entry.endsWith(".README.md")) {
    fs.copyFileSync(path.join(sourceReact, entry), path.join(outputReact, entry));
  }
}
fs.copyFileSync(
  path.join(sourceReact, "css-modules.d.ts"),
  path.join(outputReact, "css-modules.d.ts"),
);

const addJsExtensions = (file) => {
  const content = fs.readFileSync(file, "utf8");
  const rewritten = content.replace(/from "(\.[^"]+)"/g, (match, specifier) => {
    if (specifier.endsWith(".js") || specifier.endsWith(".css")) return match;
    return `from "${specifier}.js"`;
  });
  if (rewritten !== content) fs.writeFileSync(file, rewritten);
};

for (const entry of fs.readdirSync(outputReact)) {
  if (entry.endsWith(".js") || entry.endsWith(".d.ts")) {
    addJsExtensions(path.join(outputReact, entry));
  }
}

for (const entry of fs.readdirSync(outputReact)) {
  if (entry.endsWith(".d.ts") && entry !== "css-modules.d.ts") {
    const file = path.join(outputReact, entry);
    const content = fs.readFileSync(file, "utf8");
    if (!content.startsWith('/// <reference path="./css-modules.d.ts" />')) {
      fs.writeFileSync(file, `/// <reference path="./css-modules.d.ts" />\n${content}`);
    }
  }
}

const jsCount = fs.readdirSync(outputReact).filter((entry) => entry.endsWith(".js")).length;
const declarationCount = fs
  .readdirSync(outputReact)
  .filter((entry) => entry.endsWith(".d.ts") && entry !== "css-modules.d.ts").length;
const cssCount = fs.readdirSync(outputReact).filter((entry) => entry.endsWith(".module.css")).length;
console.log(`build — ${jsCount} ESM modules, ${declarationCount} declarations, ${cssCount} CSS Modules`);
