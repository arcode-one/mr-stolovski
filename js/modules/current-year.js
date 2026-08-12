export const initCurrentYear = () => {
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
};

