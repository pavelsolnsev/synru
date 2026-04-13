import { ONE_HOUR } from '~/constants/timeToCache';
import { KEYS } from '~/constants';
import type { LevelResource } from '~/types/entities';

export default defineCachedEventHandler(async (event): Promise<{ data: LevelResource[] } | undefined>  => {
  const config = useRuntimeConfig(event);
  try {
    const query = getQuery(event);
    return await $fetch(`${config.public.apiBase}/api/levels`, {
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
  name: KEYS.LEVELS_WITH_COUNT,
  getKey: () => 'default',
});

