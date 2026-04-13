<script setup lang="ts">
import type { AdmissionAttributesWithId } from '~/types';

interface RegionCityWithPlaceData extends AdmissionAttributesWithId {
  place_title: string;
  place_order: number;
}

const { entity } = defineProps<{
  entity: {
    id: number;
  };
}>();

const route = useRoute();

const { data: regionCities } = await useFetch(`/api/cities/${entity.id}/admissions`, {
  query: {
    'filter[published]': true,
    'page[size]': 0,
  },
  deep: false,
  watch: false,
  transform(res) {
    if (!res) return [];

    return res.data.map((admission) => {
      return { ...admission.attributes, id: admission.id };
    });
  },
  key: `city_${entity.id}`,
  getCachedData(key, nuxtApp) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    return data ? data : undefined;
  },
});

const PLACE_TYPE_DATA = {
  branch: {
    translate: 'Филиал',
    order: 0,
  },
  representation: {
    translate: 'Представительство',
    order: 1,
  },
  partner: {
    translate: 'Партнёр',
    order: 2,
  },
};

const places = getCityPlaces(regionCities.value);

if (!places.length) {
  console.error(JSON.stringify({
    statusCode: 404,
    message: `Invalid CityPlaceName, places:${places}`,
    path: route.path,
  }));

  await redirectToHomepage();
}

function getCityPlaces(regionCities: AdmissionAttributesWithId[] | null) {
  if (!regionCities?.length) return [];

  const places = regionCities
    .reduce((acc, admission) => {

      const placeType = PLACE_TYPE_DATA[admission.type];
      const place_title = placeType.translate;
      const place_order = placeType.order;

      acc[place_order].push({ ...admission, place_title, place_order });

      return acc;
    }, [[], [], []] as RegionCityWithPlaceData[][]);

  places[1].sort((a, b) => Number(a.rank) - Number(b.rank));
  places[2].sort((a, b) => Number(a.rank) - Number(b.rank));

  return places.flat();
}
</script>

<template>
  <component
    :is="route.path.includes('moskva') ? 'SBranchContactsEntityFirst' : 'SBranchContactsEntitySecond'"
    :places
  />
</template>
