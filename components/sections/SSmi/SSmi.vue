<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';

interface Props {
  title?: string;
  items?: Item[];
}

interface Item {
  title?: string;
  media?: string;
  link?: string;
  date?: string;
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
} = useSwiperWrapper({
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
    class="s-smi"
    :title
  >
    <div class="s-smi__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <div
            v-for="item in items"
            :key="item.link"
            class="swiper-slide"
          >
            <NuxtLink
              :to="item.link"
              class="s-smi__card"
              rel="noopener noreferrer nofollow"
            >
              <span class="s-smi__card-author a-font_m-m">
                {{ item.media }}
              </span>
              <div
                class="s-smi__card-title a-font_h6"
                v-html="item.title"
              />
              <span class="s-smi__card-date a-font_m-m">
                {{ item.date }}
              </span>
            </NuxtLink>
          </div>
        </template>
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
@import './SSmi.scss';
</style>
