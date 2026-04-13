<script setup lang="ts">
import type { BusinessProgramEntity, TeacherCard } from '~/types';

interface Props {
  entity: BusinessProgramEntity;
}

const {
  entity,
} = defineProps<Props>();

const {
  's-program-about': programAbout = {},
  's-program-advantages': programAdvantages = {},
} = mapBusinessProgramBlocks(entity.properties.blocks);

const { description: text = '' } = Array.isArray(programAbout) ? {} : programAbout;
const { items = [] } = Array.isArray(programAdvantages) ? {} : programAdvantages;
const educators = entity.properties.educators;
const title = 'О программе';
const icons = ['simple-diamond', 'simple-hat'];

const tags = items
  .filter(({ text, value }) => Boolean(text && value))
  .map(({ text, value }) => `${value} ${text}`);

const teachers = educators.map((item) => {
  return {
    image: item.images.main_desktop,
    name: `${item.attributes.last_name} ${item.attributes.first_name} ${item.attributes.middle_name}`,
    teacherId: item.id,
    text: item.attributes.short_description,
    position: item.attributes.short_description,
  } as TeacherCard;
});
</script>

<template>
  <MSection class="s-about">
    <div class="s-about__grid">
      <MCardText
        :title
        :icons
        :text
        :tags
      />
      <div
        v-if="teachers.length"
        class="s-about__teachers"
      >
        <h4
          class="s-about__teachers-title a-font_h4"
        >
          Ведущие преподаватели
        </h4>
        <MTeachersSlider :teachers />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import '../../program/SProgramAbout/SProgramAbout.scss';
@import './SBusinessProgramAbout.scss';
</style>
