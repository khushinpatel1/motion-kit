/* Text Scramble Hover — React form. Expects a heading-like root with a visually hidden full label and an aria-hidden glyph layer; consumes --motion-instant/--ease-out-soft and writes no custom properties. Reduced motion renders the label only and attaches no listeners. */
import { useEffect, useRef, useState } from "react";
import styles from "./TextScrambleHover.module.css";

export interface TextScrambleHoverProps {
  children: string;
  glyphs?: string;
}

export function TextScrambleHover({
  children,
  glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?",
}: TextScrambleHoverProps) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(children);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    setDisplay(children);
    let frame = 0;
    const start = () => {
      const started = performance.now();
      const duration =
        8 *
        parseDuration(
          getComputedStyle(root).getPropertyValue("--motion-instant"),
        );
      const stagger = duration * 0.08;
      const tick = (now: number) => {
        const elapsed = now - started;
        setDisplay(
          [...children]
            .map((character, index) =>
              elapsed - index * stagger < duration
                ? randomGlyph(glyphs)
                : character,
            )
            .join(""),
        );
        if (elapsed < duration + children.length * stagger)
          frame = requestAnimationFrame(tick);
      };
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };
    root.addEventListener("pointerenter", start);
    root.addEventListener("focus", start);
    return () => {
      root.removeEventListener("pointerenter", start);
      root.removeEventListener("focus", start);
      cancelAnimationFrame(frame);
    };
  }, [children, glyphs]);
  return (
    <span ref={ref} className={styles.root} tabIndex={0}>
      <span className={styles.label}>{children}</span>
      <span className={styles.visual} aria-hidden="true">
        {display}
      </span>
    </span>
  );
}
function randomGlyph(glyphs: string) {
  return glyphs[Math.floor(Math.random() * glyphs.length)] || "";
}
function parseDuration(value: string) {
  const number = Number.parseFloat(value);
  return value.trim().endsWith("s") && !value.trim().endsWith("ms")
    ? number * 1000
    : number;
}
