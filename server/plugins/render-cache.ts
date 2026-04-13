import { ONE_HOUR } from '~/constants/timeToCache';
import { STALE_TTL } from '~/constants/cache';
import { getRouteConfig, getCacheKey, filterHeaders, gzipAsync } from '~/server/utils/cacheHelpers';

/**
 * Nitro plugin for saving HTML pages to cache AFTER rendering.
 *
 * Cache check happens BEFORE render in middleware (00-cache.global.ts).
 * This plugin ONLY saves rendered HTML to cache.
 *
 * Flow:
 * 1. Middleware checks cache → HIT: return cached, skip render
 * 2. Middleware MISS → render happens → this plugin saves result
 *
 * Configure routes in CACHE_ROUTES array above.
 */
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:response', async (response, { event }) => {
    if (import.meta.dev) return;

    const routeConfig = getRouteConfig(event.path);
    if (!routeConfig) return;

    const contentType = response.headers?.['content-type'];
    if (response.statusCode !== 200 || !contentType?.includes('text/html')) return;

    const cacheKey = getCacheKey(routeConfig.path);
    const freshTtl = routeConfig.ttl ?? ONE_HOUR;

    console.log('[RenderCachePlugin] Render happened for:', event.path, '← If X-Cache:HIT, middleware FAILED');

    if (typeof response.body !== 'string') return;

    // Run asynchronously without blocking response
    setImmediate(async () => {
      await saveToCache(cacheKey, response.body as string, { headers: response.headers, ttl: freshTtl });
    });
  });
});

/**
 * Compress body using gzip and return base64 encoded string.
 */
async function compressBody(body: string): Promise<string | undefined> {
  try {
    const compressed = await gzipAsync(Buffer.from(body, 'utf-8'));

    console.log('[RenderCachePlugin] Compressed:', body.length, '→', compressed.length, 'bytes');
    return compressed.toString('base64');
  } catch (error) {
    console.error('[RenderCachePlugin] Compression error:', error);
    return undefined;
  }
}

interface SaveToCacheOptions {
  headers?: Record<string, string | string[] | undefined>;
  ttl: number;
}

/**
 * Save rendered response to cache with compression.
 */
async function saveToCache(
  cacheKey: string,
  body: string,
  options: SaveToCacheOptions,
): Promise<void> {
  const storage = useStorage('cache');
  const cleanHeaders = filterHeaders(options.headers);

  try {
    const bodyGzip = await compressBody(body);

    await storage.setItem(cacheKey, {
      body,
      bodyGzip,
      headers: cleanHeaders,
      timestamp: Date.now(),
    }, {
      ttl: options.ttl + STALE_TTL,
    });
    console.log('[RenderCachePlugin] Saved to cache:', cacheKey);
  } catch (error) {
    console.error('[RenderCachePlugin] Error saving to cache:', error);
  }
}
