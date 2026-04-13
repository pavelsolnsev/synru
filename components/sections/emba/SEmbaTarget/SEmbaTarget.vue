<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';

const targetList = [{
  title: 'Расширение горизонтов мышления',
}, {
  title: 'Систематизация знаний о трендах',
}, {
  title: 'Навыки прогнозирования будущего',
}, {
  title: 'Сильное комьюнити',
}, {
  title: 'Развитие управленческих компетенций',
}];

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Scrollbar],
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
  enabled: false,
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
  },
  breakpoints: {
    768: {
      enabled: true,
    },
  },
});
</script>

<template>
  <MSection
    title="Целевые области"
    class="s-emba-target"
  >
    <div class="s-emba-target__content">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="item,idx in targetList"
          :key="item.title"
          class="s-emba-target__item"
        >
          <div class="s-emba-target__item-title a-font_xl-m">{{ item.title }}</div>
          <AImg
            :src="`/img/emba/emba_target_${idx+1}.webp`"
            :alt="item.title"
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

<style scoped lang="scss">
@import './SEmbaTarget';
</style>
