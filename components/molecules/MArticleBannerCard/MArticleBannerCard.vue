<script setup lang="ts">
import type { Fonts } from '~/types';

interface Props {
  to?: string;
  tags?: { text: string; }[];
  titleClass?: Fonts;
  title?: string;
  text?: string;
  textClass?: Fonts;
  image?: string;
  share?: boolean;
  shareLink?: string;
}

const {
  to,
  tags = [],
  titleClass = 'a-font_h4',
  title,
  text,
  textClass = 'a-font_h6',
  image,
  share,
  shareLink,
} = defineProps<Props>();
</script>

<template>
  <article class="m-article-banner-card --article-card-js">
    <NuxtLink
      class="m-article-banner-card__link"
      :to
    >
      <div class="m-article-banner-card__inner">
        <div
          v-if="tags?.length"
          class="m-article-banner-card__tags"
        >
          <ATag
            v-for="tag in tags"
            :key="tag.text"
            class="a-tag--blur"
            font="a-font_m"
            variant="white"
            :text="tag.text"
          />
        </div>

        <div class="m-article-banner-card__text">
          <div
            class="m-article-banner-card__title --article-title-js"
            :class="titleClass"
            v-html="title"
          />

          <div
            class="m-article-banner-card__intro"
            :class="textClass"
            v-html="text"
          />
        </div>
      </div>

      <div class="m-article-banner-card__img">
        <AImg
          decoding="async"
          :src="image"
          :alt="title"
        />
        <AImg
          decoding="async"
          :src="image"
          :alt="title"
        />
      </div>
    </NuxtLink>

    <AShare
      v-if="share"
      show-label
      :link="shareLink ?? to"
    />
  </article>
</template>

<style lang="scss" scoped>
@import './MArticleBannerCard.scss';
</style>
