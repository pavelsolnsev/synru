import type { ArticleCategoriesDescendantsResponse } from '~/server/api/categories/getArticlesCategoriesIds';

export default function getDescendantsCategories(categories: ArticleCategoriesDescendantsResponse | null) {
  const descendantsMap: Record<string, string[]> = {};

  if (!categories) return descendantsMap;

  const GUIDES_SLUG = 'guides';
  const MEDIA_SLUG = 'media';

  categories.data.forEach(({ attributes, relationships, id }) => {
    const categorySlug = attributes?.slug;
    const categoryDescendants = relationships?.descendants?.data?.map((descendant) => descendant.id) ?? [];

    descendantsMap[categorySlug] = [...categoryDescendants, id];

    if (categorySlug === GUIDES_SLUG) descendantsMap[MEDIA_SLUG] = [...categoryDescendants, id];
  });

  return descendantsMap;
}
