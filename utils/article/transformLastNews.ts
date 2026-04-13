import type { NewsResponse } from '~/server/api/news/index.get';
import getArticleDate from './getArticleDate';

export default function transformLastNews(news: NewsResponse | null, newsCount = 6) {
  if (!news) return [];

  const categoriesMap = getCategoriesMap(news);

  return news.data.slice(0, newsCount).map(({ attributes, relationships }) => {
    const date = getArticleDate(attributes.published_at ?? '');

    const newsCategoriesList = relationships?.categories?.data ?? [];
    const newsFirstCategory = newsCategoriesList?.length ? newsCategoriesList[0] : null;

    const category = newsFirstCategory && categoriesMap ? categoriesMap[newsFirstCategory.id] : '';

    return {
      title: attributes.title,
      to: attributes.url,
      date,
      image: attributes.image ?? '',
      tag: category,
    };
  });
}

function getCategoriesMap(news: NewsResponse) {
  if (!Array.isArray(news.included)) return null;

  const categoriesMap: Record<string, string> = {};

  news.included?.forEach((item) => {
    if (item.type !== 'categories') return;

    categoriesMap[item.id] = item.attributes.name;
  });

  return categoriesMap;
}
