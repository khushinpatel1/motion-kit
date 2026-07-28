/* Typewriter Caret — dependency-free vanilla form.
   Structure expected: a root whose original text becomes a hidden complete .twc-accessible node and an aria-hidden .twc-visual node with a .twc-caret.
   Consumes tokens.css variables --motion-instant, --motion-slow, and --ease-linear; JS writes no custom properties.
   Under prefers-reduced-motion, the complete first string renders immediately, the caret stays visible, and no timers start. */

export function mountTypewriterCaret(
  root,
  { strings, deleteBetween = true, loop = true } = {},
) {
  if (!root) return { destroy() {} };
  const source = strings?.length ? strings : [root.textContent || ""];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const accessible = document.createElement("span");
  const visual = document.createElement("span");
  const text = document.createElement("span");
  const caret = document.createElement("span");
  accessible.className = "twc-accessible";
  accessible.textContent = source.join(" ");
  visual.className = "twc-visual";
  visual.setAttribute("aria-hidden", "true");
  caret.className = "twc-caret";
  visual.append(text, caret);
  root.textContent = "";
  root.append(accessible, visual);
  if (reduced) {
    text.textContent = source[0];
    return { destroy() {} };
  }
  const delay = parseDuration(
    getComputedStyle(root).getPropertyValue("--motion-instant"),
  );
  let timer = 0;
  let stringIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  const step = () => {
    const current = source[stringIndex];
    if (!deleting) {
      characterIndex += 1;
      text.textContent = current.slice(0, characterIndex);
      if (characterIndex < current.length) return schedule();
      if (source.length === 1 || !deleteBetween) return;
      deleting = true;
      return schedule();
    }
    characterIndex -= 1;
    text.textContent = current.slice(0, characterIndex);
    if (characterIndex > 0) return schedule();
    stringIndex = (stringIndex + 1) % source.length;
    deleting = false;
    if (stringIndex === 0 && !loop) return;
    schedule();
  };
  const schedule = () => {
    timer = window.setTimeout(step, delay);
  };
  schedule();
  return {
    destroy() {
      window.clearTimeout(timer);
    },
  };
}

function parseDuration(value) {
  const n = Number.parseFloat(value);
  return value.trim().endsWith("s") && !value.trim().endsWith("ms")
    ? n * 1000
    : n;
}
