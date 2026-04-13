import { ROUTES } from '~/constants';

export default function useNeurotutor() {
  const isLoaded = shallowRef(false);
  const config = useRuntimeConfig();
  const scriptSrc = computed(() => (config.public.neuroTutorScriptUrl as string) || '');

  const { load, unload } = useScriptTag(
    scriptSrc,
    () => isLoaded.value = true,
    {
      async: false,
      defer: true,
      manual: true,
    },
  );

  const route = useRoute();

  const hideTutorRoutes = [
    ROUTES.THANKS,
  ];

  tryOnMounted(() => {
    watchEffect(() => {
      if (route.path.startsWith('/abiturientam/ad/')) return;

      const showTutor = !hideTutorRoutes.includes(route.path);

      if (!showTutor) {
        unload();
        document.querySelector('.syn__main-container')?.remove();
      } else if (scriptSrc.value) {
        load();
      }
    });
  });
}
