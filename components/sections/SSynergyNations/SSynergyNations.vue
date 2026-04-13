<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination,Autoplay } from 'swiper/modules';
import type { Fonts } from '~/types';

interface Image {
  value: string
}

interface Props {
  title: string,
  titleCard: string,
  titleClassCard: Fonts,
  textCard: string,
  textClassCard: Fonts,
  prefix: string
  images: Image[]
}

defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  paginationRef,
} = useSwiperWrapper({
  showSwiperPagination: true,
  freeMode: false,
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    type: 'bullets',
    clickable: true,
  },

});
</script>

<template>
  <MSection
    class="s-synergy-nations"
    :title
  >
    <div class="s-synergy-nations__wrap">
      <MCardText
        :title="titleCard"
        :title-class="titleClassCard"
        :text="textCard"
        :text-class="textClassCard"
      >
        <p class="a-font_h6">
          {{ prefix }}
        </p>
        <swiper
          class="m-card-text__slider"
          grab-cursor
          resistance
          slides-per-view="auto"
          :space-between="0"
          :resistance-ratio="0"
        >
          <swiper-slide>
            <p class="a-font_l-m">
              Изучить культурные особенности разных стран
            </p>
            <ASvgMono name="simple-check" />
          </swiper-slide>
          <swiper-slide>
            <p class="a-font_l-m">
              Попрактиковать иностранный язык в&nbsp;общении с&nbsp;носителями
            </p>
            <ASvgMono name="simple-check" />
          </swiper-slide>
          <swiper-slide>
            <p class="a-font_l-m">
              Принять участие в&nbsp;национальных праздниках других народов
            </p>
            <ASvgMono name="simple-check" />
          </swiper-slide>
        </swiper>
      </MCardText>
      <div class="s-synergy-nations__slider">
        <swiper
          ref="swiperRef"
          :modules="[Pagination,Autoplay]"
          :pagination="{ clickable: true }"
          v-bind="swiperConfig"
        >
          <swiper-slide
            v-for="(image, index) in images"
            :key="index"
          >
            <AImg
              alt="synergy_nation"
              class="swiper-slide"
              :src="image.value"
            />
          </swiper-slide>
        </swiper>
        <div
          ref="paginationRef"
          class="swiper-pagination"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSynergyNations.scss';
</style>
