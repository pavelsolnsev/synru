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
  if (initial !== value.value) {
    value.value = initial;
  }
});
</script>

<template>
  <label
    class="a-checkbox-animated"
    :class="value ? 'active' : undefined"
  >
    <input
      v-model="value"
      v-bind="$attrs"
      :type
      :required
    >
    <span
      class="a-checkbox-animated__toggle"
      :class="value ? 'active' : undefined"
    >
      <span class="a-checkbox-animated__toggle-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="8"
          viewBox="0 0 11 8"
          fill="none"
        >
          <path
            d="M3.71191 8L0 4.57138L1.39258 3.29576L3.71191 5.43322L9.61584 0L11 1.27562L3.71191 8Z"
            :fill="value ? '#FFFFFF' : '#CACACB'"
          />
        </svg>
      </span>
    </span>
    <span
      class="a-checkbox-animated__label"
      v-html="label"
    />
  </label>
</template>

<style lang="scss" scoped>
@import './ACheckboxAnimated.scss';
</style>
