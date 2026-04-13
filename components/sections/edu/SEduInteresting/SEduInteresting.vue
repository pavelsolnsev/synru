<script setup lang="ts">
import getArticleDate from '~/utils/article/getArticleDate';
import type { ArticlesResponse } from '~/server/api/articles/index.get';

const PER_PAGE = 6;

const { data } = await useFetch<ArticlesResponse>(`/api/articles`, {
  deep: false,
  watch: false,
  query: {
    'page[size]': PER_PAGE,
    'include': 'categories',
    'filter[categories.all]': 'news,ege',
    'sort': '-published_at',
    'filter[published]': true,
  },
});

const interestingArticles = formatArticles(data.value);

function formatArticles(articles: ArticlesResponse | null) {
  if (!articles) return [];

  return articles?.data?.map(({ attributes, relationships }) => {
    const date = getArticleDate(attributes.published_at);
    const category = getCategoryName(articles, relationships?.categories?.data[0]?.id);

    return {
      to: attributes.url,
      image: attributes.image,
      date,
      title: attributes.title,
      tags: [{ text: category ?? '' }],
    };
  });
}

function getCategoryName(articles: ArticlesResponse, category_id: number) {
  if (!articles) return '';
  return articles?.included?.filter((item) => Number(item.id) === category_id)[0]?.attributes?.name;
}
</script>

<template>
  <SInteresting
    title="Статьи по&nbsp;теме"
    :items="interestingArticles"
  />
</template>
