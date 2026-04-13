import type { CachedEventHandlerOptions } from 'nitropack/types';
import type { H3Event, EventHandlerRequest } from 'h3';
import type { DeepRemap } from '@/types/common';
import { ONE_HOUR } from '~/constants/timeToCache';

interface ConditionalCachedHandlerOptions extends CachedEventHandlerOptions{}

export function createConditionalCachedHandler<T>(
  handler: (h3Event: H3Event<EventHandlerRequest>) => Promise<T>,
  options: {
    conditionalGetter?: () => boolean,
    cacheOptions?: DeepRemap<ConditionalCachedHandlerOptions>
  },
) {

  const cacheEnabled = options?.conditionalGetter ? options.conditionalGetter() : !import.meta.dev;

  const {
    maxAge = ONE_HOUR,
    swr = true,
    getKey = () => 'default',
  } = options?.cacheOptions || {};

  if (!cacheEnabled) {
    return defineEventHandler(async (event) => {
      return await handler(event)
    });
  }

  return defineCachedEventHandler(async (event) => {
    return await handler(event);
  }, {
    maxAge,
    swr,
    getKey,
    ...(options?.cacheOptions || {}),
  })
}
