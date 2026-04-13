<script setup lang="ts">
import type { Fonts } from '~/types';

interface Props {
  quizClass?: string;
  title?: string;
  titleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  bgImages?: { image: string }[];
  tags?: { tag: string }[]
  showBreadcrumbs?: boolean;
  showQuizButton?: boolean;
  showForm?: boolean;
  actionParams?: { param: string }[],
  formBtn?: string,
  quizBtnText?: string;
  routeName?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <SQuiz v-bind="props" />
</template>

<style lang="scss" scoped>
@import './SAdmissionCommitteeQuiz.scss';
</style>
