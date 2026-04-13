// поиск
export function useSearch() {
  const searchText = ref('');
  const router = useRouter();

  const search = () => {
    router.push({ path: '/search', query: { query: searchText.value } });
  };

  return {
    searchText,
    search,
  };
}
