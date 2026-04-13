import { useMediaQuery } from '@vueuse/core';

// перенесено checkWindowMaxWidth
export default function useWindowLessThan(size) {
  const maxWidths = {
    'sm': '(max-width: 575px)',
    'md': '(max-width: 767px)',
    'lg': '(max-width: 991px)',
    'xl': '(max-width: 1199px)',
    'xxl': '(max-width: 1439px)',
  };

  const maxWidth = maxWidths[size];
  if (maxWidth) {
    return useMediaQuery(maxWidth);
  } else {
    throw Error('useWindowLessThan: Некорректный параметр');
  }
}
