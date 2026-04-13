<script setup lang="ts">
import ProgramCountSlideImage from '~/assets/images/courses/about/1.webp';
import type { LevelEntity } from '~/types';

interface Props {
  entity?: LevelEntity | null;
  counts?: Record<string, { programs_count: number }>;
}

const {
  entity = {},
  counts = {},
} = defineProps<Props>();

const levelProgramsCount = entity?.slug && counts[entity.slug] ? counts[entity.slug].programs_count : 0;

const {
  'level_advantages': advantages = [],
  'quiz_icon': aboutIcon = 'simple-stars',
}  = entity?.customFields ?? {};

const levelAbout = advantages[0] ?? {};

const title = levelAbout.title ?? '';
const text = levelAbout.text ?? '';
const tags = levelAbout.tags?.map(({ title = '' }) => ({ tag: title })) ?? [];
const icons = [{ icon: 'simple-hat' }, { icon: aboutIcon }];
const advantagesList = levelAbout.advantages ?? [];

const items = [
  {
    title: levelProgramsCount?.toString(),
    text: declensionOfNumber(levelProgramsCount, ['программа', 'программы', 'программ']),
    image: ProgramCountSlideImage,
  },
  ...advantagesList
    .map((item) => {
      return {
        title: item.title ?? '',
        text: item.subtitle ?? '',
        image: item.image ?? ProgramCountSlideImage,
        classname: item.titleClass ?? '',
        popupTitle: item.popupTitle ?? item.title ?? '',
        popupText: item.popupText ?? '',
      };
    }),
];
</script>

<template>
  <SAbout
    v-if="title || text"
    :title
    :text
    :tags
    :icons
    :items
  />
</template>
