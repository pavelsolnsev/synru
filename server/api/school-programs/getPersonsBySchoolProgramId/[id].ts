import type { ResponsePersons } from '~/types';

export default defineEventHandler(async (event): Promise<ResponsePersons | undefined> => {
  const config = useRuntimeConfig(event);
  const id = event.context.params!.id;
  const query = getQuery(event);

  try {
    const requestUrl = `${config.public.apiBase}/api/school-programs/${id}/persons`;

    return await $fetch(requestUrl, {
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

