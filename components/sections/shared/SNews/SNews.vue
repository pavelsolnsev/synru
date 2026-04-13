<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { ROUTES } from '~/constants';
import type { NewsResponse } from '~/server/api/news/index.get';
import transformLastNews from '~/utils/article/transformLastNews';

const { data: lastNews } = await useFetch<NewsResponse>('/api/news/lastNews');

const news = transformLastNews(lastNews.value);

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  resistance: true,
  resistanceRatio: 0,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  speed: 500,
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection
    v-if="news?.length"
    title="Новости"
    class="s-news"
  >
    <swiper
      ref="swiperRef"
      class="s-news__slider"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="{ date, image, tag, title, to } in news"
        :key="title"
      >
        <MArticleCard
          date-class="a-font_m-m"
          :image
          :tag
          :title
          :date
          :to
        />
      </swiper-slide>
      <MSwiperNav ref="navRef" />
    </swiper>
    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
    <div class="s-news__more">
      <AButtonThird
        class="s-news__more-btn"
        size="lg_m"
      >
        <NuxtLink :to="ROUTES.NEWS">
          Все новости
        </NuxtLink>
      </AButtonThird>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SNews.scss';
</style>
