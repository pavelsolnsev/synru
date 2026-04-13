<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import type { ProgramEntity, ProgramCustomField } from '~/types';

interface Props {
  entity?: ProgramEntity | null;
}

const { entity = null } = defineProps<Props>();

const career: ProgramCustomField['career_trajectory'] = entity?.customFields['career_trajectory'] || [];

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
    v-if="career.length"
    title="Будущая карьерная траектория"
    class="s-career"
  >
    <div class="s-career__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <div
            v-for="item,index in career"
            :key="index"
            class="s-career__item swiper-slide"
          >
            <p class="s-career__item-title a-font_h5">
              <span v-html="item.title" />
              <ASvgMono name="simple-arrow" />
            </p>
            <div
              class="a-font_l"
              v-html="item.text"
            />
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
@import './SProgramCareer.scss';
</style>
