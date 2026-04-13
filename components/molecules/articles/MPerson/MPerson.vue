<script setup lang="ts">
interface Props {
  image?: string,
  name?: string,
  title?: string,
}

const {
  title = '',
  name = '',
  image,
} = defineProps<Props>();
</script>

<template>
  <div class="m-person">
    <picture v-if="image">
      <AImg
        :src="image"
        :alt="title"
        decoding="async"
        loading="lazy"
        width="90"
        height="90"
      />
    </picture>
    <div class="m-person__info">
      <div
        v-if="name"
        class="m-person__name a-font_m-m"
      >
        <ASvgMono name="popular" />
        Спикер: {{ name }}
      </div>
      <div
        class="a-font_xl-m"
        v-html="title"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import './MPerson.scss';
</style>
