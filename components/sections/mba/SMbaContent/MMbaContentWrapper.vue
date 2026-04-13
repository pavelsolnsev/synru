<script setup lang="ts">
import type {contentModule} from '~/types/MbaProgramEntity';

interface Props {
  baseModules?: Array<contentModule>;
  bonusModules?: Array<contentModule>;
}

const props = defineProps<Props>();

const mainModuleName = props.baseModules && props.baseModules.length > 1 ? 'Базовые модули' : 'Базовый модуль';
const bonusModuleName = props.bonusModules && props.bonusModules.length > 1 ? 'Бонусные модули' : 'Бонусный модуль';
</script>

<template>
  <div
      v-if="baseModules && baseModules.length"
      class="s-mba-content__content"
  >
    <p

        class="s-mba-content__flag a-font_xl-m"
    >
      {{ mainModuleName }}
    </p>
    <ul
        class="s-mba-content__list"
    >
      <MMbaContentItem
          v-for="(item, idx) in baseModules"
          :key="item.title"
          :number="formatNumberWithLeadingZero(idx + 1)"
          v-bind="item"
      />
    </ul>
  </div>
  <div
      class="s-mba-content__content"
      v-if="bonusModules && bonusModules.length"
  >
    <p
        class="s-mba-content__flag a-font_xl-m"
    >
      {{ bonusModuleName }}
    </p>
    <ul
        class="s-mba-content__list"
    >
      <MMbaContentItem
          v-for="(item, idx) in bonusModules"
          :key="item.title"
          :number="formatNumberWithLeadingZero(idx + 1)"
          v-bind="item"
      />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import './SMbaContent';
</style>
