import { ONE_HOUR } from '~/constants/timeToCache';
import { KEYS } from '~/constants';
import type { NewsResponse } from '../index.get';

const headers = {
  Accept: 'application/vnd.api+json',
  'Content-Type': 'application/vnd.api+json',
};

const query = {
  'page[size]': 10,
  'filter[published]': true,
  'include': 'categories',
  sort: '-published_at',
};

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  try {
    const result = await $fetch<NewsResponse>(`${config.public.apiBase}/api/news`, {
      headers,
      query,
    });

    return result;

  } catch (err) {
    console.error(err);
  }
}, {
  maxAge: ONE_HOUR,
  name: KEYS.LAST_NEWS,
  getKey: () => 'default',
});
