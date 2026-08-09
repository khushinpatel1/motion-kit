/* Height Morph Accordion — React port of vanilla/height-morph-accordion.css and .js.
   Expects items rendered as trigger buttons followed by linked panels; consumes --motion-fast and --ease-out-soft, writes no custom properties, and settles panels immediately under reduced motion while preserving hidden and keyboard behavior. */
import { useId, useState } from "react";
import styles from "./HeightMorphAccordion.module.css";

export interface HeightMorphAccordionItem {
  title: string;
  content: React.ReactNode;
}
export interface HeightMorphAccordionProps {
  items: HeightMorphAccordionItem[];
  multiple?: boolean;
}

export function HeightMorphAccordion({
  items,
  multiple = false,
}: HeightMorphAccordionProps) {
  const [open, setOpen] = useState<number[]>([]);
  const instanceId = useId().replaceAll(":", "");
  const toggle = (index: number) =>
    setOpen((current) => {
      if (current.includes(index))
        return current.filter((item) => item !== index);
      return multiple ? [...current, index] : [index];
    });
  return (
    <section className={styles.accordion} aria-label="Details">
      {items.map((item, index) => {
        const expanded = open.includes(index);
        const panelId = `hma-panel-${instanceId}-${index}`;
        const triggerId = `hma-trigger-${instanceId}-${index}`;
        return (
          <div className={styles.item} key={panelId}>
            <button
              className={styles.trigger}
              type="button"
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowDown" && event.key !== "ArrowUp")
                  return;
                event.preventDefault();
                const next =
                  (index +
                    (event.key === "ArrowDown" ? 1 : -1) +
                    items.length) %
                  items.length;
                    document.getElementById(`hma-trigger-${instanceId}-${next}`)?.focus();
              }}
              id={triggerId}
            >
              {item.title}
            </button>
            <div
              className={styles.panel}
              data-open={expanded}
              hidden={!expanded}
              id={panelId}
            >
              <div className={styles.panelInner}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
