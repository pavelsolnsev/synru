<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
}

const {
  entity,
} = defineProps<Props>();

const whyUs = entity.customFields.mba_program_why_choose || [];

const items = whyUs
  .filter(({ text }) => Boolean(text))
  .map(({ text }) => ({ title: text ?? '' }));
</script>

<template>
  <SWhyUs
    v-if="items.length"
    title="Почему выбирают нас"
    :items
  />
</template>
