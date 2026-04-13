<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';

interface Props {
  title?: string;
  titleClass?: string;
  titleColor?: string;
  imageLg?: string;
  imageMd?: string;
  imageSm?: string;
  items?: { title: string }[];
  entity: {
    customFields?: {
      'seo-pluses': Array<{
        items: Array<{
          title: string;
        }>,
        title: string;
        titleColor: string;
        imageLg: string;
        imageMd: string;
        imageSm: string;
      }>;
      [key: string]: unknown;
    };
  }
}

const props = defineProps<Props>();

const seoPluses = props.entity?.customFields?.['seo-pluses']?.at(0);

const title = seoPluses?.title ?? props.title ?? 'Преимущества <br>колледжа';
const color = seoPluses?.titleColor ?? props.titleColor ?? '';
const imgLg = seoPluses?.imageLg ?? props.imageLg ?? '';
const imgMd = seoPluses?.imageMd ?? props.imageMd ?? '';
const imgSm = seoPluses?.imageSm ?? props.imageSm ?? '';
const items = seoPluses?.items ?? props.items ?? [];

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

const classes = [
  color === 'black' ? 'color-black' : '',
  props.titleClass ? props.titleClass : 'a-font_h4',
];
</script>

<template>
  <MSection class="s-pluses">
    <div class="s-pluses__banner">
      <h2
        class="s-pluses__title"
        :class="classes"
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
          v-for="item in items"
          :key="item.title"
          class="s-pluses__item"
        >
          <ASvgMono name="simple-check3" />
          <p
            class="a-font_l-m"
            v-html="item.title"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </MSection>
</template>
<style scoped lang='scss'>
@import './SSeoPluses.scss';
</style>
