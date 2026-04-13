<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';

interface Props {
  title: string;
  text: string;
  bgImages?: { image: string }[];
  items?: { title: string, text: string }[];
}
const props = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Scrollbar],
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
  <MSection class="s-banner-items">
    <div class="s-banner-items__content">
      <picture class="s-banner-items__img">
        <source
          v-if="bgImages"
          :srcset="bgImages[2]?.image"
          media="(min-width: 1200px)"
        >
        <source
          v-if="bgImages"
          :srcset="bgImages[1]?.image"
          media="(min-width: 768px)"
        >
        <AImg
          v-if="bgImages"
          :src="bgImages[0]?.image"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </picture>

      <div
        v-if="title"
        class="s-banner-items__title a-font_h2"
        v-html="title"
      />
      <div
        v-if="text"
        class="s-banner-items__text a-font_h6"
        v-html="text"
      />
    </div>

    <div
      v-if="items?.length"
      class="s-banner-items__list"
    >
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <swiper-slide
          v-for="item, idx in items"
          :key="item.title"
          class="s-banner-items__item"
        >
          <div
            class="s-banner-items__item-title a-font_h6"
            v-html="item.title"
          />
          <div
            v-if="item.text"
            class="s-banner-items__item-text a-font_s-m"
            v-html="item.text"
          />
          <div class="s-banner-items__item-num a-font_l-m">{{ formatNumberWithLeadingZero(idx + 1) }}</div>
        </swiper-slide>
      </swiper>
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style scoped lang="scss">
@import './SBannerItems.scss';
</style>
