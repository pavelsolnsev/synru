<script setup lang="ts">
import type { EntityOption } from '~/types/ProgramCard';

interface Props {
  formats: EntityOption[];
  selectedFormat: EntityOption | null;
}

interface Emits {
  (_e: 'update:selectedFormat', _format: EntityOption): void;
}

const {
  formats,
  selectedFormat,
} = defineProps<Props>();

const emit = defineEmits<Emits>();

function selectFormat(format: EntityOption) {
  emit('update:selectedFormat', format);
}
</script>

<template>
  <div
    v-if="formats.length"
    class="format-select"
  >
    <p class="a-font_l-m format-select__title">Форма обучения</p>
    <button
      v-for="format in formats"
      :key="format.value"
      :class="{ active: selectedFormat?.value === format.value }"
      class="a-font_xs-m format-select__button"
      @click="selectFormat(format)"
    >
      {{ format.text }}
    </button>
  </div>
</template>

<style scoped lang="scss">
  .format-select {
    display: flex;
    flex-wrap: wrap;
    gap: scale(8);

    &__title {
      width: 100%;
      margin-bottom: scale(8);
    }

    &__button {
      padding: scale(9) scale(16);
      border-radius: scale(100);
      background-color: var(--a-color_white);
      cursor: pointer;
      transition: var(--transition);
      border: none;

      @include desktop(min) {
        padding: scale(9) scale(12);
      }

      &:hover {
        background-color: var(--a-color_grey_40);
      }

      &.active {
        background-color: var(--a-color_dark);
        color: var(--a-color_white);
      }
    }
  }
</style>
