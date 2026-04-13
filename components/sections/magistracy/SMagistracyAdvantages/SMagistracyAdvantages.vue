<script lang="ts" setup>
import type { BgImage } from '~/types/BgImage';
import { Swiper, SwiperSlide } from 'swiper/vue';

interface Props {
  title: string
  bgImages: BgImage[]
  cards: {
    title: string
  }[]
}

defineProps<Props>();

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 8,
  resistance: true,
  resistanceRatio: 0,
});
</script>

<template>
  <MSection class="s-magistracy-advantages">
    <div class="s-magistracy-advantages__body">
      <div class="s-magistracy-advantages__info">
        <ABgImages v-bind="{...bgImages[0]}" />
        <h2
          class="s-magistracy-advantages__title a-font_h4"
          v-html="title"
        />
      </div>
      <div class="s-magistracy-advantages__slider s-magistracy-advantages__slider_desktop">
        <div
          v-for="(slide, index) in cards"
          :key="slide.title"
          class="s-magistracy-advantages__slide"
        >
          <div class="s-magistracy-advantages__number">{{ formatNumberWithLeadingZero(index + 1) }}</div>
          <div
            class="s-magistracy-advantages__name a-font_l-m"
            v-html="slide.title"
          />
        </div>
      </div>
      <div class="s-magistracy-advantages__slider s-magistracy-advantages__slider_mobile">
        <Swiper v-bind="swiperConfig">
          <SwiperSlide
            v-for="(slide, index) in cards"
            :key="slide.title"
            class="s-magistracy-advantages__slide"
          >
            <div class="s-magistracy-advantages__number">{{ formatNumberWithLeadingZero(index + 1) }}</div>
            <div
              class="s-magistracy-advantages__name a-font_l-m"
              v-html="slide.title"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMagistracyAdvantages.scss';
</style>
