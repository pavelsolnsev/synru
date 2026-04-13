<script setup lang="ts">

const data = {
  href: '#',
  image: 'https://example.com/assets/demo-promo.jpg',
  tag: 'Курс',
  title: 'Интернет-маркетолог',
  text: 'Станьте востребованным <br><span style="white-space:nowrap;">интернет-маркетологом</span> с&nbsp;нуля и&nbsp;начните <br>зарабатывать уже через&nbsp;3&nbsp;месяца',
  btn: 'Подробнее',
};
</script>

<template>
  <NuxtLink
    :to="data.href"
    class="m-promo-small"
  >
    <ATag
      v-if="data.tag"
      :text="data.tag"
      variant="white"
      class="a-tag--blur a-font_xs-m"
    />
    <picture v-if="data.image">
      <AImg
        :src="data.image"
        :alt="data.title"
        decoding="async"
        loading="lazy"
        width="90"
        height="90"
      />
    </picture>
    <div class="m-promo-small__text">
      <div
        v-if="data.title"
        class="m-promo-small__title"
        v-html="data.title"
      />
      <div
        class="a-font_m"
        v-html="data.text"
      />
      <AButton
        type="button"
        size="sm"
      >
        <span>{{ data.btn }}</span>
      </AButton>
    </div>
  </NuxtLink>
</template>
<style lang="scss" scoped>
@import './MPromoSmall.scss';
</style>
