<script setup lang="ts">
import type { MenuLinkColor } from '~/types';

interface Props {
  to?: string,
  bgColor?: MenuLinkColor,
  textColor?: MenuLinkColor,
  active?: boolean,
}

const {
  to = '',
  bgColor = 'default',
  textColor = 'default',
  active = false,
} = defineProps<Props>();

const component = to ? resolveComponent('NuxtLink') : 'button';
</script>

<template>
  <component
    :is="component"
    :to
    class="a-menu-link a-font_m-m"
    :class="{
      '--bg-red': bgColor === 'red',
      '--color-red': textColor === 'red',
      '--active menu-item-active': active,
    }"
  >
    <slot />
  </component>
</template>

<style lang='scss' scoped>
@import './AMenuLink.scss';
</style>
