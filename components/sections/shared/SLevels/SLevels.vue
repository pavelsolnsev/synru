<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { mainLevelsData } from './levelsData';
import type { EntityCount } from '~/types';

interface Props {
  coursesCount?: AdditionalProgramsCount[];
  bsCount?: AdditionalProgramsCount[];
  entities: EntityCount;
}

interface AdditionalProgramsCount {
  count: number;
}

const {
  entities = {},
} = defineProps<Props>();

const entitiesCount = Object.keys(entities).length;

const levels = entitiesCount
  ? transformLevelData()
  : [];

const activeTab = ref(0);
const icons = [{ icon: 'simple-university' }, { icon: 'simple-hat' } ];

function transformLevelData() {
  return Object.keys(mainLevelsData)
    .map((key) => {
      const level = mainLevelsData[key];
      const levelProgramCountSlide = level.items[0] ?? {};
      const entityProgramCount = entities[key].programs_count;

      if (entityProgramCount) {
        levelProgramCountSlide.title = String(entityProgramCount);
        levelProgramCountSlide.text = declensionOfNumber(entityProgramCount, ['программа', 'программы', 'программ']);
      }

      return level;
    });
}
</script>

<template>
  <MSection
    v-if="entitiesCount"
    title="Уровни образования"
    class="s-levels"
  >
    <div class="s-levels__nav sticky">
      <swiper
        grab-cursor
        slides-per-view="auto"
        resistance
        :resistance-ratio="0"
        :space-between="0"
      >
        <template #wrapper-start>
          <MFilterTab
            v-for="tab, index in levels"
            :key="tab.name"
            class="swiper-slide"
            :active="index === activeTab"
            :title="tab.name"
            @click="activeTab = index"
          />
        </template>
      </swiper>
    </div>

    <div class="s-levels__tabs">
      <div
        v-for="{ name, text, title, items, href },index in levels"
        :key="name"
        class="s-levels__tab"
        :class="{'_active': index === activeTab}"
      >
        <SAbout
          :title
          :text
          :icons
          :items
        >
          <AButton :to="href">
            <span>Подробнее</span>
          </AButton>
        </SAbout>
        <AButton :to="href">
          <span>Подробнее</span>
        </AButton>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SLevels.scss';
@import '../SAbout/SAbout.scss';
</style>
