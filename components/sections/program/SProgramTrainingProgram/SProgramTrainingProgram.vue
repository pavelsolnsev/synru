<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { useMediaQuery } from '@vueuse/core';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import  formatNumberWithLeadingZero  from '~/utils/formatNumberWithLeadingZero';
import type { ProgramEntity, AccordionItem } from '~/types';

interface Props {
  entity?: ProgramEntity | null;
}

const { entity = null } = defineProps<Props>();

const isMobileScreen = useMediaQuery('(max-width: 1199px)');

const learningProgram = entity?.customFields?.learning_program || [];

const trainingProgram = ref<AccordionItem[]>(learningProgram.map((program, index) => {
  return {
    title: { text: program.title ?? '', className: 'a-font_h6' },
    icon: 'simple-plus',
    itemKey: `program${index}`,
    isOpen: index === 0 ? true : false,
    customContent: formatProgramTrainingAnswer(program.description ?? ''),
  } as AccordionItem;
}));

function formatProgramTrainingAnswer(content: string): string[] {
  if (!content.includes('</li>')) {
    return [content.trim()];
  }

  const matches = content.match(/<li[^>]*>([\s\S]*?)<\/li>/g);

  if (!matches) {
    return [content.trim()];
  }

  return matches.map(li => {
    const inner = li.replace(/<li[^>]*>|<\/li>/g, '');
    return inner.trim();
  });
}

const {
  swiperRef,
  swiperConfig,
} = useSwiperWrapper({
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});
</script>

<template>
  <MSection
    v-if="trainingProgram.length"
    class="s-training-program"
    title="Учебная программа"
  >
    <MAccordionItem
      v-for="item, index in trainingProgram"
      :key="index"
      :title="item.title"
      :item-key="item.itemKey"
      :is-open="item.isOpen"
      :icon="item.icon"
      @triggered="item.isOpen = !item.isOpen"
    >
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
        :allow-touch-move="isMobileScreen ? true : false"
        :grab-cursor="isMobileScreen ? true : false"
      >
        <template #wrapper-start>
          <swiper-slide
            v-for="slideText, slideIndex in item.customContent"
            :key="slideIndex"
            class="swiper-slide s-training-program__item"
          >
            <div class="s-training-program__item-head">
              <div class="s-training-program__item-num a-font_l-m">
                {{ formatNumberWithLeadingZero(slideIndex + 1) }}
              </div>
            </div>
            <div
              class="s-training-program__item-text a-font_xs-m"
              v-html="slideText"
            />
          </swiper-slide>
        </template>
      </swiper>
    </MAccordionItem>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SProgramTrainingProgram.scss';
</style>
