<script setup lang="ts">
const {
  label,
  type = 'checkbox',
  required = true,
  initial = false,
} = defineProps<{
  label: string,
  type?: 'checkbox' | 'radio',
  initial?: boolean,
  required?: boolean,
}>();

const value = defineModel({
  type: Boolean,
});

onMounted(() => {
  value.value = initial;
});
</script>

<template>
  <label class="a-chekbox">
    <input
      v-model="value"
      v-bind="$attrs"
      :type
      :required
    >
    <span
      class="a-chekbox__label checkbox--radio"
      v-html="label"
    />
  </label>
</template>

<style lang="scss" scoped>
 @import './ACheckboxSecond.scss';
</style>
