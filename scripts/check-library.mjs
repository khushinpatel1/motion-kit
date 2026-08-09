#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const manifest = JSON.parse(read("manifest.json"));
const packageJson = JSON.parse(read("package.json"));
const gallery = read("gallery/index.html");
const readme = read("README.md");
const north = read("NORTH.md");
const reactIndex = read("react/index.ts");
const failures = [];

const normalized = (relativePath) => relativePath.replaceAll(path.sep, "/");
const exists = (relativePath, label = "file") => {
  if (!relativePath || !fs.existsSync(path.join(root, relativePath))) {
    failures.push(`missing ${label}: ${relativePath}`);
  }
};
const setOf = (items) => new Set(items.map(normalized));
const compareSets = (label, actual, expected) => {
  const actualSet = setOf(actual);
  const expectedSet = setOf(expected);
  for (const item of expectedSet) {
    if (!actualSet.has(item)) failures.push(`${label} is missing ${item}`);
  }
  for (const item of actualSet) {
    if (!expectedSet.has(item)) failures.push(`${label} has unmanifested ${item}`);
  }
};
const checkCount = (text, pattern, label) => {
  for (const match of text.matchAll(pattern)) {
    if (Number(match[1]) !== manifest.length) {
      failures.push(`${label} says ${match[1]}, manifest has ${manifest.length}`);
    }
  }
};

if (!Array.isArray(manifest) || manifest.length === 0) {
  failures.push("manifest must be a non-empty array");
}

const names = new Set();
const expectedVanillaCss = [];
const expectedVanillaJs = [];
const expectedVanillaReadmes = [];
const expectedReact = [];
const expectedReactStyles = [];
const expectedReactReadmes = [];
for (const effect of manifest) {
  if (!effect.name || !effect.category) failures.push("every manifest effect needs a name and category");
  if (names.has(effect.name)) failures.push(`duplicate effect: ${effect.name}`);
  names.add(effect.name);

  for (const key of ["vanillaPath", "vanillaReadmePath"]) exists(effect[key], key);
  expectedVanillaCss.push(effect.vanillaPath);
  expectedVanillaReadmes.push(effect.vanillaReadmePath);
  if (effect.vanillaJsPath) {
    exists(effect.vanillaJsPath, "vanillaJsPath");
    expectedVanillaJs.push(effect.vanillaJsPath);
  }
  if (effect.reactPath) {
    exists(effect.reactPath, "reactPath");
    exists(effect.reactStylePath, "reactStylePath");
    exists(effect.reactReadmePath, "reactReadmePath");
    expectedReact.push(effect.reactPath);
    expectedReactStyles.push(effect.reactStylePath);
    expectedReactReadmes.push(effect.reactReadmePath);
  } else if (effect.reactStylePath || effect.reactReadmePath) {
    failures.push(`${effect.name} has React metadata without a React component`);
  }
}

const actualVanillaCss = fs
  .readdirSync(path.join(root, "vanilla"))
  .filter((file) => file.endsWith(".css"))
  .map((file) => `vanilla/${file}`);
const actualVanillaJs = fs
  .readdirSync(path.join(root, "vanilla"))
  .filter((file) => file.endsWith(".js"))
  .map((file) => `vanilla/${file}`);
const actualVanillaReadmes = fs
  .readdirSync(path.join(root, "vanilla"))
  .filter((file) => file.endsWith(".README.md"))
  .map((file) => `vanilla/${file}`);
const actualReact = fs
  .readdirSync(path.join(root, "react"))
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => `react/${file}`);
const actualReactStyles = fs
  .readdirSync(path.join(root, "react"))
  .filter((file) => file.endsWith(".module.css"))
  .map((file) => `react/${file}`);
const actualReactReadmes = fs
  .readdirSync(path.join(root, "react"))
  .filter((file) => file.endsWith(".README.md"))
  .map((file) => `react/${file}`);
compareSets("vanilla CSS", actualVanillaCss, expectedVanillaCss);
compareSets("vanilla JS", actualVanillaJs, expectedVanillaJs);
compareSets("vanilla README", actualVanillaReadmes, expectedVanillaReadmes);
compareSets("React component", actualReact, expectedReact);
compareSets("React CSS Module", actualReactStyles, expectedReactStyles);
compareSets("React README", actualReactReadmes, expectedReactReadmes);

const expectedExportFiles = new Set(expectedReact.map((file) => path.basename(file, ".tsx")));
const barrelExports = new Map(
  [...reactIndex.matchAll(/export \{ (\w+) \} from "\.\/(\w+)";/g)].map((match) => [
    match[2],
    match[1],
  ]),
);
for (const component of expectedExportFiles) {
  if (!barrelExports.has(component)) failures.push(`React barrel is missing ${component}`);
}
for (const component of barrelExports.keys()) {
  if (!expectedExportFiles.has(component)) failures.push(`React barrel exports unmanifested ${component}`);
}

