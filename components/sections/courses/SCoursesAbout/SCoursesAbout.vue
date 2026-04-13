<script setup lang="ts">
import ProgramFactoidImage from '~/assets/images/courses/about/1.webp';
import declensionOfNumber  from '~/utils/declensionOfNumber';

interface Props {
  title?: string;
  text?: string;
  tags?:  Array<{ tag: string }>;
  icons?: Array<{ icon: string }>;
  content?: string;
  factoids?: Factoid[];
  coursesCount?: Array<{ count: number }>
  expressCoursesCount?: Array<{ count: number }>
  routeName?: string;
}

interface Factoid {
  title?: string;
  text?: string;
  classname?: string;
  imageLg?: string;
  imageMd?: string;
  image?: string;
}

const {
  coursesCount = [],
  expressCoursesCount = [],
  factoids = [],
  routeName,
  ...props
} = defineProps<Props>();

const COURSES_ROUTE_NAME = 'professions';

const countByRouteName = routeName === COURSES_ROUTE_NAME ? coursesCount : expressCoursesCount;

const coursesCountFactoid = countByRouteName.reduce((_, item) => {
  const count = item.count;

  const declensionText =  declensionOfNumber(count, ['программа', 'программы', 'программ']);

  const coursesText = `${declensionText} дополнительного образования`;

  const expressCoursesText = `${declensionText}  дополнительного образования в&nbsp;единой подписке`;

  const text = routeName === COURSES_ROUTE_NAME ? coursesText : expressCoursesText;

  return {
    image: ProgramFactoidImage,
    title: count.toString(),
    text,
  };
}, {} as Factoid);

const items: Factoid[] = [
  coursesCountFactoid,
  ...factoids,
];
</script>

<template>
  <SAbout
    v-bind="props"
    item-title-class="a-font_h4"
    :items
    :route-name
  />
</template>
