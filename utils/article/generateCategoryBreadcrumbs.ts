import { ROUTES } from '~/constants';
import type { BreadcrumbItem } from '~/types';
import type { CategoryResponse, Entity } from '~/types/entities';

export default function generateCategoryBreadcrumbs(payload: {
  routeName: string;
  entityId: string | number;
  categories: CategoryResponse | null;
}) {

  const { routeName, entityId, categories } = payload;

  const availableRouteName = new Set([
    'edu_egeoge_year',
    'edu_egeoge_category_subject',
    'edu_egeoge_demo',
    'edu_document',
  ]);

  if (
    !entityId ||
    !categories ||
    !availableRouteName.has(routeName) ||
    !categories.included
  ) return [];

  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { title: 'Главная', link: ROUTES.HOMEPAGE },
    { title: 'ЕГЭ и ОГЭ', link: ROUTES.EGE_OGE },
  ];

  const entityCategory = Array.isArray(categories.data)
    ? categories.data.find((category) => String(category.id) === String(entityId))
    : categories.data;

  const entityBreadcrumbs = {
    title: entityCategory?.attributes.name,
    link: entityCategory?.attributes.url,
  } as BreadcrumbItem;

  const ancestorsCategories =
    entityCategory?.relationships?.ancestors?.data?.sort((a, b) => Number(a.id) - Number(b.id))
      ?? [];

  if (!ancestorsCategories?.length) return [];

  const categoriesMap = categories.included.reduce((acc, item) => {
    acc[item.id] = item;

    return acc;
  },{} as Record<string, Entity>);

  const additionalBreadcrumbs = ancestorsCategories.reduce((acc, ancestorCategory) => {
    const categoryData = categoriesMap[ancestorCategory.id];

    if (`/${categoryData.attributes.slug}` === ROUTES.EGE_OGE) return acc;

    const breadcrumbItem = {
      title: categoryData.attributes.name,
      link: categoryData.attributes.url as string,
    } as BreadcrumbItem;

    acc.push(breadcrumbItem);

    return acc;
  }, [] as BreadcrumbItem[]);

  return [
    ...defaultBreadcrumbs,
    ...additionalBreadcrumbs,
    entityBreadcrumbs,
  ];
}
