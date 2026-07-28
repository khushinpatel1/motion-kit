/* Anchored Tooltip — dependency-free vanilla form.
   Structure expected: .at-tooltip-root with .at-trigger and sibling .at-tooltip; pass { delay, side } for show delay and preferred side.
   Consumes tokens.css variables --motion-fast and --ease-out-soft through the stylesheet; JS writes --at-x, --at-y, and --at-origin.
   Under prefers-reduced-motion, positioning still flips but visual lift is omitted and the delay is preserved. */

export function mountAnchoredTooltip(root, { delay = 250, side = "top" } = {}) {
  if (!root) return { destroy() {} };
  const trigger = root.querySelector(".at-trigger");
  const tooltip = root.querySelector(".at-tooltip");
  if (!trigger || !tooltip) return { destroy() {} };
  const id = tooltip.id || `at-tooltip-${Math.random().toString(36).slice(2)}`;
  tooltip.id = id;
  trigger.setAttribute("aria-describedby", id);
  let timer;
  const place = () => {
    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const gap = 10;
    const preferred =
      side === "bottom"
        ? "bottom"
        : side === "left"
          ? "left"
          : side === "right"
            ? "right"
            : "top";
    const fits = (candidate) =>
      candidate === "top"
        ? triggerRect.top >= tooltipRect.height + gap
        : candidate === "bottom"
          ? window.innerHeight - triggerRect.bottom >= tooltipRect.height + gap
          : candidate === "left"
            ? triggerRect.left >= tooltipRect.width + gap
            : window.innerWidth - triggerRect.right >= tooltipRect.width + gap;
    const opposite = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left",
    };
    const actual = fits(preferred)
      ? preferred
      : fits(opposite[preferred])
        ? opposite[preferred]
        : preferred;
    let x = triggerRect.left + triggerRect.width / 2;
    let y =
      actual === "top"
        ? triggerRect.top - gap
        : actual === "bottom"
          ? triggerRect.bottom + gap
          : triggerRect.top + triggerRect.height / 2;
    if (actual === "left") x = triggerRect.left - gap;
    if (actual === "right") x = triggerRect.right + gap;
    if (actual === "left" || actual === "right")
      y = triggerRect.top + triggerRect.height / 2;
    if (actual === "top" || actual === "bottom")
      y += actual === "top" ? -tooltipRect.height : 0;
    tooltip.style.setProperty("--at-x", `${x}px`);
    tooltip.style.setProperty("--at-y", `${y}px`);
    tooltip.dataset.side = actual;
  };
  const show = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      tooltip.hidden = false;
      place();
      tooltip.dataset.state = "visible";
    }, delay);
  };
  const hide = () => {
    clearTimeout(timer);
    tooltip.dataset.state = "hidden";
    tooltip.hidden = true;
  };
  const keydown = (event) => {
    if (event.key === "Escape") hide();
  };
  trigger.addEventListener("focus", show);
  trigger.addEventListener("blur", hide);
  trigger.addEventListener("keydown", keydown);
  if (window.matchMedia("(hover: hover)").matches) {
    root.addEventListener("pointerenter", show);
    root.addEventListener("pointerleave", hide);
  }
  tooltip.hidden = true;
  return {
    show,
    hide,
    destroy() {
      clearTimeout(timer);
      trigger.removeEventListener("focus", show);
      trigger.removeEventListener("blur", hide);
      trigger.removeEventListener("keydown", keydown);
      root.removeEventListener("pointerenter", show);
      root.removeEventListener("pointerleave", hide);
    },
  };
}
