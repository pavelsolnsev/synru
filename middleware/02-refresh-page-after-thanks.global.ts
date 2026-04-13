export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return;

  const thanksPage = '/thanks';
  const toPath = to.fullPath;
  const fromPath = from.fullPath;

  if (toPath === fromPath) return;

  if (fromPath.includes(thanksPage)) {

    setTimeout(() => {
      window.location.href = toPath;
    }, 0);

    return abortNavigation();
  }

  return;
});
