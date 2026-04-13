<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import type { Fonts, ArticleCard } from '~/types';

interface Props {
  titleClass?: Fonts;
  textClass?: Fonts;
  dateClass?: Fonts;
  articles?: Articles[];
};

type Articles = Omit<ArticleCard, 'titleClass' | 'textClass' | 'dateClass'>;

const {
  articles = [],
  dateClass,
  textClass,
  titleClass,
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
}  = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance:true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <div class="m-articles">
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      class="m-articles-slider"
    >
      <swiper-slide
        v-for="{ to, title, text, date, image, tag } in articles"
        :key="title || text"
      >
        <MArticleCard
          :to
          :title
          :title-class
          :text
          :text-class
          :image
          :date
          :date-class
          :tag
        />
      </swiper-slide>
    </swiper>
    <MSwiperNav ref="navRef" />

    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </div>
</template>

<style lang='scss' scoped>
@import './MArticlesSlider.scss';
</style>
