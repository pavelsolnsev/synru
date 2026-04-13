<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Grid } from 'swiper/modules';
import { useWindowSize } from '@vueuse/core';
import { defaultPartnersLogos } from '~/components/sections/shared/SPartners/partners-data';

interface Props {
  icon?: string;
  title?: string;
  text?: string;
  items?: { icon?: string }[];
  line?: boolean;
  routeName?: string;
  entity?: {
    customFields?: {
      'seo-employment': Array<{
        'title': string,
        'text': string,
        'icon': string,
        'items': {
          icon: string;
        }[]
      }>,
      [key: string]: unknown;
    };
  }
}

const props = defineProps<Props>();

const title = props?.entity?.customFields?.['seo-employment']?.at(0)?.title || (props.title || 'Трудоустройство <br>после обучения');
const text = props?.entity?.customFields?.['seo-employment']?.at(0)?.text || (props.text || '');
const icon = props?.entity?.customFields?.['seo-employment']?.at(0)?.icon || (props.icon || '');
const items = props?.entity?.customFields?.['seo-employment']?.at(0)?.items || (props.items || []);
const routeName = props.routeName || '';

const { width: windowWidth } = useWindowSize();

const {
  swiperConfig,
} = useSwiperWrapper({
  modules: [Grid],
  enabled: true,
  grabCursor: true,
  slidesPerView: 2,
  spaceBetween: windowWidth.value / 360 * 8,
  resistance: true,
  resistanceRatio: 0,
  grid: {
    rows: 2,
    fill: 'row',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: windowWidth.value / 768 * 8,
      grid: {
        rows: 3,
        fill: 'row',
      },
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: windowWidth.value / 1920 * 20,
      grid: {
        rows: 3,
        fill: 'row',
      },
    },
  },
});

const part = Math.ceil(defaultPartnersLogos.length / 3);

const lines = [
  defaultPartnersLogos.slice(0, part),
  defaultPartnersLogos.slice(part, defaultPartnersLogos.length - part),
  defaultPartnersLogos.slice(defaultPartnersLogos.length - part),
];
</script>

<template>
  <MSection class="s-employment">
    <div class="s-employment__banner">
      <h2
        class="a-font_h4"
        v-html="title"
      />
      <p
        v-if="text"
        class="a-font_xl-m s-employment__banner-text"
        v-html="text"
      />
      <AImg
        v-if="icon"
        :src="icon"
        :class="routeName === 'magistracy_new' ? 'big' : undefined"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
    <div
      v-if="items.length"
      class="s-employment__slider"
      :class="line ? 's-employment__slider_mobile' : undefined"
    >
      <Swiper v-bind="swiperConfig">
        <SwiperSlide
          v-for="(item,idx) in items"
          :key="idx"
          class="s-employment__slide"
        >
          <AImg
            :src="item.icon"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </SwiperSlide>
      </Swiper>
    </div>
    <div
      v-if="line"
      class="s-employment__lines"
    >
      <div
        class="s-employment__line"
        :style="`--slide-count:${lines[0].length}`"
      >
        <div
          v-for="({ image }, idx) in lines[0]"
          :key="image"
          class="s-employment__item"
          :style="`--n:${idx}`"
        >
          <AImg
            loading="lazy"
            decoding="async"
            :src="image"
            :alt="image"
          />
        </div>
      </div>

      <div
        class="s-employment__line"
        :style="`--slide-count:${lines[1].length}`"
      >
        <div
          v-for="({ image }, idx) in lines[1]"
          :key="image"
          class="s-employment__item --toRight"
          :style="`--n:${idx}`"
        >
          <AImg
            loading="lazy"
            decoding="async"
            :src="image"
            :alt="image"
          />
        </div>
      </div>

      <div
        class="s-employment__line"
        :style="`--slide-count:${lines[2].length}`"
      >
        <div
          v-for="({ image }, idx) in lines[2]"
          :key="image"
          class="s-employment__item"
          :style="`--n:${idx}`"
        >
          <AImg
            loading="lazy"
            decoding="async"
            :src="image"
            :alt="image"
          />
        </div>
      </div>
    </div>
  </MSection>
</template>
<style scoped lang='scss'>
@import './SSeoEmployment.scss';
@import 'swiper/css/grid';
</style>
