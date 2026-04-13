export const ycId = shallowRef(0);

export function useYandexCounter() {
  if (!import.meta.client) return;

  const config = useRuntimeConfig();
  ycId.value = Number(config.public.yaMetrikaId) || 0;

  if (!ycId.value) return;

  tryOnMounted(() => {
    const route = useRoute();
    const router = useRouter();

    useState('ya-counter-id', () => shallowRef(ycId.value));

    watchEffect(() => {

      const back = router.options.history.state.back;
      const referer = back ? window?.location.origin + back : document?.referrer;

      try {
        window.ymab(`metrika.${ycId.value}`, 'init');

        console.log('ymab inited', {
          url: window.location.origin + route.fullPath,
          referer,
        });
      } catch (e) {
        console.error(e);
      }
    });
  });
}
