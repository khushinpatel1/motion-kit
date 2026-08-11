#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const listeners = new Map();
const queuedFrames = new Map();
const radii = [];
let nextFrame = 1;

const listen = (type, handler) => {
  const handlers = listeners.get(type) ?? new Set();
  handlers.add(handler);
  listeners.set(type, handlers);
};
const unlisten = (type, handler) => listeners.get(type)?.delete(handler);
const dispatch = (type, event) => {
  for (const handler of listeners.get(type) ?? []) handler(event);
};

const context = {
  clearRect() {},
  setTransform() {},
  beginPath() {},
  fill() {},
  arc(_x, _y, radius) {
    if (!Number.isFinite(radius) || radius < 0) {
      throw new Error(`particle cursor passed invalid arc radius: ${radius}`);
    }
    radii.push(radius);
  },
  globalAlpha: 1,
  fillStyle: "",
};
const canvas = {
  className: "",
  getContext() {
    return context;
  },
  remove() {
    this.removed = true;
  },
};

globalThis.document = {
  body: {
    append(node) {
      this.child = node;
    },
  },
  createElement(tagName) {
    if (tagName !== "canvas") throw new Error(`unexpected element: ${tagName}`);
    return canvas;
  },
};
globalThis.window = {
  matchMedia() {
    return { matches: false };
  },
};
globalThis.addEventListener = listen;
globalThis.removeEventListener = unlisten;
globalThis.requestAnimationFrame = (callback) => {
  const id = nextFrame++;
  queuedFrames.set(id, callback);
  return id;
};
globalThis.cancelAnimationFrame = (id) => queuedFrames.delete(id);
globalThis.innerWidth = 800;
globalThis.innerHeight = 600;
globalThis.devicePixelRatio = 1;

const originalRandom = Math.random;
Math.random = () => 0.5;
try {
  const { mountParticleCursorTrail } = await import(
    `${pathToFileURL(path.join(root, "vanilla/particle-cursor-trail.js"))}?runtime-test`
  );
  const handle = mountParticleCursorTrail({ maxParticles: 3 });
  dispatch("pointermove", { clientX: 120, clientY: 80 });

  /* Three particles are born above. Forty-one updates reach zero life; the
     extra frames prove expired particles are removed rather than redrawn. */
  for (let frame = 0; frame < 45; frame += 1) {
    const callbacks = [...queuedFrames.values()];
    queuedFrames.clear();
    for (const callback of callbacks) callback(frame);
  }
  handle.destroy();

  if (!radii.length) throw new Error("particle cursor regression did not draw a particle");
  if (radii.some((radius) => !Number.isFinite(radius) || radius < 0)) {
    throw new Error("particle cursor regression recorded an invalid radius");
  }
  if (!canvas.removed) throw new Error("particle cursor cleanup did not remove its canvas");
  console.log(`runtime check — particle cursor end-of-life: ${radii.length} finite, non-negative arc radii across 45 frames`);
} finally {
  Math.random = originalRandom;
}
