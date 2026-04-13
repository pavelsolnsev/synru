<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface Props {
  title?: string;
  bthHref?: string;
  btnText?: string;
  items?: { image: string; title: string; date: string; to: string }[]
}

const {
  title = 'Новости Университета',
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
    class="s-news"
  >
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
    >
      <template #wrapper-start>
        <MArticleCardSecond
          v-for="item in items"
          :key="item.to"
          class="swiper-slide"
          :image="item.image"
          :title="item.title"
          :date="item.date"
          :to="item.to"
          share
        />
      </template>
    </swiper>
    <MSwiperNav ref="navRef" />

    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </MMediacenterBlock>
</template>

<style lang="scss" scoped>
@import './SMediaCenterNews.scss';
</style>
