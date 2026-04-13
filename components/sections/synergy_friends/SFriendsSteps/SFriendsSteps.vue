<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { steps } from './sFriendsStepsData';

const {
  swiperRef,
  swiperConfig,
}  = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
});
</script>

<template>
  <MSection class="s-friends-steps">
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="step, index in steps"
        :key="step.title"
        class="s-friends-steps__step"
      >
        <div class="s-friends-steps__step__wrapper">
          <span class="s-friends-steps__step__num">{{ index + 1 }} шаг</span>
          <div
            class="s-friends-steps__step__title"
            v-html="step.title"
          />
          <div
            class="s-friends-steps__step__description"
            v-html="step.description"
          />
          <AImg
            alt="dino"
            class="s-friends-steps__step__image"
            :class="`s-friends-steps__step__image--${index}`"
            :src="step.image"
          />
        </div>
      </swiper-slide>
    </swiper>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SFriendsSteps.scss';
</style>
