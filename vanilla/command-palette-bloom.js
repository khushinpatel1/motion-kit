/* Command Palette Bloom — dependency-free vanilla form.
   Structure expected: a .cp-backdrop containing .cp-panel and .cp-input; pass its trigger button as { trigger }.
   Consumes tokens.css variables --motion-base, --ease-out-soft, and --ease-out-expressive through the stylesheet.
   Under prefers-reduced-motion, CSS transitions resolve to zero duration; keyboard and focus behavior remain. */

export function mountCommandPaletteBloom(root, { trigger } = {}) {
  if (!root) return { destroy() {} };
  const input = root.querySelector(".cp-input");
  const panel = root.querySelector(".cp-panel");
  const focusable = () =>
    [
      ...root.querySelectorAll(
        "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])",
      ),
    ].filter((item) => !item.disabled);
  let previousFocus;
  const close = () => {
    if (!root.classList.contains("is-open")) return;
    root.classList.remove("is-open");
    root.setAttribute("aria-hidden", "true");
    root.inert = true;
    (previousFocus?.isConnected ? previousFocus : trigger)?.focus();
  };
  const open = () => {
    previousFocus = trigger || document.activeElement;
    root.inert = false;
    root.classList.add("is-open");
    root.setAttribute("aria-hidden", "false");
    (input || focusable()[0] || panel)?.focus();
  };
  const key = (e) => {
    if (!root.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key !== "Tab") return;
    const items = focusable();
    if (!items.length) {
      e.preventDefault();
      panel?.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  const click = (e) => {
    if (e.target === root) close();
  };
  trigger?.addEventListener("click", open);
  root.addEventListener("click", click);
  document.addEventListener("keydown", key);
  root.inert = true;
  return {
    open,
    close,
    destroy() {
      trigger?.removeEventListener("click", open);
      root.removeEventListener("click", click);
      document.removeEventListener("keydown", key);
      root.inert = true;
    },
  };
}
