import type { ArticlesResponse } from '~/server/api/articles/index.get';
import getArticleDate from './getArticleDate';
import generateShareLink from './generateShareLink';

export default function transformArticles(response: ArticlesResponse | null) {
  if (!response) return [];

  const {
    data: rawArticles = [],
  } = response;

  return rawArticles.map(({ attributes }) => {
    const date = getArticleDate(attributes.published_at);
    const shareLink = generateShareLink(attributes.url);

    const MAX_TEXT_LENGTH = 230;
    const rawText = attributes.annotation ? attributes.annotation : '';

    const text = rawText?.length > MAX_TEXT_LENGTH
      ? `${rawText.slice(0, MAX_TEXT_LENGTH)}...`
      : rawText;

    return {
      title: attributes.title,
      text,
      share: true,
      shareLink,
      to: attributes.url,
      image: attributes.image,
      tags: [{ text: date }],
      date,
    } as TransformArticle;
  });
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
