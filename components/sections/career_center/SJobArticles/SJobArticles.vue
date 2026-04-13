<script setup lang="ts">
import getArticleDate from '~/utils/article/getArticleDate';
import type { ArticlesResponse } from '~/server/api/articles/index.get';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface Props {
  articlesIds?: string;
}

const {
  articlesIds = '',
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  scrollbar: {
    draggable: true,
    hide: false,
  },
});

const { data: articlesData } = await useFetch<ArticlesResponse>(`/api/articles`, {
  deep: false,
  watch: false,
  query: {
    'include': 'categories',
    'filter[id]': articlesIds,
    'page[size]': 0,
  },
  immediate: true,
});

const transformArticles = () => {
  if (!articlesData?.value) return [];

  return articlesData.value?.data?.map(({ id, attributes, relationships }) => {
    const date = getArticleDate(attributes.published_at);
    const categoryId = relationships.categories.data[0].id;
    const category = articlesData.value?.included?.filter((cat) => cat.id === categoryId.toString())[0];

    return {
      id: id,
      to: attributes.slug,
      image: attributes.image,
      date,
      title: attributes.title,
      tag: category?.attributes?.name ?? '',
    };
  });
};

const randomArticles = transformArticles().sort(() => Math.random() - 0.5);
</script>

<template>
  <MSectionNewResponsive
    v-if="articlesIds"
    :with-sides="true"
    class="s-job-articles"
    title="Может быть полезно"
  >
    <div class="s-job-articles__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="item in randomArticles"
          :key="item.id"
        >
          <MArticleCardSecond
            :to="item.to"
            :title="item.title"
            title-class="a-font_h6"
            :image="item.image"
            :date="item.date"
            date-class="a-font_m"
            :tags="[{ text: item.tag }]"
            :share="true"
          />
        </SwiperSlide>
      </Swiper>
      <MSwiperNav ref="navRef" />
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SJobArticles.scss';
</style>
