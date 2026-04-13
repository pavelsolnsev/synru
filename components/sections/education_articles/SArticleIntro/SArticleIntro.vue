<script setup lang="ts">
import DefaultAuthorImage from '~/assets/images/education_articles/s-article-intro/author.webp';

interface Props {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  description?: string;
  authorLink?: string;
  authorImg?: string;
  authorName?: string;
  date?: string;
  image?: string;
  share?: boolean;
}

interface BreadcrumbItem {
  external?: boolean,
  title: string,
  link: string,
}

const {
  breadcrumbs = [],
  title,
  description,
  authorLink,
  authorImg,
  authorName,
  date,
  image,
  share = false,
} = defineProps<Props>();
</script>

<template>
  <MSection
    class="s-intro"
  >
    <div class="s-intro__inner --article-card-js">
      <MBreadcrumbs
        :breadcrumbs
      />

      <div class="s-intro__about">
        <h1
          class="s-intro__title a-font_h3 --article-title-js"
          itemprop="headline"
          v-html="title"
        />

        <div
          v-if="description"
          class="s-intro__descr a-font_xl-m"
          v-html="description"
        />
      </div>

      <div class="s-intro__top">
        <NuxtLink
          v-if="authorLink"
          class="s-intro__author"
          itemscope
          itemtype="https://schema.org/ScholarlyArticle"
          :to="authorLink"
        >
          <AImg
            alt="author"
            :src="authorImg ? authorImg : DefaultAuthorImage"
          />
          <span
            class="s-intro__author-label a-font_xs-m"
            itemprop="name"
          >
            Автор статьи
          </span>
          <span
            class="a-font_s-m"
            itemprop="author"
            v-html="authorName"
          />

          <ASvgMono name="arrow_outward" />
        </NuxtLink>

        <div
          class="s-intro__date a-font_m-m"
        >
          <meta
            itemprop="dateModified"
            :content="date"
          >
          {{ date }}
        </div>
      </div>

      <picture class="s-intro__img">
        <AImg
          alt="article"
          :src="image"
        />
      </picture>

      <div
        v-if="share"
        class="s-intro__bottom"
      >
        <div
          v-if="share"
          class="s-intro__share"
        >
          <AShare show-label />
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SArticleIntro.scss';
</style>
