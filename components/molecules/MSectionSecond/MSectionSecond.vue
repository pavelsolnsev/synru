<script setup lang="ts">
const {
  title = '',
  titleClass,
  nums = '',
} = defineProps<{
  title?: string;
  titleClass?: string;
  nums?: string;
}>();

const fullTitle = nums
  ? `${title}&nbsp;<span class="l-section__title-nums a-font_m-m">${nums}</span>`
  : title;
</script>

<template>
  <section class="l-section">
    <div class="l-section__inner">
      <h2
        v-if="title"
        class="l-section__title"
        :class="titleClass"
        v-html="fullTitle"
      />

      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import './MSectionSecond.scss';
</style>
