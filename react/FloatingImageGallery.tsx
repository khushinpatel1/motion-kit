/* Floating Image Gallery — React.
   Clean-room re-derived from a behaviour specification on 2026-08-13; no
   outside reference was consulted for this implementation. The component
   keeps the public items/columns API and uses a real grid, roving tabindex,
   and a native fullscreen dialog. */
import type { CSSProperties } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "./FloatingImageGallery.module.css";

export interface FloatingImageGalleryItem {
  title: string;
  description?: string;
  src: string;
  alt?: string;
}

export interface FloatingImageGalleryProps {
  items: FloatingImageGalleryItem[];
  /** Grid width. Default 5 — tuned for a 5x4 (20-item) image display. */
  columns?: number;
}

const focusableSelector =
  "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])";

export function FloatingImageGallery({
  items,
  columns = 5,
}: FloatingImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [raisedIndex, setRaisedIndex] = useState<number | null>(null);
  const gallery = useRef<HTMLDivElement>(null);
  const modal = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const modalTitleId = useId();
  const gridColumns = Math.max(
    1,
    Math.min(Math.floor(columns) || 1, Math.max(items.length, 1)),
  );

  const close = useCallback(() => {
    const node = modal.current;
    const source = opener.current;
    if (node?.open) node.close();
    setOpenIndex(null);
    if (source?.isConnected) source.focus();
    opener.current = null;
  }, []);

  useEffect(() => {
    const node = modal.current;
    if (!node) return;
    if (openIndex === null) {
      if (node.open) node.close();
      return;
    }
    if (!node.open) node.showModal();
    closeButton.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex]);

  const move = (
    index: number,
    direction: "left" | "right" | "up" | "down",
  ) => {
    const lastIndex = items.length - 1;
    let nextIndex = index;
    if (direction === "left" && index > 0) nextIndex = index - 1;
    if (direction === "right" && index < lastIndex) nextIndex = index + 1;
    if (direction === "up" && index - gridColumns >= 0) {
      nextIndex = index - gridColumns;
    }
    if (direction === "down" && index + gridColumns <= lastIndex) {
      nextIndex = index + gridColumns;
    }
    setActiveIndex(nextIndex);
    if (nextIndex !== index) {
      gallery.current
        ?.querySelector<HTMLButtonElement>(
          `[data-fig-index="${nextIndex}"]`,
        )
        ?.focus();
    }
  };

  const modalItem = openIndex === null ? null : items[openIndex];
  const gridStyle = { "--fig-columns": gridColumns } as CSSProperties;

  return (
    <div
      className={styles.gallery}
      ref={gallery}
      role="grid"
      aria-label="Image gallery"
      style={gridStyle}
    >
      {items.map((item, index) => {
        const name = item.alt || item.title || `Image ${index + 1}`;
        return (
          <div
            className={styles.shell}
            key={`${item.src}-${index}`}
            role="gridcell"
            aria-rowindex={Math.floor(index / gridColumns) + 1}
            aria-colindex={(index % gridColumns) + 1}
            data-raised={raisedIndex === index ? "true" : undefined}
            onPointerEnter={() => setRaisedIndex(index)}
            onPointerLeave={() =>
              setRaisedIndex((current) =>
                current === index ? null : current,
              )
            }
          >
            <button
              className={styles.card}
              type="button"
              aria-label={name}
              aria-posinset={index + 1}
              aria-setsize={items.length}
              data-fig-index={index}
              tabIndex={index === activeIndex ? 0 : -1}
              onFocus={() => setActiveIndex(index)}
              onClick={(event) => {
                opener.current = event.currentTarget;
                setOpenIndex(index);
              }}
              onKeyDown={(event) => {
                const direction = {
                  ArrowLeft: "left",
                  ArrowRight: "right",
                  ArrowUp: "up",
                  ArrowDown: "down",
                }[event.key] as
                  | "left"
                  | "right"
                  | "up"
                  | "down"
                  | undefined;
                if (!direction) return;
                event.preventDefault();
                move(index, direction);
              }}
            >
              <img src={item.src} alt={item.alt || ""} loading="lazy" />
              <span className={styles.label}>
                <span className={styles.title}>{item.title}</span>
                {item.description ? (
                  <span className={styles.description}>{item.description}</span>
                ) : null}
              </span>
            </button>
          </div>
        );
      })}
      <dialog
        className={styles.modal}
        ref={modal}
        aria-labelledby={modalTitleId}
        aria-modal="true"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Tab" || !modal.current?.open) return;
          const focusable = Array.from(
            modal.current.querySelectorAll<HTMLElement>(focusableSelector),
          ).filter((item) => !item.hasAttribute("disabled"));
          if (!focusable.length) {
            event.preventDefault();
            modal.current.focus();
            return;
          }
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
      >
        {modalItem ? (
          <div className={styles.modalInner}>
            <button
              className={styles.close}
              ref={closeButton}
              type="button"
              onClick={close}
            >
              Close image
            </button>
            <img src={modalItem.src} alt={modalItem.alt || modalItem.title} />
            <div className={styles.modalCopy}>
              <h2 id={modalTitleId}>{modalItem.title}</h2>
              {modalItem.description ? <p>{modalItem.description}</p> : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
