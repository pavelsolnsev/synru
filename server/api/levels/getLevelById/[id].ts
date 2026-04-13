import type { LevelResource } from '~/types/entities';
import { ONE_HOUR } from '~/constants/timeToCache';
import { KEYS } from '~/constants';

export default defineCachedEventHandler(async (event): Promise<{ data: LevelResource } | undefined>  => {
  const config = useRuntimeConfig(event);
  const id = event.context.params?.id;
  try {
    const query = getQuery(event);
    return await $fetch(`${config.public.apiBase}/api/levels/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      query,
    });
  } catch (err) {
    console.error(err);
  }
}, {
  maxAge: ONE_HOUR,
  name: KEYS.SINGLE_LEVEL_WITH_COUNT,
  getKey: (event) => {
    return 'level_' + (event.context.params?.id || '');
  },
});

