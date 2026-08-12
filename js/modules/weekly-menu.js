import { WEEKLY_MENU } from "../data/weekly-menu.js";

const createMenuCategory = (category) => {
  const section = document.createElement("section");
  section.className = "menu-category";
  if (category.accent) section.classList.add("menu-category--lime");
  if (category.wide) section.classList.add("menu-category--wide");

  const head = document.createElement("div");
  head.className = "menu-category__head";

  const title = document.createElement("h3");
  title.textContent = category.title;

  const list = document.createElement("ul");
  category.items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.append(listItem);
  });

  head.append(title);
  section.append(head, list);
  return section;
};

export const initWeeklyMenu = () => {
  const tabs = Array.from(document.querySelectorAll("[data-menu-tab]"));
  const content = document.querySelector("[data-menu-content]");
  const dayLabel = document.querySelector("[data-menu-day-label]");
  const heroDay = document.querySelector("[data-hero-menu-day]");
  const heroSummary = document.querySelector("[data-hero-menu-summary]");

  if (!tabs.length || !content || !dayLabel) return;

  content.setAttribute("role", "tabpanel");
  content.id = "weekly-menu-panel";

  const activateDay = (dayKey, shouldFocus = false) => {
    const day = WEEKLY_MENU[dayKey] || WEEKLY_MENU.monday;
    const activeTab = tabs.find((tab) => tab.dataset.menuTab === dayKey) || tabs[0];

    tabs.forEach((tab) => {
      const isActive = tab === activeTab;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
      tab.setAttribute("aria-controls", content.id);
    });

    content.setAttribute("aria-labelledby", activeTab.id);
    dayLabel.textContent = day.label;
    if (heroDay) heroDay.textContent = day.shortLabel;
    if (heroSummary) heroSummary.textContent = day.summary;

    const fragment = document.createDocumentFragment();
    day.categories.forEach((category) => fragment.append(createMenuCategory(category)));
    content.replaceChildren(fragment);

    if (shouldFocus) {
      activeTab.focus();
      activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  tabs.forEach((tab, index) => {
    tab.id = `weekly-menu-tab-${tab.dataset.menuTab}`;
    tab.addEventListener("click", () => activateDay(tab.dataset.menuTab));
    tab.addEventListener("keydown", (event) => {
      let targetIndex = null;
      if (event.key === "ArrowRight") targetIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") targetIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") targetIndex = 0;
      if (event.key === "End") targetIndex = tabs.length - 1;
      if (targetIndex === null) return;

      event.preventDefault();
      activateDay(tabs[targetIndex].dataset.menuTab, true);
    });
  });

  const weekdayKeys = [null, "monday", "tuesday", "wednesday", "thursday", "friday", null];
  activateDay(weekdayKeys[new Date().getDay()] || "monday");
};

