<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar, FreeMode, Mousewheel } from 'swiper/modules';
import { useWindowSize , useFullscreen } from '@vueuse/core';
import { KEYS } from '~/constants';
import MarkerIcon from '~/assets/images/global/marker.svg?url';

defineProps({
  title: {
    type: String,
    default: 'Приёмные комиссии',
  },
});

const { data: regionCitiesData } = await useFetch('/api/cities/filter', {
  deep: false,
  watch: false,
  key: KEYS.REGIONS_FILTER_DATA,
  getCachedData(key, nuxtApp) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    return data ? data : undefined;
  },
});

const cities = regionCitiesData.value ?? {};
const citiesKeys = Object.keys(cities);

const regionCities = citiesKeys.reduce((acc,key) => {
  const city = cities[key];

  const cityName = city.value;
  const cityLatitude = city.latitude;
  const cityLongitude = city.longitude;

  const hasCompleteInfo = city && cityName && cityLatitude && cityLongitude;

  if (!hasCompleteInfo) return acc;

  const slug = transliterateWord(city.value).toLowerCase();

  acc.push({ ...city, slug });
  return acc;
}, []);

const nums = regionCities.length.toString();

const ADGMapRef = ref();

let DG = null;
let DGIcon = null;
let map = null;

const { width: windowWidth } = useWindowSize();

const mapBlock = templateRef('mapBlock');

const { isFullscreen } = useFullscreen(mapBlock);

const isInitMap = ref(false);
const isFocusSearchInput = ref(false);
const activeTab = ref(0);
const activeDistrict = ref(null);
const activeSlide = ref(null);
const searchValue = ref('');

const mapData = {
  msk: [],
  rus_regions: [],
  abroad: [],
  searchValues: {},
  keyMarkers: {},
  districts: {
    rus: {},
    abroad: {},
  },
  letters: {},
  byId: {},
};

const citiesBySearch = shallowRef([]);

const slidesToShow = computed(() => {
  if (!isInitMap.value) return regionCities;

  if (citiesBySearch.value?.length) {
    return citiesBySearch.value;
  }

  const district = activeDistrict.value;

  const abroadDistricts = mapData.districts.abroad;
  const rusRegionsDistricts = mapData.districts.rus;

  const isSelectDistrict = abroadDistricts[district] || rusRegionsDistricts[district];

  if (isSelectDistrict) return abroadDistricts[district] ?? rusRegionsDistricts[district];

  const activeTabMap = {
    0: 'msk',
    1: 'rus_regions',
    2: 'abroad',
  };

  const activeRegion = activeTabMap[activeTab.value];
  return mapData[activeRegion];
});

const {
  swiperConfig,
  swiperRef,
} = useSwiperWrapper({
  modules: [Scrollbar, FreeMode, Mousewheel],
  showSwiperScrollbar: true,
  freeMode: true,
  slidesPerView: 'auto',
  observer: true,
  observeParents: true,
  resistance:true,
  resistanceRatio: 0,
  mousewheel: {
    enabled: true,
  },
});

const { openModal } = useModalStore();

const modalProps = {
  title: "Подберите программу обучения<br>и начните учиться <span class='--free-red'>бесплатно</span>",
  formName: true,
  formPhone: true,
  actionParams: [
    { param: 'form=branches' }
  ],
}

const { reachGoal } = sendYandexMetricaGoal()

generateMapData();

watch(activeDistrict, () => {
  const RUS_REGIONS_TAB_INDEX = 1;
  const ABROAD_TAB_INDEX = 2;

  if (!activeDistrict.value || activeTab.value === ABROAD_TAB_INDEX) return;

  activeTab.value = RUS_REGIONS_TAB_INDEX;
});

watch(slidesToShow, () => {
  deleteAllMarkers();
  if (isInitMap.value) addMarkers(slidesToShow.value);
});

watch(searchValue, () => {
  if (searchValue.value?.trim()) return;

  activeSlide.value = null;
  citiesBySearch.value = [];
});

watch(isFullscreen, () => {
  if (isFullscreen.value) {
    mapBlock.value.classList.add('--fullscreen');
    return;
  }
  mapBlock.value.classList.remove('--fullscreen');
});

onMounted(() => {
  if (!regionCities.length) return;

  DG = ADGMapRef.value?.DG;
  if (!DG) return;

  DGIcon = DG.icon({
    iconUrl: MarkerIcon,
    iconSize: [38, 44],
  });

  addCitiesMarker();
  initMap();

  window.showRegionForm = showRegionForm;
});

onBeforeUnmount(() => {
  delete window.showRegionForm;
});

