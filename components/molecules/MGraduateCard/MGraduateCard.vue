<script setup lang="ts">
interface Props {
  name: string,
  img: string,
  info?: string,
  text?: string,
}

const {
  name,
  img,
  info = '',
  text = '',
} = defineProps<Props>();
</script>

<template>
  <div class="m-graduate-card swiper-slide">
    <div class="m-graduate-card__top">
      <AImg
        :src="img"
        class="m-graduate-card__img"
        alt=""
        width="48"
        height="48"
        decoding="async"
        loading="lazy"
      />

      <div class="m-graduate-card__head">
        <div class="m-graduate-card__name a-font_h6">
          {{ name }}
        </div>
        <div
          v-if="info"
          class="m-graduate-card__info a-font_m"
          v-html="info"
        />
      </div>
    </div>
    <div
      v-if="text"
      class="m-graduate-card__text a-font_l"
      v-html="text"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './MGraduateCard.scss';
</style>
