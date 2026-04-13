<script setup lang="ts">
import type { Fonts } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  textClass?: Fonts;
  articles?: Array<{
    title?: string;
    text?: string;
    image?: string;
  }>;
}

const {
  title = '',
  titleClass = 'a-font_h6',
  textClass = 'a-font_m',
  articles = [],
} = defineProps<Props>();
</script>

<template>
  <MSection
    v-if="articles.length"
    class="s-faculty-events"
    :title
  >
    <MArticlesSlider
      :title-class
      :text-class
      :articles
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SFacultyEvents.scss';
</style>
