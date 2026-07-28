/* Retracting Header — React port of vanilla/retracting-header.css/.js.
   Structure expected: this component renders a .header around semantic navigation children; threshold and minDelta are props.
   Consumes tokens.css variables --motion-fast and --ease-out-soft through the module stylesheet; JS writes data-retracted and data-scrolled.
   Under prefers-reduced-motion, data-retracted never hides the pinned header while data-scrolled still updates. */
import { type ReactNode, useEffect, useRef } from "react";
import styles from "./RetractingHeader.module.css";
export interface RetractingHeaderProps {
  children?: ReactNode;
  threshold?: number;
  minDelta?: number;
}
export function RetractingHeader({
  children,
  threshold = 24,
  minDelta = 4,
}: RetractingHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let previous = scrollY;
    const update = () => {
      const current = Math.max(0, scrollY);
      root.dataset.scrolled = String(current > threshold);
      if (!reduced && Math.abs(current - previous) >= minDelta) {
        root.dataset.retracted = String(
          current > previous && current > threshold,
        );
        previous = current;
      }
    };
    root.dataset.retracted = "false";
    addEventListener("scroll", update, { passive: true });
    update();
    return () => removeEventListener("scroll", update);
  }, [threshold, minDelta]);
  return (
    <header ref={ref} className={styles.header}>
      {children}
    </header>
  );
}
