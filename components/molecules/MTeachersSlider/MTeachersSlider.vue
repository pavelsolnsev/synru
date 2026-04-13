<script setup lang="ts">
import type { TeacherCard } from '~/types';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface Props {
  teachers?: TeacherCard[];
}

const {
  teachers = [],
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
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  slidesPerView: 'auto',
  speed: 500,
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
  <div class="m-teachers m-teachers__slider">
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="teacher in teachers"
        :key="teacher.teacherId"
      >
        <MTeacherCard
          v-bind="teacher"
        />
      </swiper-slide>
    </swiper>
    <MSwiperNav ref="navRef" />

    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './MTeachersSlider.scss';
</style>
