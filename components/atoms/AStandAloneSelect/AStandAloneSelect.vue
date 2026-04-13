<script setup lang="ts">
const { placeholder = '', options = [] } = defineProps<{
  placeholder?: string,
  options?: string[],
}>();

const selectedValue = defineModel<string>();

onBeforeMount(() => {
  selectedValue.value = placeholder;
});
</script>

<template>
  <div class="a-select a-font_s">
    <select
      v-model="selectedValue"
      v-bind="$attrs"
      :name="placeholder"
      :placeholder="placeholder"
    >
      <option
        :value="placeholder"
        disabled
        selected
        hidden
      >
        {{ placeholder }}
      </option>
      <option
        v-for="item in options"
        :key="item"
        :value="item"
      >
        {{ item }}
      </option>
    </select>
  </div>
</template>

<style lang="scss">
@import './AStandAloneSelect.scss';
</style>
