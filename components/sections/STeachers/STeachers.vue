<script setup lang="ts">
import type { ResponsePersons, Person, TeacherCard, FacultyEntity, ProgramEntity, SchoolProgramEntity, CourseEntity } from '~/types';
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

const {
  tags,
  title,
  entity,
  routeName = '',
  teachers: selectedTeachers = [],
} = defineProps<{
  tags: string[];
  teachers?: unknown[];
  title: string;
  subtitle?: string;
  entity?: FacultyEntity | ProgramEntity | SchoolProgramEntity | CourseEntity | MbaProgramEntity;
  routeName?: string;
}>();

const sectionTitle = computed(() => {
  if (routeName === 'course') {
    const cf = (entity as CourseEntity | undefined)?.customFields;
    return cf?.course_triggers?.[0]?.teachers_title || title;
  }

  return title;
});

const personsFetchStrategyByRoute = {
  program: getTeachersByProgramId,
  faculties: getTeachers,
  school_program: getTeachersBySchoolProgramId,
  course: getPersonsByCourseId,
  mba_program: getTeachersByMbaId,
} as { [key: string]: () => Promise<TeacherCard[] | undefined> };

const teachers = Object.hasOwn(personsFetchStrategyByRoute, routeName)
  ? await personsFetchStrategyByRoute[routeName]()
  : await getTeachers();

function transformPersonResponse(response: ResponsePersons): TeacherCard[] {
  if (!response) return [];
  return response.data.map((person: Person) => {
    return {
      image: person.attributes.photo,
      name: `${person.attributes.surname} ${person.attributes.name} ${person.attributes.patronymic ?? ''}`,
      teacherId: person.id,
      text: person.attributes.regalia,
      position: person.attributes.regalia,
    };
  });
}

async function getTeachers() {
  const result = await useFetch('/api/persons', {
    query: {
      published: 1,
      'filter[tags]': tags.join(','),
      'filter[id]': selectedTeachers.join(','),
      'page[size]': 0,
    },
    immediate: true,
    deep: false,
    watch: false,
    transform: transformPersonResponse,
  });

  return result.data.value;
}

async function getPersonsByCourseId() {
  const result = await useFetch(`/api/courses/getPersonsByCourseId/${entity?.id}`, {
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

  return result.data.value;
}

async function getTeachersByProgramId() {
  const result = await useFetch(`/api/programs/getPersonsByProgramId/${entity?.id}`, {
    query: {
      published: 1,
    },
    immediate: true,
    deep: false,
    watch: false,
    transform: transformPersonResponse,
  });

  return result.data.value;
}

async function getTeachersByMbaId() {
  const result = await useFetch(`/api/mba/${entity?.id}/persons`, {
    immediate: true,
    deep: false,
    watch: false,
    transform: transformPersonResponse,
  });

  return result.data.value;
}

async function getTeachersBySchoolProgramId() {
  const result = await useFetch(`/api/school-programs/getPersonsBySchoolProgramId/${entity?.id}`, {
    query: {
      published: 1,
    },
    immediate: true,
    deep: false,
    watch: false,
    transform: transformPersonResponse,
  });

  return result.data.value;
}
</script>

<template>
  <MSection
    v-if="teachers?.length"
    class="s-teachers"
    :title="sectionTitle"
  >
    <div
      v-if="subtitle"
      class="s-teachers__subtitle a-font_h6"
      v-html="subtitle"
    />
    <div class="s-teachers__slider">
      <MTeachersSlider :teachers />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './STeachers.scss';
</style>
