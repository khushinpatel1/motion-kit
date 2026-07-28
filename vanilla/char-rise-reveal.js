/* Char Rise Reveal — dependency-free vanilla form.
   Structure expected: a root with text content; mount splits it into an aria-hidden .crr-chars wrapper of .crr-char spans and puts the full string in aria-label.
   Consumes tokens.css variables --motion-instant, --motion-base, and --ease-out-expressive; JS writes --crr-index.
   Under prefers-reduced-motion, the observer still observes the wrapper, while CSS keeps every character visible with no transform or stagger. */

export function mountCharRiseReveal(
  root,
  { staggerStep = 1, threshold = 0.2 } = {},
) {
  if (!root) return { destroy() {} };
  const text = root.textContent || "";
  root.setAttribute("aria-label", text);
  root.textContent = "";
  const chars = document.createElement("span");
  chars.className = "crr-chars";
  chars.setAttribute("aria-hidden", "true");
  [...text].forEach((character, index) => {
    const node = document.createElement("span");
    node.className = "crr-char";
    node.textContent = character === " " ? "\u00a0" : character;
    node.style.setProperty("--crr-index", String(index * staggerStep));
    chars.append(node);
  });
  root.append(chars);
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target
            .querySelectorAll(".crr-char")
            .forEach((node) => node.classList.add("is-visible"));
          observer.unobserve(entry.target);
        }
      }),
    { threshold },
  );
  observer.observe(root);
  return {
    destroy() {
      observer.disconnect();
    },
  };
}
