<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

const {
  swiperRef,
  swiperConfig,
} = useSwiperWrapper({
  modules: [Autoplay],
  loop: true,
  showSwiperNavigation: false,
  showSwiperScrollbar: false,
  autoplay: {
    delay: 6000,
    disableOnInteraction: true,
  },
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});

const SlideBg: Ref<string | undefined> = ref('');

const slides = [{
  video: 'https://rutube.ru/play/embed/4ec74bbe4c74f0c02be7749c3e06c520/',
  name: 'Смирнова Ксения',
  sity: 'Рудный',
  img: '3',
  bg: '',
  course: '2 курс',
}, {
  video: 'https://rutube.ru/play/embed/9f501ac398e9763d3d9686ad1dabb480/',
  name: 'Хазова Ирина',
  sity: 'Тольятти',
  img: '2',
  bg: 'red',
  course: 'Выпускница',
}, {
  video: 'https://rutube.ru/play/embed/e4c6f4db76723e5a6be1a94fbbbc05a3/',
  name: 'Соловьёв Илья',
  sity: 'Караганда',
  img: '5',
  bg: '',
  course: '4 курс',
}, {
  video: 'https://rutube.ru/play/embed/0be4cf0489794f9c97c0768c65bfe347/',
  name: 'Анна Терентьева',
  sity: 'Ижевск',
  img: '4',
  bg: 'red',
  course: '1 курс',
}, {
  video: 'https://rutube.ru/play/embed/95ab24b4452c0355ebc4c1a6bd276e94/',
  name: 'Авилова Марина',
  sity: 'Ачинск',
  img: '6',
  bg: 'red',
  course: '2 курс',
}];

const { openModal } = useModalStore();

function onClickVideo(link: string) {
  if (!link) return;
  openModal('MModalIframe', {
    src: link,
    isVertical: true,
  });
}
</script>

<template>
  <MSection
    class="s-reserve-main"
    :class="{ '--red-bg' : SlideBg }"
  >
    <div class="s-reserve-main__content">
      <h1 class="a-font_h1 s-reserve-main__title">Кадровый <br>резерв</h1>
      <p class="a-font_h6 s-reserve-main__subtitle">Узнайте минимальный проходной балл в&nbsp;2026 году, оставив заявку</p>
    </div>

    <MQuizForm
      btn-color="black"
      :action-params="[
        { param: 'form=pervyy_ekran' },
      ]"
    />
    <Swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      class="s-reserve-main__slider"
      @slide-change="SlideBg = slides[$event.realIndex].bg"
    >
      <SwiperSlide
        v-for="slide in slides"
        :key="slide.name"
        class="s-reserve-main__slide"
      >
        <picture>
          <AImg
            :src="`/img/personnel_reserve/reserve-main-${slide.img}-lg.webp`"
            alt=""
            decoding="async"
            loading="lazy"
          />
        </picture>
        <div
          class="s-reserve-main__slide-text"
          @click.prevent="onClickVideo(slide.video)"
        >
          <p class="a-font_h6">{{ slide.name }}</p>
          <p class="a-font_m">{{ slide.course }}</p>
          <p class="a-font_m">г. {{ slide.sity }}</p>
          <aPlay />
        </div>
      </SwiperSlide>
    </Swiper>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SReserveMain.scss';
</style>
