<script setup lang='ts'>
import type { CourseData } from '~/utils/transformCoursesFilterData';
import { COURSES_DIRECTIONS } from '~/constants/keys';
import { BUSINESS_EDUCATION, OGE_EGE_PODGOTOVKA } from '~/constants/routes';

interface CoursesFilterData {
  courses: CourseData[];
}

interface Props {
  routeName: string;
  entity: {
    id: string;
    name: string;
    long_name: string;
    slug: string;
    properties?: {
      title_for_courses?: string;
    }
  };
}

const { routeName, entity } = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity: entity ?? {} });

const { data: directionsData } = await useFetch('/api/directions/getCoursesDirections', {
  deep: false,
  watch: false,
});

const { data: coursesData } = await useFetch<CoursesFilterData>('/api/getCoursesFilterData', {
  key: COURSES_DIRECTIONS,
  watch: false,
  deep: false,
});

const directions = directionsData.value?.data || [];
const courses: CourseData[] = coursesData.value?.courses || [];

const sortDirections = [...directions].sort((a, b) => a.attributes.rank - b.attributes.rank);

const countsByDirection = computed(() => {
  const map: Record<string, number> = {};
  for (const course of courses) {
    const id = course?.direction?.value;
    if (!id) continue;
    map[id] = (map[id] ?? 0) + 1;
  }
  return map;
});

const directionTitle = entity?.name ? entity?.properties?.title_for_courses || entity.name : '';
</script>

<template>
  <MSection
    class="s-courses-directions"
  >
    <div class="s-courses-directions__content">
      <template v-if="routeName === 'courses_direction'">
        <picture>
          <source
            srcset="/img/courses/direction_intro_bg_lg.webp"
            media="(min-width: 1200px)"
          >
          <source
            srcset="/img/courses/direction_intro_bg_md.webp"
            media="(min-width: 768px)"
          >
          <AImg
            src="/img/courses/direction_intro_bg_sm.webp"
            alt=""
            decoding="async"
          />
        </picture>
        <MBreadcrumbs :breadcrumbs />
      </template>
      <h1
        v-if="directionTitle"
        class="a-font_banner"
        v-html="directionTitle"
      />
      <h2
        v-else
        class="a-font_slider"
      >
        Выберите направление
      </h2>
      <div class="s-courses-directions__list">
        <template
          v-for="item in sortDirections"
          :key="item.attributes.slug"
        >
          <ATag
            v-if="countsByDirection[item.id] > 0"
            :text="item.attributes.name + `<span class='--num a-font_xs-m'>${countsByDirection[item.id]}</span>`"
            :to="`/professions/${item.attributes.slug}#courses-container`"
            font="a-font_l-m"
            variant="fill_white"
            class="s-courses-directions__tag"
            :class="{ '--active': entity?.id == item.id }"
          />
        </template>
        <ATag
          text="MBA"
          :to="BUSINESS_EDUCATION"
          font="a-font_l-m"
          variant="fill_white"
          class="s-courses-directions__tag nonum"
        />
        <ATag
          text="ЕГЭ и ОГЭ"
          :to="OGE_EGE_PODGOTOVKA"
          font="a-font_l-m"
          variant="fill_white"
          class="s-courses-directions__tag nonum"
        />
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SCoursesDirections.scss';
</style>
