<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { SwiperSlide } from 'swiper/vue';

interface Props {
  slideClassname?: string;
  paginationText?: string;
  title?: string;
  navClassname?: string;
  showImage?: boolean;
  showNavigation?: boolean;
}

const {
  title = '',
  navClassname = '',
  paginationText = '',
  slideClassname = '',
  showImage = false,
  showNavigation = false,
} = defineProps<Props>();

const emits = defineEmits(['prev']);
</script>

<template>
  <swiper-slide
    class="m-quiz__slide"
    :class="slideClassname"
  >
    <div class="m-quiz__slide-top">
      <AImg
        v-if="showImage"
        src=synergyApi('uploads/content/quiz/quiz_slide/rhino.webp')
        alt="slideImage"
        decoding="async"
        loading="lazy"
      />
      <ATag
        :text="paginationText"
        variant="white"
      />
    </div>
    <div
      v-if="title"
      class="m-quiz__slide-title a-font_h4"
      v-html="title"
    />
    <slot />
    <button
      v-if="showNavigation"
      class="m-quiz__slide-back a-font_xs-m"
      :class="navClassname"
      @click.stop="emits('prev')"
    >
      <ASvgMono name="arr-back" />
      <span>Вернуться</span>
      <span>К&nbsp;предыдущему вопросу</span>
    </button>
  </swiper-slide>
</template>

<style lang="scss" scoped>
@import './MQuiz.scss';
</style>
