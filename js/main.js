import { initContacts } from "./modules/contacts.js";
import { initCurrentYear } from "./modules/current-year.js";
import { initFaq } from "./modules/faq.js";
import { initHeader } from "./modules/header.js";
import { initLocationSlider } from "./modules/location-slider.js";
import { initMobileMenu } from "./modules/mobile-menu.js";
import { initReveal } from "./modules/reveal.js";
import { initWeeklyMenu } from "./modules/weekly-menu.js";

document.documentElement.classList.add("is-ready");

initContacts();
initMobileMenu();
initHeader();
initWeeklyMenu();
initReveal();
initFaq();
initLocationSlider();
initCurrentYear();

