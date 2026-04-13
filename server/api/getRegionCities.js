import { KEYS } from '~/constants';
import { ONE_HOUR } from '~/constants/timeToCache';

export default defineCachedEventHandler(async (event) => {
  const base = useRuntimeConfig(event).public?.regionsLegacyApiBase || '';
  if (!base) {
    return [];
  }
  const url = `${String(base).replace(/\/$/, '')}?action=getRegions`;
  try {
    return await $fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });
  } catch (e) {
    console.error(e);
    return [];
  }
}, {
  maxAge: ONE_HOUR,
  name: KEYS.REGION_CITIES,
  getKey: () => 'default',
});
