<script setup lang="ts">
import type { EntityOption } from '~/types/ProgramCard';

interface Props {
  levels: EntityOption[];
  selectedLevel: EntityOption | null;
}

interface Emits {
  (_e: 'update:selectedLevel', _level: EntityOption): void;
}

const {
  levels,
  selectedLevel,
} = defineProps<Props>();

const emit = defineEmits<Emits>();

function selectLevel(level: EntityOption) {
  emit('update:selectedLevel', level);
}

const sortedLevels = [...levels].sort((a, b) => Number(a.rank) - Number(b.rank));
</script>

<template>
  <div class="level-select">
    <p class="a-font_l-m level-select__title">Уровень образования</p>

    <div class="level-select__list">
      <button
        v-for="level in sortedLevels"
        :key="level.value"
        :class="{ active: selectedLevel?.value === level.value }"
        class="level-select__button a-font_s-m"
        @click="selectLevel(level)"
      >
        {{ level.text }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .level-select {
    &__title {
      width: 100%;
      margin-bottom: scale(12);

      @include desktop(min) {
        margin-bottom: scale(16);
      }
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      gap: scale(8);
    }

    &__button {
      padding: scale(8) scale(16);
      border-radius: scale(8);
      background-color: var(--a-color_white);
      cursor: pointer;
      transition: var(--transition);
      border: none;

      @include desktop(min) {
        padding: scale(11) scale(18);
      }

      &:hover {
        background-color: var(--a-color_grey_40);
      }

      &.active {
        background-color: var(--a-color_red);
        color: var(--a-color_white);
      }
    }
  }
</style>
