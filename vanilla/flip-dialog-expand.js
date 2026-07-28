/* Flip Dialog Expand — dependency-free vanilla form.
   Structure expected: .fde-root with .fde-card, native .fde-dialog, and optional .fde-dialog-close; pass no options.
   Consumes tokens.css variables --motion-base and --ease-out-expressive through the stylesheet; JS writes --fde-x, --fde-y, --fde-scale-x, and --fde-scale-y.
   Under prefers-reduced-motion, the native dialog opens and closes without FLIP reads or transforms. */

export function mountFlipDialogExpand(root) {
  if (!root) return { destroy() {} };
  const card = root.querySelector(".fde-card");
  const dialog = root.querySelector(".fde-dialog");
  const closeButton = root.querySelector(".fde-dialog-close");
  if (!card || !dialog) return { destroy() {} };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  card.addEventListener("click", open);
  closeButton?.addEventListener("click", close);
  dialog.addEventListener("cancel", cancel);
  return {
    open,
    close,
    destroy() {
      card.removeEventListener("click", open);
      closeButton?.removeEventListener("click", close);
      dialog.removeEventListener("cancel", cancel);
    },
  };
}
