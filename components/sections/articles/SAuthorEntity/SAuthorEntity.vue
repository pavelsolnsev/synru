<script setup lang="ts">
import { synergyApi, synergyRu } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';
import { ARTICLE_BANNER_UTM } from '~/constants/common';
import type { ArticlesResponse } from '~/server/api/articles/index.get';
import type { PersonAttributesObject } from '~/types/entities';
import transformArticles from '~/utils/article/transformArticles';

interface Props {
  routeName?: string;
  entity?: Person | null;
}

interface Person extends PersonAttributesObject {
  id: number;
}

const {
  entity = null,
  routeName = '',
} = defineProps<Props>();

const fullName = `${entity?.name ?? ''} ${entity?.surname ?? ''}`;

const breadcrumbs = generateBreadcrumbs({ routeName, entity: { name: fullName } }) ?? [];

const INITIAL_PAGE_NUMBER = 1;
const ARTICLES_PER_PAGE = 6;
const currentPage = shallowRef(INITIAL_PAGE_NUMBER);

const { data: articlesData, status } = await useFetch<ArticlesResponse>(`/api/articles`, {
  deep: false,
  watch: [currentPage],
  query: {
    'include': 'categories',
    'page[size]': ARTICLES_PER_PAGE,
    'page[number]': currentPage,
    'filter[persons.slug]': entity?.slug,
    sort: '-published_at',
    'filter[published]': true,
  },
});

const total = articlesData?.value?.meta.total ?? 0;
const isPaginatorVisible = computed(() => total > (currentPage.value * ARTICLES_PER_PAGE));
const articles = shallowRef(transformArticles(articlesData.value));

watch(articlesData, () => {
  if (!articlesData.value) return;

  articles.value = [
    ...articles.value,
    ...transformArticles(articlesData.value),
  ];
});

function onFetchMoreButtonClick() {
  currentPage.value += 1;
}
</script>

<template>
  <div class="s-main">
    <SAuthorIntro
      :breadcrumbs
      :image="entity?.photo ?? ''"
      :pagetitle="fullName"
      :description="entity?.position"
      :articles-count="articlesData?.meta.total"
    />

    <div
      v-if="articles?.length"
      class="s-author-articles"
      :class="{ '--pending': status === 'pending' }"
    >
      <h2
        class="a-font_h4"
        v-html="'Статьи'"
      />

      <div class="rows s-author-articles__inner">
        <template
          v-for="(item, index) in articles"
          :key="index"
        >
          <MArticleCardSecond
            :to="item.to"
            :title="item.title"
            :date="item.date"
            :image="item.image"
            :share="true"
            :share-link="item.shareLink"
          />
        </template>
      </div>

      <MMore
        v-if="isPaginatorVisible"
        type="button"
        text="Показать ещё"
        :disabled="status === 'pending'"
        @click.stop="onFetchMoreButtonClick"
      />
    </div>

    <div class="s-main__bottom">
      <SDownloadAppNew
        :show-alternative-banner="false"
        :show-custom-banner="false"
        :show-programms-banner="false"
      />
    </div>

    <SArticleBanners
      :href="`${ROUTES.ADMISSION_COMMITTEE}?${ARTICLE_BANNER_UTM}${entity?.id}`"
      image-lg=synergyRu('content/article_banners/articles_banner_4_lg.webp?v=040625')
      image-md=synergyRu('content/article_banners/articles_banner_4_md.webp?v=040625')
      image-sm=synergyRu('content/article_banners/articles_banner_4_sm.webp?v=040625')
      btn-text="Подобрать программу"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './SAuthorEntity.scss';
</style>
