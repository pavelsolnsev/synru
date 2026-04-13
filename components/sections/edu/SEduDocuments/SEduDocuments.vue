<script setup lang="ts">
import { staticTagsByCategorySlugMap, type CategoriesRoute } from './sEduDocumentsData';
import type { CategoryResponse, CategoryEntity, CategoryResource } from '~/types/entities';
import type { Nullable } from '~/types';
import { ROUTES } from '~/constants';
import generateCategoryBreadcrumbs from '~/utils/article/generateCategoryBreadcrumbs';

interface Props {
  entity?: CategoryEntity | null;
  routeName?: string;
}

interface CategoryData {
  id: string;
  title: string;
  to: string;
  entityType: string | null
}

type CategoriesMap = Record<string, CategoryData>;

interface Card {
  title: string;
  description: string;
  links: CategoriesRoute[]
}

const {
  entity = null,
  routeName = '',
} = defineProps<Props>();

const route = useRoute();

const OGE_CATEGORY_SLUG = 'oge';
const EGE_CATEGORY_SLUG = 'ege';
const EGEOGE_PARENT_CATEGORY_SLUG = 'edu';

const EDUCATION_TYPE = route.path.startsWith(ROUTES.EGE)
  ? EGE_CATEGORY_SLUG
  : OGE_CATEGORY_SLUG;

const YEAR_CATEGORY_ROUTE_NAME = 'edu_egeoge_year';

const YEAR_CARDS_TITLE = EDUCATION_TYPE === EGE_CATEGORY_SLUG
  ? 'ЕГЭ — Материалы для подготовки: учебный период'
  : 'ОГЭ — Материалы для подготовки: учебный период';

const EDU_PAGE_FILTER = {
  'filter[parent.slug]': EGEOGE_PARENT_CATEGORY_SLUG,
  'filter[slug]': `${EGE_CATEGORY_SLUG},${OGE_CATEGORY_SLUG}`,
};

const FILTER_BY_CATEGORY_ID = {
  'filter[id]': entity?.id,
};

const { data: categoriesData, execute: fetchCategories } = await useFetch<CategoryResponse>(`/api/categories`, {
  query: {
    'include': 'children,ancestors',
    'sort': '-rank,-id',
    'filter[published]': true,
    ...(entity ? FILTER_BY_CATEGORY_ID : EDU_PAGE_FILTER),
  },
  immediate: false,
});

const { data: ogeEgeByYearData, execute: fetchYearCategories } = await useFetch<CategoryResponse>(`/api/categories`, {
  query: {
    'include': 'children',
    'sort': '-rank,-id',
    'filter[published]': true,
    'filter[parent.slug]': EGEOGE_PARENT_CATEGORY_SLUG,
    'filter[slug]': EDUCATION_TYPE === EGE_CATEGORY_SLUG ? EGE_CATEGORY_SLUG : OGE_CATEGORY_SLUG,
  },
  immediate: false,
});

await Promise.all([
  fetchCategories(),
  routeName === YEAR_CATEGORY_ROUTE_NAME ? fetchYearCategories() : undefined,
]);

const yearCard = getYearCards(ogeEgeByYearData.value);

const breadcrumbs = generateCategoryBreadcrumbs({ routeName, entityId: entity?.id ?? '', categories: categoriesData.value });

const cards = transformCategoriesToCards(categoriesData.value);

function transformCategoriesToCards(res: CategoryResponse | null) {
  if (!res || !res.included) return [];

  const categoriesRelationMap = getCategoriesMap(res.included);

  const categories = Array.isArray(res.data)
    ? res.data
    : [res.data];

  return categories.map((item) => {
    const {
      attributes,
      relationships,
    } = item;

    const staticCardTags = staticTagsByCategorySlugMap[attributes.slug] ?? [];

    const links = [
      ...getCardTags(relationships, categoriesRelationMap),
      ...staticCardTags,
    ];

    const card = {
      title: attributes.name,
      description: attributes.description,
      links,
    };

    return card;
  });
}

function getCategoriesMap(included: CategoryResponse['included']) {
  const categoriesMap: CategoriesMap = {};

  if (!included) return categoriesMap;

  included.forEach((item) => {
    if (item.type !== 'categories') return;

    categoriesMap[item.id] = {
      title: item.attributes.name,
      to: item.attributes.url as string,
      entityType: item.attributes.entity_type as Nullable<string>,
      id: item.id,
    };
  });

  return categoriesMap;
}

function getCardTags(
  relationships: CategoryResource['relationships'],
  relationsMap: CategoriesMap,
) {
  const links: CategoryData[] = [];

  relationships?.children?.data?.forEach((item) => {
    const childrenCategory = relationsMap[item.id];

    if (childrenCategory) links.push(childrenCategory);
  });

  return links;
}

function getYearCards(res: CategoryResponse | null) {
  if (!res || !res.included || !Array.isArray(res.data)) return null;

  const category = res.data[0];

  const links = res.included.map(({ attributes }) => {
    return {
      title: attributes.name,
      to: attributes.url as string,
    } as CategoriesRoute;
  });

  return {
    title: category.attributes.name,
    description: '',
    links,
  } as Card;
}
</script>

<template>
  <SEduWrapper
    :route-name
    :breadcrumbs
    :entity="{ name: entity?.name }"
  >
    <template #top>
      <SCardTags
        v-for="card in cards"
        :key="card.title"
        :title="card.title"
        :tags="card.links"
        :text="card.description"
        title-h1
      />
      <SCardTags
        v-if="yearCard"
        :title="YEAR_CARDS_TITLE"
        :tags="yearCard.links"
      />
    </template>
    <template #bottom>
      <SEduWrapperBottom />
    </template>
  </SEduWrapper>
</template>
