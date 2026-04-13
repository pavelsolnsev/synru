import { ROUTES } from '~/constants';

export default function getNavigationPath(data: { routeName: string }) {
  const {
    routeName,
  } = data;

  const navigationByRouteNameMap: Record<string, string> = {
    'default': `${ROUTES.THANKS}?utm_source=thanks`,
    'college_lp': `https://example.com/lp/thanks-short/`,
    'land-college': 'https://example.com/lp/thanks-short/',
  };

  if (!routeName.trim() || typeof routeName !== 'string') return navigationByRouteNameMap['default'];

  const path = navigationByRouteNameMap[routeName] ?? navigationByRouteNameMap['default'];

  return path;
}
