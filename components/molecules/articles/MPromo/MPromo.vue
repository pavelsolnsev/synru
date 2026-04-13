<script setup lang="ts">

const data = {
  href: '#',
  image: {
    sm: 'https://example.com/assets/upload/bspic/229a2026.jpg',
    md: 'https://example.com/assets/upload/bspic/229a2026.jpg',
    lg: 'https://example.com/assets/upload/bspic/229a2026.jpg',
  },
  tag: 'Курс',
  title: 'Интернет-маркетолог',
  text: 'Станьте востребованным <span style="white-space:nowrap;">интернет-маркетологом</span> с&nbsp;нуля <br>и&nbsp;начните зарабатывать уже через&nbsp;3&nbsp;месяца',
  btn: 'Подробнее',
};
</script>

<template>
  <NuxtLink
    :to="data.href"
    class="m-promo"
  >
    <ATag
      v-if="data.tag"
      :text="data.tag"
      variant="white"
      class="a-tag--blur a-font_xs-m"
    />
    <picture v-if="data.image">
      <source
        v-if="data.image.lg"
        media="(min-width: 1200px)"
        :srcset="data.image.lg"
      >
      <source
        v-if="data.image.md"
        media="(min-width: 768px)"
        :srcset="data.image.md"
      >
      <AImg
        :src="data.image.sm"
        :alt="data.title"
        decoding="async"
        loading="lazy"
        width="90"
        height="90"
      />
    </picture>
    <div class="m-promo__bottom">
      <div
        v-if="data.title"
        class="m-promo__title"
        v-html="data.title"
      />
      <div
        v-if="data.text"
        class="m-promo__text"
        v-html="data.text"
      />
      <AButton
        type="button"
        size="md"
      >
        <span>{{ data.btn }}</span>
      </AButton>
    </div>
  </NuxtLink>
</template>
<style lang="scss" scoped>
@import './MPromo.scss';
</style>
