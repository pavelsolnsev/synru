<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';

const includesList = [{
  title: 'Образова-тельный трек',
}, {
  title: 'Трек «Здоровье лидера»',
}, {
  title: '6 мероприятий по культуре и искусству',
}, {
  title: 'Работа с личным брендом',
}, {
  title: 'Проектный трек',
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
    title="В программу входят"
    class="s-emba-program"
  >
    <div class="s-emba-program__content">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="item,idx in includesList"
          :key="item.title"
          class="s-emba-program__item"
        >
          <AImg
            :src="`/img/emba/emba_program_${idx+1}.svg`"
            alt=""
            decoding="async"
            loading="lazy"
          />
          <div class="s-emba-program__item-title a-font_xl-m">{{ item.title }}</div>
          <div class="s-emba-program__item-num a-font_l-m">{{ formatNumberWithLeadingZero(idx+1) }}</div>
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
@import './SEmbaProgram.scss';
</style>
