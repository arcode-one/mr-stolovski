import { CONTACTS } from "../data/contacts.js";

export const initContacts = () => {
  document.querySelectorAll("[data-phone-primary]").forEach((element) => {
    element.textContent = CONTACTS.primary.display;
  });

  document.querySelectorAll("[data-tel-primary]").forEach((element) => {
    element.setAttribute("href", CONTACTS.primary.href);
  });

  document.querySelectorAll("[data-phone-secondary]").forEach((element) => {
    element.textContent = CONTACTS.secondary.display;
  });

  document.querySelectorAll("[data-tel-secondary]").forEach((element) => {
    element.setAttribute("href", CONTACTS.secondary.href);
  });
};

