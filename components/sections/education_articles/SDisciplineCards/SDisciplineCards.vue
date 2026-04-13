<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar, Navigation, Grid } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';

interface Props {
  title?: string;
  items?: { title?: string; ext?: string; to?: string }[]
  btnLink?: string;
  titleH1?: boolean;
}

const {
  title,
  items = [],
  btnLink = '',
  titleH1 = false,
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
  navRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar, Grid],
  showSwiperScrollbar: true,
  showSwiperNavigation: true,
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 16,
  resistance: true,
  resistanceRatio: 0,
  grid: {
    rows: 6,
  },
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
  },
});
</script>

<template>
  <MSection
    v-if="items?.length"
    :title
    :title-h1
    title-class="a-font_h3"
    class="s-discipline-cards"
  >
    <swiper
      ref="swiperRef"
      class="s-discipline-cards__slider"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="item in items"
        :key="item.to"
      >
        <NuxtLink
          class="s-discipline-cards__item"
          :to="item.to"
        >
          <div
            class="s-discipline-cards_itemtitle a-font_l-m"
            v-html="item.title"
          />
          <span
            class="s-discipline-cards__item-ext a-font_xs-m"
            v-html="item.ext"
          />
        </NuxtLink>
      </swiper-slide>

      <MSwiperNav ref="navRef" />
    </swiper>


    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />

    <MMore
      :href="btnLink"
      class="s-discipline-cards__more"
      text="Смотреть все"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDisciplineCards.scss';
</style>
