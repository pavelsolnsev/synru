<script setup lang="ts">
import type { SectionConditionalGroup } from '~/types';

interface Props {
  entity?: { id?: number };
  conditionalGroup?: SectionConditionalGroup[];
}

const {
  entity = {},
  conditionalGroup = [],
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });
</script>

<template>
  <SPrices v-if="showSection" />
</template>
