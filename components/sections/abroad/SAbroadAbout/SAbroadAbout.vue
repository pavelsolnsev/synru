<script setup lang="ts">
import ProgramCountSlideImage from '~/assets/images/courses/about/1.webp';
import type { EntityCount } from '~/types/common';

interface Props {
  title?: string;
  text?: string;
  tags?: { tag: string }[];
  icons?: { icon: string }[];
  content?: string;
  items?: Item[];
  entities: EntityCount;
}

interface Item {
  title?: string;
  text?: string;
  classname?: string;
  imageLg?: string;
  imageMd?: string;
  image?: string;
}

const {
  content = '',
  icons = [],
  tags = [],
  text = '',
  title = '',
  items:rawItems = [],
  entities = {},
} = defineProps<Props>();

const ABROAD_EDUCATION_ENTITY = 'international';

const count = entities[ABROAD_EDUCATION_ENTITY]?.programs_count;

const programsCountText = count
  ? declensionOfNumber(
      count,
      ['программа', 'программы', 'программ'],
    )
  : '';

const firstItem: Item = {
  title: count ? count.toString() : '',
  text: programsCountText,
  image: ProgramCountSlideImage,
};

const items = [
  firstItem,
  ...rawItems,
].filter((item) => Boolean(item.title));
</script>

<template>
  <SAbout
    :title
    :text
    :icons
    :tags
    :content
    :items
  />
</template>
