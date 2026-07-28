/* Typewriter Caret — React port of vanilla/typewriter-caret.css/.js. Expects .root > hidden complete text + aria-hidden .visual/.caret; consumes --motion-instant/--motion-slow/--ease-linear and writes no custom properties. Reduced motion shows the first string immediately with a static caret. */
import { useEffect, useRef, useState } from "react";
import styles from "./TypewriterCaret.module.css";

export interface TypewriterCaretProps {
  children?: string;
  strings?: string[];
  deleteBetween?: boolean;
  loop?: boolean;
}

export function TypewriterCaret({
  children = "Make room for better work",
  strings,
  deleteBetween = true,
  loop = true,
}: TypewriterCaretProps) {
  const values = strings?.length ? strings : [children];
  const [display, setDisplay] = useState("");
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced.current) {
      setDisplay(values[0]);
      return;
    }
    const delayValue = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--motion-instant");
    const delay = parseDuration(delayValue);
    let timer = 0;
    let stringIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    const schedule = (fn: () => void) => {
      timer = window.setTimeout(fn, delay);
    };
    const step = () => {
      const current = values[stringIndex];
      if (!deleting) {
        characterIndex += 1;
        setDisplay(current.slice(0, characterIndex));
        if (characterIndex < current.length) return schedule(step);
        if (values.length === 1 || !deleteBetween) return;
        deleting = true;
        return schedule(step);
      }
      characterIndex -= 1;
      setDisplay(current.slice(0, characterIndex));
      if (characterIndex > 0) return schedule(step);
      stringIndex = (stringIndex + 1) % values.length;
      deleting = false;
      if (stringIndex === 0 && !loop) return;
      schedule(step);
    };
    schedule(step);
    return () => window.clearTimeout(timer);
  }, [children, deleteBetween, loop, strings]);
  return (
    <span className={styles.root}>
      <span className={styles.accessible}>{values.join(" ")}</span>
      <span className={styles.visual} aria-hidden="true">
        <span>{display}</span>
        <span className={styles.caret} />
      </span>
    </span>
  );
}
function parseDuration(value: string) {
  const number = Number.parseFloat(value);
  return value.trim().endsWith("s") && !value.trim().endsWith("ms")
    ? number * 1000
    : number;
}
