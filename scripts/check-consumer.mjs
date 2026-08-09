#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "motion-kit-consumer-"));
const npmCache = fs.mkdtempSync(path.join(os.tmpdir(), "motion-kit-npm-cache-"));
const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    cwd: fixture,
    encoding: "utf8",
    env: { ...process.env, npm_config_cache: npmCache },
    ...options,
  });
  if (result.status !== 0) {
    console.error(result.stdout || result.stderr);
    process.exit(result.status ?? 1);
  }
  return result;
};

try {
  const packed = spawnSync("npm", ["pack", "--silent", "--ignore-scripts"], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, npm_config_cache: npmCache },
  });
  if (packed.status !== 0) {
    console.error(packed.stdout || packed.stderr);
    process.exit(packed.status ?? 1);
  }
  const tarball = path.join(root, packed.stdout.trim().split("\n").at(-1));
  fs.writeFileSync(
    path.join(fixture, "package.json"),
    JSON.stringify({ name: "motion-kit-consumer", private: true, type: "module" }, null, 2),
  );
  run("npm", [
    "install",
    "--offline",
    "--legacy-peer-deps",
    "--no-package-lock",
    "--ignore-scripts",
    "--no-audit",
    "--no-fund",
    tarball,
  ], { cwd: fixture, stdio: "inherit" });
  const linkDependency = (name) => {
    const destination = path.join(fixture, "node_modules", name);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.symlinkSync(path.join(root, "node_modules", name), destination, "dir");
  };
  linkDependency("react");
  linkDependency("@types/react");
  linkDependency("@types/prop-types");
  linkDependency("csstype");
  fs.mkdirSync(path.join(fixture, "src"));
  fs.writeFileSync(
    path.join(fixture, "src", "main.tsx"),
    `import type { ComponentProps } from "react";
import { MagneticActionButton } from "motion-kit";
import { FloatingCard } from "motion-kit/react/FloatingCard";
import "motion-kit/tokens.css";

const rootProps: ComponentProps<typeof MagneticActionButton> = { children: "Save" };
const subpathProps: ComponentProps<typeof FloatingCard> = { children: "Preview" };
export const proof = { root: MagneticActionButton, subpath: FloatingCard, rootProps, subpathProps };
`,
  );
  fs.writeFileSync(
    path.join(fixture, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "Bundler",
          jsx: "react-jsx",
          strict: true,
          skipLibCheck: false,
          noEmit: true,
        },
        include: ["src"],
      },
      null,
      2,
    ),
  );
  run(path.join(root, "node_modules", ".bin", "tsc"), ["--project", path.join(fixture, "tsconfig.json")]);
  fs.writeFileSync(
    path.join(fixture, "index.html"),
    '<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n',
  );
  run(path.join(root, "node_modules", ".bin", "vite"), ["build", "--outDir", "dist"]);
  if (!fs.existsSync(path.join(fixture, "dist", "assets"))) {
    throw new Error("consumer bundle did not emit assets");
  }
  console.log("consumer check — packed root and React subpath typecheck and bundle with CSS Modules");
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
  fs.rmSync(npmCache, { recursive: true, force: true });
  const tarballs = fs
    .readdirSync(root)
    .filter((entry) => entry.startsWith("motion-kit-") && entry.endsWith(".tgz"));
  for (const tarball of tarballs) fs.rmSync(path.join(root, tarball), { force: true });
}
