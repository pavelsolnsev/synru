<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import RuneImage from '~/assets/images/s_advantages_grid/rune.webp';
import  formatNumberWithLeadingZero  from '~/utils/formatNumberWithLeadingZero';

interface Props {
  title?: string;
  items?: Array<{ text: string }>;
}

const {
  title = '',
  items = [],
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
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection
    v-if="items.length"
    class="s-advantages"
    :title
  >
    <div class="s-advantages__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <swiper-slide
          v-for="{ text }, index in items"
          :key="index"
          class="s-advantages__card"
        >
          <ANum
            classes="a-font_xs-m a-num--md"
            type="star"
            :num="formatNumberWithLeadingZero(index + 1)"
          />
          <div
            class="s-advantages__card-text a-font_l-m"
            v-html="text"
          />
          <picture class="s-advantages__card-img lazy">
            <AImg
              alt="rune"
              :src="RuneImage"
            />
          </picture>
        </swiper-slide>
      </swiper>
      <MSwiperNav ref="navRef" />

      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SAdvantagesGrid.scss';
</style>
