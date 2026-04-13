<script setup lang="ts">
import type { NewsResponse } from '~/server/api/news/index.get';
import type { BreadcrumbItem } from '~/types';
import transformLastNews from '~/utils/article/transformLastNews';

interface Props {
  title?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  pending?: boolean;
}

const {
  title = '',
  description = '',
  breadcrumbs = [],
  pending = false,
} = defineProps<Props>();

const { data: lastNews } = await useFetch<NewsResponse>('/api/news/lastNews');

const news = transformLastNews(lastNews.value);
</script>

<template>
  <div class="s-main">
    <div
      class="mediacenter-page"
      :class="{ '--pending': pending }"
    >
      <MBreadcrumbs :breadcrumbs />
      <h1
        class="a-font_h3 mediacenter-page__title"
        v-html="title"
      />
      <div
        v-if="description"
        class="a-font_h4 mediacenter-page__subtitle"
        v-html="description"
      />
      <div class="mediacenter-page__container">
        <slot />
      </div>
      <slot name="bottom" />
    </div>
    <MNews :items="news" />
  </div>
</template>

<style lang="scss" scoped>
@import './SPresscenterMain.scss';
</style>
