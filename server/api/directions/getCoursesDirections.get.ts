interface DirectionResponseData {
  data: Array<{
    id: string;
    type: string;
    attributes: {
      name: string;
      slug: string;
      rank: number;
    };
  }>
}

export default defineEventHandler(async (event): Promise<DirectionResponseData | undefined> => {
  const config = useRuntimeConfig(event);

  try {
    const query = getQuery(event);
    return await $fetch<DirectionResponseData>(`${config.public.apiBase}/api/directions/?filter[categories.id]=2&filter[published]=1&page[size]=0`, {
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
