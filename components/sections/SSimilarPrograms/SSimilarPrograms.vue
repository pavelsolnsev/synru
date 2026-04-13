<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import type { ProgramCard } from '~/types/ProgramCard';

interface Props {
  entity?: {
    customFields: {
      similar_programs: {
        title: string;
        programsIds: string;
      }[]
    };
  };
}

const {
  entity = null,
} = defineProps<Props>();

const {
  similar_programs,
} = entity?.customFields ?? {};

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
}  = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperScrollbar: true,
  showSwiperNavigation: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance:true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});

const { data } = await useFetch('/api/getProgramFiltersData', {
  watch: false,
  deep: false,
});

const {
  programs: cards = [],
} = (data.value || {}) as { programs?: ProgramCard[] };

const programsIds = similar_programs?.[0]?.programsIds
  ? new Set(similar_programs[0].programsIds.split(', '))
  : new Set();

const filterPrograms = programsIds.size
  ? cards.filter((card) => card.type === 'programs' && programsIds.has(card.id))
  : [];
</script>

<template>
  <MSection
    v-if="filterPrograms.length"
    class="s-similar-programs"
  >
    <h2 class="a-font_h3 s-similar-programs__title">
      {{ similar_programs?.[0]?.title || 'Похожие программы' }}
      <ASvgMono name="simple-like" />
    </h2>
    <div class="s-similar-programs__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="slide in filterPrograms"
          :key="slide.id"
          class="s-similar-programs__slide"
        >
          <p class="a-font_m-m s-similar-programs__slide-level">
            {{ slide.level.text }}
            <ASvgMono name="simple-like" />
          </p>
          <p class="a-font_xl-m s-similar-programs__slide-title">{{ slide.name }}</p>
          <AButton :to="slide.link">Поступить</AButton>
        </SwiperSlide>
      </Swiper>
      <MSwiperNav ref="navRef" />
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SSimilarPrograms.scss';
</style>
