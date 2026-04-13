<script setup lang="ts">
type Size = 'sm' | 'md' | 'lg';
type BgColor = 'red' | 'black' | 'white';

const { size = 'lg', bgColor = 'red', to = '', external = false } = defineProps<{
  size?: Size,
  bgColor?: BgColor,
  to?: string,
  external?: boolean,
}>();

const sizeClasses: Record<Size, string> = {
  sm: 'a-btn--sm a-font_s-m',
  md: 'a-btn--md a-font_s-m',
  lg: 'a-btn--lg a-font_xl-m',
};

const classnameSize = sizeClasses[size as Size];
const classnameColor = `a-btn--${bgColor}`;

const component = to ? resolveComponent('NuxtLink') : 'button';
</script>

<template>
  <component
    :is="component"
    class="a-btn a-btn--primary"
    :class="[classnameSize, classnameColor]"
    :to="to === '' ? null : to"
    :external="external"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@import './AButton.scss';
</style>
