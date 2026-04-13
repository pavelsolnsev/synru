<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar, FreeMode, Mousewheel } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';

const selectItem = ref('dubai');
const mapBlock = templateRef('mapBlock');
const ADGMapRef = ref();
let DG = null;
let map = null;
let currentMarker = null;

const embaMapSlider = [{
  title: 'ОАЭ–Дубай',
  key: 'dubai',
}, {
  title: 'Саудовская Аравия',
  key: 'riyadh',
}, {
  title: 'Индия',
  key: 'delhi',
}, {
  title: 'Китай',
  key: 'beijing',
}, {
  title: 'Бразилия',
  key: 'brasilia',
}, {
  title: 'Аргентина',
  key: 'buenosaires',
}];

const markersData = {
  dubai: { name: 'Дубай, ОАЭ', coords: [25.2048, 55.2708] },
  riyadh: { name: 'Эр-Рияд, Саудовская Аравия', coords: [24.7136, 46.6753] },
  beijing: { name: 'Пекин, Китай', coords: [39.9042, 116.4074] },
  brasilia: { name: 'Бразилиа, Бразилия', coords: [-15.7939, -47.8828] },
  buenosaires: { name: 'Буэнос-Айрес, Аргентина', coords: [-34.6037, -58.3816] },
  delhi: { name: 'Нью-Дели, Индия', coords: [28.6139, 77.2090] },
};

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Scrollbar, FreeMode, Mousewheel],
  showSwiperScrollbar: true,
  direction : 'horizontal',
  freeMode: true,
  slidesPerView: 'auto',
  observer: true,
  observeParents: true,
  resistance:true,
  resistanceRatio: 0,
  mousewheel: {
    enabled: true,
  },
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
    verticalClass: 'swiper-scrollbar-vertical',
  },
  breakpoints: {
    1200: {
      direction: 'vertical',
    },
  },
});

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Оставьте заявку',
    btn: 'Отправить',
    formName: false,
    formPhone: true,
    actionParams: [{param: 'form=emba_price'}],
  });
}

function initPopup(key) {
  return [
    "<div class='m-map-popup'>",
    "<div class='m-map-popup__images'>",
    `<img src='/img/emba/${key}.webp' alt='' decoding='async' loading='lazy' itemprop="image" />`,
    '</div>',
  ].join('');
};

function showCity(key) {
  selectItem.value = key;

  const city = markersData[key];
  if (!city) return;

  if (currentMarker) {
    map.removeLayer(currentMarker);
  }

  currentMarker = DG.marker(city.coords, {});

  currentMarker.bindPopup(initPopup(key)).addTo(map);
  currentMarker.openPopup();

  map.setView(city.coords, 6);
}

onMounted(() => {
  DG = ADGMapRef.value?.DG;
  if (!DG) return;

  DG.then(function () {
    map = DG.map(mapBlock.value, {
      center: [25.2048, 55.2708],
      zoom: 6,
    });

    showCity('dubai');
  });

});
</script>

<template>
  <MSection
    title="Международные модули"
    class="s-emba-map"
  >
    <div class="s-emba-map__wrap">
      <div class="s-emba-map__slider">
        <swiper
          ref="swiperRef"
          v-bind="swiperConfig"
        >
          <swiper-slide
            v-for="item,idx in embaMapSlider"
            :key="item.key"
            :class="selectItem === item.key ? '--active' : ''"
            @click="showCity(item.key)"
          >
            <AImg
              :src="`/img/emba/${item.key}.webp`"
              :alt="item.title"
              decoding="async"
              loading="lazy"
            />
            <div class="a-font_xl-m">{{ item.title }}</div>
            <div class="a-font_xl-m s-emba-map__num">{{ formatNumberWithLeadingZero(idx+1) }}</div>
          </swiper-slide>
        </swiper>
        <div
          ref="scrollbarRef"
          class="swiper-scrollbar"
        />
      </div>
      <div
        id="map"
        ref="mapBlock"
      />
    </div>
    <AButton
      size="lg"
      @click="openForm()"
    >
      Узнать стоимость
    </AButton>
    <ADGMap ref="ADGMapRef" />
  </MSection>
</template>

<style scoped lang="scss">
@import './SEmbaMap.scss';
</style>
