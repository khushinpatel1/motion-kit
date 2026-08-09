/* SVG Path Draw — React port of vanilla/svg-path-draw.css/.js.
   Structure expected: this component renders .svg containing one path[data-draw] per d string in paths.
   Consumes tokens.css variables --motion-fast and --ease-linear through the module stylesheet; JS writes --progress, --length, --start, and --span.
   Under prefers-reduced-motion, all paths are fully drawn at mount and no scroll listener is attached. */
import { useEffect, useRef } from "react";
import styles from "./SvgPathDraw.module.css";
export interface SvgPathDrawProps {
  paths: string[];
  viewBox?: string;
  stagger?: number;
  stroke?: string;
  strokeWidth?: number;
}
export function SvgPathDraw({
  paths,
  viewBox = "0 0 200 100",
  stagger = 0.08,
  stroke = "currentColor",
  strokeWidth = 2,
}: SvgPathDrawProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = Array.from(
      root.querySelectorAll<SVGPathElement>("path[data-draw]"),
    );
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const measure = () =>
      nodes.forEach((node, index) => {
        const start = index * stagger;
        node.style.setProperty("--length", String(node.getTotalLength()));
        node.style.setProperty("--start", String(start));
        node.style.setProperty("--span", String(Math.max(0.01, 1 - start)));
      });
    const update = () => {
      const rect = root.getBoundingClientRect();
      root.style.setProperty(
        "--progress",
        String(clamp((innerHeight - rect.top) / (innerHeight + rect.height))),
      );
    };
    measure();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.setProperty("--progress", "1");
      return;
    }
    const resize = () => {
      measure();
      update();
    };
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", resize);
    update();
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", resize);
    };
  }, [stagger]);
  return (
    <svg ref={ref} className={styles.svg} viewBox={viewBox} aria-hidden="true">
      {paths.map((d, index) => (
        <path
          key={`${d}-${index}`}
          data-draw="true"
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      ))}
    </svg>
  );
}
