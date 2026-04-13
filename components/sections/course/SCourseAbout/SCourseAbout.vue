<script setup lang="ts">
import type { Fonts, CourseEntity } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  teachersTitle?: string;
  entity?: CourseEntity | null;
}

const {
  title = 'О программе',
  titleClass = 'a-font_h4',
  teachersTitle = 'Ведущие преподаватели',
  entity = null,
} = defineProps<Props>();

const { data: teachers } = useFetch(`/api/courses/getPersonsByCourseId/${entity?.id}`, {
  deep: false,
  watch: false,
  transform(res) {
    if (!res) return [];
    return res.data
      .map((person) => {
        return {
          image: person.attributes.photo,
          name: `${person.attributes.surname ?? ''} ${person.attributes.name ?? ''} ${person.attributes.patronymic ?? ''}`,
          teacherId: person.id,
          text: person.attributes.regalia,
          position: person.attributes.regalia,
        };
      })
      .filter((person) => person.image);
  },
});

const { why_learn = [] } = entity?.customFields ?? {};

const comment = why_learn[0]?.text ?? '';
</script>

<template>
  <MSection class="s-about">
    <div class="s-about__grid">
      <MCardText
        v-if="entity?.annotation"
        :title
        :title-class
        :text="entity.annotation"
        text-class="a-font_h6"
      >
        <div
          v-if="comment"
          class="m-card-text__bottom a-font_l"
          v-html="comment"
        />
      </MCardText>

      <div
        v-if="teachers?.length"
        class="s-about__teachers"
      >
        <h4
          class="s-about__teachers-title a-font_h4"
          v-html="teachersTitle"
        />
        <MTeachersSlider :teachers />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCourseAbout.scss';
</style>
