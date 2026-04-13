<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Scrollbar, Navigation } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';

interface Props {
  title?: string;
  items?: string[];
}

const {
  title = '',
  items = [],
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
  navRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperScrollbar: true,
  showSwiperNavigation: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <div
    v-if="items?.length"
    class="s-article-trajectory"
  >
    <h4
      class="a-font_h4"
      v-html="title"
    />
    <div class="s-article-trajectory__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <div
            v-for="item, index in items"
            :key="item"
            class="swiper-slide"
          >
            <div class="s-article-trajectory__item-num a-font_m-m">
              {{ (index + 1) }}
            </div>
            <div
              class="s-article-trajectory__item-title a-font_h6"
              v-html="item"
            />
          </div>
        </template>
      </swiper>

      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
      <MSwiperNav
        ref="navRef"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleTrajectory.scss';
</style>
