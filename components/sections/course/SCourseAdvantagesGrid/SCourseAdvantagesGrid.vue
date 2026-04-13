<script setup lang="ts">
import type { CourseEntity, Nullable, CourseCustomField } from '~/types';
import  mapCustomFields  from '~/utils/mapCustomFields';

interface Props {
  entity?: Nullable<CourseEntity>
}

const { entity = null } = defineProps<Props>();

const {
  what_learn = [],
}: { what_learn: CourseCustomField['what_learn'] } = mapCustomFields(entity?.custom_field_values || []);

const advantagesProps = {
  title: 'Чему вы научитесь',
  items: what_learn.map((item) => ({ text: item.title ?? '' })),
};
</script>

<template>
  <SAdvantagesGrid v-bind="advantagesProps" />
</template>
