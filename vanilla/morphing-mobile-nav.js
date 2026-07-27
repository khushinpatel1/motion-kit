export function mountMorphingMobileNav(root) {
  if (!root) return { destroy() {} };
  const indicator = root.querySelector(".mn-indicator"); const tabs = [...root.querySelectorAll(".mn-tab")];
  const select = (tab) => { tabs.forEach((item) => item.classList.toggle("is-active", item === tab)); indicator.style.width = `${tab.offsetWidth}px`; indicator.style.transform = `translateX(${tab.offsetLeft - 5}px)`; };
  tabs.forEach((tab) => tab.addEventListener("click", () => select(tab))); if (tabs[0]) select(tabs.find((tab) => tab.classList.contains("is-active")) || tabs[0]);
  return { destroy() { tabs.forEach((tab) => tab.replaceWith(tab.cloneNode(true))); } };
}
