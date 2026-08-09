/* Cursor Follow Image List — React port of vanilla/cursor-follow-image-list.css and .js.
   Expects rows with image URLs and one preview, consumes --motion-fast/--ease-out-soft, writes --cfil-x/--cfil-y/--cfil-rotation, and skips preview plus rAF under reduced motion or non-hover input. */
import { useEffect, useRef, useState } from "react";
import styles from "./CursorFollowImageList.module.css";
export interface CursorFollowImageListItem {
  label: string;
  image: string;
  href?: string;
}
export interface CursorFollowImageListProps {
  items: CursorFollowImageListItem[];
  lag?: number;
  rotationCap?: number;
}
export function CursorFollowImageList({
  items,
  lag = 0.14,
  rotationCap = 8,
}: CursorFollowImageListProps) {
  const preview = useRef<HTMLImageElement>(null);
  const frame = useRef<number>(0);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const lastX = useRef(0);
  const rotation = useRef(0);
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover)").matches;
    if (reduced) return;
    const tick = () => {
      if (!preview.current || active === null) {
        frame.current = 0;
        return;
      }
      current.current.x += (target.current.x - current.current.x) * lag;
      current.current.y += (target.current.y - current.current.y) * lag;
      rotation.current +=
        (Math.max(
          -rotationCap,
          Math.min(rotationCap, (target.current.x - lastX.current) * 0.08),
        ) -
          rotation.current) *
        lag;
      lastX.current = target.current.x;
      preview.current.style.setProperty("--cfil-x", `${current.current.x}px`);
      preview.current.style.setProperty("--cfil-y", `${current.current.y}px`);
      preview.current.style.setProperty(
        "--cfil-rotation",
        `${rotation.current}deg`,
      );
      frame.current = requestAnimationFrame(tick);
    };
    if (active !== null && !frame.current)
      frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [active, lag, rotationCap]);
  return (
    <div className={styles.list}>
      {items.map((item, index) => (
        <a
          className={styles.row}
          href={item.href || "#"}
          key={item.label}
          onPointerEnter={(event) => {
            target.current = { x: event.clientX, y: event.clientY };
            current.current = target.current;
            setActive(index);
          }}
          onPointerMove={(event) => {
            target.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerLeave={() => setActive(null)}
        >
          {item.label}
          <span aria-hidden="true">↗</span>
        </a>
      ))}
      <span className={styles.preview} data-visible={active !== null}>
        <img
          ref={preview}
          src={active === null ? undefined : items[active].image}
          alt=""
        />
      </span>
    </div>
  );
}
