<script setup lang="ts">
import Logo from '~/assets/images/main/s_main_about_university/logo.svg?url';
import AboutImage from '~/assets/images/personnel_reserve/reserve-about.webp?url';
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
  title: 'Высшее образование',
}, {
  title: 'Трудоустройство с 1 курса',
}, {
  title: 'Тренинги и&nbsp;<nobr>мастер-классы</nobr>',
}, {
  title: 'Участие в&nbsp;международных проектах',
}, {
  title: 'Спортивные и&nbsp;патриотические мероприятия',
}];
</script>

<template>
  <MSection class="s-reserve-about">
    <div class="s-reserve-about__title a-font_h3">
      <AImg
        :src="Logo"
        alt="synergy"
        class="s-reserve-about__logo"
      />
      Кадровый резерв — это уникальная программа целевого обучения, которая направлена на формирование нового поколения руководителей и топ-менеджеров.
    </div>
    <div class="s-reserve-about__content">
      <MCardText
        title="Наши выпускники — квалифицированные специалисты с&nbsp;практическим опытом и&nbsp;сильным резюме."
        text="Обучение на программе помогает прокачать профессиональные и личностные качества, учит самостоятельности, ответственности и многозадачности."
        title-class="a-font_h4"
        text-class="a-font_m"
      />
      <AImg
        :src="AboutImage"
        alt=""
        decoding="async"
        loading="lazy"
      />
    </div>
    <div class="s-reserve-about__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="item, idx in items"
          :key="item.title"
          class="s-reserve-about__slide"
        >
          <div
            class="a-font_h6"
            v-html="item.title"
          />
          <AImg
            :src="`/img/personnel_reserve/reserve-about-${idx + 1}.svg?url`"
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

<style lang="scss" src="./SReserveAbout.scss" scoped></style>
