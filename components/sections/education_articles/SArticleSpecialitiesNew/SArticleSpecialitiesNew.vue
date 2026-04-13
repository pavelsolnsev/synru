<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Scrollbar, Navigation } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';

interface Props {
  title?: string;
  items?: { title: string; ico: string; to: string }[]
}

const {
  title,
  items = [],
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
  navRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperScrollbar: true,
  showSwiperNavigation: true,
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
  <div
    v-if="items?.length"
    class="s-article-specialities-new"
  >
    <div class="s-article-specialities-new__headline">
      <h4
        class="a-font_h4"
        v-html="title"
      />

      <MSwiperNav
        ref="navRef"
      />
    </div>

    <div class="s-article-specialities-new__list">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <NuxtLink
            v-for="item in items"
            :key="item.title"
            class="s-article-specialities-new__link swiper-slide"
            :to="item.to"
          >
            <span
              class="s-article-specialities-new__link-ico"
            >
              <AImg
                v-if="item.ico"
                :src="item.ico"
                loading="lazy"
                decoding="async"
              />
            </span>
            <span
              class="s-article-specialities-new__link-title a-font_xl-m"
              v-html="item.title"
            />
          </NuxtLink>
        </template>
      </swiper>

      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleSpecialitiesNew.scss';
</style>
