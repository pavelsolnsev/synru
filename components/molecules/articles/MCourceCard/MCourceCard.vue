<script setup lang="ts">
interface Props {
  href?: string,
  image?: string,
  title?: string,
  text?: string,
}

const {
  href,
  image,
  title,
  text,
} = defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="href"
    class="m-cource-card"
  >
    <picture class="m-cource-card__thumb">
      <AImg
        :src="image"
        :alt="title"
        decoding="async"
        loading="lazy"
        width="280"
        height="186"
      />
    </picture>

    <div
      v-if="title || text"
      class="m-cource-card__desc"
    >
      <div
        v-if="title"
        class="m-cource-card__title a-font_h6"
        v-html="title"
      />
      <div
        v-if="text"
        class="m-cource-card__text a-font_m"
        v-html="text"
      />
      <AButton
        type="button"
        size="sm"
      >
        <span>Подробнее</span>
      </AButton>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
@import './MCourceCard.scss';
</style>
