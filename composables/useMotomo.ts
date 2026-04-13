export function useMotomo() {
  if (!import.meta.client) return;

  tryOnMounted(() => {
    const route = useRoute();

    if (typeof window._paq === 'undefined') {
      console.log('Matomo _paq object not found');
      return;
    }

    const routeTitle = useTitle();

    watchEffect(() => {
      const url = window.location.origin + route.fullPath;
      const title = routeTitle.value || '';

      try {
        window._paq.push(['setCustomUrl', url]);
        window._paq.push(['setDocumentTitle', title]);
        window._paq.push(['trackPageView']);

        console.log('Motomo trackPageView sended');

        console.log({
          setCustomUrl: url,
          title,
        });

      } catch (e) {
        console.error(e);
      }
    });
  });
}
