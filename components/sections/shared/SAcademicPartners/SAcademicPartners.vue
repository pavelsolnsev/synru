<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar, FreeMode, Grid } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import { useWindowSize } from '@vueuse/core';

interface Props {
  title?: string;
  items?: Array<{
    image: string;
    title: string;
  }>
}

const {
  title = 'Академические партнеры вуза',
  items = [],
} = defineProps<Props>();

const { width: windowWidth } = useWindowSize();

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
}  = useSwiperWrapper({
  modules: [Navigation, Scrollbar, FreeMode, Grid],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  freeMode: true,
  speed: 500,
  resistance: true,
  resistanceRatio: 0,
  grid: {
    fill: 'row',
    rows: 2,
  },
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection
    v-if="items.length"
    class="s-academic-partners"
    :title
  >
    <div class="s-academic-partners__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
        :key="windowWidth"
        :space-between="windowWidth / 360 * 8"
        :breakpoints="{
          768: {
            spaceBetween: windowWidth / 768 * 8,
          },
          1200: {
            spaceBetween: windowWidth / 1920 * 20,
          }
        }"
      >
        <swiper-slide
          v-for="item, index in items"
          :key="index"
          class="s-academic-partners__item"
        >
          <AImg
            class="s-academic-partners__item-logo"
            :src="item.image"
            :alt="item.title"
          />
          <div
            class="s-academic-partners__item-title a-font_s"
            v-html="item.title"
          />
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
@import './SAcademicPartners.scss';
</style>
