/* Word Morph Cycle — React port of vanilla/word-morph-cycle.css/.js. Expects a .shell with two word layers; consumes --motion-fast/--motion-base/--ease-out-expressive and writes --wmc-width. Reduced motion renders the first word only and starts no timer. */
import { useEffect, useRef } from "react";
import styles from "./WordMorphCycle.module.css";

export interface WordMorphCycleProps {
  words?: string[];
  interval?: number;
}

export function WordMorphCycle({
  words = ["build", "ship", "tend"],
  interval,
}: WordMorphCycleProps) {
  const shell = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = shell.current;
    if (!root || !words.length) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const cadence =
      interval ??
      parseDuration(
        getComputedStyle(root).getPropertyValue("--motion-ambient"),
      );
    root.textContent = "";
    const measure = document.createElement("span");
    measure.className = styles.measure;
    const layers = [
      document.createElement("span"),
      document.createElement("span"),
    ];
    layers.forEach((layer) => {
      layer.className = styles.word;
      root.append(layer);
    });
    root.prepend(measure);
    let index = 0;
    let timer = 0;
    const width = () => {
      measure.textContent = words[index];
      root.style.setProperty(
        "--wmc-width",
        `${measure.getBoundingClientRect().width}px`,
      );
    };
    const cycle = () => {
      const outgoing = layers[index % 2];
      const incoming = layers[(index + 1) % 2];
      index = (index + 1) % words.length;
      width();
      incoming.textContent = words[index];
      outgoing.classList.remove(styles.active);
      outgoing.classList.add(styles.outgoing);
      incoming.classList.remove(styles.outgoing);
      incoming.classList.add(styles.active);
      timer = window.setTimeout(cycle, interval);
    };
    layers[0].textContent = words[0];
    layers[0].classList.add(styles.active);
    width();
    if (!reduced) timer = window.setTimeout(cycle, cadence);
    return () => {
      window.clearTimeout(timer);
      root.replaceChildren();
    };
  }, [interval, words]);
  return (
    <span className={styles.root}>
      <span ref={shell} className={styles.shell}>
        {words[0]}
      </span>
    </span>
  );
}

function parseDuration(value: string) {
  const number = Number.parseFloat(value);
  return value.trim().endsWith("s") && !value.trim().endsWith("ms")
    ? number * 1000
    : number;
}
