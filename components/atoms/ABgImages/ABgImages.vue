<script setup lang="ts">
import type { BgImage } from '~/types/BgImage';

defineProps<BgImage>();
</script>

<template>
  <picture class="a-bg-images">
    <source
      v-if="imageLG"
      :srcset="imageLG"
      media="(min-width: 1200px)"
    >
    <source
      v-if="imageMD"
      :srcset="imageMD"
      media="(min-width: 768px)"
    >
    <AImg
      :src="imageSM"
      alt="credit"
    />
  </picture>
</template>

<style lang="scss" scoped>
@import './ABgImages.scss';
</style>
