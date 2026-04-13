import { redirectMap } from '@/constants/redirects';

export default defineEventHandler((event) => {
  const url = new URL(getRequestURL(event));

  if (url.pathname !== '/' && url.pathname[url.pathname.length - 1] === '/') {
    sendRedirect(event, url.pathname.slice(0, -1), 301);
    return;
  }

  for (const [from, to] of Object.entries(redirectMap)) {
    if (url.pathname === from) {
      sendRedirect(event, to, 301);
      return;
    }
  }
});
