<script setup lang="ts">
import type { Fonts } from '~/types';
import  declensionOfNumber  from '~/utils/declensionOfNumber';
import { quizCoursesSlides } from '~/components/molecules/MQuiz/newMQuizData';

interface Props {
  quizClass?: string;
  title?: string;
  titleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  bgImages?: { image: string }[];
  tagIcon?: string;
  showBreadcrumbs?: boolean;
  showQuizButton?: boolean;
  quizBtnText?: string;
  coursesCount?: Array<{ count: number }>;
  expressCoursesCount?: Array<{ count: number }>;
  routeName?: string;
}

const {
  coursesCount = [],
  expressCoursesCount = [],
  routeName,
  ...props
} = defineProps<Props>();

const COURSES_ROUTE_NAME = 'professions';

const count = routeName === COURSES_ROUTE_NAME ? coursesCount : expressCoursesCount;

const programsQuantity = count?.length
  ? count.reduce((acc, item) => {
      const count = item.count;
      if (!count) return '';
      const text = declensionOfNumber(count, ['программа', 'программы', 'программ'], true);

      acc += text;
      return acc;
    }, '')

  : '';
</script>

<template>
  <SQuizLevel
    v-bind="props"
    :programs-quantity
    :route-name
    :slides="quizCoursesSlides"
  />
</template>
