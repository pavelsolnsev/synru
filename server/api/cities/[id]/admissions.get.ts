import type { AdmissionsResponse } from '~/types';

export default defineEventHandler(async (event): Promise<AdmissionsResponse | undefined> => {
  const config = useRuntimeConfig(event);
  const id = event.context.params?.id;

  try {
    const query = getQuery(event);
    return await $fetch<AdmissionsResponse>(`${config.public.apiBase}/api/cities/${id}/admissions`, {
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
