export default async function useApiRequest(url, method, requestOptions) {

  const config = useRuntimeConfig();

  const BASE_HEADERS = {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  };

  const headers = Object.assign({}, BASE_HEADERS, requestOptions?.headers);

  const { data, error } = await useFetch(url, {
    baseURL: config.public.apiBase,
    headers,
    method: method,
    ...requestOptions.opts,
    body: requestOptions.body,
    query: requestOptions.query,
  });

  if (error.value) {
    console.log(error);

    throw createError({
      statusMessage: `Fetch error API ${method} ${config.public.apiBase + url}`,
      statusCode: error.value.data?.errors?.status,
      data: error.value.data?.errors,
    });
  }

  if (data.value) {
    return data.value;
  }
}
