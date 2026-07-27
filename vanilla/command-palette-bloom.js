export function mountCommandPaletteBloom(root, { trigger } = {}) {
  if (!root) return { destroy() {} }; const input = root.querySelector(".cp-input"); const close = () => { root.classList.remove("is-open"); root.setAttribute("aria-hidden", "true"); trigger?.focus(); }; const open = () => { root.classList.add("is-open"); root.setAttribute("aria-hidden", "false"); input?.focus(); }; const key = (e) => { if (e.key === "Escape") close(); };
  trigger?.addEventListener("click", open); root.addEventListener("click", (e) => { if (e.target === root) close(); }); document.addEventListener("keydown", key); return { open, close, destroy() { trigger?.removeEventListener("click", open); document.removeEventListener("keydown", key); } };
}
