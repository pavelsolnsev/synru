<script setup lang="ts">
import type { BusinessProgramEntity } from '~/types';

interface Props {
  entity: BusinessProgramEntity;
}

const {
  entity,
} = defineProps<Props>();

const {
  's-program-get': programGet = {},
} = mapBusinessProgramBlocks(entity.properties.blocks);

const { items: advantages = [] } = Array.isArray(programGet) ? {} : programGet;

const items = advantages
  .map(({ title }) => ({ text: title ?? '' }))
  .filter(({ text }) => Boolean(text));
</script>

<template>
  <SAdvantagesGrid
    v-if="items.length"
    title="Вы получите"
    :items
  />
</template>
