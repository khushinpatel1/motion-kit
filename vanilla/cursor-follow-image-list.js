/* Cursor Follow Image List — dependency-free vanilla form.
   Structure expected: .cfil-list containing .cfil-row[data-image] items and one .cfil-preview img; pass { lag, rotationCap } for follow response.
   Consumes tokens.css variables --motion-fast and --ease-out-soft through the stylesheet; JS writes --cfil-x, --cfil-y, and --cfil-rotation.
   Under prefers-reduced-motion, no preview or requestAnimationFrame loop is used, leaving a plain accessible list. */

export function mountCursorFollowImageList(
  root,
  { lag = 0.14, rotationCap = 8 } = {},
) {
  if (!root) return { destroy() {} };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hover = window.matchMedia("(hover: hover)").matches;
  const preview = root.querySelector(".cfil-preview");
  const image = preview?.querySelector("img");
  const rows = [...root.querySelectorAll(".cfil-row[data-image]")];
  if (reduced || !hover || !preview || !image) return { destroy() {} };
  let frame = 0;
  let active = false;
  let row;
  let targetX = 0;
  let targetY = 0;
  let x = 0;
  let y = 0;
  let lastX = 0;
  let lastY = 0;
  let rotation = 0;
  const tick = () => {
    if (!active) return;
    x += (targetX - x) * lag;
    y += (targetY - y) * lag;
    const velocity = targetX - lastX;
    lastX = targetX;
    lastY = targetY;
    rotation +=
      (Math.max(-rotationCap, Math.min(rotationCap, velocity * 0.08)) -
        rotation) *
      lag;
    preview.style.setProperty("--cfil-x", `${x}px`);
    preview.style.setProperty("--cfil-y", `${y}px`);
    preview.style.setProperty("--cfil-rotation", `${rotation}deg`);
    frame = requestAnimationFrame(tick);
  };
  const move = (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!frame) {
      x = targetX;
      y = targetY;
      frame = requestAnimationFrame(tick);
    }
  };
  const enter = (event) => {
    row = event.currentTarget;
    image.src = row.dataset.image;
    preview.dataset.visible = "true";
    active = true;
  };
  const leave = () => {
    active = false;
    preview.dataset.visible = "false";
    cancelAnimationFrame(frame);
    frame = 0;
    row = undefined;
  };
  rows.forEach((item) => {
    item.addEventListener("pointerenter", enter);
    item.addEventListener("pointerleave", leave);
    item.addEventListener("pointermove", move);
  });
  return {
    destroy() {
      leave();
      rows.forEach((item) => {
        item.removeEventListener("pointerenter", enter);
        item.removeEventListener("pointerleave", leave);
        item.removeEventListener("pointermove", move);
      });
    },
  };
}
