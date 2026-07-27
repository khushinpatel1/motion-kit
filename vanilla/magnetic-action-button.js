export function mountMagneticActionButton(root, { radius = 120, strength = 0.28 } = {}) {
  if (!root) return { destroy() {} };
  const move = (event) => { const rect = root.getBoundingClientRect(); const dx = event.clientX - (rect.left + rect.width / 2); const dy = event.clientY - (rect.top + rect.height / 2); const distance = Math.hypot(dx, dy); const amount = Math.max(0, 1 - distance / radius); root.style.setProperty("--mx", `${dx * amount * strength}px`); root.style.setProperty("--my", `${dy * amount * strength}px`); };
  const reset = () => { root.style.setProperty("--mx", "0px"); root.style.setProperty("--my", "0px"); };
  if (window.matchMedia("(hover: hover)").matches) { root.addEventListener("pointermove", move); root.addEventListener("pointerleave", reset); }
  return { destroy() { root.removeEventListener("pointermove", move); root.removeEventListener("pointerleave", reset); } };
}
