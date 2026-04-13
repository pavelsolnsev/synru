<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
}

const {
  entity,
} = defineProps<Props>();

const advantages = entity.customFields.mba_program_get || [];

const items = advantages
  .filter(({ text }) => Boolean(text))
  .map(({ text }) => ({ text: text ?? '' }))

</script>

<template>
  <SAdvantagesGrid
    v-if="items.length"
    title="Вы получите"
    :items
  />
</template>
