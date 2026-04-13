<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import type { Fonts } from '~/types';

type BtnColor = 'red' | 'black' | 'white';

interface Card {
  img: string,
  text: string
}

interface Props {
  title: string,
  titleCard: string,
  titleClassCard: Fonts,
  textCard: string,
  textClassCard: Fonts,
  cards: Card[],
  bannerTitle?: string,
  bannerClass?: Fonts,
  bannerDescription?: string,
  bannerImageSm?: string,
  bannerImageMd?: string,
  bannerImageLg?: string,
  bannerBtnText?: string,
  bannerBtnHref?: string,
  bannerBtnColor?: BtnColor,
}

const {
  titleClassCard = 'a-font_h6',
  textClassCard = 'a-font_l-m',
  bannerClass = 'a-font_h2',
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
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  slidesPerView: 'auto',
  speed: 500,
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection
    v-if="cards?.length"
    :title
    class="s-volunteer-center"
  >
    <MCardText
      :title="titleCard"
      :title-class="titleClassCard"
      :text="textCard"
      :text-class="textClassCard"
    />
    <div
      class="s-volunteer-center__slider"
    >
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <MCardText
            class="swiper-slide"
            :title="titleCard"
            :title-class="titleClassCard"
            :text="textCard"
            :text-class="textClassCard"
          />
          <div
            v-for="(card, index) in cards"
            :key="index"
            class="swiper-slide s-volunteer-center__item"
          >
            <AImg :src="card.img" />
            <ATag
              variant="blur"
              :text="card.text"
            />
          </div>
        </template>
      </swiper>
      <MSwiperNav ref="navRef" />
    </div>

    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </MSection>
  <SBanner
    v-if="bannerTitle"
    class="s-volunteer-center__banner"
    :title="bannerTitle"
    :title-class="bannerClass"
    :description="bannerDescription"
    :image-sm="bannerImageSm"
    :image-md="bannerImageMd"
    :image-lg="bannerImageLg"
    :btn-text="bannerBtnText"
    :btn-href="bannerBtnHref"
    :btn-color="bannerBtnColor"
  />
</template>

<style lang="scss" scoped>
@import './SVolunteerCenter.scss';
</style>
