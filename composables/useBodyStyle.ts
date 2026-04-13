import type { LayoutKey } from '#build/types/layouts';

type BodyBgColor = 'var(--a-color_grey_10)' | 'var(--a-color_grey_20)';

export const useBodyStyle = (layout: Ref<LayoutKey>) => {
  const style = computed(() => {
    const currentLayout = layout.value;

    const bgColorByLayoutMap: Record<LayoutKey, BodyBgColor> = {
      default: 'var(--a-color_grey_10)',
      'college-lp': 'var(--a-color_grey_10)',
      thanks: 'var(--a-color_grey_10)',
      'education-articles': 'var(--a-color_grey_20)',
      'kruchu-verchu': 'var(--a-color_grey_10)',
      article: 'var(--a-color_grey_20)',
      articles: 'var(--a-color_grey_20)',
      edu: 'var(--a-color_grey_20)',
      mediacenter: 'var(--a-color_grey_20)',
    };

    return {
      background: bgColorByLayoutMap[currentLayout],
    };
  });

  useHead({
    bodyAttrs: {
      style,
    },
  });
};
