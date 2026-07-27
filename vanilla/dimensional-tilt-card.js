export function mountDimensionalTiltCard(root, { maxTilt = 8 } = {}) {
  if (!root) return { destroy() {} };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const move = (event) => { const r = root.getBoundingClientRect(); const x = (event.clientX - r.left) / r.width; const y = (event.clientY - r.top) / r.height; root.style.setProperty("--rx", `${(0.5 - y) * maxTilt}deg`); root.style.setProperty("--ry", `${(x - 0.5) * maxTilt}deg`); root.style.setProperty("--sx", `${x * 100}%`); root.style.setProperty("--sy", `${y * 100}%`); };
  const reset = () => { root.style.setProperty("--rx", "0deg"); root.style.setProperty("--ry", "0deg"); };
  if (!reduced && window.matchMedia("(hover: hover)").matches) { root.addEventListener("pointermove", move); root.addEventListener("pointerleave", reset); }
  return { destroy() { root.removeEventListener("pointermove", move); root.removeEventListener("pointerleave", reset); } };
}
