<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';

interface Props {
  cards: {
    title: string,
    description: string,
  }[]
  popupSliderVersion?: boolean
}
const props = defineProps<Props>();

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: props.popupSliderVersion ? 20 : 0,
  resistance: true,
  resistanceRatio: 0,
});
</script>

<template>
  <div
      v-if="cards && cards.length"
      class="s-mba-hero__slider"
      :class="popupSliderVersion ? 'popup-slider-version' : undefined"
  >
    <Swiper v-bind="swiperConfig">
      <SwiperSlide
          v-for="(slide, idx) in cards"
          :key="slide.title"
          class="s-mba-hero__slide-item"
      >
        <p
            class="a-font_h5"
            v-html="slide.title"
        />
        <p
            class="a-font_m-m s-mba-hero__slide-item-text"
            v-html="slide.description"
        />
        <p class="s-mba-hero__num">{{ formatNumberWithLeadingZero(idx + 1) }}</p>
      </SwiperSlide>
    </Swiper>
  </div>
  <div class="s-mba-hero__list" v-if="popupSliderVersion">
    <div
        class="s-mba-hero__slide-item"
        v-for="(slide, idx) in cards"
        :key="slide.title"
    >
      <p
          class="a-font_h5"
          v-html="slide.title"
      />
      <p
          class="a-font_m-m s-mba-hero__slide-item-text"
          v-html="slide.description"
      />
      <p class="s-mba-hero__num">{{ formatNumberWithLeadingZero(idx + 1) }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SMbaHero';
</style>
