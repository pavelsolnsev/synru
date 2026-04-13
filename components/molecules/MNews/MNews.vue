<script setup lang="ts">
import { Swiper } from 'swiper/vue';

interface Props {
  title?: string;
  items?: { date: string; to: string; title: string }[]
}

const {
  title = 'Последние новости',
  items = [],
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
}  = useSwiperWrapper({
  freeMode: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  breakpoints: {
    1200: {
      spaceBetween: 10,
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
  <div
    v-if="items.length"
    class="m-news"
  >
    <div
      class="m-news__title a-font_xl-m"
      v-html="title"
    />

    <swiper
      ref="swiperRef"
      class="m-news__list"
      v-bind="swiperConfig"
    >
      <template #wrapper-start>
        <NuxtLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="m-news__card a-font_m-m swiper-slide"
        >
          <div class="m-news__card-top">
            <span v-html="item.date" />
          </div>
          <div
            class="m-news__card-title"
            v-html="item.title"
          />
        </NuxtLink>
      </template>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import './MNews.scss';
</style>
