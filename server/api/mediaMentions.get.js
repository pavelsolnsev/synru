export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  try {
    const query = getQuery(event)
    return await $fetch(`${config.public.apiBase}/api/media-mentions`, {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      query,
    })
  } catch (err) {
    console.error(err)
  }
})

