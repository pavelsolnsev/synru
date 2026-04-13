<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Grid, Scrollbar } from 'swiper/modules';

interface Props {
  title?: string
  gallery?: { img?: string }[]
}

const {
  title = 'Что будет в&nbsp;колледже',
  gallery = [],
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Grid, Scrollbar],
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance:true,
  resistanceRatio: 0,
  showSwiperScrollbar: true,
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },

    1200: {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
  },
});
</script>

<template>
  <MSection
    v-if="gallery.length"
    :title
    class="s-gallery-grid"
  >
    <div class="s-gallery-grid__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="item in gallery"
          :key="item.img"
          class="s-gallery-grid__slide"
        >
          <AImg
            :src="item.img"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </SwiperSlide>
      </Swiper>
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SGalleryGrid';
@import 'swiper/css/grid';
</style>
