export default defineNuxtPlugin((nuxtApp) => {
  let isFirstLoad = true;

  nuxtApp.hook('page:loading:end', () => {
    if (isFirstLoad) {
      isFirstLoad = false;

      if (window.LanderJS) window.LanderJS.form();

      return;
    }

    if (!window.LanderJS) return;

    window.LanderJS.check();
    window.LanderJS.initFieldsYM();
  });
});
