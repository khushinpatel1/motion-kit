/* Velocity Skew Type — React port of vanilla/velocity-skew-type.css/.js. Expects a heading root; consumes --motion-fast/--ease-out-soft and writes --vst-skew/--vst-weight. Reduced motion renders static type and attaches no scroll listener. */
import { useEffect, useRef } from "react";
import styles from "./VelocitySkewType.module.css";

export interface VelocitySkewTypeProps {
  children: string;
  maxSkew?: number;
  baseWeight?: number;
  velocityWeight?: number;
}
export function VelocitySkewType({
  children,
  maxSkew = 6,
  baseWeight = 600,
  velocityWeight = 120,
}: VelocitySkewTypeProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const restMs = parseDuration(
      getComputedStyle(root).getPropertyValue("--motion-base"),
    );
    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    let velocity = 0;
    let frame = 0;
    const draw = (now: number) => {
      const elapsed = now - lastTime || restMs;
      velocity *= Math.exp(-elapsed / restMs);
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
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [baseWeight, maxSkew, velocityWeight]);
  return (
    <h1 ref={ref} className={styles.root}>
      {children}
    </h1>
  );
}
function parseDuration(value: string) {
  const number = Number.parseFloat(value);
  return value.trim().endsWith("s") && !value.trim().endsWith("ms")
    ? number * 1000
    : number;
}
