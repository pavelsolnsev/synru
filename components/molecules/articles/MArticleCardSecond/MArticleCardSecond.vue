<script setup lang="ts">
import PlaceholderImage from '~/assets/images/global/placeholder_card.svg?url';
import type { Fonts } from '~/types';

interface Props {
  to: string;
  image?: string;
  title?: string;
  titleClass?: Fonts;
  tagClass?: Fonts;
  tags?: { text: string }[];
  text?: string;
  textClass?: Fonts;
  date?: string;
  dateClass?: Fonts;
  share?: boolean;
  shareLink?: string;
}

const {
  to,
  image,
  title,
  titleClass = 'a-font_h6',
  tags = [],
  tagClass,
  text,
  textClass = 'a-font_m',
  date,
  dateClass = 'a-font_m-m',
  share,
  shareLink,
} = defineProps<Props>();
</script>

<template>
  <article class="m-article-card --article-card-js">
    <NuxtLink
      class="m-article-card__link"
      :to
    >
      <picture class="m-article-card__img">
        <AImg
          decoding="async"
          loading="lazy"
          :alt="title"
          :src="image || PlaceholderImage"
        />
      </picture>

      <div class="m-article-card__wrap">
        <template v-if="tags?.length">
          <ATag
            v-for="tag in tags"
            :key="tag.text"
            variant="grey"
            :text="tag.text"
            :font="tagClass"
          />
        </template>

        <div
          v-if="title"
          class="m-article-card__title --article-title-js"
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

    <AShare
      v-if="share"
      :link="shareLink ?? to"
    />
  </article>
</template>

<style lang="scss" scoped>
@import './MArticleCardSecond.scss';
</style>
