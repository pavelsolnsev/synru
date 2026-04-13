<script setup lang="ts">
import type { ErrorCodeData } from '~/types';

const {
  title,
  images,
  btn,
  description = '',
} = defineProps<ErrorCodeData>();
</script>

<template>
  <MSection
    class="error"
    title-class="a-font_h3"
    :title
  >
    <div
      class="error__subtitle a-font_h6"
      v-html="description"
    />
    <picture>
      <source
        v-if="images[2]"
        media="(min-width: 1200px)"
        :srcset="images[2]"
      >
      <source
        v-if="images[1]"
        media="(min-width: 768px)"
        :srcset="images[1]"
      >
      <AImg
        :src="images[0]"
        :alt="title"
      />
    </picture>
    <AButton
      v-bind="btn.attributes"
    >
      <span v-html="btn.text" />
    </AButton>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SError.scss';
</style>
