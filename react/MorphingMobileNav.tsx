/* Morphing Mobile Nav Pill — React port of vanilla/morphing-mobile-nav.js/.css. Renders .nav > .indicator + .tab buttons; active selection stays keyboard-friendly and reduced motion changes only CSS timing. */
import { useEffect, useRef, useState } from "react";
import styles from "./MorphingMobileNav.module.css";
export interface MorphingMobileNavProps {
  tabs?: string[];
}
export function MorphingMobileNav({
  tabs = ["Home", "Library", "Settings"],
}: MorphingMobileNavProps) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicator = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const tab = refs.current[active],
      el = indicator.current;
    if (tab && el) {
      el.style.width = tab.offsetWidth + "px";
      el.style.transform = "translateX(" + (tab.offsetLeft - 5) + "px)";
    }
  }, [active, tabs]);
  return (
    <nav className={styles.nav} aria-label="Sections">
      <span ref={indicator} className={styles.indicator} />
      {tabs.map((tab, i) => (
        <button
          key={tab}
          type="button"
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={styles.tab + " " + (i === active ? styles.active : "")}
          aria-pressed={i === active}
          onClick={() => setActive(i)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
