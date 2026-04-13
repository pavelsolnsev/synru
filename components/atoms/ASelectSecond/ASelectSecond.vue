<script setup lang="ts">
import type { FontSizeClass } from '~/types';

const {
  placeholder = '',
  fontSize = 'a-font_l',
  error = '',
} = defineProps<{
  placeholder?: string,
  options: { text: string; value: string | number }[],
  fontSize?: FontSizeClass,
  error?: string,
}>();

const id = useId();

const selectedValue = defineModel<string | null>({
  default: null,
});
</script>

<template>
  <select
    v-bind="$attrs"
    :id
    v-model="selectedValue"
    :class="{
      [fontSize]: fontSize,
      error
    }"
    :placeholder
    class="a-input"
  >
    <option
      :value="null"
      disabled
      selected
      hidden
    >
      {{ placeholder }}
    </option>
    <option
      v-for="item in options"
      :key="item.value"
      :value="item.value"
      :label="item.text"
    />
  </select>
  <label
    :id="`${id}-error`"
    :for="id"
    class="error"
    style="display: inline;"
  >
    {{ error }}
  </label>
</template>

<style lang="scss">
@import './ASelectSecond.scss';
</style>
