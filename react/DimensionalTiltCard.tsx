/* Dimensional Tilt Card — React port of vanilla/dimensional-tilt-card.css. Expects optional maxTilt (degrees), renders .card > .inner, and skips pointer listeners under reduced motion. */
import { useEffect, useRef } from "react";
import styles from "./DimensionalTiltCard.module.css";
export interface DimensionalTiltCardProps {
  title?: string;
  maxTilt?: number;
}
export function DimensionalTiltCard({
  title = "Dimensional tilt",
  maxTilt = 8,
}: DimensionalTiltCardProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (
      !root ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover)").matches
    )
      return;
    const move = (e: PointerEvent) => {
      const r = root.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width,
        y = (e.clientY - r.top) / r.height;
      root.style.setProperty("--rx", (0.5 - y) * maxTilt + "deg");
      root.style.setProperty("--ry", (x - 0.5) * maxTilt + "deg");
    };
    const reset = () => {
      root.style.setProperty("--rx", "0deg");
      root.style.setProperty("--ry", "0deg");
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", reset);
    return () => {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", reset);
    };
  }, [maxTilt]);
  return (
    <article ref={ref} className={styles.card}>
      <div className={styles.inner}>
        <strong>{title}</strong>
        <span>Depth follows pointer position</span>
      </div>
    </article>
  );
}
