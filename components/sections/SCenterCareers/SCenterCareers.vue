<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import { ROUTES } from '~/constants';

const careerItems = [{
  title: 'Гарантия трудоустройства',
  text: '85% трудоустроенных студентов и&nbsp;выпускников.',
}, {
  title: 'Лучшие специалисты',
  text: 'Дипломированные и&nbsp;сертифицированные карьерные консультанты и&nbsp;профориентологи, <span class="nobr">НR-эксперты.</span>',
}, {
  title: 'Учёба от&nbsp;экпертов',
  text: 'Вебинары и&nbsp;<span class="nobr">мастер-классы</span> от&nbsp;лучших карьерных и&nbsp;<span class="nobr">HR-экспертов.</span>',
}, {
  title: 'Бесплатный курс',
  text: 'по&nbsp;поиску работы с&nbsp;индивидуальной обратной связью и&nbsp;сопровождением эксперта на&nbsp;каждом этапе поиска работы.',
}, {
  title: 'Подборки вакансий',
  text: 'Информация о&nbsp;лучших вакансиях и&nbsp;стажировках ведущих компаний.',
}, {
  title: 'Современные технологии',
  text: 'Оценки компетенций и&nbsp;разработки карьерных стратегий для&nbsp;более эффективного трудоустройства',
}];

const {
  swiperRef,
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});

const title = 'Центр карьеры';
const cardTitle = 'Главный принцип обучения в&nbsp;нашем Университете&nbsp;— непрерывное карьерно-образовательное развитие';
const cardText = 'Студенты Университета могут строить карьерный трек уже с&nbsp;1 курса, получая поддержку на&nbsp;всех этапах: помощь в&nbsp;составлении резюме и&nbsp;портфолио, подготовку к&nbsp;собеседованиям и&nbsp;индивидуальные карьерные консультации.';
</script>

<template>
  <MSection
    id="s-center-careers"
    class="s-center-careers scroll-margin-top"
    :title
  >
    <div class="s-center-careers__wrap">
      <MCardText
        title-class="a-font_h5"
        text-class="a-font_l-m"
        :title="cardTitle"
        :text="cardText"
      >
        <p class="a-font_l-m">
          Подписывайся на&nbsp;Центр карьеры в&nbsp;соцсетях и&nbsp;будь в&nbsp;курсе всех новостей карьерного рынка
        </p>
        <MSocialLinks
          :links="[
            {
              name: 'telegram',
              href: 'https://t.me/example',
              icon: 'social-telegram',
            },
            {
              name: 'vkontakte',
              href: 'https://vk.com/example',
              icon: 'social-vk',
            },
          ]"
          :show-title="false"
        />
        <AButton
          bg-color="red"
          :to="ROUTES.CAREER_CENTER"
        >
          Подробнее о Центре карьеры
        </AButton>
      </MCardText>
      <div class="s-center-careers__banner">
        <picture>
          <source
            media="(min-width: 1200px)"
            srcset=synergyApi('uploads/content/center-careers/lg.webp')
          >
          <source
            media="(min-width: 768px)"
            srcset=synergyApi('uploads/content/center-careers/md.webp')
          >
          <AImg
            src=synergyApi('uploads/content/center-careers/sm.webp')
            alt="career_center"
          />
        </picture>
        <AButton
          bg-color="red"
          :to="ROUTES.CAREER_CENTER"
        >
          Подробнее о Центре карьеры
        </AButton>
      </div>
    </div>
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      class="s-center-careers__slider"
    >
      <SwiperSlide
        v-for="(item, index) in careerItems"
        :key="index"
      >
        <div
          class="a-font_h6"
          v-html="item.title"
        />
        <div
          class="a-font_s-m"
          v-html="item.text"
        />
        <div class="s-center-careers__slider-num a-font_l-m">
          {{ formatNumberWithLeadingZero(index + 1) }}
        </div>
      </SwiperSlide>
    </swiper>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCenterCareers.scss';
</style>
