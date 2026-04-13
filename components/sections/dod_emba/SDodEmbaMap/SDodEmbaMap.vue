<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core';

interface Props {
  title: string
  place: string
  adress: string
}

interface ADGMapRef {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DG: any;
  // eslint-enable-next-line @typescript-eslint/no-explicit-any
}

defineProps<Props>();

const { openModal } = useModalStore();

const ADGMapRef = templateRef<ADGMapRef | null>('ADGMapRef', null);
const mapBlock = templateRef('mapBlock');

const coordinates = {
  lat: 55.758493,
  lng: 37.613198,
};

const customIconUrl = '/img/dod_emba/map_pin.svg';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let DG: any = null;
// eslint-enable-next-line @typescript-eslint/no-explicit-any
let map = null;

onMounted(() => {
  DG = ADGMapRef.value?.DG;
  if (!DG) return;

  initMap();
});

const { width: windowWidth } = useWindowSize();

const getIconSize = () => {
  if (windowWidth.value < 768) {
    return [75, 55];
  } else if (windowWidth.value < 1200) {
    return [100, 134];
  } else {
    return [120, 161];
  }
};

const getIconAnchor = () => {
  const [width, height] = getIconSize();
  return [width / 2, height];
};

const getPopupAnchor = () => {
  const [_, height] = getIconSize();
  return [0, -height];
};

function initMap() {

  const iconSize = getIconSize();
  const iconAnchor = getIconAnchor();
  const popupAnchor = getPopupAnchor();

  const customIcon = DG.icon({
    iconUrl: customIconUrl,
    iconSize,
    iconAnchor,
    popupAnchor,
  });

  map = DG.map(mapBlock.value, {
    center: [coordinates.lat, coordinates.lng],
    zoom: 15,
    zoomControl: true,
    scrollWheelZoom: false,
  });

  const marker = DG.marker([coordinates.lat, coordinates.lng], {
    title: 'Место проведения',
    icon: customIcon,
  });

  marker.addTo(map);
}

function openForm() {
  openModal('MModalForm', {
    title: 'Запросить презентацию',
    btn: 'Запросить презентацию',
    formName: true,
    formPhone: true,
    formMail: true,
    actionParams: [{param: 'form=registration_EMBA'}],
  });
}
</script>

<template>
  <MSection
    class="s-dodemba-map"
    :title="title"
  >
    <div class="s-dodemba-map__body">
      <div class="s-dodemba-map__info">
        <div class="s-dodemba-map__wrap">
          <div class="s-dodemba-map__label">Место проведения:</div>
          <div
            class="s-dodemba-map__value"
            v-html="place"
          />
        </div>
        <div class="s-dodemba-map__wrap s-dodemba-map__wrap_second">
          <div class="s-dodemba-map__label">Адрес:</div>
          <div
            class="s-dodemba-map__value"
            v-html="adress"
          />
        </div>
        <AButton
          class="s-dodemba-map__btn"
          @click="openForm()"
        >
          <span>Получить презентацию ЕМВА</span>
          <ASvgMono
            name="arrow_outward"
            class="s-dodemba-map__btn-icon"
          />
        </AButton>
        <ASvgMono
          name="location"
          class="s-dodemba-map__icon"
        />
      </div>
      <div
        ref="mapBlock"
        class="s-dodemba-map__map"
      >
        <ADGMap ref="ADGMapRef" />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDodEmbaMap.scss';
</style>
