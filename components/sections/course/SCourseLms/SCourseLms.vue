<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import BgImageLg from '~/assets/images/course/lms/lms-lg.webp';
import BgImageMd from '~/assets/images/course/lms/lms-md.webp';
import BgImageSm from '~/assets/images/course/lms/lms-sm.webp';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';;

const lmsSlides = [
  {
    text: 'Современная экосистема образовательных сервисов: онлайн обучение, онлайн&nbsp;-&nbsp;расписание, портфолио',
  },
  {
    text: 'Удобная коммуникация с&nbsp;преподавателями: мессенджеры, соцсети, внутренний чат в&nbsp;Synergy&nbsp;LMS',
  },
  {
    text: 'Удобное создание и&nbsp;отслеживание обращений',
  },
];

const title = 'Обучение в&nbsp;среде Synergy&nbsp;LMS';
const text = 'Масштабируемая модульная система, разработанная с&nbsp;использованием самых современных <span class="nobr">IT-технологий.</span> С&nbsp;помощью нашего портала вы сможете получить качественное образование по&nbsp;доступной цене из&nbsp;любой точки мира. И&nbsp;единственное, что вам для&nbsp;этого потребуется&nbsp;— это компьютер или&nbsp;планшет, подключенный к&nbsp;Интернету.';
const icons = ['simple-star'];

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
</script>

<template>
  <MSection
    class="s-courses-lms"
  >
    <div class="s-courses-lms__wrap">
      <MCardText
        title-class="a-font_h3"
        text-class="a-font_h6"
        :title
        :text
        :icons
      >
        <ASvgMono name="simple-rune" />
      </MCardText>
      <div class="s-courses-lms__banner">
        <ATag
          class="a-tag--blur"
          text="Synergy Learning System"
          variant="white"
        />
        <picture>
          <source
            media="(min-width: 1200px)"
            :srcset="BgImageLg"
          >
          <source
            media="(min-width: 768px)"
            :srcset="BgImageMd"
          >
          <AImg
            alt="talisman"
            :src="BgImageSm"
          />
        </picture>
      </div>
    </div>

    <div class="s-courses-lms__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <swiper-slide
          v-for="item in lmsSlides"
          :key="item.text"
          class="s-why-us__card swiper-slide"
        >
          <div
            class="s-why-us__card-title a-font_xl"
            v-html="item.text"
          />
          <div class="s-why-us__card-bottom">
            <ACardCheck />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCourseLms.scss';
</style>
