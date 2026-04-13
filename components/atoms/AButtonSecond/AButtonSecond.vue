<script setup lang="ts">
type BgColor = 'grey' | 'transparent';

const { bgColor = 'grey', to = undefined } = defineProps<{
  bgColor?: BgColor,
  to?: string | undefined,
}>();

const classnameColor = `a-btn--${bgColor}`;

const component = to ? resolveComponent('NuxtLink') : 'button';
</script>

<template>
  <component
    :is="component"
    class="a-btn a-btn--second"
    :class="['a-font_s-m', classnameColor]"
    :to
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@import './AButtonSecond.scss';
</style>
