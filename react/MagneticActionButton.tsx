/* Magnetic Action Button — React port of vanilla/magnetic-action-button.js/.css. Expects optional radius and strength; renders a real button and cleans up pointer listeners. */
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import styles from "./MagneticActionButton.module.css";
export interface MagneticActionButtonProps {
  children?: ReactNode;
  radius?: number;
  strength?: number;
}
export function MagneticActionButton({
  children = "Magnetic action",
  radius = 120,
  strength = 0.28,
}: MagneticActionButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !window.matchMedia("(hover: hover)").matches) return;
    const move = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2),
        dy = e.clientY - (r.top + r.height / 2),
        a = Math.max(0, 1 - Math.hypot(dx, dy) / radius);
      root.style.setProperty("--mx", dx * a * strength + "px");
      root.style.setProperty("--my", dy * a * strength + "px");
    };
    const reset = () => {
      root.style.setProperty("--mx", "0px");
      root.style.setProperty("--my", "0px");
    };
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", reset);
    return () => {
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", reset);
    };
  }, [radius, strength]);
  return (
    <button ref={ref} className={styles.button}>
      {children}
    </button>
  );
}
