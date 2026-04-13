// локальный роутинг для ссылок, рендерящихся через v-html
export function useAToNuxtLink() {
  const router = useRouter();
  let links = [];

  const navigate = (event) => {
    const href = event.target.getAttribute('href');
    if (href && href[0] === '/') {
      event.preventDefault();
      router.push(href);
    }
  };

  onMounted(() => {
    const instance = getCurrentInstance().vnode.el;

    links = instance.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', navigate, false);
    }
  });

  onBeforeUnmount(() => {
    for (let i = 0; i < links.length; i++) {
      links[i].removeEventListener('click', navigate, false);
    }
    links = [];
  });
}
