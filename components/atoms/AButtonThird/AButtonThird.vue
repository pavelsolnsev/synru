<script setup lang="ts">
type Size = 'sm' | 'md' | 'lg' | 'lg_m';
type BgColor = 'light' | 'light-white' | 'dark' | 'red' | 'white' | 'bordered';

const { size = 'lg', bgColor = 'light', rounding = 'circle' , to = undefined } = defineProps<{
  size?: Size,
  bgColor?: BgColor,
  rounding?: 'circle' | 'rect',
  to?: string | undefined,
}>();

const sizeClasses: Record<Size, string> = {
  sm: 'a-btn--sm a-font_s-m',
  md: 'a-btn--md a-font_s-m',
  lg: 'a-btn--lg a-font_m-m',
  lg_m: 'a-btn--lg a-font_m-m',
};

const classnameSize = sizeClasses[size] || sizeClasses['lg'];
const classnameColor = `a-btn--${bgColor}`;
const classnameShape = `a-btn--${rounding}`;

const component = to ? resolveComponent('NuxtLink') : 'button';
</script>

<template>
  <component
    :is="component"
    class="a-btn a-btn--third"
    :class="[classnameSize, classnameColor, classnameShape]"
    :to
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@import './AButtonThird.scss';
</style>
