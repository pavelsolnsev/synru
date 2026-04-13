<script setup lang="ts">
import type { TagVariant } from '~/types';
interface Props {
  text: string;
  variant?: TagVariant;
  font?: string;
  to?: string;
}

const {
  text = '',
  to = '',
  variant = 'primary',
  font = 'a-font_m-m',
} = defineProps<Props>();

const tagClass = ['a-tag', `a-tag--${variant}`, font];
</script>

<template>
  <NuxtLink
    v-if="to"
    :to
    :class="tagClass"
  >
    <span v-html="text" />
  </NuxtLink>
  <span
    v-else
    :class="tagClass"
    v-html="text"
  />
</template>

<style lang='scss' scoped>
@import './ATag.scss';
</style>
