<script setup lang="ts">
const {
  title = '',
  titleClass = 'a-font_h2',
  nums = '',
  titleH1 = false,
} = defineProps<{
  title?: string;
  titleClass?: string;
  nums?: string;
  titleH1?: boolean;
}>();

const fullTitle = nums
  ? `${title}&nbsp;`
  : title;
</script>

<template>
  <section class="l-section">
    <div class="l-section__inner">
      <div
        v-if="title"
        class="l-section__title"
      >
        <h1
          v-if="titleH1"
          :class="titleClass"
          v-html="fullTitle"
        />
        <h2
          v-else
          :class="titleClass"
          v-html="fullTitle"
        />
        <span
          v-if="nums"
          class="l-section__title-nums a-font_m-m"
        >
          {{ nums }}
        </span>
      </div>
      <slot />
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import './MSection.scss';
</style>
