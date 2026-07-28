/* Parallax Media Band — React port of vanilla/parallax-media-band.css/.js.
   Structure expected: this component renders .band containing .media and .content; src, depth, mediaType, alt, and children are props.
   Consumes tokens.css variable --motion-fast through the module stylesheet; JS writes --depth, --progress, --shift, and data-in-view.
   Under prefers-reduced-motion, the media is centred and static and no scroll listener is attached. */
import { type ReactNode, useEffect, useRef } from "react";
import styles from "./ParallaxMediaBand.module.css";
export interface ParallaxMediaBandProps {
  src: string;
  alt?: string;
  depth?: number;
  mediaType?: "image" | "video";
  children?: ReactNode;
}
export function ParallaxMediaBand({
  src,
  alt = "",
  depth = 0.35,
  mediaType = "image",
  children,
}: ParallaxMediaBandProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const value = Math.min(1, Math.max(0, depth));
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    root.style.setProperty("--depth", String(value));
    const setOverscan = () => {
      root.style.setProperty(
        "--shift",
        `${root.getBoundingClientRect().height * value}px`,
      );
    };
    const update = () => {
      const rect = root.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (innerHeight - rect.top) / (innerHeight + rect.height)),
      );
      root.style.setProperty("--progress", String(progress));
      root.dataset.inView = String(rect.bottom > 0 && rect.top < innerHeight);
    };
    if (reduced) {
      root.style.setProperty("--shift", "0px");
      root.style.setProperty("--progress", ".5");
      root.dataset.inView = "false";
      return;
    }
    const resize = () => {
      setOverscan();
      update();
    };
    setOverscan();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", resize);
    update();
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", resize);
    };
  }, [depth]);
  return (
    <section ref={ref} className={styles.band}>
      {mediaType === "video" ? (
        <video
          className={styles.media}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          aria-label={alt}
        />
      ) : (
        <img className={styles.media} src={src} alt={alt} />
      )}
      <div className={styles.content}>{children}</div>
    </section>
  );
}
