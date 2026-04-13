<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface NewsItem {
  title: string,
  href: string,
  date: string,
}

const { items } = defineProps<{
  items: NewsItem[],
}>();

const {
  swiperRef,
  swiperConfig,
}  = useSwiperWrapper({
  modules: [FreeMode],
  freeMode: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
  breakpoints: {
    1200: {
      spaceBetween: 8,
      direction: 'vertical',
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
  <div class="m-news-vartical">
    <div class="m-news-vartical__title a-font_xl-m">Последние новости</div>
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      class="m-news-vartical__list"
    >
      <swiper-slide
        v-for="item in items"
        :key="item.title"
      >
        <NuxtLink
          :key="item.title"
          :to="item.href"
          class="m-news-vartical__card a-font_m-m"
        >
          <div class="m-news-vartical__card-top">
            <span v-html="item.date" />
          </div>
          <div
            class="m-news-vartical__card-title"
            v-html="item.title"
          />
        </NuxtLink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import './MNewsVertical.scss';
</style>
