/* Cinematic Type Reveal — React port of vanilla/cinematic-type-reveal.css. Expects lines: string[] and renders .line > span; reduced motion skips the observer and shows final text. */
import { useEffect, useRef } from "react";
import styles from "./CinematicTypeReveal.module.css";
export interface CinematicTypeRevealProps {
  lines: string[];
}
export function CinematicTypeReveal({ lines }: CinematicTypeRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const nodes = [...root.querySelectorAll<HTMLElement>("." + styles.line)];
    const observer = reduced
      ? null
      : new IntersectionObserver((entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add(styles.visible);
              observer?.unobserve(e.target);
            }
          }),
        );
    nodes.forEach((node, i) => {
      node.style.setProperty(
        "--delay",
        reduced ? "0" : "calc(var(--motion-instant) * " + Math.min(i, 4) + ")",
      );
      if (reduced) node.classList.add(styles.visible);
      else observer?.observe(node);
    });
    return () => observer?.disconnect();
  }, []);
  return (
    <h2 ref={ref}>
      {lines.map((line) => (
        <span className={styles.line} key={line}>
          <span>{line}</span>
        </span>
      ))}
    </h2>
  );
}
