<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import type { Fonts } from '~/types';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';

interface Props {
  items?: Item[];
}

interface Item {
  to?: string;
  tags?: { text: string; }[];
  titleClass?: Fonts;
  title?: string;
  text?: string;
  textClass?: Fonts;
  image?: string;
  share?: boolean;
  shareLink?: string;
}

const {
  items = [],
} = defineProps<Props>();

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
});
</script>

<template>
  <div
    v-if="items?.length"
    class="s-articles-slider"
  >
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="item in items"
        :key="item.title"
      >
        <MArticleBannerCard
          share
          text-class="a-font_xl-m"
          :title="item.title"
          :text="item.text"
          :tags="item.tags"
          :image="item.image"
          :share-link="item.shareLink"
          :to="item.to"
        />
      </swiper-slide>
      <MSwiperNav ref="navRef" />
    </swiper>
    <div
      ref="scrollbarRef"
      class="swiper-scrollbar s-articles-slider__scrollbar"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './SArticlesSlider.scss';
</style>
