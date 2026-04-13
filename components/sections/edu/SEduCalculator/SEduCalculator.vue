<script setup lang="ts">
interface Props {
  routeName?: string;
}

const {
  routeName = '',
} = defineProps<Props>();
</script>

<template>
  <SEduWrapper
    :route-name
  >
    <template #top>
      <SCalculator :route-name />
    </template>

    <template #bottom>
      <SEduForm />
    </template>
  </SEduWrapper>
</template>

<style lang="scss" scoped>
@import './SEduCalculator.scss';
</style>
