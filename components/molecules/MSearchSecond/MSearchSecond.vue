<script setup lang="ts">
interface Props {
  placeholder?: string;
  required?: boolean;
  autocomplete?: boolean;
}

const {
  placeholder = 'Поиск по сайту',
  required = true,
  autocomplete = true,
} = defineProps<Props>();

const modelValue = defineModel({
  type: String,
  default: '',
});

const emits = defineEmits(['focus', 'submit']);
</script>

<template>
  <form
    itemprop="potentialAction"
    itemscope
    itemtype="https://schema.org/SearchAction"
    class="m-search nolander"
    @submit.prevent="emits('submit')"
  >
    <meta
      itemprop="target"
      content="https://example.com/search?query=query"
    >
    <AInputSecond
      v-model="modelValue"
      itemprop="query-input"
      :placeholder
      :required
      :autocomplete="autocomplete ? 'on' : 'off'"
      @focus="emits('focus')"
    />
    <button
      v-if="modelValue === ''"
      class="m-search__btn"
      type="submit"
    >
      <ASvgMono name="loupe-outline" />
    </button>
  </form>
</template>

<style lang="scss" scoped>
@import './MSearchSecond.scss';
</style>
