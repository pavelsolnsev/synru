export default defineEventHandler(async (event) => {
  const url = useRuntimeConfig(event).public?.regionsJsonUrl || '';
  if (!url) {
    return {};
  }
  try {
    return await $fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });
  } catch (e) {
    console.error(e);
    return {};
  }
});
