<script setup lang="ts">
import { categories } from './SArticleDirectionsData';

</script>

<template>
  <MSection
    class="s-article-directions"
    title-class="a-font_h3"
    title="Направления"
  >
    <div class="s-article-directions__list">
      <NuxtLink
        v-for="(item, index) in categories"
        :key="index"
        :href="item.href"
        class="s-article-directions__item"
      >
        <h6
          class="s-article-directions__item-title a-font_h6"
          v-html="item.title"
        />
        <div
          class="s-article-directions__item-tags a-font_m-m"
          v-html="item.tags"
        />
        <picture>
          <AImg
            :src="item.ico"
            :alt="item.title"
            decoding="async"
            loading="lazy"
            width="60"
            height="60"
          />
        </picture>
      </NuxtLink>
    </div>
  </MSection>
</template>
<style lang="scss" scoped>
@import './SArticleDirections.scss';
</style>
