import { KEYS } from '~/constants';
import { ONE_HOUR } from '~/constants/timeToCache';
import type { RelationshipObject } from '~/types';
import type { FacultiesResource } from '~/types/entities';

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  try {
    const query = getQuery(event);
    return await $fetch<FacultiesResource<RelationshipObject>[]>(`${config.public.apiBase}/api/faculties`, {
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
  name: KEYS.FACULTIES_FILTER_DATA,
  getKey: () => 'default',
});
