<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface StudentLifeImage {
  image: string;
}

interface Props {
  studentLifeItems: StudentLifeImage[];
  smallPhoto?: boolean;
}

const { studentLifeItems, smallPhoto = false } = defineProps<Props>();

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
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection
    title="Студенческая жизнь"
    class="s-student-life"
  >
    <div
      class="s-student-life__slider"
      :class="{ 's-student-life__slider_small': smallPhoto }"
    >
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="(item, index) in studentLifeItems"
          :key="index"
        >
          <div
            class="s-student-life__slide"
            :class="{ 's-student-life__slide_small': smallPhoto }"
          >
            <AImg
              class="s-student-life__img lazy"
              decoding="async"
              loading="lazy"
              alt=" "
              :src="item.image"
              :data-srcset="item.image"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <MSwiperNav ref="navRef" />
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style lang="scss" src="./SStudentLife.scss" scoped />
