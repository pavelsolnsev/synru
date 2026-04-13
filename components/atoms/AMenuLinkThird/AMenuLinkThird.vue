<script setup lang="ts">
import { NuxtLink } from '#components';

interface Props {
  to?: string;
  active?: boolean;
  color?: 'gray' | ''
}

const {
  to = '',
  active = false,
  color = 'gray',
} = defineProps<Props>();
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to
    class="a-menu-link-third a-font_m-m"
    itemprop="url"
    :class="{
      '--gray': color === 'gray',
      '--active': active,
    }"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
@import './AMenuLinkThird.scss';
</style>