const galleryIds = [...gallery.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = galleryIds.filter((id, index) => galleryIds.indexOf(id) !== index);
if (duplicateIds.length) failures.push(`gallery has duplicate ids: ${duplicateIds.join(", ")}`);
const missingAnchors = [...gallery.matchAll(/href="#([^"]+)"/g)]
  .map((match) => match[1])
  .filter((id) => !galleryIds.includes(id));
if (missingAnchors.length) failures.push(`gallery has dead anchors: ${missingAnchors.join(", ")}`);
if (/<button\b(?![^>]*\btype\s*=)/.test(gallery)) failures.push("gallery buttons must declare their type");
const missingControls = [...gallery.matchAll(/aria-controls="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((id) => !galleryIds.includes(id));
if (missingControls.length) failures.push(`gallery has dead aria-controls: ${missingControls.join(", ")}`);
if (!/class="grm-trigger"[^>]*aria-label="[^"]+"/.test(gallery)) {
  failures.push("gallery radial-menu trigger needs an accessible name");
}

const galleryLocalLinks = [...gallery.matchAll(/(?:href|src)="([^\"]+)"/g)]
  .map((match) => match[1])
  .filter((target) => target.startsWith("../") && !target.startsWith("../vanilla/") && target !== "../tokens.css");
for (const target of galleryLocalLinks) {
  exists(path.normalize(path.join("gallery", target.split("#")[0])), `gallery link ${target}`);
}
const galleryVanillaSources = [
  ...gallery.matchAll(/\.\.\/vanilla\/([\w.-]+\.(?:css|js))/g),
].map((match) => `vanilla/${match[1]}`);
compareSets("gallery vanilla source", galleryVanillaSources, [...expectedVanillaCss, ...expectedVanillaJs]);
const galleryDemoCount = (gallery.match(/<article class="demo/g) || []).length;
if (galleryDemoCount !== manifest.length) failures.push(`gallery has ${galleryDemoCount} demos, manifest has ${manifest.length}`);
const galleryCategories = [...gallery.matchAll(/<h2>([^<]+)<\/h2>/g)].map((match) => match[1].trim().toLowerCase());
for (const category of new Set(manifest.map((effect) => effect.category.toLowerCase()))) {
  if (!galleryCategories.includes(category)) failures.push(`gallery is missing category ${category}`);
}

checkCount(gallery, /Explore (\d+) effects/g, "gallery CTA");
checkCount(gallery, /<strong>(\d+)<\/strong>effects/g, "gallery fact");
checkCount(readme, /^(\d+) focused motion effects/gm, "README catalogue");
const readmePaired = readme.match(/^(\d+) paired.*plus one vanilla-only composite/m);
if (readmePaired && Number(readmePaired[1]) + 1 !== manifest.length) {
  failures.push(`README paired count does not match manifest: ${readmePaired[1]}`);
}
const northCounts = north.match(/catalogue has (\d+) effects: (\d+) paired/m);
if (northCounts) {
  const paired = manifest.filter((effect) => effect.reactPath).length;
  if (Number(northCounts[1]) !== manifest.length || Number(northCounts[2]) !== paired) {
    failures.push("NORTH catalogue counts do not match manifest");
  }
}

if (packageJson.name !== "motion-kit") failures.push("package name must be motion-kit");
if (packageJson.type !== "module") failures.push("package must be ESM");
if (!packageJson.peerDependencies?.react) failures.push("React must be declared as a peer dependency");
if (!Array.isArray(packageJson.sideEffects) || !packageJson.sideEffects.includes("**/*.css")) {
  failures.push("package sideEffects must preserve CSS imports");
}
if (packageJson.files?.includes("scripts") || packageJson.files?.includes("react")) {
  failures.push("package files must ship compiled output, not the raw source tree");
}
const packageFiles = (packageJson.files || []).map(normalized);
const includedInPackage = (relativePath) =>
  packageFiles.some((entry) => relativePath === entry || relativePath.startsWith(`${entry}/`));
for (const relativePath of ["dist", "tokens.css", "manifest.json", ...expectedVanillaCss, ...expectedVanillaJs]) {
  if (!includedInPackage(relativePath)) failures.push(`package files omit ${relativePath}`);
}
if (!/compiled (?:modern )?ESM|compiled JavaScript|declaration files/i.test(readme) || !/CSS Modules/i.test(readme)) {
  failures.push("README must describe compiled React output and CSS Modules");
}
if (!packageJson.scripts?.build || packageJson.scripts.prepack !== "npm run build") {
  failures.push("package must build before packing");
}

const exactExports = [
  [".", "types", "./dist/react/index.d.ts"],
  [".", "import", "./dist/react/index.js"],
  ["./react", "types", "./dist/react/index.d.ts"],
  ["./react", "import", "./dist/react/index.js"],
];
for (const [subpath, condition, target] of exactExports) {
  if (packageJson.exports?.[subpath]?.[condition] !== target) {
    failures.push(`export ${subpath}.${condition} must target ${target}`);
  }
  exists(target.slice(2), `export target ${subpath}.${condition}`);
}
for (const [subpath, target] of [
  ["./tokens.css", "./tokens.css"],
  ["./manifest.json", "./manifest.json"],
  ["./gallery", "./gallery/index.html"],
]) {
  if (packageJson.exports?.[subpath] !== target) failures.push(`export ${subpath} must target ${target}`);
  exists(target.slice(2), `export target ${subpath}`);
}
for (const component of expectedExportFiles) {
  exists(`dist/react/${component}.js`, `compiled React export ${component}`);
  exists(`dist/react/${component}.d.ts`, `React declaration ${component}`);
}
if (packageJson.exports?.["./react/*"]?.import !== "./dist/react/*.js") {
  failures.push("React component wildcard must target compiled JavaScript");
}
if (packageJson.exports?.["./react/*"]?.types !== "./dist/react/*.d.ts") {
  failures.push("React component wildcard must target declarations");
}

const repository = packageJson.repository?.url?.replace(/^https:\/\/github\.com\//, "").replace(/\.git$/, "");
if (repository && !readme.includes(`npm install github:${repository}`)) {
  failures.push("README GitHub install command does not match package repository");
}
const readmeLinks = [...readme.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)]
  .map((match) => match[1])
  .filter((target) => !/^(?:https?:|mailto:|#)/.test(target));
for (const target of readmeLinks) exists(target.split("#")[0], `README link ${target}`);

if (failures.length) {
  console.error(failures.map((failure) => `✗ ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `library check — ${manifest.length} manifest effects, ${expectedReact.length} React components, source/package/gallery/barrel parity clean`,
  );
}
