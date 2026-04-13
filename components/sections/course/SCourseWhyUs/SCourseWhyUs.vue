<script setup lang="ts">
import type { CourseEntity, Nullable, CourseCustomField } from '~/types';
import  mapCustomFields  from '~/utils/mapCustomFields';

interface Props {
  entity?: Nullable<CourseEntity>
}

const { entity = null } = defineProps<Props>();

const {
  for_whom = [],
}: { for_whom: CourseCustomField['for_whom'] } = mapCustomFields(entity?.custom_field_values || []);

const whyUsProps = {
  title: 'Кому подойдёт',
  items: for_whom.map((item) => ({ title: item.title ?? '' })),
};
</script>

<template>
  <SWhyUs v-bind="whyUsProps" />
</template>
