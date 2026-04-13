import { ARTICLES_MENU } from '~/constants';
import type { MArticlesMenu } from '~/types';

export default function useActiveMenu() {
  const route = useRoute();

  const showMenu = shallowRef(false);

  const menu = computed(() => {
    const menuByRouteMap: Record<string, MArticlesMenu[]> = {
      '/media': ARTICLES_MENU.guideMenu,
      '/presscenter': ARTICLES_MENU.blogMenu,
      '/about/blog': ARTICLES_MENU.blogMenu,
      '/about/research': ARTICLES_MENU.blogMenu,
      '/about/gallery': ARTICLES_MENU.blogMenu,
      '/about/video': ARTICLES_MENU.blogMenu,
    };

    const path = route.path;

    const defaultMenu = ARTICLES_MENU.articlesMenu;

    const findMenu = Object.keys(menuByRouteMap).find((key) => path.startsWith(key)) ?? '';

    return menuByRouteMap[findMenu] ?? defaultMenu;
  });

  const activeRoutes = computed(() => {
    const routes = [] as string[];
    const path = route.path;

    for (let i = 0; i <= menu.value.length - 1; i++) {
      const currentMenuItem = menu.value[i];

      if (currentMenuItem.to !== path && !currentMenuItem.child) continue;

      if (currentMenuItem.to === path) routes.push(currentMenuItem.to);

      if (!currentMenuItem.child) return routes;

      const child = currentMenuItem.child;

      for (let childIndex = 0; childIndex <= child.length - 1; childIndex++) {

        if (child[childIndex].to !== path) continue;

        routes.push(currentMenuItem.to);
        routes.push(child[childIndex].to);
        return routes;
      }
    }

    return routes;
  });

  const defaultOpenedMenu = [
    menu.value.findIndex((menu) => {
      if (!menu.child) return false;
      const child = menu.child;
      for (let i = 0; i <= child.length - 1; i++) {
        if (child[i]?.to === route.path) return true;
      }
    }),
  ];

  watch(() => route.path, () => {
    showMenu.value = false;
  });

  return {
    activeRoutes,
    menu,
    defaultOpenedMenu,
    showMenu,
  };
}
