<script setup lang="ts">
import type { Fonts } from '~/types';

interface Props {
  quizClass?: string;
  title?: string;
  titleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  bgImages?: { image: string }[];
  showBreadcrumbs?: boolean;
  showQuizButton?: boolean;
  quizBtnText?: string;
  entity?: object;
  routeName?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <SQuiz
    v-bind="props"
    show-form
    :action-params="[{param: 'form=pervyy_ekran'}]"
  />
</template>

<style lang="scss" scoped>
@import './SContactsQuiz.scss';
</style>
