<script setup lang="ts">
import { NuxtLink } from '#components';

interface Props {
  size?: 'standart' | 'lg';
  bgColor?: 'red' | 'white' | 'black';
  to?: string;
  external?: boolean;
  showArrow?: boolean;
  disabled?: boolean;
}

const {
  size = 'standart',
  bgColor = 'red',
  to = '',
  external = false,
  showArrow = true,
  disabled = false,
} = defineProps<Props>();

const classSize = size === 'standart' ? '--standart' : '--lg';
const classColor = `--${bgColor}`;
</script>

<template>
  <component
    :is="to ? NuxtLink: 'button'"
    class="a-btn-main"
    :class="[classSize, classColor, disabled && '--disabled']"
    :to="to === '' ? null : to"
    :external="external"
  >
    <ASvgMono
      v-if="showArrow"
      name="two_arrow"
    />
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@import './AButtonMain.scss';
</style>
