/* Gooey Radial Menu — React port of vanilla/gooey-radial-menu.css and .js.
   Expects a trigger and ordered item buttons/links plus an SVG goo filter; consumes --motion-base/--motion-fast/--motion-instant, writes --grm-x/--grm-y/--grm-index, and uses final positions without travel or stagger under reduced motion. */
import { useMemo, useState } from "react";
import styles from "./GooeyRadialMenu.module.css";
export interface GooeyRadialMenuProps {
  items: React.ReactNode[];
  radius?: number;
  arc?: number;
  label?: string;
}
export function GooeyRadialMenu({
  items,
  radius = 104,
  arc = 120,
  label = "Open actions",
}: GooeyRadialMenuProps) {
  const [open, setOpen] = useState(false);
  const positions = useMemo(
    () =>
      items.map((_, index) => {
        const angle =
          items.length === 1
            ? -90
            : -90 - arc / 2 + (arc * index) / (items.length - 1);
        const radians = (angle * Math.PI) / 180;
        return { x: Math.cos(radians) * radius, y: Math.sin(radians) * radius };
      }),
    [arc, items, radius],
  );
  return (
    <div className={`${styles.menu} ${open ? styles.open : ""}`}>
      <div className={styles.items}>
        {items.map((item, index) => (
          <span
            className={styles.item}
            style={
              {
                "--grm-x": `${positions[index].x}px`,
                "--grm-y": `${positions[index].y}px`,
                "--grm-index": index,
              } as React.CSSProperties
            }
            key={index}
            hidden={!open}
          >
            {item}
          </span>
        ))}
      </div>
      <button
        className={styles.trigger}
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        {open ? "×" : "+"}
      </button>
      <svg aria-hidden="true" width="0" height="0">
        <filter id="grm-goo-filter">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
          />
        </filter>
      </svg>
    </div>
  );
}
