<script setup lang="ts">
interface Props {
  routeName?: string;
}

const {
  routeName = '',
} = defineProps<Props>();

interface EduTypeData {
  title?: string;
  filter?: Record<string, string>;
}

const newsTypes: Record<string, EduTypeData> = {
  'edu_news_ege': {
    title: 'Новости ЕГЭ',
    filter: { 'filter[categories.all]': 'news,ege' },
  },
  'edu_news_oge': {
    title: 'Новости ОГЭ',
    filter: { 'filter[categories.all]': 'news,oge' },
  },
  'edu_poleznaya_informacziya': {
    title: 'Полезная информация',
    filter: { 'filter[categories.slug]': 'poleznaya_informacziya' },
  },
};

const PAGINATION_PARAM = 'ege-page';
const PER_PAGE = 14;

const {
  title = '',
  filter = {},
} = newsTypes[routeName] || {};
</script>

<template>
  <SEduWrapper
    :route-name
  >
    <template #top>
      <h1
        v-if="title"
        class="l-section__title a-font_h3"
        v-html="title"
      />
      <SArticlesList
        :show-banner-card="false"
        :per-page="PER_PAGE"
        show-pagination
        :pagination-param="PAGINATION_PARAM"
        :filter
      />
    </template>
  </SEduWrapper>
</template>

<style scoped lang="scss">
:deep() {
  .l-section__title {
    margin: 0 !important;
  }
}
</style>
