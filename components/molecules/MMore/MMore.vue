<script setup lang="ts">
const {
  color = 'light',
} = defineProps<{
  href?: string,
  text: string,
  color?: 'light' | 'light-white' | 'dark' | 'red',
  size?: 'sm' | 'md' | 'lg' | 'lg_m',
}>();
</script>

<template>
  <div class="m-more">
    <AButtonThird
      :to="href"
      :bg-color="color"
      :size
      class="m-more-btn"
      v-bind="$attrs"
    >
      {{ text }}
    </AButtonThird>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import './MMore.scss';
</style>
