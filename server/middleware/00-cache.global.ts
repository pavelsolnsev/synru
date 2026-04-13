import { ONE_HOUR } from '~/constants/timeToCache';
import { MS_IN_SEC } from '~/constants/cache';
import type { CachedResponse } from '~/types/cache';
import type { H3Event } from 'h3';
import { getRouteConfig, getCacheKey, getCacheControlHeader, gzipAsync } from '~/server/utils/cacheHelpers';

/**
 * Server middleware for checking HTML cache BEFORE rendering.
 *
 * This middleware runs BEFORE Nuxt renders the page.
 * If cache HIT, returns cached HTML immediately — rendering is skipped.
 * If cache MISS/STALE, continues to render plugin for caching.
 *
 * Strategy:
 * - Fresh (≤ ttl): HIT — return cached, skip render
 * - Stale (> ttl): MISS — delete cache, render fresh
 * - No cache: MISS — render and save (in plugin)
 */
export default defineEventHandler(async (event) => {
  if (import.meta.dev) return;

  const routeConfig = getRouteConfig(event.path);
  if (!routeConfig) return;

  if (event.method?.toUpperCase() !== 'GET') return;

  if (event.node.res.headersSent) return;

  const cacheKey = getCacheKey(routeConfig.path);
  const freshTtl = routeConfig.ttl ?? ONE_HOUR;
  const storage = useStorage('cache');
  const now = Date.now();

  try {
    const cached = await storage.getItem<CachedResponse>(cacheKey);

    if (!cached) {
      setHeader(event, 'X-Cache', 'MISS');
      setHeader(event, 'Cache-Control', getCacheControlHeader(freshTtl));
      console.log('[RenderCacheMiddleware] MISS no cache for:', event.path, '→ will render');
      return;
    }

    const age = now - cached.timestamp;
    const cacheIsStale = age > freshTtl * MS_IN_SEC;

    if (cacheIsStale) {
      await handleStaleCache(event, cacheKey, event.path, freshTtl, storage);
      return;
    }

    await handleFreshCache(event, cached, event.path, freshTtl, age);
  } catch (error) {
    console.error('[RenderCacheMiddleware] Error:', error);
  }
});

/**
 * Handle STALE cache: delete, set headers, continue to render.
 */
async function handleStaleCache(
  event: H3Event,
  cacheKey: string,
  path: string,
  freshTtl: number,
  storage: ReturnType<typeof useStorage>,
): Promise<void> {
  console.log('[RenderCacheMiddleware] STALE cache for:', path, '→ deleting, will render');
  await storage.removeItem(cacheKey);
  setHeader(event, 'X-Cache', 'MISS');
  setHeader(event, 'Cache-Control', getCacheControlHeader(freshTtl));
}

/**
 * Handle FRESH cache: apply headers and send cached response.
 */
async function handleFreshCache(
  event: H3Event,
  cached: CachedResponse,
  path: string,
  freshTtl: number,
  age: number,
): Promise<string | undefined> {
  setHeader(event, 'X-Cache', 'HIT');

  const remainingTtl = Math.floor(Math.max(0, freshTtl - age / MS_IN_SEC));

  setHeader(event, 'Cache-Control', getCacheControlHeader(remainingTtl));

  applyCachedHeaders(event, cached);

  const acceptEncoding = getHeader(event, 'accept-encoding') as string || '';

  if (acceptEncoding.includes('gzip')) {
    await sendGzipResponse(event, cached, path);
    return;
  }

  console.log('[RenderCacheMiddleware] HIT cache for:', path, '→ returning cached HTML, RENDER SKIPPED');
  return cached.body;
}

/**
 * Apply cached headers to response (excluding x-cache to avoid duplicates).
 */
function applyCachedHeaders(event: H3Event, cached: CachedResponse): void {
  for (const [key, value] of Object.entries(cached.headers)) {
    if (key !== 'x-cache') {
      setHeader(event, key, value);
    }
  }
}

/**
 * Send gzip-compressed response from cache.
 */
async function sendGzipResponse(event: H3Event, cached: CachedResponse, path: string): Promise<void> {
  if (cached.bodyGzip) {
    setHeader(event, 'Content-Encoding', 'gzip');
    console.log('[RenderCacheMiddleware] HIT cache for:', path, '→ returning cached compressed HTML, RENDER SKIPPED');
    await send(event, Buffer.from(cached.bodyGzip, 'base64'));
    return;
  }

  // Fallback: compress on-the-fly for old cache entries
  try {
    const compressedBody = await gzipAsync(Buffer.from(cached.body, 'utf-8'));

    setHeader(event, 'Content-Encoding', 'gzip');
    console.log('[RenderCacheMiddleware] Fallback compression:', cached.body.length, '→', compressedBody.length, 'bytes');
    await send(event, compressedBody);
  } catch (error) {
    console.error('[RenderCacheMiddleware] Compression error:', error);
  }
}
