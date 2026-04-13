<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Grid } from 'swiper/modules';
import { useWindowSize } from '@vueuse/core';

interface Props {
  icon?: string;
  title?: string;
  text?: string;
  items?: { icon?: string }[];
}

const {
  icon = '',
  title = 'Трудоустройство <br>после обучения',
  text = '',
  items = [],
} = defineProps<Props>();

const { width: windowWidth } = useWindowSize();

const {
  swiperConfig,
} = useSwiperWrapper({
  modules: [Grid],
  enabled: true,
  grabCursor: true,
  slidesPerView: 2,
  spaceBetween: windowWidth.value / 360 * 8,
  resistance: true,
  resistanceRatio: 0,
  grid: {
    rows: 2,
    fill: 'row',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: windowWidth.value / 768 * 8,
      grid: {
        rows: 3,
        fill: 'row',
      },
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: windowWidth.value / 1920 * 20,
      grid: {
        rows: 3,
        fill: 'row',
      },
    },
  },
});
</script>

<template>
  <MSection class="s-employment">
    <div class="s-employment__banner">
      <h2
        class="a-font_h4"
        v-html="title"
      />
      <p
        v-if="text"
        class="a-font_xl-m s-employment__banner-text"
        v-html="text"
      />
      <AImg
        v-if="icon"
        :src="icon"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
    <div
      v-if="items.length"
      class="s-employment__slider"
    >
      <Swiper v-bind="swiperConfig">
        <SwiperSlide
          v-for="item,idx in items"
          :key="idx"
          class="s-employment__slide"
        >
          <AImg
            :src="item.icon"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </MSection>
</template>
<style scoped lang='scss'>
@import './SEmployment.scss';
@import 'swiper/css/grid';
</style>
