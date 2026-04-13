import { CACHE_PREFIX, STALE_TTL } from '~/constants/cache';
import { CACHE_ROUTES } from '~/constants/cacheRoutes';
import type { CacheConfig } from '~/types/cache';
import zlib from 'node:zlib';
import { promisify } from 'node:util';

/** Promisified gzip compression for async/await usage. */
export const gzipAsync = promisify(zlib.gzip);

/**
 * Build Cache-Control header value for render caching.
 */
export function getCacheControlHeader(ttl: number, staleTtl: number = STALE_TTL): string {
  return `public, max-age=${ttl}, stale-while-revalidate=${staleTtl}`;
}

/**
 * Get cache config for a route path from CACHE_ROUTES.
 */
export function getRouteConfig(path: string): CacheConfig | undefined {
  return CACHE_ROUTES.find((r) => path === r.path);
}

/**
 * Generate cache storage key for a route path.
 */
export function getCacheKey(path: string): string {
  return CACHE_PREFIX + path;
}

/**
 * Filter out dynamic/non-deterministic headers from cached response.
 */
export function filterHeaders(headers: Record<string, string | string[] | undefined> | undefined): Record<string, string> {
  const IGNORED_HEADERS = new Set([
    'date',
    'set-cookie',
    'content-length',
    'content-encoding',
    'transfer-encoding',
  ]);

  return Object.entries(headers ?? {})
    .filter(([key]) => !IGNORED_HEADERS.has(key.toLowerCase()))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
}
