<script setup lang="ts">
import type { Fonts } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  text?: string;
  textClass?: Fonts;
  bgImages: { image: string }[];
  routeName?: string;
}

const {
  title = '',
  titleClass = 'a-font_banner',
  text = '',
  textClass = 'a-font_l-m',
  bgImages = [],
  routeName = '',
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity: {} });
</script>

<template>
  <MSection class="ratings__intro">
    <MBreadcrumbs :breadcrumbs />
    <picture>
      <source
        :srcset="bgImages[2]?.image"
        media="(min-width: 1200px)"
      >
      <source
        :srcset="bgImages[1]?.image"
        media="(min-width: 768px)"
      >
      <AImg
        alt="ratings"
        decoding="async"
        :src="bgImages[0]?.image"
      />
    </picture>
    <h1
      class="ratings__intro-title"
      :class="titleClass"
      v-html="title"
    />
    <div
      class="ratings__intro-text"
      :class="textClass"
      v-html="text"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SRatingsIntro.scss';
</style>
