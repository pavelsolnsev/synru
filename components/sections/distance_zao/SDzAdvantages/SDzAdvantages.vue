<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';

interface Props {
  title?: string;
  imgSm?: string;
  imgLg?: string;
  cards?: Array<{
    icon?: string;
    text?: string;
  }>;
}

const {
  title = '',
  imgSm = '',
  imgLg = '',
  cards = [],
} = defineProps<Props>();

const {
  swiperConfig,
} = useSwiperWrapper({
  wrapperClass: 's-dz-advantages__slider-wrapper',
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 8,
  resistance: true,
  resistanceRatio: 0,
});

const isInitSwiper = shallowRef(false);

const handleResize = () => {
  isInitSwiper.value = window.innerWidth < 1200;
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <MSectionNewResponsive class="s-dz-advantages">
    <div class="s-dz-advantages__grid">
      <div class="s-dz-advantages__info">
        <h2
          class="s-dz-advantages__title a-font_h4"
          v-html="title"
        />
        <picture>
          <source
            v-if="imgLg"
            :srcset="imgLg"
            media="(min-width: 1200px)"
          >
          <AImg
            :src="imgSm"
            :alt="title"
          />
        </picture>
      </div>
      <div class="s-dz-advantages__slider">
        <component
          :is="isInitSwiper ? Swiper : 'div'"
          v-if="cards?.length"
          v-bind="swiperConfig"
        >
          <SwiperSlide
            v-for="slide in cards"
            :key="slide.text"
            class="s-dz-advantages__slide"
          >
            <span
              v-if="slide.icon"
              class="s-dz-advantages__icon"
            >
              <ASvgMono
                v-if="slide.icon.length < 50"
                :name="slide.icon"
              />
              <AImg
                v-else
                :src="slide.icon"
                :alt="slide.text"
              />              
            </span>
            <div
              class="s-dz-advantages__name a-font_l-m"
              v-html="slide.text"
            />
          </SwiperSlide>
        </component>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SDzAdvantages.scss';
</style>
