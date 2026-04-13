<script setup lang="ts">
import type { SectionConditionalGroup } from '~/types';

interface Props {
  entity?: { id?: number };
  conditionalGroup?: SectionConditionalGroup[];
  title?: string;
}

const {
  entity = {},
  conditionalGroup = [],
  ...props
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });
</script>

<template>
  <SRegionsLocal
    v-if="showSection"
    v-bind="props"
  />
</template>
