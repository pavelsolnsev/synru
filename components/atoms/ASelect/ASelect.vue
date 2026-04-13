<script setup lang="ts">
import type { FontSizeClass } from '~/types';

const {
  placeholder = '',
  fontSize = 'a-font_l',
  error = '',
} = defineProps<{
  placeholder?: string,
  options: string[],
  fontSize?: FontSizeClass,
  error?: string,
}>();

const id = useId();
const selectedValue = defineModel({
  type: String,
});

onBeforeMount(() => {
  selectedValue.value = placeholder;
});
</script>

<template>
  <select
    v-model="selectedValue"
    v-bind="$attrs"
    :id
    :class="{
      [fontSize]: fontSize,
      error
    }"
    :placeholder
    class="a-input"
  >
    <option
      :value="placeholder"
      disabled
      selected
      hidden
    >
      {{ placeholder }}
    </option>
    <option
      v-for="item in options"
      :key="item"
      :value="item"
    >
      {{ item }}
    </option>
  </select>
  <label
    :for="id"
    :id="`${id}-error`"
    class="error"
    style="display: inline;"
  >
    {{ error }}
  </label>
</template>

<style lang="scss">
@import './ASelect.scss';
</style>
