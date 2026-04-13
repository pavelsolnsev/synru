<script setup lang="ts">
import type { Fonts } from '~/types';
import declensionOfNumber from '~/utils/declensionOfNumber';

interface Props {
  title?: string;
  titleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  bgImages?: { image: string }[];
  tagIcon?: string;
  showBreadcrumbs?: boolean;
  showQuizButton?: boolean;
  quizBtnText?: string;
  programsCount?: Array<{ count: number }>;
  showFormButton?: boolean;
  quizFormBtnText?: string;
  formTitleText?: string;
  formBtnText?: string;
  formActions?: { param: string }[]
  showQuizForm?: boolean;
}

const {
  programsCount = [],
  ...props
} = defineProps<Props>();

const count = programsCount.at(0)?.count;

const countIsNumber = (count: number | undefined): count is number => {
  return Boolean(count && !isNaN(Number(count)));
};

let programsQuantity = '';

if (countIsNumber(count)) {
  programsQuantity = declensionOfNumber(count, ['программа', 'программы', 'программ'], true);
}
</script>

<template>
  <SQuizLevel
    v-bind="props"
    :programs-quantity
  />
</template>
