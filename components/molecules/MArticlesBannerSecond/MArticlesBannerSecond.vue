<script setup lang="ts">
interface Props {
  imageLg?: string;
  imageMd?: string;
  imageSm?: string;
  btnText?: string;
  to?: string;
}

const {
  imageLg,
  imageMd,
  imageSm,
  btnText = 'Начать сейчас',
  to,
} = defineProps<Props>();

const component = to ? resolveComponent('NuxtLink') : 'div';
</script>

<template>
  <component
    :is="component"
    class="m-articles-banner2 --quiz-popup-opener"
    :to="to ? to : undefined"
  >
    <picture>
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
        alt="banner"
        loading="lazy"
        decoding="async"
      />
    </picture>

    <AButton bg-color="black">
      <span v-html="btnText" />
    </AButton>
  </component>
</template>

<style lang="scss" scoped>
@import './MArticlesBannerSecond.scss';
</style>
