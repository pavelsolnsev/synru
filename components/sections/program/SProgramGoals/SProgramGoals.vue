<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import mapCustomFields from '~/utils/mapCustomFields';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import type { ProgramEntity, ProgramCustomField } from '~/types';

interface Props {
  entity?: ProgramEntity | null;
}

const { entity } = defineProps<Props>();

const { goals = [] }: { goals: ProgramCustomField['goals'] } = mapCustomFields(entity?.custom_field_values ?? []);

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
    v-if="goals.length"
    class="s-goals"
    title="Цели и задачи программы"
  >
    <div class="s-goals__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <MArticleCard
            v-for="item, index in goals"
            :key="index"
            class="swiper-slide"
            :title="item.title ?? ''"
            title-class="a-font_h5"
            :text="item.text ?? ''"
            text-class="a-font_l"
            :image="item.image ?? ''"
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
@import './SProgramGoals.scss';
</style>
