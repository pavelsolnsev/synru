import zlib from 'node:zlib';
import { promisify } from 'node:util';

const gzip = promisify(zlib.gzip);

/**
 * Nitro plugin for gzip compression of HTML responses.
 *
 * Skips:
 * - Non-HTML content types
 * - Error pages
 * - Already compressed responses (from cache)
 *
 * On compression error, falls back to uncompressed response.
 */
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:response', async (response, { event }) => {
    const contentType = response.headers?.['content-type'];

    if (!contentType?.startsWith('text/html')) return;

    if (event.path.startsWith('/error')) return;

    if (response.headers?.['content-encoding']) return;

    if (typeof response.body !== 'string') return;

    try {
      const compressedBody = await gzip(Buffer.from(response.body, 'utf-8'));

      setHeader(event, 'Content-Encoding', 'gzip');
      send(event, compressedBody);
    } catch (error) {
      console.error('[Compression] Error:', error);
    }
  });
});