function sendReachGoal(phone) {
  reachGoal('click_call_button', {
    'button': 'nomera_telefonov_v_stranitse',
    'telephone_number': phone,
  });
}

async function initMap() {
  isInitMap.value = true;
  await nextTick();

  map = DG.map(mapBlock.value, {
    center: [55.45, 37.36],
    zoom: 10,
    scrollWheelZoom: false,
  });

  const initialCities = mapData['msk'];

  addMarkers(initialCities);
}

function generateMapData() {
  if (!regionCitiesData.value) return;

  const sortedCities = regionCities
    .sort((a,b) => a.value.localeCompare(b.value));

  sortedCities.forEach((city) => {
    if (!city.latitude || !city.longitude) return;

    addCityToMapData(city);
  });

  return mapData;

  function addCityToMapData(city) {
    if (city.country !== 'Россия') {
      mapData['abroad'].push(city);
      addCitySearchValue(city, 'abroad', mapData['abroad'].length - 1);
      addAbroadDistrict(city);
      addCityLetter(city);
      addDataById(city);
      return;
    }

    if (city.value === 'Москва') {
      mapData['msk'].push(city);
      addCitySearchValue(city, 'msk', mapData['msk'].length - 1);
      addCityLetter(city);
      addDataById(city);
      return;
    }

    mapData['rus_regions'].push(city);
    addCitySearchValue(city, 'rus_regions', mapData['rus_regions'].length - 1);
    addRusDistrict(city);
    addCityLetter(city);
    addDataById(city);
  };

  function addCitySearchValue(city, region, slideIndex) {
    const cityName = city.value;
    if (mapData.searchValues[cityName]) {
      const cities = mapData.searchValues[cityName]['cities'];

      cities.push(city);
      return;
    }
    mapData.searchValues[cityName] = { region, slideIndex, cities: [city] };
  };

  function addAbroadDistrict(city) {
    const isAbroad = city.district === '0' && city.country !== 'Россия';
    if (!isAbroad) return;

    const abroadDistricts = mapData.districts.abroad;

    abroadDistricts[city.country] = abroadDistricts[city.country] || [];
    abroadDistricts[city.country].push(city);
  }

  function addRusDistrict(city) {
    const rusDistrictMap = {
      'ДФО': 'Дальневосточный',
      'ПФО': 'Приволжский',
      'СЗФО': 'Северо-Западный',
      'СКФО': 'Северо-Кавказский',
      'СФО': 'Сибирский',
      'УФО': 'Уральский',
      'ЦФО': 'Центральный',
      'ЮФО': 'Южный',
    };

    const district = rusDistrictMap[city.district];
    if (!district) return;

    const rusDistricts = mapData.districts.rus;

    rusDistricts[district] = rusDistricts[district] || [];
    rusDistricts[district].push(city);
  }

  function addCityLetter(city) {
    const cityName = city.value;
    if (!cityName) return;

    const cityFirstLetter = cityName[0];
    const letterData = mapData.letters[cityFirstLetter] ||= {};

    if (!letterData[cityName]) {
      letterData[cityName] = city;
    }
  }

  function addDataById(city) {
    if (!city.key) return;

    mapData['byId'][city.key] = city;
  }
}

function addCitiesMarker() {
  regionCities.forEach((city) => {
    const cityMarker = DG.marker([city.latitude, city.longitude], {
      icon: DGIcon,
      title: city.value,
      key: city.key,
      slideIndex: null,
    });

    cityMarker.on('click', () => onMarkerClick(city.key));

    mapData.keyMarkers[city.key] = cityMarker;
  });
}

function addMarkers(cities) {
  if (!cities?.length) return;
  const group = DG.featureGroup();

  cities.forEach((region, index) => {
    if (region.latitude && region.longitude) {
      const marker = mapData.keyMarkers[region.key];

      marker.options.slideIndex = index;

      marker.addTo(group);
    }
  });

  if (!map) return;

  group.addTo(map);
  if (cities.length > 1) {
    map.fitBounds(group.getBounds(), { maxZoom: 12 });
    activeSlide.value = null;
  } else {
    const cityKey = cities[0].key;
    const marker = mapData.keyMarkers[cityKey];

    activeSlide.value = 0;

    scrollToMarker(marker);
  }
}

function deleteAllMarkers() {
  for (const marker of Object.values(mapData.keyMarkers)) {
    marker.removeFrom(map);
  }
}

function scrollToMarker(marker) {
  if (!marker) return;

  const MAP_OFFSET = 0.018;

  const {
    lat,
    lng,
  } = marker._latlng;

  if (!lat || !lng) return;

  map.setView([lat + MAP_OFFSET, lng], 12);
}

