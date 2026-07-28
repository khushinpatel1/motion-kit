/* Height Morph Accordion — dependency-free vanilla form.
   Structure expected: a .hma-accordion with .hma-trigger buttons and .hma-panel elements linked by aria-controls; pass { multiple } to allow several open panels.
   Consumes tokens.css variables --motion-fast and --ease-out-soft through the stylesheet; JS writes no custom properties.
   Under prefers-reduced-motion, panels are settled immediately and never left focusable while collapsed. */

export function mountHeightMorphAccordion(root, { multiple = false } = {}) {
  if (!root) return { destroy() {} };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const triggers = [...root.querySelectorAll(".hma-trigger")];
  const panelFor = (trigger) =>
    document.getElementById(trigger.getAttribute("aria-controls"));
  const close = (trigger) => {
    const panel = panelFor(trigger);
    if (!panel) return;
    trigger.setAttribute("aria-expanded", "false");
    panel.dataset.open = "false";
    if (reduced) panel.hidden = true;
    else
      panel.addEventListener("transitionend", () => (panel.hidden = true), {
        once: true,
      });
  };
  const open = (trigger) => {
    if (!multiple) triggers.filter((item) => item !== trigger).forEach(close);
    const panel = panelFor(trigger);
    if (!panel) return;
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    panel.dataset.open = "true";
  };
  const toggle = (event) => {
    const trigger = event.currentTarget;
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    expanded ? close(trigger) : open(trigger);
  };
  const keydown = (event) => {
    const index = triggers.indexOf(event.currentTarget);
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const next =
      (index + (event.key === "ArrowDown" ? 1 : -1) + triggers.length) %
      triggers.length;
    triggers[next].focus();
  };
  triggers.forEach((trigger) => {
    const panel = panelFor(trigger);
    if (panel && trigger.getAttribute("aria-expanded") !== "true")
      panel.hidden = true;
    trigger.addEventListener("click", toggle);
    trigger.addEventListener("keydown", keydown);
  });
  return {
    open: () => open(triggers[0]),
    destroy() {
      triggers.forEach((trigger) => {
        trigger.removeEventListener("click", toggle);
        trigger.removeEventListener("keydown", keydown);
      });
    },
  };
}
