import type { ShallowRef } from 'vue';
import { ROUTES } from '~/constants';

const DEFAULT_OPTIONS = {
  async: false,
  defer: true,
  manual: true,
};

const ON_LOADED = () => {};

const CHANNEL_COMMERCIAL = '6';
const CHANNEL_MEDIA = '40';

const removeWidgetFromDOM = () => {
  document.querySelector('.syn__main-container')?.remove();
};

const isMediaRoute = (path: string) => {
  const MEDIA_ROUTES = [
    ROUTES.ARTICLES,
    ROUTES.NEWS,
    ROUTES.MEDIA,
    ROUTES.ACADEMY,
    ROUTES.NEWS_MEDIACENTER,
    ROUTES.NEWS_RESEARCH,
    ROUTES.GALLERY,
    ROUTES.VIDEOGALLERY,
  ];

  for (const mediaRoute of MEDIA_ROUTES){
    if (path.startsWith(mediaRoute)) {
      return true;
    }
  }

  return false;
};

const isCommercialRoute = (path: string) => {
  const COMMERCIAL_ROUTES = [
    ROUTES.ABITURIENTAM,
    ROUTES.SCHOOL,
    ROUTES.MBA,
    ROUTES.BUSINESS_EDUCATION,
    ROUTES.COURSES,
    ROUTES.STUDENTS,
    ROUTES.HISTORY,
    ROUTES.EMBA,
  ];

  if (path === ROUTES.HOMEPAGE) {
    return true;
  }

  for (const commercialRoute of COMMERCIAL_ROUTES){
    if (path.startsWith(commercialRoute)) {
      return true;
    }
  }

  return false;
};

export default function useNeurotutorAB() {
  const config = useRuntimeConfig();
  const base = computed(() => (config.public.chatWidgetOrigin as string || '').trim().replace(/\/$/, ''));

  const widgetDefault = computed(() => (base.value ? `${base.value}/widget-recommendation.js` : ''));
  const widgetA = computed(() => (base.value ? `${base.value}/demo/redesign-widget.js` : ''));
  const widgetB = computed(() => (base.value ? `${base.value}/demo/redesign-preview-widget.js` : ''));

  const { load, unload } = useScriptTag(
    widgetDefault,
    ON_LOADED,
    DEFAULT_OPTIONS,
  );

  const { load: loadA, unload: unloadA } = useScriptTag(
    widgetA,
    ON_LOADED,
    {
      ...DEFAULT_OPTIONS,
      attrs: {
        'data-channel_id': CHANNEL_COMMERCIAL,
      },
    },
  );

  const { load: loadMediaA, unload: unloadMediaA } = useScriptTag(
    widgetA,
    ON_LOADED,
    {
      ...DEFAULT_OPTIONS,
      attrs: {
        'data-channel_id': CHANNEL_MEDIA,
      },
    },
  );

  const { load: loadB, unload: unloadB } = useScriptTag(
    widgetB,
    ON_LOADED,
    {
      ...DEFAULT_OPTIONS,
      attrs: {
        'data-channel_id': CHANNEL_COMMERCIAL,
      },
    },
  );

  const { load: loadMediaB, unload: unloadMediaB } = useScriptTag(
    widgetB,
    ON_LOADED,
    {
      ...DEFAULT_OPTIONS,
      attrs: {
        'data-channel_id': CHANNEL_MEDIA,
      },
    },
  );

  const route = useRoute();

  const currentWidget: ShallowRef<'commercial' | 'media' | 'default' | null> = shallowRef(null);
  const currentVersion: ShallowRef<'A' | 'B' | null> = shallowRef(null);

  const hideTutorRoutes = [
    ROUTES.THANKS,
  ];

  watchEffect(() => {
    if (!currentWidget.value) return;

    console.log('currentWidget: ' + (currentWidget.value || 'null') + ', currentVersion: ' + (currentVersion.value || 'null'));
  });

  tryOnMounted(() => {
    watchEffect(() => {
      if (!base.value) {
        currentWidget.value = null;
        currentVersion.value = null;
        removeWidgetFromDOM();
        Promise.allSettled([
          unload(),
          unloadA(),
          unloadMediaA(),
          unloadB(),
          unloadMediaB(),
        ]);
        return;
      }

      if (route.path.startsWith('/abiturientam/ad/')) return;

      const showTutor = !hideTutorRoutes.includes(route.path);

      if (!showTutor) {
        currentWidget.value = null;
        currentVersion.value = null;

        removeWidgetFromDOM();
        Promise.allSettled([
          unload(),
          unloadA(),
          unloadMediaA(),
          unloadB(),
          unloadMediaB(),
        ]);
        return;
      }

      if (isMediaRoute(route.path)) {
        if (route.query['v'] === '8') {
          loadMediaB();
          currentVersion.value = 'B';
          currentWidget.value = 'media';

          return;
        }

        if (route.query['v'] === '7') {
          loadMediaA();
          currentVersion.value = 'A';
          currentWidget.value = 'media';

          return;
        }
      }

      if (isCommercialRoute(route.path)) {
        if (route.query['v'] === '6') {
          loadB();
          currentVersion.value = 'B';
          currentWidget.value = 'commercial';

          return;
        }

        if (route.query['v'] === '5') {
          loadA();
          currentVersion.value = 'A';
          currentWidget.value = 'commercial';

          return;
        }
      }

      if (currentWidget.value === 'default') return;

      Promise.allSettled([
        unloadA(),
        unloadMediaA(),
        unloadB(),
        unloadMediaB(),
      ]);

      removeWidgetFromDOM();
      load();
      currentWidget.value = 'default';
      currentVersion.value = null;
    });
  });
}
