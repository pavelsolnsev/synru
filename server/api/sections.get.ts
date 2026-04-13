import { FetchError } from 'ofetch';
import { ONE_HOUR } from '~/constants/timeToCache';
import type { H3Event, EventHandlerRequest } from 'h3';
import { createConditionalCachedHandler } from '~/utils/createConditionalCache';

const SECTIONS_KEY_NAME = 'sections';

const normalizePath = (path: string) => (path).startsWith('/') ? path : `/${path}`;

const makeKey = (path: string) => path === '/' ? `${SECTIONS_KEY_NAME}_home` : `${SECTIONS_KEY_NAME}_${path.replace(/\//g, '_')}`;

interface ApiError {
  errors: {
    status: number;
    detail: string;
  }
}

export default createConditionalCachedHandler(
  getSections,
  {
    conditionalGetter: () => !import.meta.dev,
    cacheOptions: {
      maxAge: ONE_HOUR,
      swr: true,
      name: `sections`,
      getKey: (event: H3Event<EventHandlerRequest>) => {
        const { path } = getQuery(event);
        const normalizedPath = normalizePath(path as string);
        return makeKey(normalizedPath);
      }
    }
  }
);

async function getSections(event: H3Event<EventHandlerRequest>) {
  const runtimeConfig = useRuntimeConfig();
  const { path } = getQuery(event);
  const normalizedPath = normalizePath(path as string);

  try {
    const response = await $fetch(`${runtimeConfig.public.apiBase}${normalizedPath}`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
    });

    if (!isApiError(response)) {
      return response;
    }

    throw createError({
      statusCode: response.errors.status,
      message: response.errors.detail,
      data: response.errors,
    });

  } catch(error) {
    console.error(error);

    if (!(error instanceof FetchError)) {
      return;
    }

    throw createError({
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      message: error.message,
      data: error.data,
    });
  }
}

function isApiError(response: unknown): response is ApiError {
  return typeof response === 'object'
    && response !== null
    && 'errors' in response;
}
