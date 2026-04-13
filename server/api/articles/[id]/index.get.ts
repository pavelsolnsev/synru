import type { ArticleResource, Entity } from '~/types/entities';

export default defineEventHandler(async (event): Promise<ArticleResponse | undefined> => {
  const config = useRuntimeConfig(event);
  const id = event.context.params?.id;

  try {
    const query = getQuery(event);
    return await $fetch<ArticleResponse>(`${config.public.apiBase}/api/articles/${id}`, {
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

export interface ArticleResponse {
  data: ArticleResource;
  included: Entity[];
}
