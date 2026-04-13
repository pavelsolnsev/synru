export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('inline-svg', {
    mounted (el) {
      if (!el) {
        return;
      }

      // copy attributes to first child
      const content = el.tagName === 'TEMPLATE' ? el.content : el;
      if (content.children.length === 1) {
        ;[...el.attributes].forEach((attr) => content.firstChild.setAttribute(attr.name, attr.value));
      }

      // replace element with content
      if (el.tagName === 'TEMPLATE') {
        el.replaceWith(el.content);
      } else {
        el.replaceWith(...el.children);
      }
    },
    getSSRProps () {
      // you can provide SSR-specific props here
      return {};
    },
  });
});
