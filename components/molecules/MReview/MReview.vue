<script setup lang="ts">
interface Props {
  image?: string;
  name?: string;
  text?: string;
  info?: string;
}

const {
  text = '',
  name = '',
  image = '',
  info = '',
} = defineProps<Props>();
</script>

<template>
  <div class="m-review-card swiper-slide">
    <div class="m-review-card__top">
      <AImg
        :src="image"
        alt="name"
        class="m-review-card__img"
        width="48"
        height="48"
        decoding="async"
        loading="lazy"
      />
      <div class="m-review-card__head">
        <div
          class="m-review-card__name a-font_h6"
          v-html="name"
        />
        <div
          class="m-review-card__info a-font_m"
          v-html="info"
        />
      </div>
    </div>
    <div
      class="m-review-card__text a-font_l"
      v-html="text"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './MReview.scss';
</style>
