<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
</script>

<template>
  <div class="s-article-slider">
    <picture class="s-article-slider__preview">
      <AImg
        src="https://example.com/assets/demo-article-1.jpg"
        alt="slider"
        class="--active"
      />

      <AImg
        v-for="item in [1,2,3,4,5,6,7]"
        :key="item"
        src="https://example.com/assets/demo-article-2.jpg"
        alt="slider"
      />
    </picture>

    <swiper>
      <swiper-slide>
        <AImg
          src="https://example.com/assets/demo-article-1.jpg"
          alt="slider"
        />
      </swiper-slide>

      <swiper-slide
        v-for="item in [1,2,3,4,5,6,7]"
        :key="item"
      >
        <AImg
          src="https://example.com/assets/demo-article-2.jpg"
          alt="slider"
        />
      </swiper-slide>

      <div class="swiper-scrollbar" />
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleSlider.scss';
</style>
