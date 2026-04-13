<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import mapCustomFields from '~/utils/mapCustomFields';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import type { ProgramEntity, ProgramCustomField } from '~/types';

interface Props {
  entity: ProgramEntity | null;
}

const { entity = null } = defineProps<Props>();

const { what_learn = [] }: { what_learn: ProgramCustomField['what_learn'] } = mapCustomFields(entity?.custom_field_values || []);

const mapWhatLearn = what_learn.map((item) => {
  return {
    title: item.title ?? '',
    list: item.text ?? '',
  };
});

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
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection
    v-if="mapWhatLearn.length"
    title="Что вы будете изучать"
    class="s_what_study"
  >
    <div class="s_what_study__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <MCardList
            v-for="item, index in mapWhatLearn"
            :key="index"
            class="swiper-slide"
            :title="item.title"
            :list="item.list"
          />
        </template>
      </swiper>
      <MSwiperNav ref="navRef" />

      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SProgramWhatStudy.scss';
</style>
