const DESKTOP_BREAKPOINT = 1180;

export const initMobileMenu = () => {
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const burger = document.querySelector("[data-burger]");
  const menu = document.querySelector("[data-mobile-menu]");

  if (!header || !burger || !menu) return;

  const setMenuState = (isOpen) => {
    burger.classList.toggle("is-active", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
    menu.classList.toggle("is-open", isOpen);
    header.classList.toggle("is-menu-open", isOpen);
    body.classList.toggle("is-menu-open", isOpen);
  };

  burger.addEventListener("click", () => {
    setMenuState(burger.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || burger.getAttribute("aria-expanded") !== "true") return;
    setMenuState(false);
    burger.focus();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > DESKTOP_BREAKPOINT) setMenuState(false);
  });
};

