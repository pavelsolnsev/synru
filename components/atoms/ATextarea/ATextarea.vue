<script setup lang="ts">
import type { FontSizeClass, InputMode } from '~/types';

const {
  fontSize = 'a-font_l',
  inputmode = 'text',
  error = '',
} = defineProps<{
  fontSize?: FontSizeClass,
  inputmode?: InputMode,
  error?: string,
}>();

const id = useId();
const value = defineModel<string>();

const input = useTemplateRef<HTMLInputElement>('textarea');

function getFocus() {
  if (input.value) input.value.focus();
}

defineExpose({ getFocus });
</script>

<template>
  <textarea
    v-model="value"
    v-bind="$attrs"
    ref="textarea"
    :id
    :class="{
      [fontSize]: fontSize,
      error
    }"
    :inputmode
    class="a-input"
  />
  <label
    :for="id"
    :id="`${id}-error`"
    class="error"
    style="display: inline;"
  >
    {{ error }}
  </label>
</template>

<style lang="scss" scoped>
  @import './ATextarea.scss';
</style>
