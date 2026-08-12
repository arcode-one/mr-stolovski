const SLIDE_INTERVAL = 3000;

export const initLocationSlider = () => {
  const slider = document.querySelector("[data-location-slider]");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll("[data-location-slide]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = 0;
  let timer = null;
  let isVisible = true;
  let isHovered = false;

  if (slides.length < 2) return;

  const showSlide = (nextIndex) => {
    slides.forEach((slide, index) => {
      const isActive = index === nextIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    activeIndex = nextIndex;
  };

  const stop = () => {
    if (timer === null) return;
    window.clearTimeout(timer);
    timer = null;
  };

  const scheduleNext = () => {
    stop();
    if (reduceMotion || isHovered || !isVisible || document.hidden) return;
    timer = window.setTimeout(() => {
      showSlide((activeIndex + 1) % slides.length);
      scheduleNext();
    }, SLIDE_INTERVAL);
  };

  slider.addEventListener("mouseenter", () => {
    isHovered = true;
    stop();
  });

  slider.addEventListener("mouseleave", () => {
    isHovered = false;
    scheduleNext();
  });

  document.addEventListener("visibilitychange", scheduleNext);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        scheduleNext();
      },
      { threshold: 0.15 },
    );
    observer.observe(slider);
  }

  showSlide(0);
  scheduleNext();
};

