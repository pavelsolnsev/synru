import type { CourseResource } from '~/types/entities';

export default defineEventHandler(async (event): Promise<{ data: CourseResource[] } | undefined> => {
  const config = useRuntimeConfig(event);

  try {
    const query = getQuery(event);

    return await $fetch(`${config.public.apiBase}/api/courses/`, {
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
