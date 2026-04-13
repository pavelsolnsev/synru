<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import type { FormsTrainingSlug, FormsTrainingResponse } from '~/types';
import { KEYS } from '~/constants';

interface Props {
  title?: string;
  hasEntity?: boolean;
  entity?: { id: number } | null;
}

const {
  title = 'Формы обучения',
  entity = null,
  hasEntity = false,
} = defineProps<Props>();

const TrainingFormsAdditionalDataMapping: Record<FormsTrainingSlug, { icon: string, label: string }> = {
  'full-time': { icon:'training_13174', label: 'Очная' },
  'part-time': { icon: 'training_13175', label: 'Заочная' },
  'full-part-time': { icon: 'training_13171', label: 'Очно-заочная' },
  'online': { icon: 'training_20641', label: 'Онлайн' },
  'evening': { icon: 'training_13170', label: 'Вечерняя' },
  'weekend': { icon: 'training_13169', label: 'Выходного дня' },
};

const formsTraining = hasEntity
  ? await getFormsTrainingByEntity()
  : await getFormsTraining();

async function getFormsTrainingByEntity() {
  if (!entity) return [];

  const { data } = await useFetch(`/api/programs/getFormsByProgramId/${entity.id}`, {
    deep: false,
    watch: false,
  });

  if (!data.value) return [];

  return mapFormsTraining(data.value);
}

async function getFormsTraining() {
  const { data } = await useFetch('/api/forms/getForms', {
    key: KEYS.FORMS_TRAINING,
    deep: false,
    watch: false,
    getCachedData(key, nuxtApp) {
      const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      return data ? data : undefined;
    },
    transform(res) {
      if (!res) return [];
      return mapFormsTraining(res);
    },
  });

  return data.value;
}

function mapFormsTraining(forms: FormsTrainingResponse) {
  return forms.data
    .sort((a,b) => a.attributes.rank - b.attributes.rank)
    .map((form) => ({
      label: TrainingFormsAdditionalDataMapping[form.attributes.slug]?.label ?? form.attributes.short_name,
      content: form.attributes.description,
      logo: TrainingFormsAdditionalDataMapping[form.attributes.slug]?.icon ?? 'training_13172',
    }));
}

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
}  = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSectionSecond
    v-if="formsTraining && formsTraining.length"
    class="s-forms-training"
    :title
  >
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      slides-per-view="auto"
      class="s-forms-training__slider"
    >
      <swiper-slide
        v-for="item in formsTraining"
        :key="item.label"
        class="s-forms-training__item swiper-slide"
      >
        <div class="s-forms-training__item-title a-font_h4">
          <ASvgMono :name="item.logo" />
          <span v-html="item.label" />
        </div>
        <div
          class="s-forms-training__item-content a-font_xl"
          v-html="item.content"
        />
      </swiper-slide>
      <MSwiperNav ref="navRef" />
    </swiper>

    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </MSectionSecond>
</template>

<style lang="scss" scoped>
@import './SFormsTrainingSecond.scss';
</style>
