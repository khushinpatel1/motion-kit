/* Staggered Scroll Reveal — React port of vanilla/staggered-scroll-reveal.js/.css. Expects items: string[] and renders .root > .item; reduced motion skips observer work. */
import { useEffect, useRef } from "react";
import styles from "./StaggeredScrollReveal.module.css";
export interface StaggeredScrollRevealProps {
  items: string[];
}
export function StaggeredScrollReveal({ items }: StaggeredScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const nodes = [...root.children] as HTMLElement[];
    nodes.forEach((n, i) => {
      n.style.setProperty(
        "--delay",
        reduced ? "0" : "calc(var(--motion-instant) * " + Math.min(i, 5) + ")",
      );
      if (reduced) n.classList.add(styles.visible);
    });
    if (reduced) return;
    const ob = new IntersectionObserver((es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add(styles.visible);
          ob.unobserve(e.target);
        }
      }),
    );
    nodes.forEach((n) => ob.observe(n));
    return () => ob.disconnect();
  }, []);
  return (
    <div ref={ref} className={styles.root}>
      {items.map((item) => (
        <article className={styles.item} key={item}>
          {item}
        </article>
      ))}
    </div>
  );
}
