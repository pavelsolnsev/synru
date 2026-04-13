<script setup>
import init2GisPopup from '~/utils/init2GisPopup';
import BgImage from '~/assets/images/branch/s_intro/thumb.webp';
import MarkerIcon from '~/assets/images/global/marker.svg?url';
import ImageLg from '~/assets/images/branch/s_intro/s-branch-intro-lg.webp';
import ImageMd from '~/assets/images/branch/s_intro/s-branch-intro-md.webp';
import ImageSm from '~/assets/images/branch/s_intro/s-branch-intro-sm.webp';
const {
  cityKey = '',
  cityName = '',
  regionCities = {},
  entity,
} = defineProps({
  cityKey: {
    type: String,
  },
  cityName: {
    type: String,
  },
  regionCities: {
    type: Object,
  },
  entity: {
    type: Object,
    default: null,
  },
});

const finalCityName = entity?.name || cityName;
const finalRegionCities = await getRegionCities();

const ADGMapRef = ref();
let DG = null;

const routeName = 'branch';
const title = `Приёмная комиссия <br> <strong>г.&nbsp;${finalCityName}</strong>`;
const breadcrumbs = generateBreadcrumbs({ routeName, entity: {} });

const mapBlock = templateRef('mapBlock');

if (entity?.name) {
  const title = entity?.properties?.title ? entity.properties.title : `Демо: приёмная комиссия в г. ${entity?.name}`;
  const description = entity?.properties?.description ? entity.properties.description : `Демо-описание для портфолио: информация о поступлении в г. ${entity?.name}.`;

  useSeoMeta({
    title,
    description,
  });
}

onMounted(() => {
  DG = ADGMapRef.value?.DG;
  if (!DG) return;

  entity ? initEntityMap() : initMap();
});

const DEFAULT_ZOOM = 12;

function initMap() {
  if (!finalRegionCities?.length) return;

  const map = DG.map(mapBlock.value, {
    center: [55.45, 37.36],
    zoom: DEFAULT_ZOOM,
    zoomControl: false,
    fullscreenControl: false,
    closePopupOnClick: false,
  });

  let popup = null;

  Object.keys(finalRegionCities).forEach((key) => {
    const city = finalRegionCities[key];

    if (!city.latitude || !city.longitude) return;
    const slug = transliterateWord(city.value).toLowerCase();

    city.slug = slug;

    const marker = DG.marker([city.latitude, city.longitude], {
      icon: DG.icon({
        iconUrl: MarkerIcon,
        iconSize: [38, 44],
      }),
    });

    marker.addTo(map);

    if (city.key !== cityKey) return;

    popup = DG
      .popup({
        closeButton: false,
        autoClose: false,
        keepInView: true,
      })
      .setLatLng([marker._latlng.lat, marker._latlng.lng])
      .setContent(init2GisPopup(city));
  });

  map.setView([popup._latlng.lat + 0.018, popup._latlng.lng], DEFAULT_ZOOM);
}

function initEntityMap() {
  if (!finalRegionCities?.length) return;

  const NO_MAP_CITIES = [
    'Дели',
  ];


  const map = DG.map(mapBlock.value, {
    center: [55.45, 37.36],
    zoom: DEFAULT_ZOOM,
    zoomControl: false,
    fullscreenControl: false,
    closePopupOnClick: false,
  });

  let popup = null;

  finalRegionCities.forEach((admission) => {
    const { latitude = null, longitude = null } = admission?.properties?.coordinates || {};

    if (!latitude || !longitude) return;

    const marker = DG.marker([latitude, longitude], {
      icon: DG.icon({
        iconUrl: MarkerIcon,
        iconSize: [38, 44],
      }),
    });

    marker.addTo(map);

    popup = DG
      .popup({
        closeButton: false,
        autoClose: false,
        keepInView: true,
      })
      .setLatLng([marker._latlng.lat, marker._latlng.lng]);
  });

  const zoom = NO_MAP_CITIES.includes(finalCityName) ? 9 : DEFAULT_ZOOM;

  map.setView([popup._latlng.lat + 0.018, popup._latlng.lng], zoom);
}

async function getRegionCities() {
  if (!entity) return regionCities;

  const response = await useFetch(`/api/cities/${entity.id}/admissions`, {
    query: {
      'filter[published]': true,
      'page[size]': 0,
    },
    deep: false,
    watch: false,
    transform(res) {
      if (!res) return [];

      return res.data.map((admission) => {
        return admission.attributes;
      });
    },
    key: `city_${entity.id}`,
    getCachedData(key, nuxtApp) {
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      return data ? data : undefined;
    },
  });

  return response.data.value;
}
</script>

<template>
  <MSection class="s-intro">
    <div class="s-intro__inner">
      <div class="s-intro__map">
        <div
          id="minimap"
          ref="mapBlock"
        />
        <AImg
          :src="BgImage"
          alt="branch"
        />
        <picture class="s-intro__image">
          <source
            :srcset="ImageLg"
            media="(min-width: 1200px)"
          >
          <source
            :srcset="ImageMd"
            media="(min-width: 768px)"
          >
          <AImg
            :src="ImageSm"
            alt="map"
            decoding="async"
          />
        </picture>
      </div>
      <div class="s-intro__info">
        <MBreadcrumbs :breadcrumbs />
        <h1
          class="s-intro__title a-font_h2"
          v-html="title"
        />
        <div class="s-intro__description a-font_h6">
          Узнайте минимальный проходной балл в&nbsp;2026 году, оставив заявку
        </div>
        <MQuizForm :action-params="[{ param: 'form=pervyy_ekran' }]" />
      </div>
    </div>
    <ADGMap ref="ADGMapRef" />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SBranchIntro.scss';
</style>
