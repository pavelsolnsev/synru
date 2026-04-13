<script setup lang="ts">
import { ROUTES } from '~/constants';
import { rectorate, council, professors } from './teachingStaffStaticData';

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

const data = [
  {
    teachers: rectorate,
    to: ROUTES.RECTORATE,
  },
  {
    teachers: council.map((item, index) => ({ ...item, text: item.position, teacherId: `council${index}` })),
    to: '',
  },
  {
    teachers: professors.map((item, index) => ({ ...item, text: item.position, teacherId: `professors${index}` })),
    to: ROUTES.HONORARY_PROFESSORS,
  },
];

const activeTab = ref(0);
</script>

<template>
  <MSection
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
@import '../STeachingStaff/STeachingStaff.scss';
</style>
