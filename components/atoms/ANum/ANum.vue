<script setup lang="ts">
const { classes = 'a-font_h6 a-num--lg' } = defineProps<{
  num: string;
  classes?: string;
  type?: string;
}>();
</script>

<template>
  <div
    class="a-num"
    :class="[classes, type && `a-num--type-${type}` ]"
  >
    <ASvgMono
      v-if="type === 'star'"
      name="hexagon"
    />
    {{ num }}
  </div>
</template>

<style lang="scss" scoped>
@import './ANum.scss';
</style>
