<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import type { FormsTrainingSlug, FormsTrainingResponse } from '~/types';
import { KEYS } from '~/constants';

interface Props {
  title?: string;
  formats?: { name: string }[];
}

const {
  title = 'Формы обучения',
  formats = [],
} = defineProps<Props>();

const TrainingFormsAdditionalDataMapping: Record<FormsTrainingSlug, { icon: string, label: string }> = {
  'full-time': { icon:'training_13173', label: 'Очная' },
  'part-time': { icon: 'training_13172', label: 'Заочная' },
  'full-part-time': { icon: 'training_13171', label: 'Очно-заочная' },
  'online': { icon: 'training_20641', label: 'Онлайн' },
  'evening': { icon: 'training_13170', label: 'Вечерняя' },
  'weekend': { icon: 'training_13169', label: 'Выходного дня' },
};

const formsTraining = formats
  ? await getFormsTrainingByEntity()
  : await getFormsTraining();

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

async function getFormsTrainingByEntity() {
  const items = await getFormsTraining();
  return items?.filter((item) => formats?.map((x) => x.name)?.includes(item.label));
}

function mapFormsTraining(forms: FormsTrainingResponse) {
  return forms.data
    .sort((a,b) => a?.attributes?.rank - b?.attributes?.rank)
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
  <MSection
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
          <span v-html="item.label" />
          <ASvgMono :name="item.logo" />
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
  </MSection>
</template>

<style lang="scss" scoped>
@import './SFormsTraining.scss';
</style>
