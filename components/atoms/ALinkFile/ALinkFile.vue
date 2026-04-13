<script setup lang="ts">
interface Props {
  to?: string;
  title?: string;
  ext?: string;
}

const {
  to = '',
  title = '',
  ext = '',
} = defineProps<Props>();
</script>

<template>
  <NuxtLink
    class="a-link-file"
    :to
  >
    <span
      class="a-link-file__title a-font_l-m"
      v-html="title"
    />
    <ins
      v-if="ext"
      class="a-link-file__ext a-font_xs-m"
      v-html="ext"
    />
  </NuxtLink>
</template>

<style lang="scss" scoped>
@import './ALinkFile.scss';
</style>
