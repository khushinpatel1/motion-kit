/* Edge Detail Drawer — dependency-free vanilla form.
   Structure expected: .edd-root with .edd-trigger, .edd-scrim, and .edd-drawer[role="dialog"]; pass { side } as "left" or "right".
   Consumes tokens.css variables --motion-base and --ease-out-expressive through the stylesheet; JS writes no custom properties.
   Under prefers-reduced-motion, the drawer skips sliding but still locks scroll, traps focus, closes on Escape, and restores focus. */

export function mountEdgeDetailDrawer(root, { side = "right" } = {}) {
  if (!root) return { destroy() {} };
  const trigger = root.querySelector(".edd-trigger");
  const scrim = root.querySelector(".edd-scrim");
  const drawer = root.querySelector(".edd-drawer");
  const closeButton = drawer?.querySelector("button");
  if (!trigger || !scrim || !drawer) return { destroy() {} };
  const focusable = () =>
    [
      ...drawer.querySelectorAll(
        "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])",
      ),
    ].filter((item) => !item.disabled);
  let previousFocus;
  let scrollY = 0;
  const lock = () => {
    scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
  };
  const unlock = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollY);
  };
  const close = () => {
    if (!root.classList.contains("is-open")) return;
    root.classList.remove("is-open");
    drawer.hidden = true;
    scrim.hidden = true;
    unlock();
    (previousFocus?.isConnected ? previousFocus : trigger).focus();
  };
  const open = () => {
    previousFocus = trigger;
    root.dataset.side = side;
    root.classList.add("is-open");
    drawer.hidden = false;
    scrim.hidden = false;
    lock();
    (focusable()[0] || drawer).focus();
  };
  const keydown = (event) => {
    if (!root.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const items = focusable();
    if (!items.length) {
      event.preventDefault();
      drawer.focus();
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
  trigger.addEventListener("click", open);
  scrim.addEventListener("click", close);
  closeButton?.addEventListener("click", close);
  document.addEventListener("keydown", keydown);
  drawer.hidden = true;
  scrim.hidden = true;
  return {
    open,
    close,
    destroy() {
      trigger.removeEventListener("click", open);
      scrim.removeEventListener("click", close);
      closeButton?.removeEventListener("click", close);
      document.removeEventListener("keydown", keydown);
      if (root.classList.contains("is-open")) unlock();
    },
  };
}
