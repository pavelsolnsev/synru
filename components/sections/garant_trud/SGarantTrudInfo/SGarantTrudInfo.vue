<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
  images?: { img: string }[]
}

const {
  title = '',
  description = '',
  images = [],
} = defineProps<Props>();
</script>

<template>
  <MSection
    class="s-garant-trud"
  >
    <div class="s-garant-trud__info">
      <div
        class="s-garant-trud__info__title a-font_h4"
        v-html="title"
      />

      <div
        class="s-garant-trud__info__description a-font_h6"
        v-html="description"
      />
    </div>

    <picture
      class="s-garant-trud__img"
    >
      <source
        :srcset="images[2]?.img"
        media="(min-width: 1200px)"
      >
      <source
        :srcset="images[1]?.img"
        media="(min-width: 768px)"
      >
      <AImg
        :src="images[0]?.img"
        alt="garant-trud"
        decoding="async"
        loading="lazy"
      />
    </picture>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SGarantTrudInfo.scss';
</style>
