<script setup lang="ts">
import type { SectionConditionalGroup } from '~/types';

interface Props {
  entity?: {
    id?: number,
    slug: string,
  };
  conditionalGroup?: SectionConditionalGroup[];
}

const {
  entity,
  conditionalGroup = [],
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });
</script>

<template>
  <SChooseDirectionNew
    v-if="showSection"
    type="colleges"
    :name="entity?.slug || ''"
    title="Выберите направления обучения"
  />
</template>

<style scoped lang='scss'>
.s-choose-direction-new :deep(.m-help-choose-card) {
  @include tablet(max) {
    order: unset;
  }
}
</style>