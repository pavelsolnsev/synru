// генерирует путь относительно текущего
export function useRelativePath() {
  const route = useRoute();
  return (path) => {
    if (!path || path.startsWith('/')) {
      return path;
    }
    const curPath = route.path.endsWith('/') ? route.path.slice(0, route.path.length - 1) : route.path;
    return `${curPath}/${path}`;
  };
}
