<script setup lang="ts">
import type { InputMode, FontSizeClass } from '~/types';

const {
  fontSize = 'a-font_l',
  inputmode = 'text',
  size,
  error = '',
} = defineProps<{
  size?: 'sm' | 'md' | 'lg',
  fontSize?: FontSizeClass,
  inputmode?: InputMode,
  error?: string,
  showErrors?: boolean
}>();

const value = defineModel<string>();
const sizeClass = size ? `--size-${size}` : '';
const id = useId();

const input = useTemplateRef<HTMLInputElement>('input');

function getFocus() {
  if (input.value) input.value.focus();
}

defineExpose({ getFocus });
</script>

<template>
  <input
    v-bind="$attrs"
    :id
    ref="input"
    v-model="value"
    :class="{
      [fontSize]: fontSize,
      [sizeClass]: sizeClass,
      error
    }"
    :inputmode
    class="a-input"
    autocomplete="on"
  >
  <label
    v-if="error"
    id="name-error"
    :for="id"
    class="error"
    :class="showErrors ? 'show' : undefined"
    style="display: inline;"
  >
    {{ error }}
  </label>
</template>

<style lang="scss" scoped>
  @import './AInput.scss';
</style>

<style lang="scss">
  label.error {
    display: none !important;

    &.show {
      position: relative;
      display: inline !important;
      font-weight: 600;
      color: var(--a-color_red);
      top: scale(-12);

      @include tablet(max) {
        font-size: scale(14);
        top: scale(-8);
      }
    }
  }
</style>
