<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';
import type { MainQuizSecond } from './sMainQuizSecondData';
import { ROUTES } from '~/constants';

const {
  title,
  titleClass = 'a-font_banner',
  text,
  textClass = 'a-font_h5',
  imageMd,
  imageLg,
  imageSm,
  description = '',
  descriptionClass = 'a-font_h5',
} = defineProps<MainQuizSecond>();

const emits = defineEmits(['showQuiz']);
</script>

<template>
  <swiper-slide class="s-main-banner__item">
    <div class="s-main-banner__info">
      <div
        class="s-main-banner__title"
        :class="titleClass"
        v-html="title"
      />
      <div
        class="s-main-banner__description"
        :class="descriptionClass"
        v-html="description"
      />
      <div
        class="s-main-banner__text"
        :class="textClass"
        v-html="text"
      />
      <!-- <div class="s-main-banner__btns">
        <AButton
          @click="emits('showQuiz')"
        >
          <span>
            Начать бесплатно
          </span>
        </AButton>
        <AButton
          bg-color="white"
          :to="ROUTES.ADMISSION_COMMITTEE"
        >
          <span>
            Подробнее
          </span>
        </AButton>
      </div> -->
    </div>
    <picture class="s-main-banner__bg">
      <source
        :srcset="imageLg"
        media="(min-width: 1200px)"
      >
      <source
        :srcset="imageMd"
        media="(min-width: 768px)"
      >
      <AImg
        :src="imageSm"
        alt="quiz"
      />
    </picture>
  </swiper-slide>
</template>

<style lang="scss" scoped>
@import './SMainQuizSecond.scss';
</style>
