<script setup lang="ts">
import type { ArticleCard } from '~/types';
import ArticleCardImage from '~/assets/images/m_article_card/placeholder_card.svg?url';

const {
  to = '',
  title = '',
  titleClass = 'a-font_h6',
  text = '',
  textClass = 'a-font_m',
  date = '',
  dateClass = '',
  image = '',
  tag = '',
} = defineProps<ArticleCard>();
</script>

<template>
  <NuxtLink
    class="m-article-card"
    :external="true"
    :to
  >
    <picture class="m-article-card__img">
      <AImg
        :src="image || ArticleCardImage"
        :srcset="image || ArticleCardImage"
        :alt="title"
        width="280"
        height="202"
        decoding="async"
        loading="lazy"
      />
    </picture>

    <div class="m-article-card__wrap">
      <ATag
        v-if="tag"
        :text="tag"
        variant="grey"
      />
      <div
        v-if="title"
        class="m-article-card__title"
        :class="titleClass"
        v-html="title"
      />
      <div
        v-if="text"
        class="m-article-card__text"
        :class="textClass"
        v-html="text"
      />
      <div
        v-if="date"
        class="m-article-card__date"
        :class="dateClass"
        v-html="date"
      />
    </div>
  </NuxtLink>
</template>

<style lang='scss' scoped>
@import './MArticleCard.scss';
</style>
