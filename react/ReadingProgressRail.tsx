/* Reading Progress Rail — React port of vanilla/reading-progress-rail.css/.js.
   Structure expected: this component renders .rail containing .fill and .label; edge, targetId, and showPercentage are props.
   Consumes tokens.css variables --motion-fast and --ease-out-soft through the module stylesheet; JS writes --progress and aria-valuenow.
   Under prefers-reduced-motion, tracking remains active while the token-controlled fill transition is zero. */
import { useEffect, useRef, useState } from "react";
import styles from "./ReadingProgressRail.module.css";
export interface ReadingProgressRailProps {
  edge?: "top" | "side";
  showPercentage?: boolean;
  targetId?: string;
}
export function ReadingProgressRail({
  edge = "top",
  showPercentage = false,
  targetId,
}: ReadingProgressRailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const root = ref.current;
    const target = targetId ? document.getElementById(targetId) : null;
    if (!root) return;
    const update = () => {
      const max = target
        ? Math.max(0, target.scrollHeight - target.clientHeight)
        : Math.max(0, document.documentElement.scrollHeight - innerHeight);
      const offset = target ? target.scrollTop : scrollY;
      const next = max ? Math.min(1, Math.max(0, offset / max)) : 0;
      root.style.setProperty("--progress", String(next));
      root.setAttribute("aria-valuenow", String(Math.round(next * 100)));
      setValue(next);
    };
    const source = target || window;
    source.addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
    return () => {
      source.removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [targetId]);
  return (
    <div
      ref={ref}
      className={styles.rail}
      data-edge={edge}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      aria-label="Reading progress"
    >
      <span className={styles.fill} />
      <span className={styles.label} hidden={!showPercentage}>
        {Math.round(value * 100)}%
      </span>
    </div>
  );
}
