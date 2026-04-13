<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import { persons } from './sMediaCenterForMediaData';
import type { DoubleGis, Map } from '~/types';
import MarkerIcon from '~/assets/images/global/marker.svg?url';

interface Props {
  title?: string;
  description?: string;
  text?: string;
  bannerTitle?: string;
  bannerDescription?: string;
  bannerImageLg?: string;
  bannerImageMd?: string;
  bannerImageSm?: string;
  bannerBtnText?: string;
  latitude?: string;
  longitude?: string;
}

const defaultDescription = 'Уважаемые журналисты, <br>мы приглашаем вас сотрудничать!';
const defaultText = 'Среди наших экспертов&nbsp;— преподаватели и&nbsp;сотрудники образовательной экосистемы, ученые с&nbsp;фундаментальным бэкграундом, известные предприниматели, бизнес-тренеры&nbsp;и специалисты высокого уровня в&nbsp;разных областях.';

const defaultBannerTitle = 'Хотите написать о&nbsp;нас?';
const defaultBannerDescription = 'Мы оперативно реагируем на&nbsp;запросы СМИ и&nbsp;делаем всё возможное, чтобы работа журналистов была быстрой и&nbsp;качественной';
const defaultBannerBtnText = 'Узнать подробнее';

const {
  title = 'Для СМИ',
  description = defaultDescription,
  text = defaultText,
  bannerTitle = defaultBannerTitle,
  bannerDescription = defaultBannerDescription,
  bannerImageLg = '',
  bannerImageMd = '',
  bannerImageSm = '',
  bannerBtnText = defaultBannerBtnText,
  latitude = '55.811159',
  longitude = '37.509999',
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
}  = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance:true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});

const { openModal } = useModalStore();

const modalProps = {
  title: "Связаться",
  formName: true,
  formPhone: true,
  btn: "Отправить",
  "actionParams": [{param: 'form=dlya_smi'}],
}

let map: Map | null = null;
let DG: DoubleGis | null = null;

const ADGMapRef = ref();

const mapBlock = useTemplateRef('mapBlock');

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

    if (!latitude || !longitude) return;

    const marker = DG?.marker([latitude, longitude], {
      icon: DG?.icon({
        iconUrl: MarkerIcon,
        iconSize: [38, 44],
      }),
    });

    if (typeof marker === 'object' && marker && 'addTo' in marker) {
      marker.addTo(map);
    }

    map?.setView([latitude, longitude], 12);
  } catch (e) {
    console.warn(e);
  }
}
</script>

<template>
  <MMediacenterBlock
    :title
    class="for-media"
  >
    <div class="for-media__wrap">
      <div>
        <div
          class="a-font_h4 for-media__title"
          v-html="description"
        />
        <div
          class="a-font_xl-m for-media__subtitle"
          v-html="text"
        />
        <div
          class="for-media__swiper"
        >
          <swiper
            ref="swiperRef"
            v-bind="swiperConfig"
          >
            <template #wrapper-start>
              <div
                v-for="item in persons"
                :key="item.image"
                class="for-media__person swiper-slide"
              >
                <div class="for-media__person-top">
                  <AImg
                    alt="person"
                    decoding="async"
                    loading="lazy"
                    width="48"
                    height="48"
                    :src="item.image"
                  />
                  <div
                    class="a-font_h6"
                    v-html="item.title"
                  />
                </div>

                <div
                  class="a-font_m-m"
                  v-html="item.description"
                />
              </div>
            </template>
          </swiper>
          <MSwiperNav ref="navRef" />

          <div
            ref="scrollbarRef"
            class="swiper-scrollbar"
          />
        </div>
      </div>

      <SBanner
        title-class="a-font_h3"
        :title="bannerTitle"
        :description="bannerDescription"
        :image-lg="bannerImageLg"
        :image-md="bannerImageMd"
        :image-sm="bannerImageSm"
        :btn-text="bannerBtnText"
        :btn-click="() => openModal('MModalForm', modalProps)"
      />

      <MSmiContacts />

      <div class="for-media__address">
        <div class="a-font_h4 for-media__address-title">
          Как добраться
        </div>

        <div class="for-media__address-item">
          <div class="a-font_h5 for-media__address-item__title">
            Кампус «Сокол»
          </div>

          <div class="a-font_l-m for-media__address-item__content">
            <div class="for-media__address-item__elem">
              <ASvgMono name="clock" />
              <span>9:00 - 20:00</span>
            </div>

            <div class="for-media__address-item__elem">
              <ASvgMono name="simple-placemark" />
              <span>г. Москва, ул. Ленинградский пр-кт, д. 80, корп. Г</span>
            </div>
          </div>
        </div>

        <div class="for-media__address-item">
          <div class="a-font_h5 for-media__address-item__title">
            Как пройти
          </div>
          <div class="a-font_l-m">
            Станция метро «Сокол», выход в&nbsp;центре зала на&nbsp;ул.&nbsp;Балтийская, далее пешком или на&nbsp;автобусе (№ Т6, Т43, 905) до&nbsp;остановки «Гидропроект» (1 остановка), у&nbsp;автобусного депо повернуть направо.
          </div>
        </div>

        <div class="for-media__address-map">
          <div
            id="minimap"
            ref="mapBlock"
          />

          <ADGMap ref="ADGMapRef" />
        </div>
      </div>
    </div>
  </MMediacenterBlock>
</template>

<style lang="scss" scoped>
@import './SMediaCenterForMedia.scss';
</style>
