<script setup lang="ts">
import type { LevelEntity } from '~/types';

interface Props {
  entity?: LevelEntity | null;
}

const {
  entity = null,
} = defineProps<Props>();

const {
  'level_cards': levelCards = [],
}  = entity?.customFields ?? {};

const facultyEvents = levelCards[0] ?? {};

const title = facultyEvents.title ?? '';
const titleClass = 'a-font_xl-m';
const textClass = 'a-font_m';

const articles = facultyEvents.items
  ? facultyEvents.items.map((item) => {
      return {
        title: item.title ?? '',
        text: item.text ?? '',
        image: item.image ?? '',
      };
    })

  : [];
</script>

<template>
  <SFacultyEvents
    :title
    :title-class
    :text-class
    :articles
  />
</template>
