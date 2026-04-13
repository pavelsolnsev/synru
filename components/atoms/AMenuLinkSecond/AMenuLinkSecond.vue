<script setup lang="ts">
import { NuxtLink } from '#components';

interface Props {
  to?: string;
  activeBg?: boolean;
  showIcon?: boolean;
  activeIcon?: boolean;
}

const {
  to = '',
  activeBg = false,
  showIcon = true,
  activeIcon = false,
} = defineProps<Props>();
</script>

<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to
    class="a-menu-link-second a-font_m-m"
    itemprop="url"
    :class="{
      '--active-bg': activeBg,
      '--active-icon': activeIcon,
    }"
  >
    <slot />
    <ASvgMono
      v-if="showIcon"
      name="arr_down"
    />
  </component>
</template>

<style lang="scss" scoped>
@import './AMenuLinkSecond.scss';
</style>
