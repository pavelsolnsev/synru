<script setup lang="ts">
import type { LevelCustomFields } from '~/types';
import ProgramCountSlideImage from '~/assets/images/courses/about/1.webp';

const { data } = await useFetch(`/api/levels/ordinatura`, {
  watch: false,
  deep: false,
  transform(res) {
    if (!res) return null;
    return res.data[0];
  },
});

const {
  level_advantages = [],
} = mapCustomFields(data.value?.attributes?.custom_field_values ?? []) as LevelCustomFields;

const about = level_advantages[0] ?? {};

const title = about.title ?? '';
const text = about.text ?? '';

const tags = about.tags
  ? about.tags.map(({ title }) => ({ tag: title }))
  : [];

const icons = [{ icon:'simple-rune' },{ icon:'simple-university' }];

const programs_count = data.value?.attributes?.programs_count ?? 0;

const items = about.advantages
  ? [
      {
        title: String(programs_count),
        text: declensionOfNumber(programs_count,['программа', 'программы', 'программ']),
        image: ProgramCountSlideImage,
        classname: '',
      },
      ...about.advantages.map((advantage) => {
        const title = advantage.title ?? '';
        const image = advantage.image ?? ProgramCountSlideImage;
        const text = advantage.subtitle ?? '';
        const classname = advantage.titleClass ?? '';
        const popupTitle = advantage.popupTitle ?? advantage.title ?? '';
        const popupText = advantage.popupText ?? '';
        return {
          title,
          image,
          text,
          classname,
          popupTitle,
          popupText,
        };
      }),
    ]
  : [];
</script>

<template>
  <SAbout
    :title
    :text
    :tags
    :items
    :icons
  />
</template>
