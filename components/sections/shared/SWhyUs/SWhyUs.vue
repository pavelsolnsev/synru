<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar, FreeMode } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import formatNumberWithLeadingZero  from '~/utils/formatNumberWithLeadingZero';

interface Props {
  title?: string;
  items?: Array<{ title?: string }>;
}

const {
  title = '',
  items = [],
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar, FreeMode],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  freeMode: true,
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection
    v-if="items.length"
    class="s-why-us"
    :title
  >
    <div class="s-why-us__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <swiper-slide
          v-for="slide, index in items"
          :key="slide.title"
          class="s-why-us__card"
        >
          <div
            class="s-why-us__card-title a-font_h6"
            v-html="slide.title"
          />
          <div class="s-why-us__card-bottom">
            <span class="s-why-us__card-num a-font_h6">
              {{ formatNumberWithLeadingZero(index + 1) }}
            </span>
            <ACardCheck />
          </div>
        </swiper-slide>
      </swiper>
      <MSwiperNav ref="navRef" />

      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SWhyUs.scss';
</style>
