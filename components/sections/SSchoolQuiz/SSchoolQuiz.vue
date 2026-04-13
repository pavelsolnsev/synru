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
  showQuizForm?: boolean;
  quizFormBtnText?: string
  formActions?: { param: string }[]
}

const {
  programsCount = [],
  ...props
} = defineProps<Props>();

const count = programsCount.at(0)?.count;

const ogImage = props.bgImages?.length ? props.bgImages[2]?.image : undefined;

const countIsNumber = (count: number | undefined): count is number => {
  return Boolean(count && !isNaN(Number(count)));
};

let programsQuantity = '';

if (countIsNumber(count)) {
  programsQuantity = declensionOfNumber(count, ['программа', 'программы', 'программ'], true);
}

useSeoMeta({
  ogImage,
});
</script>

<template>
  <SQuizLevel
    v-bind="props"
    :programs-quantity
  />
</template>
