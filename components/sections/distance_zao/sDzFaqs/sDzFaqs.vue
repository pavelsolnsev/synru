<script setup lang="ts">
import { faqsDistance, faqsZao } from './sDzFaqsData';

interface Props {
  routeName: string;
  title?: string;
}

const {
  routeName = 'distance_university',
  title = 'Часто задаваемые вопросы',
} = defineProps<Props>();

const faqsData = {
  'distance_university': faqsDistance,
  'zao_university': faqsZao,
}

const faqsItems = computed(() => {
  return faqsData[routeName as keyof typeof faqsData];
});
</script>

<template>
  <SFaqMin
    :items="faqsItems"
    title-class="a-font_h2"
    items-title-class="a-font_h6"
    items-text-class="a-font_l-m"
    :show-form="true"
    :is-new-responsive="true"
  />
</template>