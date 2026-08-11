/* Cursor Spotlight Card — React port of vanilla/cursor-spotlight-card.css. Renders .card; pointer tracking is attached only for hover-capable pointers and is skipped under reduced motion. */
import { useEffect, useRef } from "react";
import styles from "./CursorSpotlightCard.module.css";
export interface CursorSpotlightCardProps {
  title?: string;
}
export function CursorSpotlightCard({
  title = "Cursor spotlight",
}: CursorSpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (
      !root ||
      !window.matchMedia("(hover: hover)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const move = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      root.style.setProperty("--x", e.clientX - r.left + "px");
      root.style.setProperty("--y", e.clientY - r.top + "px");
    };
    root.addEventListener("pointermove", move);
    return () => root.removeEventListener("pointermove", move);
  }, []);
  return (
    <article ref={ref} className={styles.card}>
      <strong>{title}</strong>
      <span>Move a pointer across the surface</span>
    </article>
  );
}
