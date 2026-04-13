<script setup lang="ts">
import type { DoubleGis, Map } from '~/types';
import MarkerIcon from '~/assets/images/global/marker.svg?url';
import { COMMON } from '~/constants';

interface Props {
  title?: string;
  admission?: Admission | null;
}

export interface Admission {
  latitude?: string;
  longitude?: string;
  district?: string;
  address?: string;
  metro?: string;
}

const defaultAdmission: Admission = {
  latitude: '55.811159',
  longitude:'37.509999',
  district:'ЦФО',
  address:'Москва, Ленинградский пр., д.&nbsp;80Г',
  metro:'Сокол',
};

const {
  title = 'Адреса поступления',
  admission: propsAdmission,
} = defineProps<Props>();

const admission = propsAdmission
  ? propsAdmission
  : defaultAdmission;

let map: Map | null = null;
let DG: DoubleGis | null = null;

const ADGMapRef = ref();

const mapWrapper = useTemplateRef('mapWrapper');
const mapBlock = useTemplateRef('mapBlock');

const { reachGoal } = sendYandexMetricaGoal();

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'nomera_telefonov_v_stranitse',
    'telephone_number': phone,
  });
}

onMounted(() => {
  DG = ADGMapRef.value?.DG;
  if (!DG) return;

  initMap();
});

function initMap() {
  try {
    map = DG ? DG?.map(mapBlock.value, {
      center: [55.45, 37.36],
      zoom: 8,
    }) : null;

    if (!admission?.latitude || !admission?.longitude) return;

    const marker = DG?.marker([admission?.latitude, admission?.longitude], {
      icon: DG?.icon({
        iconUrl: MarkerIcon,
        iconSize: [38, 44],
      }),
    });

    if (typeof marker === 'object' && marker && 'addTo' in marker) {
      marker.addTo(map);
    }

    map?.setView([admission?.latitude, admission?.longitude], 12);
  } catch (e) {
    console.warn(e);
  }
}
</script>

<template>
  <div
    ref="mapWrapper"
    class="s-article-address"
    itemscope
    itemtype="https://schema.org/LocalBusiness"
  >
    <meta
      itemprop="name"
      content="Демо образовательный портал"
    >
    <link
      itemprop="url"
      :href="`${COMMON.DEFAULT_DOMAIN}/`"
    >
    <h4
      class="s-article-address__title a-font_h4"
      v-html="title"
    />

    <div class="s-article-address__inner">
      <div class="s-article-address__text a-font_xs-m">
        <h6
          class="s-article-address__item-title a-font_h6"
          v-html="admission?.district"
        />

        <div class="s-article-address__address">
          <ASvgMono name="simple-placemark-dot" />
          <span v-html="admission?.address" />
        </div>

        <div
          v-if="admission.metro"
          class="s-article-address__metro"
        >
          <ASvgMono name="metro" />
          <span v-html="admission.metro" />
        </div>

        <div class="s-article-address__phones">
          <ASvgMono name="phone-outline" />
          <a
            v-if="!propsAdmission"
            href="tel:+74958001001"
            @click="sendReachGoal('+74958001001')"
          >
            +7 495 800–10–01
          </a>
          <a
            href="tel:88001000011"
            @click="sendReachGoal('88001000011')"
          >
            8 800 100–00–11
          </a>
        </div>
      </div>
    </div>

    <div
      id="article_map"
      ref="mapBlock"
      class="s-article-address__map"
    />

    <ADGMap ref="ADGMapRef" />
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleAddress.scss';
</style>
