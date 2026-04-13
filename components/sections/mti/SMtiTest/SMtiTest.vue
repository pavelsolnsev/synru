<script setup lang="ts">
interface Props {
  title: string
  subtitle: string
  btnText: string
  btnLink: string
  backgroundLG: string
  backgroundSM: string
  img: string
}

defineProps<Props>();
</script>

<template>
  <MSectionNewResponsive class="s-ege-test">
    <div class="s-ege-test__body">
      <picture
        class="s-ege-test__bg"
      >
        <source
          media="(min-width: 1200px)"
          :srcset="backgroundLG"
        >
        <AImg
          :src="backgroundSM"
          :alt="title"
          decoding="async"
          loading="lazy"
        />
      </picture>
      <div class="s-ege-test__info">
        <div
          class="s-ege-test__title a-font_h3"
          v-html="title"
        />
        <div
          class="s-ege-test__subtitle a-font_h6"
          v-html="subtitle"
        />
        <AButton
          class="s-ege-test__btn desktop"
          :to="btnLink"
        >
          {{ btnText }}
        </AButton>
      </div>
      <div class="s-ege-test__img">
        <AImg :src="img" />
      </div>
      <AButton
        class="s-ege-test__btn mobile"
        :to="btnLink"
      >
        {{ btnText }}
      </AButton>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SMtiTest';
</style>
