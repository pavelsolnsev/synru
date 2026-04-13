// получение реального пути к изображению по ее пути в assets
export default function useImage() {
  const assets = import.meta.glob('/assets/images/**/*', {
    query: '?url',
    import: 'default',
  });

  return async (path) => {
    if (isRelativePath(path) && assets[path]) {
      return await assets[path]();
    }
    return path;
  };
}

export function isRelativePath(path) {
  return path && typeof path === 'string' && !path.startsWith('https://');
}
