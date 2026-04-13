<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar, Navigation } from 'swiper/modules';
import type { Fonts } from '~/types';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';

interface Props {
  title?: string;
  items?: Item[];
}

interface Item {
  to: string;
  image?: string;
  title?: string;
  titleClass?: Fonts;
  tagClass?: Fonts;
  tags?: { text: string }[];
  text?: string;
  textClass?: Fonts;
  date?: string;
  dateClass?: Fonts;
  share?: boolean;
}

const {
  title = 'Это интересно',
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
  navRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperScrollbar: true,
  showSwiperNavigation: true ,
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
    class="s-interesting"
  >
    <div class="s-interesting__heading">
      <h4
        class="a-font_h4"
        v-html="title"
      />
      <ASvgMono name="eye" />
    </div>

    <div class="s-interesting__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <swiper-slide
          v-for="item in items"
          :key="item.to"
        >
          <MArticleCardSecond
            share
            :title="item.title"
            :title-class="item.titleClass"
            :text="item.text"
            :text-class="item.textClass"
            :tags="item.tags"
            :tag-class="item.tagClass"
            :date="item.date"
            :date-class="item.dateClass"
            :image="item.image"
            :to="item.to"
          />
        </swiper-slide>
      </swiper>

      <MSwiperNav
        ref="navRef"
      />

      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SInteresting.scss';
</style>
