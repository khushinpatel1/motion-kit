#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const baseUrl = process.argv[2];
const outputDir = process.argv[3];

if (!baseUrl || !outputDir) {
  console.error("Usage: node scripts/host-proof.mjs <base-url> <output-dir>");
  process.exit(2);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch (error) {
  console.error(
    "Playwright is required for host proof. Install it without changing package metadata: npm install --no-save --no-package-lock playwright",
  );
  console.error(error instanceof Error ? error.message : error);
  process.exit(2);
}

await fs.mkdir(outputDir, { recursive: true });

const checks = [];
const states = [];

function record(name, status, details = {}) {
  const check = { name, status, ...details };
  checks.push(check);
  return check;
}

async function runCheck(name, fn) {
  try {
    const details = await fn();
    return record(name, "PASS", details);
  } catch (error) {
    return record(name, "FAIL", {
      reason: error instanceof Error ? error.message : String(error),
    });
  }
}

function selectorOrSkip(page, selector, name) {
  const locator = page.locator(selector);
  return locator.count().then((count) => {
    if (!count) {
      record(name, "SKIP", { reason: `Selector not found: ${selector}` });
      return null;
    }
    return locator.first();
  });
}

async function waitForDialogClosed(page, dialog) {
  await page.waitForFunction((element) => !element.open, await dialog.elementHandle(), {
    timeout: 1500,
  });
}

async function runInteractions(page, stateName) {
  const screenshot = async (suffix) => {
    const file = `${stateName}-${suffix}.png`;
    await page.screenshot({ path: path.join(outputDir, file), fullPage: true });
    return file;
  };
  const cursor = await selectorOrSkip(page, "#spotlight.cs-card", `${stateName}: cursor selector`);
  if (cursor) {
    await runCheck(`${stateName}: cursor responds to pointermove`, async () => {
      const hoverCapable = await page.evaluate(() => window.matchMedia("(hover: hover)").matches);
      if (!hoverCapable) {
        return {
          applicable: false,
          reason: "The component intentionally does not bind pointermove on non-hover devices",
        };
      }
      const before = await cursor.getAttribute("style");
      const box = await cursor.boundingBox();
      if (!box) throw new Error("Cursor spotlight card has no bounding box");
      await cursor.dispatchEvent("pointermove", {
        bubbles: true,
        pointerType: "mouse",
        clientX: box.x + 8,
        clientY: box.y + 8,
      });
      await cursor.dispatchEvent("pointermove", {
        bubbles: true,
        pointerType: "mouse",
        clientX: box.x + box.width - 8,
        clientY: box.y + box.height - 8,
      });
      await page.waitForFunction(
        ({ element, previous }) => element.getAttribute("style") !== previous,
        { element: await cursor.elementHandle(), previous: before },
      );
      const style = await cursor.getAttribute("style");
      if (!style?.includes("--x") || !style.includes("--y")) {
        throw new Error(`Cursor position variables were not written: ${style}`);
      }
      return { selector: "#spotlight.cs-card", event: "pointermove", screenshot: await screenshot("cursor-moved") };
    });
  }

  const dialogTrigger = await selectorOrSkip(page, "#dialog-demo .fde-card", `${stateName}: dialog trigger selector`);
  const dialog = page.locator("#dialog-demo .fde-dialog");
  if (dialogTrigger) {
    await runCheck(`${stateName}: dialog opens and traps focus`, async () => {
      await dialogTrigger.click();
      await page.waitForFunction((element) => element.open, await dialog.elementHandle());
      const activeInside = await page.evaluate(() => {
        const root = document.querySelector("#dialog-demo .fde-dialog");
        return Boolean(root?.contains(document.activeElement));
      });
      if (!activeInside) throw new Error("Focus did not move inside the open dialog");
      await page.keyboard.press("Tab");
      const stillInsideAfterTab = await page.evaluate(() => {
        const root = document.querySelector("#dialog-demo .fde-dialog");
        return Boolean(root?.contains(document.activeElement));
      });
      if (!stillInsideAfterTab) throw new Error("Tab allowed focus to escape the dialog");
      await page.keyboard.press("Shift+Tab");
      const stillInsideAfterReverseTab = await page.evaluate(() => {
        const root = document.querySelector("#dialog-demo .fde-dialog");
        return Boolean(root?.contains(document.activeElement));
      });
      if (!stillInsideAfterReverseTab) throw new Error("Shift+Tab allowed focus to escape the dialog");
      return { trigger: "#dialog-demo .fde-card", event: "click", dialog: ".fde-dialog", screenshot: await screenshot("dialog-open") };
    });

    await runCheck(`${stateName}: dialog closes on Escape and returns focus`, async () => {
      await page.keyboard.press("Escape");
      await waitForDialogClosed(page, dialog);
      const focusedTrigger = await page.evaluate(() => document.activeElement?.matches("#dialog-demo .fde-card"));
      if (!focusedTrigger) throw new Error("Dialog close did not return focus to .fde-card");
      return { event: "Escape", focusReturn: "#dialog-demo .fde-card", screenshot: await screenshot("dialog-closed") };
    });

    await runCheck(`${stateName}: dialog closes from its close button`, async () => {
      await dialogTrigger.click();
      await page.locator("#dialog-demo .fde-dialog-close").click();
      await waitForDialogClosed(page, dialog);
      const focusedTrigger = await page.evaluate(() => document.activeElement?.matches("#dialog-demo .fde-card"));
      if (!focusedTrigger) throw new Error("Dialog close button did not return focus to .fde-card");
      return { selector: "#dialog-demo .fde-dialog-close", event: "click", screenshot: await screenshot("dialog-closed-button") };
    });
  }

  const drawerTrigger = await selectorOrSkip(page, "#drawer-demo .edd-trigger", `${stateName}: drawer trigger selector`);
  const drawer = page.locator("#drawer-demo .edd-drawer");
  if (drawerTrigger) {
    await runCheck(`${stateName}: drawer opens and traps focus`, async () => {
      await drawerTrigger.click();
      await page.waitForFunction((element) => !element.hidden && element.closest(".edd-root")?.classList.contains("is-open"), await drawer.elementHandle());
      const activeInside = await page.evaluate(() => {
        const root = document.querySelector("#drawer-demo .edd-drawer");
        return Boolean(root?.contains(document.activeElement));
      });
      if (!activeInside) throw new Error("Focus did not move inside the open drawer");
      await page.keyboard.press("Tab");
      const stillInside = await page.evaluate(() => {
        const root = document.querySelector("#drawer-demo .edd-drawer");
        return Boolean(root?.contains(document.activeElement));
      });
      if (!stillInside) throw new Error("Tab allowed focus to escape the drawer");
      return { trigger: "#drawer-demo .edd-trigger", event: "click", drawer: ".edd-drawer", screenshot: await screenshot("drawer-open") };
    });

    await runCheck(`${stateName}: drawer closes on Escape and returns focus`, async () => {
      await page.keyboard.press("Escape");
      await page.waitForFunction((element) => element.hidden, await drawer.elementHandle());
      const focusedTrigger = await page.evaluate(() => document.activeElement?.matches("#drawer-demo .edd-trigger"));
      if (!focusedTrigger) throw new Error("Drawer close did not return focus to .edd-trigger");
      return { event: "Escape", focusReturn: "#drawer-demo .edd-trigger", screenshot: await screenshot("drawer-closed") };
    });

    await runCheck(`${stateName}: drawer closes from its scrim`, async () => {
      await drawerTrigger.click();
      await page.locator("#drawer-demo .edd-scrim").dispatchEvent("click");
      await page.waitForFunction((element) => element.hidden, await drawer.elementHandle());
      const focusedTrigger = await page.evaluate(() => document.activeElement?.matches("#drawer-demo .edd-trigger"));
      if (!focusedTrigger) throw new Error("Drawer scrim close did not return focus to .edd-trigger");
      return { selector: "#drawer-demo .edd-scrim", event: "click", screenshot: await screenshot("drawer-closed-scrim") };
    });
  }
}

async function visitState(browser, name, options) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  const diagnostics = { consoleErrors: [], failedRequests: [] };
  page.on("console", (message) => {
    if (message.type() === "error") diagnostics.consoleErrors.push(`error: ${message.text()}`);
  });
  page.on("requestfailed", (request) => diagnostics.failedRequests.push(`${request.method()} ${request.url()} — ${request.failure()?.errorText || "failed"}`));
  try {
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(outputDir, `${name}-initial.png`), fullPage: true });
    record(`${name}: page loads`, "PASS", { url: page.url(), screenshot: `${name}-initial.png` });
    await runInteractions(page, name);
    await page.screenshot({ path: path.join(outputDir, `${name}-after-interactions.png`), fullPage: true });
    states.push({ name, screenshot: `${name}-after-interactions.png`, diagnostics });
  } catch (error) {
    record(`${name}: page state`, "FAIL", { reason: error instanceof Error ? error.message : String(error) });
    states.push({ name, diagnostics });
  } finally {
    await context.close();
  }
}

const browser = await chromium.launch();
try {
  await visitState(browser, "desktop", { viewport: { width: 1280, height: 800 }, colorScheme: "light", hasTouch: false });
  await visitState(browser, "mobile-dark", { viewport: { width: 390, height: 844 }, colorScheme: "dark", hasTouch: false });
} finally {
  await browser.close();
}

for (const state of states) {
  if (state.diagnostics.consoleErrors.length || state.diagnostics.failedRequests.length) {
    record(`${state.name}: clean console and network`, "FAIL", state.diagnostics);
  } else {
    record(`${state.name}: clean console and network`, "PASS", state.diagnostics);
  }
}

const ok = checks.every((check) => check.status === "PASS");
console.log(JSON.stringify({ ok, baseUrl, outputDir, checks, states }, null, 2));
process.exitCode = ok ? 0 : 1;
