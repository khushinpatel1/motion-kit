/* Floating Image Gallery — React port of vanilla/floating-image-gallery.js/.css. Renders .fig-gallery > .fig-shell > .fig-glow/.fig-lift > .fig-card and .fig-modal; tokens.css supplies timing and reduced motion stops ambient motion. */
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./FloatingImageGallery.module.css";

export interface FloatingImageGalleryItem {
  title: string;
  description?: string;
  src: string;
  alt?: string;
}

export interface FloatingImageGalleryProps {
  items: FloatingImageGalleryItem[];
  /** Grid width. Default 5 — tuned for a 5x4 (20-item) art/design display. */
  columns?: number;
}

export function FloatingImageGallery({
  items,
  columns = 5,
}: FloatingImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const modal = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    const node = modal.current;
    if (node) node.inert = openIndex === null;
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;
      const items = Array.from(
        node?.querySelectorAll<HTMLElement>(
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
    document.addEventListener("keydown", onKeyDown);
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      if (node) node.inert = true;
      opener.current?.focus();
    };
  }, [openIndex, close]);

  const openItem = openIndex !== null ? items[openIndex] : null;

  return (
    <>
      <div
        className={styles["fig-gallery"]}
        style={{ ["--fig-columns" as string]: columns }}
      >
        {items.map((item, index) => (
          <div
            key={item.src}
            className={styles["fig-shell"]}
            style={{
              ["--fig-idle-delay" as string]: (index % 7) * 0.35,
              ["--fig-idle-amp" as string]: `${(index % 2 === 0 ? -1 : 1) * (10 + (index % 5) * 2)}px`,
            }}
          >
            <div className={styles["fig-glow"]} />
            <div className={styles["fig-lift"]}>
              <button
                type="button"
                className={styles["fig-card"]}
                aria-label={`Open ${item.title}`}
                onClick={(event) => {
                  opener.current = event.currentTarget;
                  setOpenIndex(index);
                }}
              >
                <div className={`${styles["fig-face"]} ${styles["fig-front"]}`}>
                  <img
                    src={item.src}
                    alt={item.alt ?? item.title}
                    loading="lazy"
                  />
                  <div className={styles["fig-label"]}>
                    <strong>{item.title}</strong>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <div className={`${styles["fig-face"]} ${styles["fig-back"]}`}>
                  <img src={item.src} alt="" loading="lazy" />
                  <div className={styles["fig-back-copy"]}>
                    <small>Selected image</small>
                    <strong>{item.description}</strong>
                    <em>Open full screen ↗</em>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`${styles["fig-modal"]} ${openItem ? styles["is-open"] : ""}`}
        ref={modal}
        role="dialog"
        aria-modal="true"
        aria-hidden={!openItem}
      >
        <button
          type="button"
          ref={closeButton}
          className={styles["fig-modal-close"]}
          aria-label="Close image"
          onClick={close}
        >
          ×
        </button>
        <div
          className={styles["fig-modal-inner"]}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {openItem && (
            <figure className={styles["fig-modal-figure"]}>
              <img
                className={styles["fig-modal-image"]}
                src={openItem.src}
                alt={openItem.alt ?? openItem.title}
              />
              <figcaption className={styles["fig-modal-caption"]}>
                <h2>{openItem.title}</h2>
                <p>{openItem.description}</p>
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </>
  );
}
