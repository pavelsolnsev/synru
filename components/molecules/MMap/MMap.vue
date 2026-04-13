<script setup>
import MarkerIcon from '@/assets/images/global/marker.svg?url';
import { KEYS } from '@/constants';

const emits = defineEmits(['changeTab']);

const activeTab = ref(0);
const formValue = ref({});

const tabs = [
  {
    id: 0,
    label: 'В&nbsp;России',
  }, {
    id: 1,
    label: 'За&nbsp;рубежом',
  },
];

const { data: regionCitiesData } = await useFetch('/api/getRegionCities', {
  watch: false,
  deep: false,
  key: KEYS.REGION_CITIES,
});

const regionCities = Object.values(regionCitiesData.value).reduce(
  (acc, el) => Object.assign(acc, { [el.key]: el.value }),
  {},
);

const regions = (await fetchRegions()) || [];

const cities = Object.entries(regionCities).map(([slug, name]) => ({
  name,
  slug,
}));

const filteredCities = computed(() => {
  const searchValue = searchInputValue.value.toLowerCase().trim();

  if (!searchValue) return cities;

  return cities.filter(
    (city) => city.name.toLowerCase().indexOf(searchValue) >= 0,
  );
});

const mapVisible = ref(false);
const searchFocused = ref(false);
const mapBlock = ref(null);
const searchInputValue = ref('');

let map = null;
let markersRus = null;
let markersEn = null;
let isInitMap = false;

//- по клику на табы меняем регионы
watch(activeTab, () => {
  if (isInitMap) {
    if (activeTab.value) {
      markersRus.removeFrom(map);
      markersEn.addTo(map);
      map.fitBounds(markersEn.getBounds());
    } else {
      markersEn.removeFrom(map);
      markersRus.addTo(map);
      map.fitBounds(markersRus.getBounds());
    }
  }
  emits('changeTab', activeTab.value);
});

onMounted(async () => {
  await import('~/node_modules/2gis-maps/dist/js/script.full.js').then((m) => m.default || m);
  await init2GisMap(regions);
});

async function fetchRegions() {
  try {
    const { data: regions } = await useFetch('/api/getRegions', {
      watch: false,
      deep: false,
      key: KEYS.REGIONS,
    });

    return regions.value.sort((a, b) => a.value.localeCompare(b.value));
  } catch (err) {
    console.error(err);
  }
}

async function init2GisMap(regions) {
  if (mapBlock.value && typeof DG != 'undefined') {
    mapVisible.value = true;

    markersRus = DG.featureGroup();
    markersEn = DG.featureGroup();

    const ico = DG.icon({
      iconUrl: MarkerIcon,
      iconSize: [38, 44],
    });

    map = DG.map(mapBlock.value, {
      center: [55.45, 37.36],
      zoom: 8,
      scrollWheelZoom: false,
    });

    // при загрузке карты выводятся российские регионы
    regions.forEach((rgn_obj) => {
      if (rgn_obj.latitude && rgn_obj.longitude) {
        const popup = initPopup(rgn_obj);

        const coordinates = DG.marker([rgn_obj.latitude, rgn_obj.longitude], {
          icon: ico,
        });

        if (rgn_obj.country === 'Россия') {
          coordinates.addTo(markersRus).bindPopup(popup);
        } else {
          coordinates.addTo(markersEn).bindPopup(popup);
        }
      }
    });

    markersRus.addTo(map);

    isInitMap = true;
  }
}

function initPopup(region) {
  return [
    '<address>',
    `<strong>${region.value}</strong>, `,
    region.city ? `<span>${region.city}</span>` : '',
    region.address ? `<br><b>Адрес: </b>${region.address}` : '',
    region.phone ? `<br><b>Телефон: </b>${region.phone};` : '',
    region.email
      ? `<br><b>e-mail: </b><a href="mailto:${region.email}">${region.email}</a>`
      : '',
    region.site_url
      ? `<br><b>Сайт: </b><a href="${region.site_url}" target="_blank">${region.site_url}</a>`
      : '',
    `<br><br><button class="a-btn a-btn--sm a-font_s-m a-btn--white a-btn--map" onclick="Fancybox.show([{src:'#map_form'}], {on: {done: () => map_form.querySelector('[name=comments]').value='${region.value}' }})">Оставить заявку</button>`,
    '</address>',
  ].join('');
}

