<script setup lang="ts">
const {
  content = '',
} = defineProps<{
  content: string,
}>();
</script>

<template>
  <div
    id="s-article"
    class="s-article"
  >
    <div
      class="s-article__content a-font_l"
      v-html="content"
    />
  </div>
</template>

<style lang="scss">
@import './SArticle.scss';
</style>
