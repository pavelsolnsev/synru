<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import { useWindowSize } from '@vueuse/core';

interface Entity {
  customFields: { benefits_learning: { text: string; title: string }[] };
}

interface Props {
  hasEntity?: boolean;
  entity?: Entity | null;
}

const {
  entity = null,
} = defineProps<Props>();

const { benefits_learning: benefitsLearning = [] } = entity?.customFields ?? {};

const { width: windowWidth } = useWindowSize();

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
  spaceBetspaceBetween: windowWidth.value / 360 * 8,
  breakpoints: {
    768: {
      spaceBetween: windowWidth.value / 768 * 8,
    },
    1200: {
      spaceBetween: windowWidth.value / 1920 * 20,
    },
  },
});
</script>

<template>
  <MSection
    v-if="benefitsLearning.length"
    class="s-advantages"
    title="Преимущества обучения у&nbsp;нас"
  >
    <swiper
      ref="swiperRef"
      class="s-advantages__wrap"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="({ title, text }, index) in benefitsLearning"
        :key="title"
        class="swiper-slide"
      >
        <div class="s-advantages__item">
          <div class="s-advantages__item-num a-font_h6">
            {{ formatNumberWithLeadingZero(index + 1) }}
          </div>
          <div class="s-advantages__item-title a-font_h5">
            {{ title }}
          </div>
          <div class="s-advantages__item-text a-font_l-m">
            {{ text }}
          </div>
        </div>
      </swiper-slide>
      <MSwiperNav ref="navRef" />
    </swiper>
    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SAdvantages.scss';
</style>
