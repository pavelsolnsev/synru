<script setup lang='ts'>
import type { CourseEntity } from '~/types';

interface Props {
  entity?: CourseEntity;
}

const {
  entity = null,
} = defineProps<Props>();

const { course_pluses = [] } = entity?.customFields ?? {};

const icons = [
  'simple-computer',
  'simple-check2',
  'simple-platform',
  'simple-present',
];
</script>

<template>
  <MSection
    v-if="course_pluses?.[0]?.top_list?.length || course_pluses?.[0]?.bottom_list?.length"
    class="s-course-pluses"
    title="Преимущества курса"
  >
    <div
      v-if="course_pluses?.[0]?.top_list?.length"
      class="s-course-pluses__list"
    >
      <div
        v-for="item in course_pluses?.[0]?.top_list"
        :key="item.title"
        class="s-course-pluses__first-item"
      >
        <AImg
          :src="item.image"
          :alt="item.title"
          decoding="async"
          loading="lazy"
        />
        <div
          v-if="item.title || item.text"
          class="s-course-pluses__first-item-content"
        >
          <p
            class="a-font_h5"
            v-html="item.title"
          />
          <p
            class="a-font_l-m"
            v-html="item.text"
          />
        </div>
      </div>
    </div>

    <div
      v-if="course_pluses?.[0]?.bottom_list?.length"
      class="s-course-pluses__list --col4"
    >
      <div
        v-for="(item, idx) in course_pluses?.[0]?.bottom_list"
        :key="item.title"
        class="s-course-pluses__second-item"
      >
        <p
          class="a-font_h6 s-course-pluses__second-item-title"
          v-html="item.title"
        />
        <p
          class="a-font_m-m"
          v-html="item.text"
        />
        <ASvgMono :name="icons[idx]" />
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SCoursePluses.scss';
</style>
