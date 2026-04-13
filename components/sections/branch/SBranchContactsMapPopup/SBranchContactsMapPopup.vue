<script setup lang="ts">
import { synergyApi, synergyRu } from '~/utils/mediaCdn';
import Logo from '~/assets/images/logo/logo.png';
import MarkerIcon from '~/assets/images/global/marker.svg?url';
import type { AdmissionAttributesWithId, DoubleGis, Map, Marker } from '~/types';

interface Props {
  place: string | null;
  regionCities: AdmissionAttributesWithId[] | null;
}

const {
  place = '',
  regionCities = [],
} = defineProps<Props>();

const activeMapPlaceKey = shallowRef(place);
const keyMarkers: Record<string, Marker> = {};
let map: Map | null = null;
let isInitMap = false;

const ADGMapRef = ref();
let DG: DoubleGis | null = null;

const mapBlock = templateRef('mapBlock');

onMounted(() => {
  DG = ADGMapRef.value?.DG;
  if (!DG) return;
  if (activeMapPlaceKey.value) openBoxMap();
});

function initMap() {
  map = DG ? DG?.map(mapBlock.value, {
    center: [55.45, 37.36],
    zoom: 8,
  }) : null;

  regionCities?.forEach((admission) => {
    const { latitude = null, longitude = null } = admission?.properties?.coordinates || {};

    if (!latitude || !longitude) return;

    const marker = DG?.marker([latitude, longitude], {
      icon: DG?.icon({
        iconUrl: MarkerIcon,
        iconSize: [38, 44],
      }),
    });

    if (typeof marker === 'object' && marker && 'addTo' in marker) {
      keyMarkers[admission.id] = marker;
      marker.addTo(map).bindPopup(init2GisPopup(admission));
    }
  });
}

function openBoxMap() {
  if (!isInitMap) {
    isInitMap = true;
    initMap();
    open2GisPopup(activeMapPlaceKey.value);
    return;
  }
  open2GisPopup(activeMapPlaceKey.value);
}

function open2GisPopup(admissionId: string | null | undefined) {
  if (!admissionId || !map) return;

  const marker = keyMarkers[admissionId];

  if (!marker) return;

  map.setView([marker._latlng.lat + 0.018, marker._latlng.lng], 12);

  setTimeout(() => {
    marker.openPopup();
  }, 100);
}

function init2GisPopup(admission: AdmissionAttributesWithId) {
  const cityImgUrl = synergyRu('content/regions/msk1.webp');

  const popup = [
    `<div class="m-map-popup">`,
    `<div class="m-map-popup__images"><img src="${cityImgUrl}" alt="${admission.name}" itemprop="image" />`,
    `<img src="${Logo}" alt="synergy" itemprop="image" /></div>`,
    `</div>`,
  ].join('');

  return popup;
};
</script>

<template>
  <div
    class="s-contacts__map"
  >
    <div
      id="mainmap"
      ref="mapBlock"
    />
    <ADGMap ref="ADGMapRef" />
  </div>
</template>

<style lang="scss" scoped>
.s-contacts__map {
  width: 100vw;
  max-width: 100%;
  height: 60vh;
  padding: var(--padding_def);
  border-radius: var(--border-radius_def);
  background-color: var(--a-color_grey_10);
  @include tablet(min) {
    height: 80vh;
  }
}

#mainmap {
  width: 100%;
  height: 100%;
}
</style>
