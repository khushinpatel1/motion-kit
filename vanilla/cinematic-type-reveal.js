/* Cinematic Type Reveal — dependency-free vanilla form.
   Structure expected: a root containing nested <div class="ctr-line">Text</div> lines; JS wraps each line's text in <span>.
   Consumes tokens.css variables --motion-instant and the CSS transition tokens --motion-base / --ease-out-expressive.
   Under prefers-reduced-motion, it marks every line visible immediately and does not observe it. */

export function mountCinematicTypeReveal(root) {
  if (!root) return { destroy() {} };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lines = [...root.querySelectorAll(".ctr-line")];
  lines.forEach((line, index) => {
    const text = line.textContent;
    line.textContent = "";
    const span = document.createElement("span");
    span.textContent = text;
    line.append(span);
    line.style.setProperty(
      "--ctr-delay",
      reduced ? "0" : `calc(var(--motion-instant) * ${Math.min(index, 4)})`,
    );
  });
  if (reduced) lines.forEach((line) => line.classList.add("is-visible"));
  else {
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
    );
    lines.forEach((line) => observer.observe(line));
    return {
      destroy() {
        observer.disconnect();
      },
    };
  }
  return { destroy() {} };
}
