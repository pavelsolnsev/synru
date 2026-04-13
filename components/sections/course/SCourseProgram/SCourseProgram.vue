<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import type { CourseEntity, Nullable } from '~/types';

interface Props {
  entity?: Nullable<CourseEntity>
}

const { entity = null } = defineProps<Props>();

const { width: windowWidth } = useWindowSize();

const { learning_program: learningProgram = [] } = entity?.customFields ?? {};

const isShowMoreElementsButton = ref(false);

const hideElements = computed(() => {
  const isNarrowScreen = windowWidth.value < 1200;
  const isLearningProgramLong = learningProgram.length > 5;

  return isNarrowScreen && isLearningProgramLong  && isShowMoreElementsButton.value;
});

onMounted(() => {
  isShowMoreElementsButton.value = windowWidth.value < 1200 && learningProgram.length > 5;
});

watch(windowWidth, () => {
  if (windowWidth.value < 1200) isShowMoreElementsButton.value = true;
});

function formatProgramDuration(duration: string) {
  const isDurationWithWord = duration.split(' ').length > 1;
  if (isDurationWithWord) return duration;

  return declensionOfNumber(+duration, ['час', 'часа', 'часов'], true);
}
</script>

<template>
  <MSection
    v-if="learningProgram.length"
    class="s-courses-program"
    title="Программа обучения"
  >
    <div class="s-courses-program__wrap">
      <div
        v-for="item, index in learningProgram"
        :key="index"
        class="s-courses-program__item a-font_h6"
        :class="{'hidden': index > 4 && hideElements}"
      >
        <div class="s-courses-program__item-module">
          {{ `${index + 1} Модуль.` }}
        </div>
        <div
          class="s-courses-program__item-title"
          v-html="item.title"
        />
        <div
          v-if="item.duration"
          class="a-font_m-m s-courses-program__item-time"
          v-html="formatProgramDuration(item.duration)"
        />
      </div>
    </div>
    <AButtonThird
      v-if="isShowMoreElementsButton"
      class="s-courses-program__btn"
      @click="isShowMoreElementsButton = false"
    >
      <span>Показать все</span>
    </AButtonThird>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCourseProgram.scss';
</style>
