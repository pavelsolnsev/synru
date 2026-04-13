// замена урлов изображений
export function useResolveArticleImages() {
  const getImage = useImage();
  const root = ref(null);

  onMounted(async () => {
    const instance = root.value ?? getCurrentInstance().vnode.el;
    const imgs = instance.getElementsByTagName('img');
    for (let i = 0; i < imgs.length; i++) {
      const src = imgs[i].getAttribute('src');
      if (src.startsWith('/assets')) {
        const url = await getImage(src);

        imgs[i].src = url;
      }
    }
  });

  return {
    root,
  };
}
