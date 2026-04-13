<script setup lang="ts">
import MFiltersTabsLinksSlider from '~/components/molecules/MFiltersTabsLinksSlider/MFiltersTabsLinksSlider.vue';
import { ROUTES } from '~/constants';

interface Props {
  routeName?: string;
}

const {
  routeName = '',
} = defineProps<Props>();

const route = useRoute();

const categories: Record<string, { title: string; ico: string; to: string }> = {
  'gejmdev': {
    title: 'Геймдев',
    ico: 'tab-games',
    to: ROUTES.ACADEMY_GAME,
  },
  'karera': {
    title: 'Карьера',
    ico: 'tab-work',
    to: ROUTES.ACADEMY_CAREER,
  },
  'upravlenie': {
    title: 'Управление',
    ico: 'tab-managment',
    to: ROUTES.ACADEMY_UPRAVLENIE,
  },
  'management': {
    title: 'Маркетинг',
    ico: 'tab-economy',
    to: ROUTES.ACADEMY_MANAGEMENT,
  },
  'design': {
    title: 'Дизайн',
    ico: 'tab-design',
    to: ROUTES.ACADEMY_DESIGN,
  },
  'programming': {
    title: 'Программирование',
    ico: 'tab-programming',
    to: ROUTES.ACADEMY_PROGRAMMING,
  },
};

const tabs = Object.keys(categories).reduce((acc, key, index) => {
  if (index === 0) {
    const allTab = {
      title: 'Все',
      to: ROUTES.ACADEMY,
      icon: 'faculty_all',
    };

    acc.push(allTab);
  }
  const category = categories[key];

  const tab = {
    title: category.title,
    to: category.to,
    icon: category.ico,
  };

  acc.push(tab);
  return acc;
}, [] as { title: string; to: string; icon: string }[]);

const activeIndex = getActiveTabIndex(route.path);

function getActiveTabIndex(path: string) {
  const DEFAULT_INDEX = 0;
  if (!path) return DEFAULT_INDEX;

  const findIndex = tabs.findIndex((tab) => tab.to === path);

  return findIndex;
}

const SLIDER_ARTICLES_COUNT = 6;
</script>

<template>
  <SArticlesList
    :route-name
    :show-banner-card="false"
    :slice-begin="SLIDER_ARTICLES_COUNT"
  >
    <template #top="{ articles }">
      <SArticlesSlider :items="articles.slice(0, SLIDER_ARTICLES_COUNT)" />
      <MFiltersTabsLinksSlider
        :tabs
        :active-index
      />
    </template>
  </SArticlesList>
</template>

<style lang="scss" scoped>
@import './SAkademiya.scss';
</style>
