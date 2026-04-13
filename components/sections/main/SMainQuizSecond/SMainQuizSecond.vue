<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { useWindowSize } from '@vueuse/core';
import type { Swiper as SwiperType } from 'swiper/types';

import { slides } from './sMainQuizSecondData';

const { width: windowWith } = useWindowSize();

const isShowQuiz = ref(false);

const {
  swiperRef,
  swiperConfig,
  paginationRef,
} = useSwiperWrapper({
  modules: [Autoplay, Pagination, EffectFade],
  showSwiperPagination: true,
  loop: true,
  effect: 'fade',
  freeMode: {
    enabled: false,
  },
  autoplay: {
    delay: 6000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 0,
  pagination: {
    type: 'bullets',
    clickable: true,
  },

});

onBeforeRouteLeave(() => {
  closeQuiz();
});

function closeQuiz() {
  isShowQuiz.value = false;

  //@ts-expect-error Нужна типизация useSwiperWrapper
  const swiper = swiperRef.value?.$el?.swiper;

  if (!swiper) return;

  swiper.autoplay.start();
}

function showQuiz() {
  isShowQuiz.value = true;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  //@ts-expect-error Нужна типизация useSwiperWrapper
  const swiper = swiperRef.value?.$el.swiper;

  if (!swiper) return;

  swiper.autoplay.stop();
}

function autoplayTimeLeft(swiper: SwiperType, time: unknown, progress: number) {

  const activeBullet = swiper.pagination.bullets.find((bullet) => bullet.classList.contains('swiper-pagination-bullet-active'));
  if (!activeBullet) return;

  activeBullet.style.setProperty('--progress', `${100 - (progress * 100)}%`);

  const activeBulletRect = activeBullet.querySelector('path');
  if (!activeBulletRect) return;

  if (windowWith.value >= 1200) {
    activeBulletRect.style.setProperty('--progress', `${0 + (progress * 630)}`);
  }
}
</script>

<template>
  <MSection
    class="s-main-banner"
    :class="{'--js-quiz-visible': isShowQuiz}"
  >
    <swiper
      ref="swiperRef"
      class="s-main-banner__slider"
      v-bind="swiperConfig"
      @autoplay-time-left="autoplayTimeLeft"
    >
      <template #wrapper-start>
        <SMainQuizSecondItem
          v-for="item in slides"
          :key="item.title"
          v-bind="item"
          @show-quiz="showQuiz"
        />
      </template>
      <MQuizForm :action-params="[{param: 'form=pervyy_ekran'}]" />
    </swiper>
    <div
      ref="paginationRef"
      class="swiper-pagination"
    />
    <MQuiz @close="closeQuiz" />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMainQuizSecond.scss';
</style>
