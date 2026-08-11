/* Flip Dialog Expand — React port of vanilla/flip-dialog-expand.css and .js.
   Expects a card trigger and native dialog, consumes --motion-base/--ease-out-expressive, writes --fde-x/--fde-y/--fde-scale-x/--fde-scale-y, and skips FLIP entirely under reduced motion. Native showModal() supplies document inertness; the local Tab loop keeps focus cycling stable across user agents. */
import { useRef } from "react";
import styles from "./FlipDialogExpand.module.css";
export interface FlipDialogExpandProps {
  title?: string;
  children?: React.ReactNode;
}
export function FlipDialogExpand({
  title = "Open details",
  children = "Expanded detail",
}: FlipDialogExpandProps) {
  const card = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useRef(false);
  const origin = useRef<DOMRect | undefined>(undefined);
  const focusable = () =>
    Array.from(
      dialog.current?.querySelectorAll<HTMLElement>(
        "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])",
      ) || [],
    ).filter((item) => !item.hasAttribute("disabled"));
  const close = () => {
    const node = dialog.current;
    const source = card.current;
    if (!node || !source || !node.open) return;
    if (reduced.current || !origin.current) {
      node.close();
      source.focus();
      return;
    }
    const target = node.getBoundingClientRect();
    node.style.setProperty("--fde-x", `${origin.current.left - target.left}px`);
    node.style.setProperty("--fde-y", `${origin.current.top - target.top}px`);
    node.style.setProperty(
      "--fde-scale-x",
      `${origin.current.width / target.width}`,
    );
    node.style.setProperty(
      "--fde-scale-y",
      `${origin.current.height / target.height}`,
    );
    node.classList.add(styles.closing);
    node.addEventListener(
      "transitionend",
      () => {
        node.close();
        node.classList.remove(styles.closing);
        source.focus();
      },
      { once: true },
    );
  };
  const open = () => {
    const node = dialog.current;
    const source = card.current;
    if (!node || !source) return;
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    origin.current = source.getBoundingClientRect();
    node.showModal();
    if (!reduced.current) {
      const target = node.getBoundingClientRect();
      node.style.setProperty(
        "--fde-x",
        `${origin.current.left - target.left}px`,
      );
      node.style.setProperty("--fde-y", `${origin.current.top - target.top}px`);
      node.style.setProperty(
        "--fde-scale-x",
        `${origin.current.width / target.width}`,
      );
      node.style.setProperty(
        "--fde-scale-y",
        `${origin.current.height / target.height}`,
      );
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          node.classList.add(styles.ready);
          node.style.removeProperty("--fde-x");
          node.style.removeProperty("--fde-y");
          node.style.removeProperty("--fde-scale-x");
          node.style.removeProperty("--fde-scale-y");
        }),
      );
    }
    node.querySelector<HTMLButtonElement>("button")?.focus();
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab" || !dialog.current?.open) return;
    const list = focusable();
    if (!list.length) {
      event.preventDefault();
      dialog.current?.focus();
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
  return (
    <div className={styles.root}>
      <button ref={card} className={styles.card} type="button" onClick={open}>
        {title}
      </button>
      <dialog
        ref={dialog}
        className={styles.dialog}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onKeyDown={onKeyDown}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className={styles.inner}>
          <button type="button" onClick={close}>
            Close
          </button>
          {children}
        </div>
      </dialog>
    </div>
  );
}
