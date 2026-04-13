<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Scrollbar],
  showSwiperNavigation: false,
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});

const items = [{
  title: '27',
  tag: 'Опыт',
  text: 'лет готовим кадры с&nbsp;высокой квалификацией',
}, {
  title: '70/30',
  tag: 'Баланс',
  text: 'соотношение практики и&nbsp;теории',
}, {
  title: '2000+',
  tag: 'Масштаб',
  text: 'выпускников программы',
}, {
  title: '1000+',
  tag: 'Успех',
  text: 'наших выпускников занимают руководящие должности',
}, {
  title: '370',
  tag: 'Отбор',
  text: 'мест выделено на 2026 год',
}];
</script>

<template>
  <MSection
    class="s-reserve-about-program"
    title="О программе"
  >
    <div class="s-reserve-about-program__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="item in items"
          :key="item.title"
          class="s-reserve-about-program__slide"
        >
          <div class="a-font_h4">{{ item.title }}</div>
          <div
            class="a-font_xl-m"
            v-html="item.text"
          />
        </SwiperSlide>
      </Swiper>
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
    <div class="s-reserve-about-program__content">
      <div class="s-reserve-about-program__card">
        <div class="a-font_h6">Президент демо-корпорации</div>
        <div class="a-font_h2 s-reserve-about-program__card-title">Лобов Вадим Георгиевич</div>
        <div class="a-font_h6 s-reserve-about-program__card-subtitle">
          Основатель программы — о&nbsp;поступлении
          и&nbsp;обучении на программе «Кадровый резерв»
        </div>
        <div class="s-reserve-about-program__card-info">
          <ASvgMono name="simple-hat" />
          <ASvgMono name="simple-bag" />
          <p class="a-font_m">
            Кандидат экономических наук, доцент, член комиссии Государственного Совета <br>Российской
            Федерации по&nbsp;направлению &laquo;Малое и&nbsp;среднее предпринимательство&raquo;
          </p>
        </div>
      </div>
      <MVideoCard
        class="s-reserve-about-program__video"
        image="/img/personnel_reserve/s-reserve-about-program.webp"
        video="https://rutube.ru/play/embed/f37db323f061ddb370c139a8c0b1d860/"
        tag="Смотрите видео о программе"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SReserveAboutProgram.scss';
</style>
