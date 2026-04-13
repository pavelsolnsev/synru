<script setup lang="ts">
import type { Fonts } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  text?: string;
  textClass?: Fonts;
  images: { image: string }[]
}

const {
  title = '',
  titleClass = 'a-font_h4',
  text = '',
  textClass = 'a-font_xl-m',
  images = [],
} = defineProps<Props>();
</script>

<template>
  <MSection class="ratings__about">
    <div class="ratings__about-wrap">
      <div class="ratings__about-desc">
        <div
          :class="titleClass"
          v-html="title"
        />
        <div
          :class="textClass"
          v-html="text"
        />
      </div>

      <picture class="ratings__about-img">
        <source
          :srcset="images[2]?.image"
          media="(min-width: 1200px)"
        >
        <source
          :srcset="images[1]?.image"
          media="(min-width: 768px)"
        >
        <AImg
          alt="ratings"
          decoding="async"
          loading="lazy"
          :src="images[0]?.image"
        />
      </picture>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SRatingsAbout.scss';
</style>
