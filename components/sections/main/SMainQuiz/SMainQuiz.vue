<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { useWindowSize } from '@vueuse/core';
import type { Fonts } from '~/types';
import type { Swiper as SwiperType } from 'swiper/types';

export interface QuizItem {
  title: string;
  titleClass: Fonts;
  text: string;
  textClass: Fonts;
  image: string;
  imageMd: string;
  imageLg: string;
  paginationImage: string;
  quizText: string;
  buttonText: string;
  buttonLink: string;
}

interface Props {
  items: QuizItem[];
}

const {
  items = [],
} = defineProps<Props>();

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
  breakpoints: {
    1200: {
      pagination: {
        el: '.s-main-banner__slider .swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: function (index: number, className: string) {
          const slideTitle = items[index].title;
          const paginationImage = items[index].paginationImage;
          return `
            <div class="custom-bullet ${className}">
              <img src="${paginationImage}" alt="paginationImage" itemprop="image" />
              <div class="custom-bullet__text a-font_xs">${slideTitle}</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 150 180">
              <path fill="none" stroke="transparent" stroke-width="1.5" d="M 75,0 L 134,0 C 134,0 150,0 150,16 L 150,164 C 150,164 150,180 134,180 L 16,180 C 16,180 0,180 0,164 L 0,16 C 0,16 0,0 16,0 Z"/>
              </svg>
            </div>
          `;
        },
      },
    },
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
    v-if="items.length"
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
        <SMainQuizItem
          v-for="item in items"
          :key="item.title"
          v-bind="item"
          @show-quiz="showQuiz"
        />
      </template>
    </swiper>
    <div
      ref="paginationRef"
      class="swiper-pagination"
    />
    <MQuiz @close="closeQuiz" />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMainQuiz.scss';
</style>
