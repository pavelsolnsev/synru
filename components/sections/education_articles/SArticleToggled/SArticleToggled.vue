<script setup lang="ts">
import type { AccordionItem } from '~/types';

interface Props {
  items?: AccordionItem[]
}

const {
  items = [],
} = defineProps<Props>();
</script>

<template>
  <div class="s-article-toggled">
    <MAccordion :items />
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleToggled.scss';
</style>
