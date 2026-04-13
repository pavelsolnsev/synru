<script setup lang="ts">
import type { FontSizeClass, InputMode } from '~/types';

interface Props {
  type?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  inputmode: InputMode;
  fontSize: FontSizeClass;
  size?: 'sm' | 'md' | 'lg';
}

const props = defineProps<Props>();
</script>

<template>
  <label class="a-input-label">
    <AInput
      v-bind="{...props, ...$attrs}"
    />
    <span class="a-font_l">
      {{ label }}
    </span>
  </label>
</template>

<style lang="scss" scoped>
@import './AInputLabel.scss';
</style>
