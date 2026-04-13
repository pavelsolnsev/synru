<script setup lang="ts">
interface Props {
  title: string;
}

const { title = '' } = defineProps<Props>();
</script>

<template>
  <AMenuLink
    class="a-apply-btn"
    bg-color="red"
  >
    {{ title }}
  </AMenuLink>
</template>

<style lang='scss' scoped>
@import './AApplyBtn.scss';
</style>
