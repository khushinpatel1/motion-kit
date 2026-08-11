/* Word Morph Cycle — dependency-free vanilla form.
   Structure expected: a .wmc root with a .wmc-shell; mount creates its measure and two .wmc-word layers.
   Consumes tokens.css variables --motion-ambient, --motion-fast, --motion-base, and --ease-out-expressive; JS writes --wmc-width.
   Under prefers-reduced-motion, only the first word is rendered and no interval or resize listener is attached. */

export function mountWordMorphCycle(
  root,
  { words = ["build", "ship", "tend"], interval } = {},
) {
  if (!root || !words.length) return { destroy() {} };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cadence =
    interval ??
    parseDuration(getComputedStyle(root).getPropertyValue("--motion-ambient"));
  const shell = root.querySelector(".wmc-shell") || root;
  shell.textContent = "";
  const measure = document.createElement("span");
  measure.className = "wmc-measure";
  const first = document.createElement("span");
  const second = document.createElement("span");
  first.className = "wmc-word is-active";
  second.className = "wmc-word";
  // The two word layers intentionally share one box while they morph.
  first.setAttribute("data-uilint-ignore-overlap", "");
  second.setAttribute("data-uilint-ignore-overlap", "");
  shell.append(measure, first, second);
  let index = 0;
  let timer = 0;
  const setWidth = () => {
    measure.textContent = words[index];
    shell.style.setProperty(
      "--wmc-width",
      `${measure.getBoundingClientRect().width}px`,
    );
  };
  const cycle = () => {
    const outgoing = index % 2 ? second : first;
    const incoming = index % 2 ? first : second;
    index = (index + 1) % words.length;
    measure.textContent = words[index];
    shell.style.setProperty(
      "--wmc-width",
      `${measure.getBoundingClientRect().width}px`,
    );
    incoming.textContent = words[index];
    outgoing.classList.remove("is-active");
    outgoing.classList.add("is-outgoing");
    incoming.classList.remove("is-outgoing");
    incoming.classList.add("is-active");
    timer = window.setTimeout(cycle, cadence);
  };
  setWidth();
  if (reduced) {
    first.textContent = words[0];
    second.textContent = "";
    return {
      destroy() {
        shell.textContent = words[0];
      },
    };
  }
  first.textContent = words[0];
  timer = window.setTimeout(cycle, cadence);
  return {
    destroy() {
      window.clearTimeout(timer);
    },
  };
}

function parseDuration(value) {
  const number = Number.parseFloat(value);
  return value.trim().endsWith("s") && !value.trim().endsWith("ms")
    ? number * 1000
    : number;
}
