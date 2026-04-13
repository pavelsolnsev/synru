<script setup lang="ts">
import { synergyApi, synergyRu } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';
import transformArticles from '~/utils/article/transformArticles';
import type { ArticlesResponse } from '~/server/api/articles/index.get';
import type { LocationQuery, LocationQueryValue } from 'vue-router';
import type { CategoryEntity } from '~/types/entities';

interface Props {
  routeName?: string;
  showBannerCard?: boolean;
  entity?: CategoryEntity | null;
  hasEntity?: boolean;
  sliceBegin?: number;
  perPage?: number;
  filter?: Record<string, string> | string;
  showPagination?: boolean;
  paginationParam?: string;
}

interface TransformArticle {
  title: string;
  text: string;
  share: boolean;
  shareLink: string;
  to: string;
  image: string;
  tags: { text: string }[]
  date: string;
}

const {
  showBannerCard = false,
  hasEntity = false,
  entity = null,
  sliceBegin = 0,
  perPage: propsPerPage = 0,
  filter: propsFilter,
  showPagination = false,
  paginationParam = '',
} = defineProps<Props>();

const route = useRoute();
const slug = route.path.split('/')?.at(-1) ?? '';

const showMiddleBanner = route.path === ROUTES.ARTICLES;

const INITIAL_PAGE_NUMBER = 1;
const INITIAL_PAGINATION_PAGE_NUMBER = getPaginationNumber(route.query, paginationParam);

const BIG_ARTICLE_CARD_INITIAL_INDICES = [3, 10, 17];
const BIG_ARTICLE_CARD_INDICES = shallowRef<Set<number>>(new Set(BIG_ARTICLE_CARD_INITIAL_INDICES));
const BIG_ARTICLE_CARD_STEP = 7;

const PER_PAGE = propsPerPage
  ? propsPerPage
  : getPerPage(route.path);

const currentPage = shallowRef(showPagination ? INITIAL_PAGINATION_PAGE_NUMBER : INITIAL_PAGE_NUMBER);

const isNeedDescendantsCategories = !hasEntity;

const { data } = await useFetch<Record<string, number[]>>('/api/categories/getArticlesCategoriesIds');

const categoryDescendants = data.value ?? {};

const descendant = categoryDescendants[slug] ?? [];

const fetchCategoriesId = isNeedDescendantsCategories
  ? descendant
  : [entity?.id ?? ''];

const DEFAULT_FILTER = { 'filter[categories.id]': fetchCategoriesId.join(',') };

const queryFilter = propsFilter
  ? parseFilter(propsFilter)
  : DEFAULT_FILTER;

const { data: articlesData, status } = await useFetch<ArticlesResponse>(`/api/articles`, {
  watch: [currentPage],
  query: {
    'include': 'categories',
    'page[size]': PER_PAGE,
    'page[number]': currentPage,
    'fields[articles]': 'id,title,annotation,image,published_at,slug',
    'sort': '-published_at',
    'filter[published]': true,
    ...queryFilter,
  },
});

const showFetchMoreButton = computed(() => {
  if (!articlesData.value) return false;

  return currentPage.value < articlesData.value?.meta?.last_page;
});

const articles = shallowRef<TransformArticle[]>(transformArticles(articlesData.value));

const { openModal } = useModalStore();

const modalProps = {
  title: "Рассчитать кредит",
  formPhone: true,
  actionParams: [{ param: 'form=articles_credit' }],
}

watch(articlesData, () => {
  if (!articlesData.value) return;

  if (showPagination) {
    articles.value = transformArticles(articlesData.value);
    return;
  }

  articles.value = [
    ...articles.value,
    ...transformArticles(articlesData.value),
  ];
});

