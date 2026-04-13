<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { possibilities } from './SLegalConsultData';
</script>

<template>
  <MSection
    class="s-possibilities"
    title="Как получить консультацию"
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
          v-for="{ list, title } in possibilities"
          :key="title"
          class="swiper-slide"
        >
          <MCardList
            :title
            :list
          />
        </swiper-slide>
      </swiper>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SLegalConsult.scss';
</style>
