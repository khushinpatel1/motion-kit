/* Command Palette Bloom — React port of vanilla/command-palette-bloom.css. Renders a trigger plus .backdrop/.panel/.input; reduced motion changes only visual timing, while Escape and focus behavior remain. */
import { useEffect, useRef, useState } from "react";
import styles from "./CommandPaletteBloom.module.css";
export interface CommandPaletteBloomProps {
  triggerLabel?: string;
  items?: string[];
}
export function CommandPaletteBloom({
  triggerLabel = "Open command palette",
  items = ["Open workspace", "Search library", "View settings"],
}: CommandPaletteBloomProps) {
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = backdrop.current;
    if (root) root.inert = !open;
    if (!open) return;
    input.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const items = Array.from(
        root?.querySelectorAll<HTMLElement>(
          "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])",
        ) || [],
      ).filter((item) => !item.hasAttribute("disabled"));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      if (root) root.inert = true;
      trigger.current?.focus();
    };
  }, [open]);
  return (
    <>
      <button ref={trigger} type="button" onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>
      <div
        className={styles.backdrop + " " + (open ? styles.open : "")}
        ref={backdrop}
        aria-hidden={!open}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className={styles.panel} role="dialog" aria-modal="true">
          <input
            ref={input}
            className={styles.input}
            placeholder="Type a command…"
          />
          {items.map((item) => (
            <div key={item} className={styles.item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
