<script setup lang="ts">
const {
  error = '',
} = defineProps<{
  error?: string,
}>();

const value = defineModel<string>();
const id = useId();

const input = useTemplateRef<HTMLInputElement>('input');

function getFocus() {
  if (input.value) input.value.focus();
}

defineExpose({ getFocus });
</script>

<template>
  <div>
    <input
      :id
      v-model="value"
      class="a-input"
      autocomplete="on"
      :class="{
        error
      }"
      v-bind="$attrs"
    >
    <label
      id="name-error"
      :for="id"
      class="error"
      style="display: inline;"
    >
      {{ error }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
@import './AInputSecond.scss';
</style>

<style lang="scss">
label.error {
  display: none !important;
}
</style>
