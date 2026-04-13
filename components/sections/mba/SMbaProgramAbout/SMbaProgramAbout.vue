<script setup lang="ts">
import type { TeacherCard } from '~/types';
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
}

const {
  entity,
} = defineProps<Props>();

const text = entity.annotation ?? '';

const advantages = entity.customFields.mba_program_advantages || [];

const title = 'О программе';
const icons = ['simple-diamond', 'simple-hat'];

const tags = advantages.filter(({ text }) => Boolean(text)).map(({ text }) => text) as string[];

const { data: teachers } = await useFetch(`/api/mba/${entity.id}/persons`, {
  transform: (data) => {
    return Array.isArray(data?.data) && data.data.length > 0 ? data?.data.map((teacher) => ({
      image: teacher.attributes.photo,
      name: [teacher.attributes?.surname, teacher.attributes?.name, teacher.attributes?.patronymic].filter((el) => !!el).join(' '),
      text: teacher.attributes.regalia,
      position: teacher.attributes.position,
      teacherId: teacher.id,
    } as TeacherCard)) : [];
  },
  deep: false,
  watch: false,
  key: 'mba-teachers' + entity.id,
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
        v-if="teachers?.length"
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
@import './SMbaProgramAbout.scss';
</style>
