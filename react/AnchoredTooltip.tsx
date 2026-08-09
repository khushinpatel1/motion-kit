/* Anchored Tooltip — React port of vanilla/anchored-tooltip.css and .js.
   Expects a focusable trigger and non-interactive role=tooltip; consumes --motion-fast/--ease-out-soft, writes --at-x/--at-y/--at-origin, and preserves the show delay while reduced motion removes the lift. */
import { useEffect, useId, useRef, useState } from "react";
import styles from "./AnchoredTooltip.module.css";

export interface AnchoredTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  delay?: number;
  side?: "top" | "bottom" | "left" | "right";
}
export function AnchoredTooltip({
  children,
  content,
  delay = 250,
  side = "top",
}: AnchoredTooltipProps) {
  const id = useId();
  const trigger = useRef<HTMLSpanElement>(null);
  const tooltip = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const timer = useRef<number>(0);
  const place = () => {
    const anchor = trigger.current?.getBoundingClientRect();
    const tip = tooltip.current?.getBoundingClientRect();
    const tooltipEl = tooltip.current;
    if (!anchor || !tip || !tooltipEl) return;
    const gap = 10;
    const fits = (s: string) =>
      s === "top"
        ? anchor.top > tip.height + gap
        : s === "bottom"
          ? innerHeight - anchor.bottom > tip.height + gap
          : s === "left"
            ? anchor.left > tip.width + gap
            : innerWidth - anchor.right > tip.width + gap;
    const opposite = {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left",
    } as const;
    const actual = fits(side)
      ? side
      : fits(opposite[side])
        ? opposite[side]
        : side;
    const x =
      actual === "left"
        ? anchor.left - gap
        : actual === "right"
          ? anchor.right + gap
          : anchor.left + anchor.width / 2;
    const y =
      actual === "top"
        ? anchor.top - tip.height - gap
        : actual === "bottom"
          ? anchor.bottom + gap
          : anchor.top + anchor.height / 2;
    tooltipEl.style.setProperty("--at-x", `${x}px`);
    tooltipEl.style.setProperty("--at-y", `${y}px`);
    tooltipEl.dataset.side = actual;
  };
  const show = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(place);
    }, delay);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setVisible(false);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <span
      className={styles.root}
      onPointerEnter={() =>
        window.matchMedia("(hover: hover)").matches && show()
      }
      onPointerLeave={hide}
      ref={trigger}
    >
      <button
        type="button"
        aria-describedby={id}
        onFocus={show}
        onBlur={hide}
        onKeyDown={(event) => event.key === "Escape" && hide()}
      >
        {children}
      </button>
      <span
        className={styles.tooltip}
        ref={tooltip}
        id={id}
        role="tooltip"
        data-side={side}
        data-state={visible ? "visible" : "hidden"}
        hidden={!visible}
      >
        {content}
      </span>
    </span>
  );
}
