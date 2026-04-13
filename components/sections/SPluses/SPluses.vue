<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';

interface Props {
  title?: string
  imgLg?: string
  imgMd?: string
  imgSm?: string
  items?: { title: string }[]
}

const {
  title = 'Преимущества <br>колледжа',
  imgLg = '',
  imgMd = '',
  imgSm = '',
  items = [],
} = defineProps<Props>();


const {
  swiperConfig,
} = useSwiperWrapper({
  enabled: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
  breakpoints: {
    1200: {
      enabled: false,
    },
  },
});
</script>

<template>
  <MSection class="s-pluses">
    <div class="s-pluses__banner">
      <h2
        class="a-font_h4"
        v-html="title"
      />
      <picture>
        <source
          v-if="imgLg"
          :srcset="imgLg"
          media="(min-width: 1200px)"
        >
        <source
          v-if="imgMd"
          :srcset="imgMd"
          media="(min-width: 768px)"
        >
        <AImg
          :src="imgSm"
          :alt="title"
          decoding="async"
          loading="lazy"
        />
      </picture>
    </div>
    <div v-if="items.length">
      <Swiper v-bind="swiperConfig">
        <SwiperSlide
          v-for="item, idx in items"
          :key="item.title"
          class="s-pluses__item"
        >
          <p class="s-pluses__num a-font_l-m">{{ formatNumberWithLeadingZero(idx + 1) }}</p>
          <p
            class="a-font_xl-m"
            v-html="item.title"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </MSection>
</template>
<style scoped lang='scss'>
@import './SPluses.scss';
</style>
