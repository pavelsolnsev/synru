<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface Props {
  title?: string;
  bthHref?: string;
  btnText?: string;
  items?: { title: string; text: string; video: string; image: string }[]
}

const {
  title = 'Видео-галерея',
  bthHref = '',
  btnText = '',
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
  resistance:true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MMediacenterBlock
    v-if="items?.length"
    :bth-href
    :btn-text
    :title
  >
    <div class="video-gallery">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <MVideoCard
            v-for="item in items"
            :key="item.title"
            class="swiper-slide"
            :title="item.title"
            :text="item.text"
            :video="item.video"
            :image="item.image"
          />
        </template>
      </swiper>
      <MSwiperNav ref="navRef" />

      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MMediacenterBlock>
</template>

<style lang="scss" scoped>
@import './SMediaCenterVideoGallery.scss';
</style>
