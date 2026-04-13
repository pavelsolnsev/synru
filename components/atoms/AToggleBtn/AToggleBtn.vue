<script setup lang='ts'>
const value = defineModel<boolean>();

const emit = defineEmits<{
  (_e: 'change'): void;
}>();

function handleChange() {
  emit('change');
}
</script>

<template>
  <label class="toggle">
    <input
      type="checkbox"
      :checked="value"
      @change="handleChange"
    >
  </label>
</template>
<style scoped lang='scss'>
@import './AToggleBtn.scss'
</style>
