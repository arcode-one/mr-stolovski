const ANIMATION_DURATION = 420;
const ANIMATION_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export const initFaq = () => {
  const items = Array.from(document.querySelectorAll(".faq-item"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const activeAnimations = new WeakMap();

  const resetContent = (content) => {
    content.style.removeProperty("height");
    content.style.removeProperty("overflow");
    content.style.removeProperty("opacity");
    content.style.removeProperty("transform");
  };

  const stopAnimation = (item, content) => {
    const animation = activeAnimations.get(item);
    if (animation) animation.cancel();
    activeAnimations.delete(item);
    resetContent(content);
  };

  const setOpen = (item, shouldOpen) => {
    const content = item.querySelector(":scope > div");
    if (!content) return;

    const wasOpen = item.open;
    const currentHeight = wasOpen ? content.getBoundingClientRect().height : 0;
    stopAnimation(item, content);

    if (reduceMotion) {
      item.open = shouldOpen;
      item.classList.remove("is-closing");
      return;
    }

    if (shouldOpen) {
      item.classList.remove("is-closing");
      item.open = true;

      const targetHeight = content.scrollHeight;
      const animation = content.animate(
        [
          {
            height: `${currentHeight}px`,
            opacity: currentHeight > 0 ? 1 : 0,
            transform: currentHeight > 0 ? "translateY(0)" : "translateY(-10px)",
          },
          {
            height: `${targetHeight}px`,
            opacity: 1,
            transform: "translateY(0)",
          },
        ],
        { duration: ANIMATION_DURATION, easing: ANIMATION_EASING },
      );

      activeAnimations.set(item, animation);
      animation.onfinish = () => {
        if (activeAnimations.get(item) !== animation) return;
        activeAnimations.delete(item);
        resetContent(content);
      };
      return;
    }

    item.classList.add("is-closing");
    const startHeight = currentHeight;
    const animation = content.animate(
      [
        { height: `${startHeight}px`, opacity: 1, transform: "translateY(0)" },
        { height: "0px", opacity: 0, transform: "translateY(-10px)" },
      ],
      { duration: ANIMATION_DURATION, easing: ANIMATION_EASING },
    );

    activeAnimations.set(item, animation);
    animation.onfinish = () => {
      if (activeAnimations.get(item) !== animation) return;
      activeAnimations.delete(item);
      item.open = false;
      item.classList.remove("is-closing");
      resetContent(content);
    };
  };

  items.forEach((item) => {
    const summary = item.querySelector("summary");
    if (!summary) return;

    summary.addEventListener("click", (event) => {
      event.preventDefault();
      const shouldOpen = !item.open || item.classList.contains("is-closing");

      if (shouldOpen) {
        items.forEach((otherItem) => {
          if (otherItem !== item && otherItem.open) setOpen(otherItem, false);
        });
      }

      setOpen(item, shouldOpen);
    });
  });
};
