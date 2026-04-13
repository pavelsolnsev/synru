<script setup lang="ts">
import { SwiperSlide } from 'swiper/vue';
import type { QuizItem } from './SMainQuiz.vue';

const {
  title,
  titleClass = 'a-font_banner',
  text,
  textClass = 'a-font_h5',
  image,
  imageMd,
  imageLg,
  buttonLink,
  buttonText,
  quizText,
} = defineProps<QuizItem>();

const emits = defineEmits(['showQuiz']);
</script>

<template>
  <swiper-slide class="s-main-banner__item">
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
        :src="image"
        alt="quiz"
      />
    </picture>

    <div
      class="s-main-banner__title"
      :class="titleClass"
      v-html="title"
    />
    <div
      class="s-quiz__intro-description"
      :class="textClass"
      v-html="text"
    />
    <div class="s-quiz__btns">
      <AButton
        @click="emits('showQuiz')"
      >
        <span v-html="quizText" />
      </AButton>
      <AButton
        bg-color="white"
        :to="buttonLink"
      >
        <span v-html="buttonText" />
      </AButton>
    </div>
  </swiper-slide>
</template>

<style lang="scss" scoped>
@import './SMainQuiz.scss';
</style>
