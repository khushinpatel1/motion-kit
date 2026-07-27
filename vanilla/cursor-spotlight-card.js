export function mountCursorSpotlightCard(root) {
  if (!root) return { destroy() {} };
  const onMove = (event) => { const rect = root.getBoundingClientRect(); root.style.setProperty("--x", `${event.clientX - rect.left}px`); root.style.setProperty("--y", `${event.clientY - rect.top}px`); };
  if (window.matchMedia("(hover: hover)").matches) root.addEventListener("pointermove", onMove);
  return { destroy() { root.removeEventListener("pointermove", onMove); } };
}
