import { useWindowSize } from '@vueuse/core';

// избавляет от неправильного выбора элементов пагинации и навигации свайпером
// (если на странице несколько раз используется один компонент)
export function useSwiperWrapper(configRef) {
  const { width: windowWith } = useWindowSize();

  const paginationRef = ref(null);
  const navRef = ref(null);
  const scrollbarRef = ref(null);

  const swiperRef = ref(null);

  const slider = computed(() => {
    return swiperRef?.value?.$el?.swiper;
  });

  const config = unref(configRef);

  const swiperConfig = computed(() => ({
    resistance: true,
    resistanceRatio: 0,
    ...config,
    pagination: config.showSwiperPagination ? {
      ...config.pagination,
      el: paginationRef.value,
    } : undefined,
    navigation: config.showSwiperNavigation ? {
      ...config.navigation,
      prevEl: navRef.value?.wrapper?.querySelector('.swiper-button-prev') ?? navRef.value?.querySelector('.swiper-button-prev'),
      nextEl: navRef.value?.wrapper?.querySelector('.swiper-button-next') ?? navRef.value?.querySelector('.swiper-button-next'),
    } : undefined,
    scrollbar: config.showSwiperScrollbar ? {
      dragSize: windowWith.value < 1200 ? 80 : 300,
      draggable: true,
      ...config.scrollbar,
      el: scrollbarRef.value,
    } : undefined,
  }));

  watch(navRef, () => {
    nextTick(() => {
      slider.value?.navigation.init();
      slider.value?.navigation.update();
    });
  });

  return {
    swiperConfig,
    swiperRef,
    paginationRef,
    navRef,
    scrollbarRef,
  };
}
