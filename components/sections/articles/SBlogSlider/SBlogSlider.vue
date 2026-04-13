<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface BlogItem {
  image?: string,
  title?: string,
  href: string,
  date: string,
}

const { items } = defineProps<{
  items: BlogItem[],
}>();

const {
  swiperRef,
  swiperConfig,
  paginationRef,
}  = useSwiperWrapper({
  modules: [Pagination],
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 12,
  showSwiperPagination: true,
  pagination: {
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    768: {
      spaceBetween: 16,
    },
    1200: {
      spaceBetween: 16,
    },
  },

});
</script>

<template>
  <div class="s-blog-slider">
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      class="s-blog-slider__swiper"
    >
      <swiper-slide
        v-for="item in items"
        :key="item.title"
      >
        <article class="s-blog-slider__card --article-card-js">
          <NuxtLink
            :key="item.title"
            :to="item.href"
            class="s-blog-slider__link"
          >
            <div class="s-blog-slider__inner">
              <div class="s-blog-slider__tags">
                <ATag
                  :text="item.date"
                  variant="white"
                  class="a-tag--blur a-font_xs-m"
                />
              </div>
              <div class="s-blog-slider__text">
                <div
                  class="s-blog-slider__title a-font_h4 --article-title-js"
                  v-html="item.title"
                />
              </div>
            </div>
            <div class="s-blog-slider__img">
              <AImg
                :src="item.image"
                :alt="item.title"
                decoding="async"
              />
              <AImg
                :src="item.image"
                :alt="item.title"
                decoding="async"
              />
            </div>
          </NuxtLink>
          <AShare
            :link="item.href"
            show-label
          />
        </article>
      </swiper-slide>
    </swiper>
    <div
      ref="paginationRef"
      class="swiper-pagination"
    />
  </div>
</template>

<style lang="scss">
@import './SBlogSlider.scss';
</style>