function onClickOutsideInput() {
  searchFocused.value = false;
  searchInputValue.value = '';
}

function onInputFocus() {
  searchFocused.value = true;
}
</script>

<template>
  <div
    class="m-map"
    :class="{ '--visible': mapVisible }"
  >
    <div
      class="m-map__tabs"
      :class="{ 'is-active': activeTab === 1}"
    >
      <span
        v-for="tab in tabs"
        :key="tab.id"
        class="m-map__tab-btn a-font_xs-m"
        :class="{ 'is-active': activeTab === tab.id}"
        @click="activeTab = tab.id"
        v-html="tab.label"
      />
    </div>
    <div class="m-map__search">
      <MSearch
        id="m-map__serach"
        v-model="searchInputValue"
        v-click-outside="onClickOutsideInput"
        :class="{ '--focused': searchFocused }"
        placeholder="Введите название города или области"
        @focus="onInputFocus"
      />
      <div class="m-map__search-list">
        <div
          id="m-map__list"
          class="m-map__search-list-inner a-font_s"
        >
          <NuxtLink
            v-for="city in filteredCities"
            :key="city.slug"
            :to="`/about/branches/${city.slug}`"
          >
            {{ city.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <div
      ref="mapBlock"
      class="m-map__map"
    />
    <SForm
      id="map_form"
      v-model="formValue"
      class="s-form__popup"
      title="Отправить заявку"
    >
      <input
        type="hidden"
        name="comments"
      >
    </SForm>
  </div>
</template>

<style lang="scss" scoped>
@import './MMap.scss';
</style>

<style lang="scss">
.a-btn--map {
  height: calc(var(--scale) * 32);
  border-radius: calc(var(--scale) * 8);
  padding: 0 calc(var(--scale) * 16);
  border-width: 0;

  @include desktop(min) {
    height: calc(var(--scale) * 40);
    padding: 0 calc(var(--scale)* 24);
  }
}


.leaflet-pane .leaflet-tile-pane {
  filter: grayscale(1);
}
.leaflet-container a {
  color: var(--a-color_white) !important;
  text-decoration: underline;
  transition: var(--transition);
  &:hover {
    text-decoration: none;
  }
}

.leaflet-bottom.leaflet-right {
  display: none;
}

.leaflet-top.leaflet-right {
  top: auto;
  right: scale(8);
  bottom: scale(8);
  width: scale(48);
  height: scale(48);

  .dg-control-round {
    margin: 0;
    padding: 0;
    width: scale(48);
    height: scale(48);
    box-shadow: none;
    background: transparent;
  }

  .dg-control-round__icon {
    width: scale(48);
    height: scale(48);
    background-color: var(--a-color_white);
    border-radius: scale(8);
    border: 1px solid var(--a-color_grey_60);
    box-shadow: none;
    background-image: none;
  }

  .dg-control-round__icon_name_fullscreen::after {
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25"><mask id="a" width="24" height="25" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="%23D9D9D9" d="M0 .7h24v24H0z"/></mask><g mask="url(%23a)"><path fill="%231C1C1C" d="M4.7 20v-6.6h2.6v4h4V20H4.7Zm12-8V8h-4V5.4h6.6V12h-2.6Z"/></g></svg>');
    width: scale(24);
    height: scale(24);
    background-size: 100%;
    background-position: center;
  }
}

.leaflet-top.leaflet-left {
  top: auto;
  left: auto;
  right: scale(8);
  bottom: scale(64);
  width: scale(48);
  height: scale(96);
  background-color: var(--a-color_white);
  border-radius: scale(8);
  border: 1px solid var(--a-color_grey_60);

  .dg-zoom.leaflet-control {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .dg-control-round {
    position: static;
    margin: 0;
    padding: 0;
    width: scale(48);
    height: scale(48);
    box-shadow: none;
    background: transparent;
  }

  .dg-control-round__icon {
    width: scale(48);
    height: scale(48);
    background-color: transparent;
    border-radius: 0;
    box-shadow: none;
    background-image: none;
  }

  .dg-zoom__in:after,
  .dg-zoom__out:after {
    content: none;
  }

  .dg-zoom__button_type_out:after,
  .dg-zoom__button_type_in:after,
  .dg-zoom__button_type_in:before {
    background-color: var(--a-color_dark);
  }
}
</style>
