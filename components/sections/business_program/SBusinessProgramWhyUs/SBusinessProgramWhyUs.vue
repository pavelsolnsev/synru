<script setup lang="ts">
import type { BusinessProgramEntity } from '~/types';

interface Props {
  entity: BusinessProgramEntity;
}

const {
  entity,
} = defineProps<Props>();

const {
  's-program-why': whyUs = {},
} = mapBusinessProgramBlocks(entity.properties.blocks);

const { items = [] } = Array.isArray(whyUs) ? {} : whyUs;
</script>

<template>
  <SWhyUs
    v-if="items.length"
    title="Почему выбирают нас"
    :items
  />
</template>