function onMarkerClick(key) {
  const marker = mapData.keyMarkers[key];
  const city = mapData['byId'][key];

  if (!city || !marker) return;

  const findIndex = slidesToShow.value?.findIndex((slide) => slide.key === key);

  const swiper = swiperRef?.value?.$el?.swiper;

  swiper.slideTo(findIndex);

  deleteAllMarkers();
  addMarkers([city]);

  setTimeout(() => {
    activeSlide.value = findIndex;
  }, 100);
}

function changedTab () {
  activeDistrict.value = null;
  activeSlide.value = null;
  searchValue.value = '';
}

function onSearchCityClick(city) {
  const {
    region,
    slideIndex,
    cities,
  } = mapData.searchValues[city];

  if (!cities?.length) {
    return;
  }

  const tabCitiesMap = {
    'msk': 0,
    'rus_regions': 1,
    'abroad': 2,
  };

  activeDistrict.value = null;
  activeTab.value = tabCitiesMap[region];

  citiesBySearch.value = cities;
  searchValue.value = city;
  activeSlide.value = null;
}

function showRegionForm() {
  document.exitFullscreen();
  openModal('MModalForm', modalProps);
}

function formatAddress(address) {
  if (!address || typeof address !== 'string') return '';

  return address.replace(/ул.(&nbsp;)?/g, '');
}

function formatAdditionalEmail(email) {
  if (!email || typeof email !== 'string') return '';

  return email
    .split(';')
    .map((email) => email.trim());
}

function onSlideClick(slide, index) {
  const marker = mapData.keyMarkers[slide.key];

  deleteAllMarkers();

  const place = mapData['byId'][slide.key];

  if (!place) return;

  addMarkers([place]);

  activeSlide.value = index;

  scrollToMarker(marker);
}
</script>

<template>
  <MSectionSecond
    v-if="regionCities.length"
    class="s-regions "
    :class="isInitMap ? '--inited' : '--notinited'"
    :title
    :nums
  >
    <SRegionsSecondFilters
      :key="isInitMap"
      v-model:active-tab="activeTab"
      v-model:is-focus-search-input="isFocusSearchInput"
      v-model:active-district="activeDistrict"
      v-model:search-value="searchValue"
      :districts="mapData.districts"
      :search-values="mapData.searchValues"
      @changed-tab="changedTab"
      @on-search="onSearchCityClick"
    />
    <div class="s-regions__widget">
      <div
        id="m-map"
        ref="mapBlock"
        class="s-regions__map"
      />
      <swiper
        ref="swiperRef"
        :key="windowWidth"
        class="s-regions__branches"
        v-bind="swiperConfig"
        :scrollbar="{
          dragSize: windowWidth < 1200 ? 80 : 300,
          draggable: true,
          horizontalClass: 'swiper-scrollbar',
          verticalClass: 'swiper-scrollbar-vertical',
        }"
        :direction=" windowWidth < 1200 ? 'horizontal' : 'vertical'"
      >
        <swiper-slide
          v-for="slide, index in slidesToShow"
          :key="slide.key"
          :class="{ '--active': activeSlide === index }"
          @click="onSlideClick(slide, index)"
        >
          <div class="s-regions__branch">
            <span
              class="s-regions__branch-name a-font_xl-m"
              v-html="`${slide.value}, ${slide.region}`"
            />
            <div
              class="s-regions__branch-params a-font_xs-m"
            >
              <span
                v-if="slide.address"
                class="s-regions__branch-param"
              >
                <ASvgMono name="pin_2" />
                <span
                  class="s-regions__branch-address"
                  v-html="formatAddress(slide.address)"
                />
              </span>

              <template v-if="slide.schedule">
                <div
                  class="s-regions__branch-param "
                >
                  <ASvgMono name="time_2" />
                  <div class="s-regions__branch-schedule">
                    <span
                      v-for="item in slide.schedule.split(';')"
                      :key="item"
                    >
                      <span
                        v-html="item"
                      />
                    </span>
                  </div>
                </div>
              </template>

              <span class="s-regions__branch-param">
                <ASvgMono name="phone_2" />
                <span class="s-regions__branch-phones">
                  <NuxtLink
                    to="tel:88001000011"
                    @click="sendReachGoal('88001000011')"
                  >
                    8 (800) 100-00-11
                  </NuxtLink>
                  <NuxtLink
                    v-if="slide.phone_main"
                    :to="`tel:${slide.phone_main}`"
                    @click="sendReachGoal(slide.phone_main)"
                  >
                    {{ slide.phone_main }}
                  </NuxtLink>
                </span>
              </span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </MSectionSecond>

  <ADGMap ref="ADGMapRef" />
</template>

<style lang="scss" scoped>
@import './SRegionsSecond.scss';
</style>
