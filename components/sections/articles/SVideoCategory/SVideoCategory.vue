<script setup lang="ts">
import { categories } from '../SArticleDirections/SArticleDirectionsData';

const data = {
  title: 'Маркетинг',
  tags: ['200+ видео', '40 спикеров'],
};
</script>

<template>
  <MSection
    class="s-video-category"
    title-class="a-font_h3"
    :title="data.title"
  >
    <div class="s-video-category__tags a-font_m-m">
      <span
        v-for="tag in data.tags"
        :key="tag"
        class="s-video-category__tag"
        v-html="tag"
      />
    </div>
    <div class="s-video-category__items a-font_m">
      <ATag
        v-for="category in categories"
        :key="category.title"
        :to="category.href"
        :text="category.title"
        variant="fill_grey_40"
        class="s-video-category__item a-font_m"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SVideoCategory.scss';
</style>

<style lang="scss" scoped>
  :global(.s-cols .m-breadcrumbs) {
    margin-bottom: scale(-20);
  }
</style>
