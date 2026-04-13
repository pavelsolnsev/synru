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
  title: 'Актуальные знания',
  text: 'Программы обучения создаются совместно с&nbsp;крупнейшими российскими работодателями',
}, {
  title: 'Сильный педагогический состав',
  text: 'Все наши преподаватели&nbsp;— <nobr>специалисты-практики.</nobr> Мы учим только тому, что действительно работает',
}, {
  title: 'Уникальные карьерные возможности',
  text: 'Карьера начинается с&nbsp;первого курса, а&nbsp;к&nbsp;выпуску у&nbsp;тебя уже будет опыт работы в&nbsp;крупной корпорации',
}, {
  title: 'Обучение за&nbsp;рубежом',
  text: 'Студенты могут пройти обучение не&nbsp;только в&nbsp;Москве, но&nbsp;и&nbsp;в&nbsp;нашем кампусе в&nbsp;Дубае',
}, {
  title: 'Студенческое сообщество',
  text: 'Коммьюнити студентов и&nbsp;выпускников, которое помогает справляться с&nbsp;самыми сложными вызовами',
}];
</script>

<template>
  <MSection
    class="s-reserve-advantages"
    title="Преимущества программы"
  >
    <div class="s-reserve-advantages__content">
      <MCardText
        title="Реальный опыт работы"
        text="студенты дополнительно изучают современные методологии управления, участвуют в&nbsp;<nobr>бизнес-форумах,</nobr> <nobr>культурно-массовых</nobr> и&nbsp;патриотических мероприятиях."
        :icons="['simple-university','simple-calendar']"
      />
      <AImg
        src="/img/personnel_reserve/reserve-advantages-banner.webp"
        alt=""
        decoding="async"
        loading="lazy"
      />
    </div>
    <div class="s-reserve-advantages__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="item, idx in items"
          :key="item.title"
          class="s-reserve-advantages__slide"
        >
          <div
            class="a-font_h5"
            v-html="item.title"
          />
          <div
            class="a-font_xl-m s-reserve-advantages__slide-text"
            v-html="item.text"
          />
          <AImg
            :src="`/img/personnel_reserve/reserve-advantages-icon-${idx+1}.svg`"
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
  </MSection>
</template>

<style lang="scss" scoped>
@import './SReserveAdvantages.scss';
</style>
