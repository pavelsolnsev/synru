/**
 * Временное решение, для получения данных ординатуры
 * Сброс кэша - refresh.get.ts
 */
import { ONE_HOUR } from '~/constants/timeToCache';
import { KEYS } from '~/constants';
import type { LevelResource } from '~/types/entities';

export default defineCachedEventHandler(async (event): Promise<{ data: LevelResource[] } | undefined>  => {
  const config = useRuntimeConfig(event);
  try {
    return await $fetch(`${config.public.apiBase}/api/levels`, {
      headers: {
        Accept: 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
      },
      query: {
        'filter[slug]': 'ordinatura',
        include: 'customFieldValues,programsCount',
      },
    });
  } catch (err) {
    console.error(err);
  }
}, {
  maxAge: ONE_HOUR,
  name: KEYS.ORDINATURA,
  getKey: () => 'default',
});

