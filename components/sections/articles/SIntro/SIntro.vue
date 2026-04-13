<script setup lang="ts">
interface Props {
  image: string;
  publishedon: string;
  publishedDate: string;
  editedon: string;
  editedDate: string;
  pageTitle: string;
  introText: string;
  authors: Author[];
}

interface Author {
  img?: string;
  name?: string;
  href?: string;
}

const {
  image = '',
  publishedon = '',
  publishedDate = '',
  editedon = '',
  editedDate = '',
  pageTitle = '',
  introText = '',
  authors = [],
} = defineProps<Props>();
</script>

<template>
  <MSection
    class="s-intro"
  >
    <div class="s-intro__inner --article-card-js">
      <MArticleBreadcrumbs />

      <div class="s-intro__about">
        <h1
          class="s-intro__title a-font_h3 --article-title-js"
          itemprop="headline"
          v-html="pageTitle"
        />
        <div
          v-if="introText"
          class="s-intro__descr a-font_xl-m"
          v-html="introText"
        />
      </div>

      <div class="s-intro__top">
        <template v-if="authors">
          <NuxtLink
            v-for="item in authors"
            :key="item.name"
            :to="item.href"
            class="s-intro__author"
            itemscope
            itemtype="https://schema.org/ScholarlyArticle"
          >
            <AImg
              :src="item.img"
              alt=""
            />
            <span
              class="s-intro__author-label a-font_xs-m"
              itemprop="name"
              v-html="'Автор статьи'"
            />
            <span
              class="a-font_s-m"
              itemprop="author"
              v-html="item.name"
            />
            <ASvgMono name="arrow_outward" />
          </NuxtLink>
        </template>

        <div class="s-intro__date a-font_m-m">
          <template v-if="editedon">
            <meta
              itemprop="datePublished"
              :content="editedon"
            >
            {{ editedDate }}
          </template>
          <template v-else>
            <meta
              itemprop="dateModified"
              :content="publishedon"
            >
            {{ publishedDate }}
          </template>
        </div>
      </div>

      <picture
        v-if="image"
        class="s-intro__img"
      >
        <AImg
          :src="image"
          :alt="pageTitle"
        />
      </picture>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SIntro.scss';
</style>