watch(() => route.query[paginationParam], () => {
  if (!showPagination) return;

  const pageNumber = getPaginationNumber(route.query, paginationParam);

  currentPage.value = pageNumber;

  window?.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

function onFetchMoreButtonClick() {
  currentPage.value += 1;

  const lastBigArticleIndex = Array.from(BIG_ARTICLE_CARD_INDICES.value).pop();

  const nextBigArticleIndices = getNextBigArticleIndices(lastBigArticleIndex);

  BIG_ARTICLE_CARD_INDICES.value = new Set([
    ...BIG_ARTICLE_CARD_INDICES.value,
    ...nextBigArticleIndices,
  ]);
}

function getNextBigArticleIndices(lastIndex: number | undefined) {
  const necessaryIndicesCount = BIG_ARTICLE_CARD_INITIAL_INDICES.length;
  const nextIndices = [];
  let last = lastIndex;

  for (let i = 0; i <= necessaryIndicesCount; i += 1) {

    const nextIndex = (last ?? 0) + BIG_ARTICLE_CARD_STEP;

    last = nextIndex;
    nextIndices.push(nextIndex);
  }

  return nextIndices;
}

function getPerPage(path: string) {
  const perPageByPathMap: Record<string, number> = {
    [ROUTES.ACADEMY]: 27,
  };

  const DEFAULT_ARTICLES_PER_PAGE = 22;

  const findPath = Object.keys(perPageByPathMap).find((key) => path.startsWith(key));

  return findPath ? perPageByPathMap[findPath] : DEFAULT_ARTICLES_PER_PAGE;
}

function parseFilter(filter: string | Record<string, string>) {
  if (typeof filter === 'object') return filter;

  try {
    return JSON.parse(filter);
  } catch {
    console.warn('Failed parse filter');
    return {};
  }
}

function getPaginationNumber(pathQuery: LocationQuery, paginationParam: string) {
  const DEFAULT_PAGE = 1;
  const pageNumber = pathQuery[paginationParam] as LocationQueryValue;

  return Number(pageNumber ?? DEFAULT_PAGE);
}
</script>

<template>
  <div id="pdopage">
    <slot
      name="top"
      :articles
    />
    <div
      class="rows s-articles"
      :class="{ '--pending': status === 'pending' }"
    >
      <template
        v-for="item, index in sliceBegin ? articles.slice(sliceBegin) : articles"
        :key="`${item.to}${index}`"
      >
        <MArticleBannerCard
          v-if="index === 0 && showBannerCard"
          :title="item.title"
          :image="item.image"
          :tags="item.tags"
          :to="item.to"
          :share-link="item.shareLink"
          :data-label="index"
          share
        />
        <MArticleCardSecond
          v-if="(showBannerCard && index !== 0) || (!showBannerCard)"
          :title="item.title"
          :image="item.image"
          :to="item.to"
          :date="item.date"
          :text="BIG_ARTICLE_CARD_INDICES.has(index) ? item.text : undefined"
          :class="{ '--big': BIG_ARTICLE_CARD_INDICES.has(index) }"
          :share-link="item.shareLink"
          :data-label="index"
          share
        />
        <SBanner
          v-if="showMiddleBanner && index === 6"
          image-lg=synergyRu('content/education_articles/credit_banner_lg.webp')
          image-md=synergyRu('content/education_articles/credit_banner_md.webp')
          image-sm=synergyRu('content/education_articles/credit_banner_sm.webp')
          title="Кредит на образование"
          title-class="a-font_h4"
          description="Если хотите учиться у нас, но боитесь не пройти на бюджет, поможем получить выгодный кредит с господдержкой всего под 3%"
          description-class="a-font_m"
          btn-text="Рассчитать кредит"
          :btn-click="() => openModal('MModalForm', modalProps)"
        />
      </template>
      <template v-if="articles?.length === 0">
        Нет подходящих статей
      </template>
    </div>
    <slot name="button">
      <SPagination
        v-if="showPagination"
        :param="paginationParam"
        :active-page="currentPage"
        :last-page="articlesData?.meta?.last_page"
        :disabled="status === 'pending'"
      />
      <AButtonThird
        v-if="!showPagination && showFetchMoreButton"
        class="a-btn--more"
        bg-color="light-white"
        :disabled="status === 'pending'"
        @click="onFetchMoreButtonClick"
      >
        Показать ещё
      </AButtonThird>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
@import './SArticlesList.scss';
</style>
