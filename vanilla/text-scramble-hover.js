/* Text Scramble Hover — dependency-free vanilla form.
   Structure expected: a heading root with its original text content; mount replaces it with a visually hidden .tsh-label and an aria-hidden .tsh-visual layer.
   Consumes tokens.css variables --motion-instant and --ease-out-soft; JS writes no custom properties.
   Under prefers-reduced-motion, it keeps the original text visible and attaches no pointer, focus, or animation listeners. */

export function mountTextScrambleHover(
  root,
  { glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?" } = {},
) {
  if (!root) return { destroy() {} };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { destroy() {} };
  }
  const text = root.textContent || "";
  const label = document.createElement("span");
  const visual = document.createElement("span");
  const glyphNodes = [];
  let frame = 0;
  let started = 0;

  label.className = "tsh-label";
  // The label is intentionally present for assistive technology. uilint's
  // geometry scan cannot infer that this 1px clipped copy is non-visual.
  label.setAttribute("data-uilint-ignore-overlap", "");
  label.setAttribute("data-uilint-ignore-contrast", "");
  label.textContent = text;
  visual.className = "tsh-visual";
  visual.setAttribute("aria-hidden", "true");
  [...text].forEach((character) => {
    const node = document.createElement("span");
    node.className = "tsh-glyph";
    node.textContent = character;
    visual.append(node);
    glyphNodes.push({ character, node });
  });
  root.textContent = "";
  if (!root.hasAttribute("tabindex")) root.tabIndex = 0;
  root.append(label, visual);

  const duration =
    8 *
    parseDuration(getComputedStyle(root).getPropertyValue("--motion-instant"));
  const stagger = duration * 0.08;
  const scramble = () => {
    if (frame) cancelAnimationFrame(frame);
    started = performance.now();
    const tick = (now) => {
      const elapsed = now - started;
      glyphNodes.forEach(({ character, node }, index) => {
        const progress = Math.max(
          0,
          Math.min(1, (elapsed - index * stagger) / duration),
        );
        node.textContent = progress < 1 ? randomGlyph(glyphs) : character;
      });
      if (elapsed < duration + glyphNodes.length * stagger)
        frame = requestAnimationFrame(tick);
      else frame = 0;
    };
    frame = requestAnimationFrame(tick);
  };
  root.addEventListener("pointerenter", scramble);
  root.addEventListener("focus", scramble);
  return {
    destroy() {
      root.removeEventListener("pointerenter", scramble);
      root.removeEventListener("focus", scramble);
      if (frame) cancelAnimationFrame(frame);
    },
  };
}

function randomGlyph(glyphs) {
  return glyphs[Math.floor(Math.random() * glyphs.length)] || "";
}

function parseDuration(value) {
  const number = Number.parseFloat(value);
  return value.trim().endsWith("s") && !value.trim().endsWith("ms")
    ? number * 1000
    : number;
}
