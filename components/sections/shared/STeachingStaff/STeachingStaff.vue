<script setup lang="ts">
import type { ResponsePersons, TeacherCard } from '~/types';
import { ROUTES, KEYS } from '~/constants';

const tabsList = [
  {
    label: 'Ректорат',
  },
  {
    label: 'Совет президента',
  },
  {
    label: 'Почётные профессора',
  },
];

const RECTORATE_TAG_ID = '4';
const COUNCIL_TAG_ID = '5';
const PROFESSORS_TAG_ID = '6';

const personsSlug = 'rektorat,sovet-prezidenta,pocetnyi-professor';

const { data } = await useFetch('/api/persons' , {
  key: KEYS.TEACHING_STAFF,
  query: {
    include:'tags',
    published: 1,
    'filter[tags]': personsSlug,
    'page[size]': 0,
  },
  deep: false,
  watch: false,
  getCachedData(key, nuxtApp) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    return data ? data : undefined;
  },
  transform(res: ResponsePersons) {
    const { data } = res;

    const teachingStaff: Record<string, { teachers: TeacherCard[], to?: string }> = {
      [RECTORATE_TAG_ID]: { teachers: [] , to: ROUTES.RECTORATE },
      [COUNCIL_TAG_ID]: { teachers: [] },
      [PROFESSORS_TAG_ID]: { teachers: [], to: ROUTES.HONORARY_PROFESSORS },
    };

    data.forEach((person) => {
      const tags = person.relationships.tags.data.map((tag) => `${tag.id}`);

      tags.forEach((tag) => {
        if (teachingStaff[tag]) {
          const info: TeacherCard = {
            name: `${person.attributes.surname} ${person.attributes.name} ${person.attributes.patronymic ?? ''} `,
            image: person.attributes.photo,
            position: person.attributes.position,
          };

          if (tag === RECTORATE_TAG_ID) {
            info.contacts = person.attributes.description;
          } else {
            info.text = person.attributes.description;
            info.teacherId = person.id;
            info.position = person.attributes.description;
          }

          teachingStaff[tag].teachers.push(info);
        }
      });
    });
    return Object.values(teachingStaff);
  },
});

const activeTab = ref(0);
</script>

<template>
  <MSection
    v-if="data"
    class="s-teaching-staff"
  >
    <MTabs
      v-model="activeTab"
      :items="tabsList"
      tab-class="a-font_l-m"
    />
    <template
      v-for="{teachers, to}, index in data"
      :key="index"
    >
      <div
        v-show="index === activeTab"
        class="m-tabs__tab s-teaching-staff__tab"
      >
        <MTeachersSlider :teachers />
        <div
          v-if="to"
          class="s-teaching-staff__more"
        >
          <AButtonThird
            :to
            size="md"
          >
            <span>Подробнее</span>
          </AButtonThird>
        </div>
      </div>
    </template>
  </MSection>
</template>

<style lang="scss" scoped>
@import './STeachingStaff.scss';
</style>
