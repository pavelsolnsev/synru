<script setup lang="ts">
interface Props {
  placeholder?: string;
  required?: boolean;
}

const {
  placeholder = 'Поиск по сайту',
  required = true,
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
    <AInput
      v-model="modelValue"
      font-size="a-font_m"
      itemprop="query-input"
      :placeholder
      :required
      @focus="emits('focus')"
    />
    <button
      class="m-search__btn"
      type="submit"
    >
      <ASvgMono name="loupe-outline" />
    </button>
  </form>
</template>

<style lang="scss" scoped>
@import './MSearch.scss';
</style>
