import { KEYS } from '~/constants';
import { ONE_HOUR } from '~/constants/timeToCache';
import type { CategoryDescendantsAttributesObject, CategoryResource } from '~/types/entities';
import getDescendantsCategories from '~/utils/article/getDescendantsCategories';

const headers = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
};

const parentCategoriesSlug = [
  'education_articles',
  'akademiya',
  'pomoshh',
  'guides',
  'career_guidance',
  'entrance_guide',
  'raznoe',
];

const query = {
  include: 'descendants',
  'filter[slug]': parentCategoriesSlug.join(','),
};

export default defineCachedEventHandler(
  async (event) => {
    const config = useRuntimeConfig(event);

    try {
      const res = await $fetch<ArticleCategoriesDescendantsResponse>(`${config.public.apiBase}/api/categories`, {
        headers,
        query,
      });

      return getDescendantsCategories(res);
    } catch (err) {
      console.error(err);
    }
  },
  {
    maxAge: ONE_HOUR,
    name: KEYS.ARTICLES_DESCENDANTS_CATEGORIES_IDS,
    getKey: () => 'default',
  },
);

export interface ArticleCategoriesDescendantsResponse {
  data: CategoryResource[];
  included: CategoryDescendantsAttributesObject[];
}
