<script setup lang='ts'>
import type { CourseEntity, Nullable } from '~/types';

interface Props {
  entity?: Nullable<CourseEntity>
}

const { entity = null } = defineProps<Props>();

const {
  learning_program: learningProgram = [],
  bonus_programs = [],
  course_triggers = [],
} = entity?.customFields ?? {};

const year = new Date().getFullYear();
</script>

<template>
  <MSection
    v-if="learningProgram?.length || bonus_programs?.length"
    class="s-course-content"
    title="Содержание курса"
  >
    <span class="a-font_m-m title-tag">
      <ASvgMono name="reload" />
      <span>Обновлено в {{ year }} году</span>
    </span>
    <div class="s-course-content__wrapper">
      <ul
        v-if="course_triggers[0]?.tag_content?.length"
        class="s-course-content__tags a-font_l-m"
      >
        <li
          v-for="tag in course_triggers[0]?.tag_content"
          :key="tag.tag"
          v-html="tag.tag"
        />
      </ul>

      <div
        v-if="learningProgram?.length"
        class="s-course-content__content"
      >
        <p class="s-course-content__flag">Базовые модули</p>
        <ul class="--list">
          <MCourseContentItem
            v-for="(item, idx) in learningProgram"
            :key="idx"
            :module-num="formatNumberWithLeadingZero(idx + 1)"
            :title="item.title || ''"
            :duration="item.duration || ''"
            :description="item.description || ''"
            :result="item.result || ''"
          />
        </ul>
      </div>

      <div
        v-if="bonus_programs?.length"
        class="s-course-content__content"
      >
        <p class="s-course-content__flag">Бонусные модули</p>
        <ul class="--list">
          <MCourseContentItem
            v-for="(item, idx) in bonus_programs"
            :key="idx"
            :module-num="formatNumberWithLeadingZero(idx + 1)"
            :title="item.title || ''"
            :duration="item.duration || ''"
            :description="item.description || ''"
            :result="item.result || ''"
          />
        </ul>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SCourseContent.scss';
</style>
