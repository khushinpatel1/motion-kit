/* Velocity Skew Type — dependency-free vanilla form.
   Structure expected: a heading root with its text content; mount writes --vst-skew and --vst-weight.
   Consumes tokens.css variables --motion-fast and --ease-out-soft.
   Under prefers-reduced-motion, it writes the resting values and attaches no scroll listener or animation frame. */

export function mountVelocitySkewType(
  root,
  { maxSkew = 6, baseWeight = 600, velocityWeight = 120 } = {},
) {
  if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return { destroy() {} };
  const restMs = parseDuration(
    getComputedStyle(root).getPropertyValue("--motion-base"),
  );
  let lastScroll = window.scrollY;
  let lastTime = performance.now();
  let velocity = 0;
  let frame = 0;
  const draw = (now) => {
    const elapsed = now - lastTime || restMs;
    const decay = Math.exp(-elapsed / restMs);
    velocity *= decay;
    root.style.setProperty(
      "--vst-skew",
      `${Math.max(-maxSkew, Math.min(maxSkew, velocity * maxSkew))}deg`,
    );
    root.style.setProperty(
      "--vst-weight",
      String(baseWeight + Math.abs(velocity) * velocityWeight),
    );
    lastTime = now;
    if (Math.abs(velocity) > 0.01) frame = requestAnimationFrame(draw);
    else {
      frame = 0;
      root.style.setProperty("--vst-skew", "0deg");
      root.style.setProperty("--vst-weight", String(baseWeight));
    }
  };
  const onScroll = () => {
    const now = performance.now();
    const elapsed = now - lastTime || restMs;
    velocity = Math.max(
      -1,
      Math.min(1, ((window.scrollY - lastScroll) / elapsed) * 16),
    );
    lastScroll = window.scrollY;
    lastTime = now;
    if (!frame) frame = requestAnimationFrame(draw);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return {
    destroy() {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    },
  };
}

function parseDuration(value) {
  const number = Number.parseFloat(value);
  return value.trim().endsWith("s") && !value.trim().endsWith("ms")
    ? number * 1000
    : number;
}
