<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { possibilities } from './possibilitiesData';
</script>

<template>
  <MSection
    class="s-possibilities"
    title="Возможности для&nbsp;старта<br>вашей успешной карьеры"
  >
    <div class="s-possibilities__slider">
      <swiper
        :space-between="0"
        :resistance="true"
        :resistance-ratio="0"
        slides-per-view="auto"
        grab-cursor
      >
        <swiper-slide
          v-for="{ list, title, subtitle } in possibilities"
          :key="title"
          class="swiper-slide"
        >
          <MCardList
            :title
            :subtitle
            :list
          />
        </swiper-slide>
      </swiper>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SPossibilities.scss';
</style>
