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
  enabled: true,
  breakpoints: {
    1200: {
      enabled: false,
    },
  },
});

const items = [{
  title: 'Обучение',
  text: 'за счёт работодателя',
}, {
  title: 'Общежитие',
  text: 'бесплатно',
}, {
  title: 'Государственный диплом',
  text: 'о высшем образовании',
}, {
  title: 'Отсрочка от армии',
  text: 'на весь период обучения',
}, {
  title: 'Трудоустройство',
  text: 'по специальности<br>с 1 курса',
}, {
  title: 'Спорт',
  text: 'бесплатное посещение<br>университетского спорт клуба',
}];

const direction = {
  title: 'Менеджмент',
  subtitle: '«Управление проектами»',
  text: ['Москва', '300 мест'],
  img: '/img/personnel_reserve/photo-1.webp',
};
</script>

<template>
  <MSection
    title="Об обучении"
    class="s-reserve-about-training"
  >
    <div class="s-reserve-about-training__content">
      <div class="s-reserve-about-training__wrapper">
        <div class="s-reserve-about-training__banner">
          <picture>
            <source
              media="(min-width: 768px)"
              srcset="/img/personnel_reserve/reserve-about-training-banner-new-lg.webp"
            >
            <AImg
              src="/img/personnel_reserve/reserve-about-training-banner-new-sm.webp"
              alt=""
              decoding="async"
              loading="lazy"
            />
          </picture>
          <div class="s-reserve-about-training__banner-text">
            <div class="a-font_h4">Студенты программы<br>проходят обучение<br>по профилю<br>«Управление проектами</div>
            <div class="a-font_h6">Сегодня это одна из&nbsp;самых востребованных профессий,<br>от&nbsp;которых зависит успех бизнеса в&nbsp;любой сфере деятельности</div>
          </div>
        </div>
        <div class="s-reserve-about-training__direction">
          <AImg
            v-if="direction.img"
            :src="direction.img"
            alt=""
            decoding="async"
            loading="lazy"
            class="s-reserve-about-training__person"
          />
          <AImg
            src="/img/personnel_reserve/d-icon.png"
            alt="icon"
            class="s-reserve-about-training__icon"
          />
          <div class="a-font_h4">{{ direction.title }}</div>
          <div
            class="a-font_h5"
            v-html="direction.subtitle"
          />
          <ul class="a-font_h6">
            <li
              v-for="text in direction.text"
              :key="text"
            >
              {{ text }}
            </li>
          </ul>
        </div>
      </div>

      <div class="s-reserve-about-training__slider">
        <Swiper
          ref="swiperRef"
          v-bind="swiperConfig"
        >
          <SwiperSlide
            v-for="(item, idx) in items"
            :key="item.title"
            class="s-reserve-about-training__slide"
          >
            <div class="a-font_h5">{{ item.title }}</div>
            <div
              class="a-font_l-m s-reserve-about-training__slide-text"
              v-html="item.text"
            />
            <AImg
              :src="`/img/personnel_reserve/icon-${idx+1}.svg`"
              alt=""
              decoding="async"
              loading="lazy"
            />
          </SwiperSlide>
        </Swiper>
        <div
          ref="scrollbarRef"
          class="swiper-scrollbar"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SReserveAboutTraining.scss';
</style>
