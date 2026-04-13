<script setup lang="ts">
import type { SectionConditionalGroup } from '~/types';

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  entity?: { id: number }
}

const {
  conditionalGroup = [],
  entity,
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });
</script>

<template>
  <div v-if="showSection">
    Секция S-Conditional-Example<br>
    conditionalType - {{ conditionalGroup[0].conditionalType }}<br>
    conditional - {{ conditionalGroup[0].conditional }}<br>
    _____________________
  </div>
</template>

