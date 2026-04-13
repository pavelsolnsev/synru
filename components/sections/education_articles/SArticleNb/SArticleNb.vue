<script setup lang="ts">
interface Props {
  text?: string
}

const {
  text = '',
} = defineProps<Props>();
</script>

<template>
  <div
    v-if="text"
    class="s-article-nb"
    v-html="text"
  />
</template>

<style lang="scss" scoped>
@import './SArticleNb.scss';
</style>
