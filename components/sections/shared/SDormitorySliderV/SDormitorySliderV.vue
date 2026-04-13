<script setup lang="ts">
import MCardBgImage from '~/assets/images/s_dormitory_slider_v/line.webp';
import SliderBgImage from '~/assets/images/s_admission_campaign/bg.webp';
import { useWindowSize } from '@vueuse/core';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, FreeMode } from 'swiper/modules';
import { dormitorySliderItems } from './dormitorySliderData';
import type { SwiperOptions } from 'swiper/types';

const { width: windowWidth } = useWindowSize();

const cardDescription = 'Общежития с&nbsp;оборудованными кухнями и&nbsp;спортивными комплексами расположены недалеко от&nbsp;учебных кампусов Университета';

const smallScreenSlidesSettings: SwiperOptions = {
  spaceBetween: 11,
  autoplay: false,
  speed: 1000,
  direction: 'horizontal',
  resistance: true,
  resistanceRatio: 0,
};

const largeScreenSlidesSettings: SwiperOptions = {
  loop: true,
  autoplay: {
    delay: 0,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
  },
  spaceBetween: 14,
  speed: 5000,
  direction: 'vertical',
};

const { openModal } = useModalStore();

const modalProps = {
  title: "Оставьте заявку на обучение",
  formName: true,
  formPhone: true,
  actionParams: [
    {param: 'form=dormitory-form'}
  ]
};
</script>

<template>
  <MSection
    title="Размещение студентов"
    class="s-dormitory-slider-v"
  >
    <div class="s-dormitory-slider-v__list">
      <MCardText
        :icons="['simple-home', 'simple-group']"
        :bg-image="MCardBgImage"
      >
        <template #title>
          Мы предлагаем студентам уютные
          
          <AButton
            type="button"
            size="lg"
            @click="openModal('MModalForm', modalProps)"
          >
            <span class="a-font_h4">общежития</span>
          </AButton>
          
          , в&nbsp;которых есть всё для комфортной жизни
        </template>
        <p v-html="cardDescription" />
      </MCardText>
      <AImg
        :src="SliderBgImage"
        alt="slider"
        class="s-dormitory-slider-v__list-bg lazy"
        decoding="async"
      />
      <div
        class="s-dormitory-slider-v__slider"
      >
        <swiper
          :key="windowWidth"
          :modules="[Autoplay, FreeMode]"
          :loop="false"
          :grab-cursor="true"
          :autoplay="true"
          :free-mode="true"
          :breakpoints="{
            0: smallScreenSlidesSettings,
            1200: largeScreenSlidesSettings,
          }"
          slides-per-view="auto"
          direction="horizontal"
        >
          <swiper-slide
            v-for="item in dormitorySliderItems"
            :key="item.text"
            class="s-dormitory-slider-v__card swiper-slide"
          >
            <span
              class="s-dormitory-slider-v__card-title a-font_h5"
              v-html="item.text"
            />
            <AImg
              :src="item.img"
              :alt="item.text"
              class="s-dormitory-slider-v__card-img lazy"
              loading="lazy"
              decoding="async"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDormitorySliderV.scss';
@import '../../../atoms/AButton/AButton.scss';
</style>
