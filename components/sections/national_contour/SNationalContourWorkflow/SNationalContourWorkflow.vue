<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface Props {
  title?: string;
  cards: {
    title: string;
    subtitle: string;
  }[];
}

const {
  title = '',
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  direction: 'vertical',
  slidesPerView: 'auto',
  spaceBetween: 8,
  scrollbar: {
    draggable: true,
    horizontalClass: 'swiper-scrollbar',
  },
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  touchReleaseOnEdges: true,
  breakpoints: {
    1200: {
      spaceBetween: 20,
      direction: 'horizontal',
      grabCursor: true,
      mousewheel: {
        enabled: true,
        forceToAxis: true,
        releaseOnEdges: true,
      },
    },
  },
});
</script>

<template>
  <MSectionNewResponsive
    v-if="cards"
    :with-sides="true"
    class="s-national-contour-workflow"
    :title
  >
    <div class="s-national-contour-workflow__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="(card, idx) in cards"
          :key="card.title"
        >
          <div class="s-national-contour-workflow__card">
            <h5
              v-dompurify-html="card.title"
              class="s-national-contour-workflow__card-title"
            />
            <span
              v-dompurify-html="card.subtitle"
              class="s-national-contour-workflow__card-subtitle a-font_l-m"
            />

            <picture>
              <source
                :srcset="`/img/national_contour/${idx + 1}-lg.webp`"
                media="(min-width: 1200px)"
              >
              <AImg :src="`/img/national_contour/${idx + 1}-sm.webp`" />
            </picture>
          </div>
        </SwiperSlide>
      </Swiper>
      <MSwiperNav ref="navRef" />
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SNationalContourWorkflow.scss';
</style>
