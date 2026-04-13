<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface Props {
  tabs: Tab[];
  activeIndex: number;
}

interface Tab {
  title: string;
  to: string;
  icon: string;
}

const {
  tabs = [],
  activeIndex,
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
}  = useSwiperWrapper({
  modules: [FreeMode],
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  freeMode: true,
  resistance: true,
  resistanceRatio: 0,
  observer: true,
  observeParents: true,
});
</script>

<template>
  <div
    v-if="tabs?.length"
    class="m-filters-tabs-slider"
  >
    <div class="--clear-btn-wrap">
      <MFilterTabLink
        v-for="{ title, to, icon } in tabs.slice(0,1)"
        :key="title"
        class="swiper-slide --reset"
        :title
        :to
        :icon
        :active="activeIndex === 0"
      />
    </div>
    <div class="m-filters-tabs-slider__filters">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <MFilterTabLink
            v-for="{ title, to, icon }, index in tabs.slice(1)"
            :key="title"
            class="swiper-slide"
            :title
            :icon
            :to
            :active="activeIndex === index + 1"
          />
        </template>
      </swiper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MFiltersTabsLinksSlider.scss';
</style>
