<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar, FreeMode } from 'swiper/modules';
import { cards } from './sAdvantagesUniversityData';

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
}  = useSwiperWrapper({
  modules: [Scrollbar, FreeMode],
  showSwiperScrollbar: true,
  grabCursor: true,
  freeMode: true,
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
  <MSection
    class="s-advantages-university"
    title="Преимущества Университета"
  >
    <div class="s-advantages-university__wrapper">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <swiper-slide
          v-for="card in cards"
          :key="card.title"
          class="s-advantages-university__card"
        >
          <div
            class="s-advantages-university__card__title"
            v-html="card.title"
          />
          <AImg
            alt="card"
            :src="card.icon"
          />
        </swiper-slide>
      </swiper>
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SAdvantagesUniversity.scss';
</style>
