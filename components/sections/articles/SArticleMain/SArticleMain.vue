<script setup lang="ts">
import { COMMON } from '~/constants';

interface Props {
  uri?: string;
  image?: string;
  publishedOn?: string;
  datePublished?: string;
  editedOn?: string;
  dateModified?: string;
  parentTitle?: string;
  pageTitle?: string;
  type: 'news' | 'article';
}

const {
  uri = '',
  image = '',
  datePublished = '',
  dateModified = '',
  parentTitle = '',
  pageTitle = '',
  type,
} = defineProps<Props>();

const articleItemtype = type === 'news' ? 'NewsArticle' : 'Article';

const DATE_MODIFIED_TEXT = 'Обновлено';

const slots = useSlots();
</script>

<template>
  <div
    class="s-main"
    itemscope
    :itemtype="`https://schema.org/${articleItemtype}`"
  >
    <link
      itemprop="url"
      :href="`${COMMON.DEFAULT_DOMAIN}${uri}`"
    >
    <meta
      itemscope
      itemprop="mainEntityOfPage"
      itemType="https://schema.org/WebPage"
      :itemid="`${COMMON.DEFAULT_DOMAIN}${uri}`"
      :content="pageTitle"
    >
    <meta
      v-if="parentTitle"
      itemprop="articleSection"
      :content="parentTitle"
    >
    <div
      v-if="image"
      itemprop="image"
      itemscope
      itemtype="https://schema.org/ImageObject"
      style="display: none"
    >
      <AImg
        class="s-article__top-img"
        :src="image"
        :alt="pageTitle"
        itemprop="url contentUrl"
      />
    </div>
    <meta
      itemprop="datePublished"
      :content="datePublished"
    >
    <meta
      v-if="dateModified"
      itemprop="dateModified"
      :content="`${DATE_MODIFIED_TEXT} ${dateModified}`"
    >
    <main class="s-main__inner">
      <slot />
    </main>

    <slot name="aside" />

    <div
      v-if="slots.bottom"
      class="s-main__bottom"
    >
      <slot name="bottom" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleMain.scss';
</style>
