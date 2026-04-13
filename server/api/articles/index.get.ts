import type { DocumentMetaObject } from '~/types';
import type { ArticleResource, Entity } from '~/types/entities';

export default defineEventHandler(async (event): Promise<ArticlesResponse | undefined> => {
  const config = useRuntimeConfig(event);

  try {
    const query = getQuery(event);
    return await $fetch<ArticlesResponse>(`${config.public.apiBase}/api/articles`, {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      query,
    });
  } catch (err) {
    console.error(err);
  }
});

export interface ArticlesResponse {
  data: ArticleResource[];
  included?: Entity[];
  meta: DocumentMetaObject;
}
