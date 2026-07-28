/* Char Rise Reveal — React port of vanilla/char-rise-reveal.css/.js. Expects .root with aria-label and an aria-hidden .chars span of .char spans; consumes --motion-instant/--motion-base/--ease-out-expressive and writes --crr-index. Reduced motion observes but CSS shows all characters immediately. */
import { useEffect, useRef } from "react";
import styles from "./CharRiseReveal.module.css";

export interface CharRiseRevealProps {
  children: string;
  staggerStep?: number;
  threshold?: number;
}
export function CharRiseReveal({
  children,
  staggerStep = 1,
  threshold = 0.2,
}: CharRiseRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            root
              .querySelectorAll("." + styles.char)
              .forEach((node) => node.classList.add(styles.visible));
            observer.unobserve(entry.target);
          }
        }),
      { threshold },
    );
    if (reduced)
      root
        .querySelectorAll("." + styles.char)
        .forEach((node) => node.classList.add(styles.visible));
    observer.observe(root);
    return () => observer.disconnect();
  }, [staggerStep, threshold]);
  return (
    <h2 ref={ref} className={styles.root} aria-label={children}>
      <span className={styles.chars} aria-hidden="true">
        {[...children].map((character, index) => (
          <span
            className={styles.char}
            style={
              { "--crr-index": index * staggerStep } as React.CSSProperties
            }
            key={`${character}-${index}`}
          >
            {character === " " ? "\u00a0" : character}
          </span>
        ))}
      </span>
    </h2>
  );
}
