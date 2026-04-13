<script setup lang="ts">
import { synergyApi, synergyRu } from '~/utils/mediaCdn';
import type { BreadcrumbItem } from '~/types';

const {
  image = synergyRu('synergy-ru/content/_upload/authors/author.webp'),
  pagetitle,
  description,
  articlesCount = 0,
  breadcrumbs = [],
} = defineProps<{
  image: string,
  pagetitle?: string,
  description?: string,
  articlesCount?: number,
  breadcrumbs?: BreadcrumbItem[],
}>();
</script>

<template>
  <div class="s-author">
    <MBreadcrumbs :breadcrumbs />

    <div
      class="s-author__inner"
      itemprop="author"
      itemscope
      itemtype="https://schema.org/Person"
    >
      <div class="s-author__img">
        <img
          :src="image"
          :alt="pagetitle"
        >
      </div>
      <div class="s-author__info">
        <h1
          class="s-author__name a-font_h5"
          itemprop="name"
          v-html="pagetitle"
        />
        <p
          class="a-font_l"
          itemprop="jobTitle"
          v-html="description"
        />
        <p
          v-if="articlesCount"
          class="s-author__count a-font_m"
        >
          Публикации:
          <b v-html="articlesCount" />
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './SAuthorIntro.scss';
</style>
