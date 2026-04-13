import type { CategoryResponse } from '~/types/entities';

export default defineEventHandler(async (event): Promise<CategoryResponse | undefined> => {
  const config = useRuntimeConfig(event);
  const id = event.context.params?.id;

  try {
    const query = getQuery(event);
    return await $fetch<CategoryResponse>(`${config.public.apiBase}/api/categories/${id}`, {
      method: 'GET',
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
