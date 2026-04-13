import type { DirectionResponse } from '~/types';

export default defineEventHandler(async (event): Promise<DirectionResponse | undefined>  => {
  const config = useRuntimeConfig(event);
  const id = event.context.params?.id;
  try {
    const query = getQuery(event);
    return await $fetch(`${config.public.apiBase}/api/courses/${id}/direction`, {
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
