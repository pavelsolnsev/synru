<script setup lang="ts">
const {
  title = '',
  titleClass = 'a-font_h2',
  nums = '',
  withSides = false,
  isResponsiveTitle = false,
} = defineProps<{
  title?: string;
  titleClass?: string;
  nums?: string;
  withSides?: boolean;
  isResponsiveTitle?: boolean;
}>();

if (isResponsiveTitle) {
  useFitText('sectionTitle');
}

const fullTitle = nums
  ? `${title}&nbsp;`
  : title;
</script>

<template>
  <section
    class="m-section"
    :class="withSides ? 'm-section_withSides' : undefined"
  >
    <div class="m-section__inner">
      <div
        v-if="title"
        class="m-section__title"
      >
        <h2
          ref="sectionTitle"
          :class="titleClass"
          v-html="fullTitle"
        />
        <span
          v-if="nums"
          class="m-section__title-nums a-font_m-m"
        >
          {{ nums }}
        </span>
      </div>
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import './MSectionNewResponsive';
</style>
