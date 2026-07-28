/* Reading Progress Rail — dependency-free vanilla form.
   Structure expected: a .rpr-rail with .rpr-fill and optional .rpr-label; pass { target, showPercentage, edge }.
   Consumes tokens.css variables --motion-fast and --ease-out-soft through the stylesheet; JS writes --rpr-progress, aria-valuenow, and the label text.
   Under prefers-reduced-motion, the indicator still tracks scroll; only the token-controlled fill transition becomes zero. */

const clamp = (value) => Math.min(1, Math.max(0, value));

export function mountReadingProgressRail(
  root,
  { target = null, showPercentage = false, edge = "top" } = {},
) {
  if (!root) return { destroy() {} };
  const fill = root.querySelector(".rpr-fill");
  const label = root.querySelector(".rpr-label");
  const article =
    typeof target === "string" ? document.querySelector(target) : target;
  root.dataset.edge = edge;
  root.setAttribute("role", "progressbar");
  root.setAttribute("aria-valuemin", "0");
  root.setAttribute("aria-valuemax", "100");
  if (label) label.hidden = !showPercentage;
  const update = () => {
    const max = article
      ? Math.max(0, article.scrollHeight - article.clientHeight)
      : Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const offset = article ? article.scrollTop : scrollY;
    const value = max ? clamp(offset / max) : 0;
    root.style.setProperty("--rpr-progress", String(value));
    root.setAttribute("aria-valuenow", String(Math.round(value * 100)));
    if (label && showPercentage)
      label.textContent = `${Math.round(value * 100)}%`;
  };
  const scrollTarget = article || window;
  scrollTarget.addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
  return {
    destroy() {
      scrollTarget.removeEventListener("scroll", update);
      removeEventListener("resize", update);
    },
  };
}
