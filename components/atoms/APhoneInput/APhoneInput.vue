<script setup lang="ts">
import type { FontSizeClass } from '~/types';

const {
  fontSize = 'a-font_l',
  error = '',
  size,
} = defineProps<{
  size?: 'sm' | 'md' | 'lg';
  fontSize?: FontSizeClass;
  error?: string;
  showErrors?: boolean
}>();

const inputValue = defineModel<string>({ default: '' });

const sizeClass = size ? `--size-${size}` : '';
const { id } = usePhoneMask();

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
    v-model="inputValue"
    :class="{
      [fontSize]: fontSize,
      [sizeClass]: sizeClass,
      error
    }"
    name="phone"
    placeholder="Телефон"
    class="a-input"
    type="tel"
    inputmode="tel"
    autocomplete="on"
  >
  <label
    v-if="error"
    id="phone-error"
    :for="id"
    class="error"
    :class="showErrors ? 'show' : undefined"
    style="display: inline;"
  >
    {{ error }}
  </label>
</template>

<style lang="scss" scoped>
  @import './APhoneInput.scss';
</style>

<style lang="scss">
  label.error {
    display: none !important;

    &.show {
      display: inline !important;
      font-weight: 600;
      color: var(--a-color_red);
    }
  }
</style>
