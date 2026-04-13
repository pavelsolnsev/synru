<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar, FreeMode, Mousewheel } from 'swiper/modules';
import { useWindowSize } from '@vueuse/core';
import { COMMON } from '~/constants';
import { mtiMapData } from '~/components/sections/mti/SMtiMap/mtiMapData';
import mtiIcon from '~/assets/images/global/mti.svg?url';
import mapIcon from '~/assets/images/global/map.svg?url';

const props = defineProps({
  title: {
    type: String,
    default: 'Приёмная комиссия МАП',
  },
  routeName: {
    type: String,
    default: '',
  },
});

const ADGMapRef = shallowRef();

let DG = null;
let map = null;

const { width: windowWidth } = useWindowSize();

const mapBlock = templateRef('mapBlock');

const isInitMap = shallowRef(false);
const activeSlide = shallowRef(null);

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
  resistance: true,
  resistanceRatio: 0,
  mousewheel: {
    enabled: true,
  },
});

const { reachGoal } = sendYandexMetricaGoal()

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
    center: [55.811159, 37.509999],
    zoom: 11,
    scrollWheelZoom: false,
  });

  const customIcon = DG.icon({
    iconUrl: props.routeName === 'mti' ? mtiIcon : mapIcon,
    iconSize: [58, 71],
    iconAnchor: [29, 71],
  });

  mtiMapData.forEach((item, index) => {
    const marker = DG.marker([item.latitude, item.longitude], {
      icon: customIcon,
      title: item.value,
      key: item.key,
    });

    marker.on('click', () => onMarkerClick(item.key, index));

    marker.addTo(map);
  });
}

function onMarkerClick(key, index) {
  activeSlide.value = key;

  const marker = mtiMapData.find((item) => {
    return item.key === key;
  });

  const lat = marker.latitude;
  const lng = marker.longitude;

  const swiper = swiperRef?.value?.$el?.swiper;

  swiper.slideTo(index);

  map.setView([lat, lng], 15);
}

function formatAddress(address) {
  if (!address || typeof address !== 'string') return '';

  return address.replace(/ул.(&nbsp;)?/g, '');
}

onMounted(() => {
  DG = ADGMapRef.value?.DG;
  if (!DG) return;
  initMap();
});
</script>

<template>
  <MSection
    class="s-mti-map s-mti-map-local"
    :class="isInitMap ? '--inited' : '--notinited'"
    :title
  >
    <div class="s-mti-map__widget">
      <div
        id="m-map"
        ref="mapBlock"
        class="s-mti-map__map"
      />
      <swiper
        ref="swiperRef"
        :key="windowWidth"
        class="s-mti-map__branches"
        v-bind="swiperConfig"
        :scrollbar="{
          dragSize: windowWidth < 1200 ? 80 : 300,
          draggable: true,
          horizontalClass: 'swiper-scrollbar',
          verticalClass: 'swiper-scrollbar-vertical',
        }"
        :direction="windowWidth < 1200 ? 'horizontal' : 'vertical'"
      >
        <swiper-slide
          v-for="(slide, index) in mtiMapData"
          :key="slide.key"
          :class="{ '--active': activeSlide === slide.key }"
          @click="onMarkerClick(slide.key, index)"
        >
          <div
            class="s-mti-map__branch"
            itemscope
            itemtype="https://schema.org/LocalBusiness"
          >
            <AImg
              :src="COMMON.LOGO_URL"
              style="display: none;"
              itemprop="image"
            />
            <span
              class="s-mti-map__branch-name a-font_xl-m"
              itemprop="name"
              v-html="`${slide.value}, ${slide.region}`"
            />
            <div class="s-mti-map__branch-params a-font_xs-m">
              <span class="s-mti-map__branch-param">
                <ASvgMono
                  class="s-mti-map__icon"
                  name="simple-placemark-dot"
                />
                <span
                  class="s-mti-map__branch-address"
                  itemprop="address"
                  v-html="formatAddress(slide.address)"
                />
              </span>

              <span class="s-mti-map__branch-param">
                <ASvgMono
                  class="s-mti-map__icon"
                  name="station"
                />
                <span
                  class="s-mti-map__branch-address"
                  itemprop="address"
                  v-html="slide.station"
                />
              </span>

              <span class="s-mti-map__branch-param">
                <ASvgMono
                  class="s-mti-map__icon"
                  name="phone-outline"
                />
                <span class="s-mti-map__branch-phones">
                  <NuxtLink
                    to="tel:88001000011"
                    @click="sendReachGoal('88001000011')"
                  >
                    <span itemprop="telephone">8 (800) 100-00-11</span>
                  </NuxtLink>
                  <NuxtLink
                    v-if="slide.phone_main"
                    itemprop="telephone"
                    :to="`tel:${slide.phone_main}`"
                  >
                    <span itemprop="telephone">{{ slide.phone_main }}</span>
                  </NuxtLink>
                </span>
              </span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </MSection>

  <ADGMap ref="ADGMapRef" />
</template>

<style lang="scss" scoped>
@import './SMtiMap.scss';
</style>
