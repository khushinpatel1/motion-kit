/* Clip Mask Reveal — React port of vanilla/clip-mask-reveal.css/.js.
   Structure expected: this component renders one .reveal element around its children; direction and threshold are props.
   Consumes tokens.css variables --motion-base and --ease-out-expressive through the module stylesheet; JS writes the .visible class.
   Under prefers-reduced-motion, the element is revealed immediately with no observer animation. */
import { type ReactNode, useEffect, useRef } from "react";
import styles from "./ClipMaskReveal.module.css";
export interface ClipMaskRevealProps {
  children?: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
}
export function ClipMaskReveal({
  children,
  direction = "up",
  threshold = 0.15,
}: ClipMaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    root.dataset.direction = direction;
    const reveal = () => root.classList.add(styles.visible);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [direction, threshold]);
  return (
    <div ref={ref} className={styles.reveal}>
      {children}
    </div>
  );
}
