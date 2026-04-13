import { redirectMap } from '@/constants/redirects';

export default defineNuxtRouteMiddleware(async (routeTo) => {

  if (routeTo.path !== '/' && routeTo.path[routeTo.path.length - 1] === '/') {

    await navigateTo(routeTo.path.slice(0, -1), {
      external: true,
    });
  }

  for (const [from, to] of Object.entries(redirectMap)) {
    if (routeTo.path === from) {
      return await navigateTo(to, {
        external: true,
        redirectCode: 301,
      });
    }
  }
});
