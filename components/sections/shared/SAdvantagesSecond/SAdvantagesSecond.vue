<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';

interface Props {
  title?: string;
  items?: { title?: string }[]
}

const {
  title,
  items = [],
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection
    v-if="items?.length"
    class="s-advantages"
    :title
  >
    <swiper
      ref="swiperRef"
      class="s-advantages__wrap"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="(item, index) in items"
        :key="item.title"
        class="swiper-slide"
      >
        <div class="s-advantages__item">
          <div
            class="s-advantages__item-title a-font_h6"
            v-html="item.title"
          />
          <div class="s-advantages__item-num a-font_l-m">
            {{ formatNumberWithLeadingZero(index + 1) }}
          </div>
        </div>
      </swiper-slide>
      <MSwiperNav ref="navRef" />
    </swiper>
    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SAdvantagesSecond.scss';
</style>
