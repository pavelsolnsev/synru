<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface Props {
  title?: string;
  bthHref?: string;
  btnText?: string;
  items?: { image: string; title: string; date: string; }[]
}

const {
  title = 'Фотогалерея',
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

const { openModal } = useModalStore();

function openImg(src: string) {
  openModal('MModalInline', {
    src: src
  });
}
</script>

<template>
  <MMediacenterBlock
    v-if="items?.length"
    :bth-href
    :btn-text
    :title
  >
    <div class="photo-gallery">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <div
            v-for="item in items"
            :key="item.title"
            class="photo-gallery__item swiper-slide"
            @click="openImg(item.image)"
          >
            <AImg :src="item.image" />
            <div
              class="a-font_xl"
              v-html="item.title"
            />
            <div
              class="a-font_l photo-gallery__date"
              v-html="item.date"
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
  </MMediacenterBlock>
</template>

<style lang="scss" scoped>
@import './SMediaCenterPhotoGallery.scss';
</style>
