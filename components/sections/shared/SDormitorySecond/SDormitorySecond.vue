<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import ImageLg from '~/assets/images/s-dormitory-second/s-dormitory-second-lg.webp';
import ImageMd from '~/assets/images/s-dormitory-second/s-dormitory-second-md.webp';
import ImageSm from '~/assets/images/s-dormitory-second/s-dormitory-second-sm.webp';
import { tags, items } from './sDormitorySecondData';

const {
  swiperConfig,
  swiperRef,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});
</script>

<template>
  <MSectionSecond
    class="s-dormitory-second"
    title="Общежития"
  >
    <div class="s-dormitory-second__wrapper">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
        class="s-dormitory-second__tags"
      >
        <swiper-slide
          v-for="tag in tags"
          :key="tag.title"
        >
          <div v-html="tag.title" />
        </swiper-slide>
      </swiper>
      <div class="s-dormitory-second__main">
        <picture
          class="s-dormitory-second__main__img"
        >
          <source
            :srcset="ImageLg"
            media="(min-width: 1200px)"
          >
          <source
            :srcset="ImageMd"
            media="(min-width: 768px)"
          >
          <AImg
            :src="ImageSm"
            alt="dormitory"
            decoding="async"
            loading="lazy"
          />
        </picture>

        <div
          v-for="item in items"
          :key="item.title"
          class="s-dormitory-second__main__item"
          :class="item.class"
        >
          <div
            class="s-dormitory-second__main__item__title"
            v-html="item.title"
          />
          <div
            class="s-dormitory-second__main__item__desc"
            v-html="item.description"
          />
        </div>

        <picture
          class="s-dormitory-second__main__img-desktop"
        >
          <source
            :srcset="ImageLg"
            media="(min-width: 1200px)"
          >
          <source
            :srcset="ImageMd"
            media="(min-width: 768px)"
          >
          <AImg
            :src="ImageSm"
            alt="dormitory"
            decoding="async"
            loading="lazy"
          />
          <span class="s-dormitory-second__tags-desktop">
            <span
              v-for="tag in tags"
              :key="tag.title"
              v-html="tag.title"
            />
          </span>
        </picture>
      </div>
    </div>
  </MSectionSecond>
</template>

<style lang="scss" scoped>
@import './SDormitorySecond.scss';
</style>
