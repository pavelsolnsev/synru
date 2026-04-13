<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import { raitings as defaultRatings } from '~/components/sections/SInfoRatings/rationgs-data';

interface Raiting {
  name: string;
  subname?: string;
  link?: string;
  organization: string;
  logo?: string;
  year?: string;
  position: number | string;
  difference: string;
  image?: string;
}

const {
  raitings: propsRatings = [],
  title = '',
  titleClass = 'a-font_h4',
} = defineProps<{
  title?: string;
  titleClass?: string;
  raitings: Raiting[];
}>();

const raitings = propsRatings?.length
  ? propsRatings
  : defaultRatings;

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});

const defaultImage = synergyApi('uploads/content/s-ratings/star.svg');
</script>

<template>
  <MSection
    :title="title"
    :title-class="titleClass"
    class="s-ratings"
  >
    <div class="s-ratings__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <Swiper-Slide
          v-for="(item, index) in raitings"
          :key="index"
        >
          <MRatingCard
            class="s-ratings__slide"
            :position="item.position"
            :organization="item.organization"
            :year="item.year"
            :image="item.image ?? defaultImage"
            :name="item.name"
          />
        </Swiper-Slide>
      </Swiper>
      <MSwiperNav ref="navRef" />
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style lang="scss" src="./SRatings.scss" scoped />
