<script setup lang="ts">
import type { ArticlesResponse } from '~/server/api/articles/index.get';
import transformArticles from '~/utils/article/transformArticles';

const PROF_ORIENTATION_ARTICLE_SLUG = 'test';

const { data } = await useFetch<ArticlesResponse>('/api/articles', {
  query: {
    'filter[slug]': PROF_ORIENTATION_ARTICLE_SLUG,
  },
});

const articles = transformArticles(data.value);

const article = articles[0];
</script>

<template>
  <SArticlesList>
    <template #top>
      <MArticleBannerCard
        v-if="article"
        :image="article.image"
        :title="article.title"
        :tags="[{text: article.date}]"
        :share-link="article.shareLink"
        :to="article.to"
        class="--article-test"
        share
      />
    </template>
  </SArticlesList>
</template>

<style lang="scss" scoped>
@import './SCareerGuidanceArticlesList.scss';
</style>
