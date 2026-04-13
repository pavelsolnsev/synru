import type { GalleriesResponse } from '~/types/entities';

export default defineEventHandler(
  async (event): Promise<GalleriesResponse | undefined> => {
    const config = useRuntimeConfig(event);

    try {
      const query = getQuery(event);
      return await $fetch<GalleriesResponse>(`${config.public.apiBase}/api/galleries`,{
        headers: {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
        query,
      });
    } catch (err) {
      console.error(err);
    }
  },
);
