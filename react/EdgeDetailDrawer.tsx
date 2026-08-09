/* Edge Detail Drawer — React port of vanilla/edge-detail-drawer.css and .js.
   Expects a trigger and role=dialog drawer, consumes --motion-base/--ease-out-expressive, writes no custom properties, and keeps scroll lock, focus trapping, Escape, and focus return under reduced motion. */
import { useEffect, useId, useRef, useState } from "react";
import styles from "./EdgeDetailDrawer.module.css";
export interface EdgeDetailDrawerProps {
  children: React.ReactNode;
  side?: "left" | "right";
  label?: string;
}
export function EdgeDetailDrawer({
  children,
  side = "right",
  label = "Open details",
}: EdgeDetailDrawerProps) {
  const [open, setOpen] = useState(false);
  const drawerId = `edge-detail-drawer-${useId().replaceAll(":", "")}`;
  const trigger = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const scroll = useRef(0);
  useEffect(() => {
    if (!open) return;
    scroll.current = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scroll.current}px`;
    document.body.style.width = "100%";
    const items = () =>
      Array.from(
        drawer.current?.querySelectorAll<HTMLElement>(
          "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])",
        ) || [],
      ).filter((item) => !item.hasAttribute("disabled"));
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const list = items();
      if (!list.length) {
        event.preventDefault();
        drawer.current?.focus();
        return;
      }
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const list = items();
    (list[0] || drawer.current)?.focus();
    drawer.current?.addEventListener("keydown", key);
    return () => {
      drawer.current?.removeEventListener("keydown", key);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scroll.current);
      trigger.current?.focus();
    };
  }, [open]);
  return (
    <div
      className={`${styles.root} ${open ? styles.open : ""}`}
      data-side={side}
    >
      <button
        className={styles.trigger}
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
      <button
        className={styles.scrim}
        type="button"
        aria-label="Close details"
        hidden={!open}
        onClick={() => setOpen(false)}
      />
      <div
        className={styles.drawer}
        ref={drawer}
        id={drawerId}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        hidden={!open}
      >
        <button type="button" onClick={() => setOpen(false)}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
