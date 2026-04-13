<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import { Pagination } from 'swiper/modules';
import type { NewsResponse } from '~/server/api/news/index.get';
import getArticleDate from '~/utils/article/getArticleDate';
import generateShareLink from '~/utils/article/generateShareLink';

interface Props {
  routeName?: string;
}

const {
  routeName = '',
} = defineProps<Props>();

const NEWS_PER_PAGE = 21;

const INITIAL_PAGE = 1;

const currentPage = shallowRef(INITIAL_PAGE);

const categoriesByRouteNameMap: Record<string, string> = {
  'research': 'news_polls',
};

const category = categoriesByRouteNameMap[routeName];

const { data, status } = await useFetch<NewsResponse>('/api/news', {
  watch: [currentPage],
  query: {
    'page[size]': NEWS_PER_PAGE,
    'page[number]': currentPage,
    'filter[categories.slug]': category,
    'sort': '-published_at',
    'filter[published]': true,
  },
});

const news = shallowRef(formatNews(data.value));

const showFetchMoreButton = computed(() => {
  if (!data.value?.meta) return false;

  return data.value.meta.current_page < data.value.meta.last_page;
});

const {
  swiperConfig,
  swiperRef,
  paginationRef,
} = useSwiperWrapper({
  showSwiperPagination: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  modules: [Pagination],
  pagination: {
    clickable: true,
    el: '.swiper-pagination',
  },
});

function formatNews(response: NewsResponse | null) {
  if (!response) return [];

  return response.data.map(({ attributes }) => {
    const date = getArticleDate(attributes.published_at);

    return {
      to: attributes.url,
      image: attributes.image ?? '',
      title: attributes.title,
      text: attributes.annotation,
      tags: [{ text: date }],
      shareLink: generateShareLink(attributes.url),
    };
  });
}

watch(data, () => {
  news.value = [
    ...news.value,
    ...formatNews(data.value),
  ];
});
</script>

<template>
  <div
    class="mediacenter-blog__wrap"
    :class="{'--disabled': status === 'pending'}"
  >
    <swiper
      ref="swiperRef"
      class="mediacenter-blog__slider"
      v-bind="swiperConfig"
    >
      <template #wrapper-start>
        <MArticleBannerCard
          v-for="item in news.slice(0, 6)"
          :key="item.to"
          :to="item.to"
          :title="item.title"
          :tags="item.tags"
          :image="item.image"
          :share-link="item.shareLink"
          share
          class="swiper-slide"
        />
      </template>
      <div
        ref="paginationRef"
        class="swiper-pagination mediacenter-blog__slider-pagination"
      />
    </swiper>

    <div class="mediacenter-blog__content">
      <MArticleCardSecond
        v-for="item, index in news.slice(6)"
        :key="item.to"
        :class="{ '--big': (index + 1) % 4 === 0 }"
        :title="item.title"
        :to="item.to"
        :image="item.image"
        :share-link="item.shareLink"
        :date="item.tags[0]?.text"
        share
      />
    </div>

    <AButtonThird
      v-if="showFetchMoreButton"
      class="--more-btn"
      @click="currentPage += 1"
    >
      Показать ещё
    </AButtonThird>
  </div>
</template>

<style lang="scss" scoped>
@import './SNewsList.scss';
</style>
