<script setup lang="ts">
import { teachingStaff, professorsStaff } from './SEmbaTeachersData';
const activeTab = ref(0);
const tabs = [{ label: 'Профессора практики' }, { label: 'Преподаватели' }];
</script>

<template>
  <MSection>
    <MTabs
      v-model="activeTab"
      :items="tabs"
    />

    <div
      v-show="activeTab === 0"
      class="m-tabs__tab s-teaching-staff__tab"
    >
      <MTeachersSlider :teachers="professorsStaff" />
    </div>

    <div
      v-show="activeTab === 1"
      class="m-tabs__tab s-teaching-staff__tab"
    >
      <MTeachersSlider :teachers="teachingStaff" />
    </div>
  </MSection>
</template>

<style scoped lang="scss">
@import './SEmbaTeachers.scss';
</style>
