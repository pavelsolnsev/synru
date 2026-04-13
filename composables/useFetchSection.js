// запрос на получение списка секций на странице по урлу страницы
export async function useFetchSection(path) {
  const runtimeConfig = useRuntimeConfig();

  const clearedPath = path.startsWith('/') ? path : `/${path}`;

  return useFetch(`${runtimeConfig.public.apiBase}${clearedPath}`, {
    headers: { 'Accept': 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' },

    // baseURL: runtimeConfig.public.apiBase
  });
}
