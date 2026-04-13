export default defineEventHandler(async(event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery(event);

  try {
    return $fetch(`${config.public.apiBase}/api/school-programs`, {
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
