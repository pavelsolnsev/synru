export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const customQuery = getQuery(event);
    return await $fetch(`${config.public.apiBase}/api/news`, {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      query: {
        'filter[published]': true,
        'page[size]': 5,
        'page[number]': 1,
        'sort': '-published_at',
        ...customQuery,
      },
    });
  } catch (err) {
    console.error(err);
  }
});
