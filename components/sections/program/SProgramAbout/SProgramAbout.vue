<script setup lang="ts">
import type { Fonts, ProgramEntity, TeacherCard } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  showIcons?: boolean;
  teachersTitle?: string;
  entity?: ProgramEntity | null;
}

const {
  title = 'О специальности',
  titleClass = 'a-font_h4',
  showIcons = false,
  teachersTitle = 'Ведущие преподаватели',
  entity = null,
} = defineProps<Props>();

const icons = showIcons ? ['simple-university', 'simple-hat'] : [];

const { data: teachers } = useFetch(`/api/programs/getPersonsByProgramId/${entity?.id}`, {
  deep: false,
  watch: false,
  transform(res) {
    if (!res) return [];
    return res.data.map((person) => {
      return {
        image: person.attributes.photo,
        name: `${person.attributes.surname} ${person.attributes.name} ${person.attributes.patronymic ?? ''} `,
        teacherId: person.id,
        text: person.attributes.regalia,
        position: person.attributes.regalia,
      };
    }) as TeacherCard[];
  },
});
</script>

<template>
  <MSection class="s-about">
    <div class="s-about__grid">
      <MCardText
        v-if="entity?.annotation"
        :title
        :title-class
        :icons
        :text="entity.annotation ?? ''"
        text-class="a-font_h6"
      >
        <div
          v-if="entity.comment"
          class="m-card-text__bottom a-font_l"
          v-html="entity.comment"
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
@import './SProgramAbout.scss';
</style>
