import { TEN_MIN } from '../constants/timeToCache';

import {
  ABITURIENTAM,
  ABOUT_UNIVERSITY,
  COURSES,
  STUDENTS,
  THANKS,
  BUSINESS_EDUCATION,
  SCHOOL,
  COLLEGE,
  ARTICLES,
  MEDIA,
  ACADEMY,
} from '../constants/routes';

type RouteRule = { headers?: Record<string, string> };
type RouteRules = Record<string, RouteRule>;

/**
 * Returns Nuxt route rules for browser-side caching.
 *
 * Note: Main page "/" uses SWR caching via routeRules in nuxt.config.ts.
 *
 * Other pages use Cache-Control headers for browser/proxy caching.
 * These headers work with CDN.
 */
const getCachedRouteRules = (): RouteRules => {
  const CACHE_TTL = TEN_MIN;
  const CACHE_HEADER = `public, max-age=${CACHE_TTL}, stale-while-revalidate=${CACHE_TTL}`;
  const NO_CACHE_HEADER = 'public, max-age=0, must-revalidate';

  const PAGES_WITH_CACHE: string[] = [
    ABITURIENTAM,
    `${ABITURIENTAM}/**`,
    ABOUT_UNIVERSITY,
    `${ABOUT_UNIVERSITY}/**`,
    COURSES,
    `${COURSES}/**`,
    STUDENTS,
    BUSINESS_EDUCATION,
    `${BUSINESS_EDUCATION}/**`,
    SCHOOL,
  ];

  const PAGES_WITHOUT_CACHE: string[] = [
    THANKS,
    COLLEGE,
    `${COLLEGE}/**`,
    ARTICLES,
    `${ARTICLES}/**`,
    MEDIA,
    `${MEDIA}/**`,
    ACADEMY,
    `${ACADEMY}/**`,
  ];

  const withCache = PAGES_WITH_CACHE.reduce<RouteRules>((acc, page) => {
    acc[page] = { headers: { 'Cache-Control': CACHE_HEADER } };
    return acc;
  }, {});

  const withoutCache = PAGES_WITHOUT_CACHE.reduce<RouteRules>((acc, page) => {
    acc[page] = { headers: { 'Cache-Control': NO_CACHE_HEADER } };
    return acc;
  }, {});

  return { ...withCache, ...withoutCache };
};

export default getCachedRouteRules;
