const HEADERS = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
};

const QUERY = {
  include: 'customFieldValues',
  'filter[published]': true,
  'page[size]': 0,
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    return await $fetch(`${config.public.apiBase}/api/bs-entities`, {
      headers: HEADERS,
      query: QUERY,
    });
  } catch (err) {
    console.error(err);
  }
});
