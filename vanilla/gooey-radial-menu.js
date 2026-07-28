/* Gooey Radial Menu — dependency-free vanilla form.
   Structure expected: .grm-menu with .grm-trigger and .grm-items containing .grm-item buttons or links; pass { radius, arc, itemCount }.
   Consumes tokens.css variables --motion-base, --motion-fast, and --motion-instant through the stylesheet; JS writes --grm-x, --grm-y, and --grm-index.
   Under prefers-reduced-motion, positions are written immediately and no travel or stagger is used. */

export function mountGooeyRadialMenu(
  root,
  { radius = 104, arc = 120, itemCount } = {},
) {
  if (!root) return { destroy() {} };
  const trigger = root.querySelector(".grm-trigger");
  const items = [...root.querySelectorAll(".grm-item")];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = itemCount || items.length;
  const place = () =>
    items.forEach((item, index) => {
      const angle =
        count === 1 ? -90 : -90 - arc / 2 + (arc * index) / (count - 1);
      const radians = (angle * Math.PI) / 180;
      item.style.setProperty("--grm-x", `${Math.cos(radians) * radius}px`);
      item.style.setProperty("--grm-y", `${Math.sin(radians) * radius}px`);
      item.style.setProperty("--grm-index", `${reduced ? 0 : index}`);
    });
  const close = () => {
    root.classList.remove("is-open");
    trigger?.setAttribute("aria-expanded", "false");
    items.forEach((item) => {
      item.hidden = true;
      item.setAttribute("tabindex", "-1");
    });
    trigger?.focus();
  };
  const open = () => {
    place();
    root.classList.add("is-open");
    trigger?.setAttribute("aria-expanded", "true");
    items.forEach((item) => {
      item.hidden = false;
      item.removeAttribute("tabindex");
    });
    items[0]?.focus();
  };
  const toggle = () => (root.classList.contains("is-open") ? close() : open());
  const keydown = (event) => {
    if (event.key === "Escape" && root.classList.contains("is-open")) {
      event.preventDefault();
      close();
    }
  };
  trigger?.addEventListener("click", toggle);
  root.addEventListener("keydown", keydown);
  close();
  return {
    open,
    close,
    destroy() {
      trigger?.removeEventListener("click", toggle);
      root.removeEventListener("keydown", keydown);
    },
  };
}
