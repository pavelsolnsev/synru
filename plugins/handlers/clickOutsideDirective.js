export const clickOutsideDirective = {
  mounted (el, binding) {
    el.clickOutsideEvent = (event) => {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value(el);
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  getSSRProps () {
    // you can provide SSR-specific props here
    return {};
  },
  unmounted: (el) => {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
};
