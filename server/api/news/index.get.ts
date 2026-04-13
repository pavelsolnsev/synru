import type { DocumentMetaObject } from '~/types';
import type { Entity, NewsResource } from '~/types/entities';

export default defineEventHandler(async (event): Promise<NewsResponse | undefined> => {
  const config = useRuntimeConfig(event);

  try {
    const query = getQuery(event);
    return await $fetch<NewsResponse>(`${config.public.apiBase}/api/news`, {
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

export interface NewsResponse {
  data: NewsResource[];
  included?: Entity[];
  meta: DocumentMetaObject;
}
