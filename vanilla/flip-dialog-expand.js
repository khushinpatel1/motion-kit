/* Flip Dialog Expand — dependency-free vanilla form.
   Structure expected: .fde-root with .fde-card, native .fde-dialog, and optional .fde-dialog-close; pass no options.
   Consumes tokens.css variables --motion-base and --ease-out-expressive through the stylesheet; JS writes --fde-x, --fde-y, --fde-scale-x, and --fde-scale-y.
   Under prefers-reduced-motion, the native dialog opens and closes without FLIP reads or transforms. Native showModal() supplies document inertness; the local Tab loop keeps focus cycling stable across user agents. */

export function mountFlipDialogExpand(root) {
  if (!root) return { destroy() {} };
  const card = root.querySelector(".fde-card");
  const dialog = root.querySelector(".fde-dialog");
  const closeButton = root.querySelector(".fde-dialog-close");
  if (!card || !dialog) return { destroy() {} };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const focusable = () =>
    [
      ...dialog.querySelectorAll(
        "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])",
      ),
    ].filter((item) => !item.disabled);
  let origin;
  let closing = false;
  const focusTarget = dialog.querySelector(
    "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])",
  );
  const settle = () => {
    dialog.classList.add("is-ready");
    dialog.style.removeProperty("--fde-x");
    dialog.style.removeProperty("--fde-y");
    dialog.style.removeProperty("--fde-scale-x");
    dialog.style.removeProperty("--fde-scale-y");
  };
  const open = () => {
    origin = card.getBoundingClientRect();
    dialog.showModal();
    if (reduced) {
      settle();
      focusTarget?.focus();
      return;
    }
    const target = dialog.getBoundingClientRect();
    dialog.style.setProperty("--fde-x", `${origin.left - target.left}px`);
    dialog.style.setProperty("--fde-y", `${origin.top - target.top}px`);
    dialog.style.setProperty("--fde-scale-x", `${origin.width / target.width}`);
    dialog.style.setProperty(
      "--fde-scale-y",
      `${origin.height / target.height}`,
    );
    dialog.classList.remove("is-ready");
    requestAnimationFrame(() => requestAnimationFrame(settle));
    focusTarget?.focus();
  };
  const close = () => {
    if (!dialog.open || closing) return;
    if (reduced) {
      dialog.close();
      card.focus();
      return;
    }
    const target = dialog.getBoundingClientRect();
    dialog.style.setProperty("--fde-x", `${origin.left - target.left}px`);
    dialog.style.setProperty("--fde-y", `${origin.top - target.top}px`);
    dialog.style.setProperty("--fde-scale-x", `${origin.width / target.width}`);
    dialog.style.setProperty(
      "--fde-scale-y",
      `${origin.height / target.height}`,
    );
    closing = true;
    dialog.classList.add("is-closing");
    dialog.addEventListener(
      "transitionend",
      () => {
        dialog.close();
        dialog.classList.remove("is-closing", "is-ready");
        closing = false;
        card.focus();
      },
      { once: true },
    );
  };
  const cancel = (event) => {
    event.preventDefault();
    close();
  };
  const keydown = (event) => {
    if (event.key !== "Tab" || !dialog.open) return;
    const items = focusable();
    if (!items.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  const backdropClick = (event) => {
    if (event.target === dialog) close();
  };
  card.addEventListener("click", open);
  closeButton?.addEventListener("click", close);
  dialog.addEventListener("cancel", cancel);
  dialog.addEventListener("keydown", keydown);
  dialog.addEventListener("click", backdropClick);
  return {
    open,
    close,
    destroy() {
      card.removeEventListener("click", open);
      closeButton?.removeEventListener("click", close);
      dialog.removeEventListener("cancel", cancel);
      dialog.removeEventListener("keydown", keydown);
      dialog.removeEventListener("click", backdropClick);
    },
  };
}
