<script setup lang="ts">
import type { EntityCount, Fonts } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  bgImages?: Array<{ image: string }>;
  tagIcon?: string;
  showBreadcrumbs?: boolean;
  showQuizButton?: boolean;
  quizBtnText?: string;
  routeName?: string;
  entities: EntityCount;
  showQuizForm?: boolean;
  formActions?: { param: string }[]
  quizFormBtnText?: string;
}

const {
  entities = {},
  ...props
} = defineProps<Props>();

const ABROAD_EDUCATION_ENTITY = 'international';

const abroadProgramsCount = entities[ABROAD_EDUCATION_ENTITY]?.programs_count;

const programsQuantity = abroadProgramsCount
  ? declensionOfNumber(
      abroadProgramsCount,
      ['программа', 'программы', 'программ'],
      true,
    )
  : '';
</script>

<template>
  <SQuizLevel
    :programs-quantity
    v-bind="props"
  />
</template>
