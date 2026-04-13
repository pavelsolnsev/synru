import type { DocumentsResponse } from '~/types/entities';

export default defineEventHandler(async (event): Promise<DocumentsResponse | undefined> => {
  const config = useRuntimeConfig(event);

  try {
    const query = getQuery(event);
    return await $fetch<DocumentsResponse>(`${config.public.apiBase}/api/documents`, {
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
