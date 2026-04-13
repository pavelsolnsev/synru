<script setup lang="ts">
import { ROUTES } from '~/constants';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import { useWindowSize } from '@vueuse/core';
import type { Fonts } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  facultiesCount?: { count?: number }[]
}

const {
  title = 'Преимущества Университета',
  titleClass = 'a-font_h2',
} = defineProps<Props>();

const advantages = [
  {
    text: 'Есть бюджетные места',
    link: ROUTES.BUDGET,
  },
  {
    text: 'Гарантируем трудоустройство студентам и&nbsp;выпускникам',
    link: ROUTES.GARANTIYA_TRUDOUSTROYSTVA,
  },
  {
    text: 'Делаем упор на&nbsp;практикуи&nbsp;погружение в&nbsp;профессию',
    link: ROUTES.POGRUZHENIE_V_PROFESSIYU,
  },
  {
    text: 'Топовый университет по&nbsp;версии Роструда, HeadHunter и&nbsp;Минобрнауки',
    link: ROUTES.RATING,
  },
  {
    text: 'Возможен перевод из&nbsp;другого&nbsp;вуза',
    link: ROUTES.PEREVOD,
  },
  {
    text: 'Повышение квалификации и&nbsp;профессиональная переподготовка',
    link: ROUTES.COURSES,
  },
];

const { width: windowWidth } = useWindowSize();

const {
  scrollbarRef,
  swiperConfig,
  swiperRef,
} = useSwiperWrapper({
  modules: [Scrollbar],
  enabled: true,
  showSwiperScrollbar: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
  breakpoints: {
    1200: {
      enabled: false,
    },
  },
});
</script>

<template>
  <MSection
    class="s-adv-university"
    :title
    :title-class
  >
    <swiper
      ref="swiperRef"
      class="s-adv-university__wrap"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="item in advantages"
        :key="item.text"
        class="swiper-slide"
      >
        <NuxtLink
          :to="item.link"
          class="s-adv-university__link"
        >
          <div
            class="a-font_h5"
            v-html="item.text"
          />
          <span class="s-adv-university__num a-font_xl-m">
            <ASvgMono name="arrow_forward" />
          </span>
        </NuxtLink>
      </swiper-slide>
    </swiper>
    <div
      v-if="windowWidth < 1200"
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SAdvUniversity.scss';
</style>
