<script setup lang="ts">
const { label } = defineProps<{
  label: string,
}>();
</script>

<template>
  <label>
    <span
      class="a-font_xs"
      v-html="label"
    />

    <slot />

  </label>
</template>

<style lang="scss" scoped>
  @import './ALabel.scss';
</style>
