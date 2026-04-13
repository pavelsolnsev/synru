<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Grid, Scrollbar } from 'swiper/modules';
import type { SectionConditionalGroup } from '~/types';

interface Props {
  title?: string;
  gallery?: { image?: string }[];
  entity: {
    id: number;
    customFields?: {
      'seo-gallery-grid': Array<{
        title: string;
        gallery: Array<{
          image: string;
        }>;
      }>;
      [key: string]: unknown;
    };
  };
  conditionalGroup?: SectionConditionalGroup[];
}

const props = defineProps<Props>();

const title = props.entity.customFields?.['seo-gallery-grid']?.at(0)?.title || (props.title || 'Что будет в&nbsp;колледже');
const gallery = props.entity.customFields?.['seo-gallery-grid']?.at(0)?.gallery || (props.gallery || []);

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Grid, Scrollbar],
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance:true,
  resistanceRatio: 0,
  showSwiperScrollbar: true,
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
  },
  breakpoints: {
    768: {
      slidesPerView: 3,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },

    1200: {
      slidesPerView: 4,
      grid: {
        rows: 2,
        fill: 'row',
      },
    },
  },
});

const showSection = typeof props?.conditionalGroup !== 'undefined' ? needRenderSection({ conditionalGroup: props?.conditionalGroup, data: { entityId: props.entity?.id } }) : true;
</script>

<template>
  <MSection
    v-if="showSection && gallery.length"
    :title
    class="s-gallery-grid"
  >
    <div class="s-gallery-grid__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="item in gallery"
          :key="item.image"
          class="s-gallery-grid__slide"
        >
          <AImg
            :src="item.image"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </SwiperSlide>
      </Swiper>
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SSeoGalleryGrid.scss';
@import 'swiper/css/grid';
</style>
