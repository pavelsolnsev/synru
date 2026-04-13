<script setup lang="ts">
interface Props {
  items: Item[];
};

interface Item {
  label: string;
  attributes?: object;
}

const { items } = defineProps<Props>();

const modelValue = defineModel({
  type: Number,
  default: 0,
});

const emit = defineEmits<{
  changed: [item: Item];
}>();

function onChange(item: Item, index: number) {
  modelValue.value = index;
  emit('changed', item);
}
</script>

<template>
  <div class="m-switcher">
    <div class="m-switcher__btns">
      <span
        v-for="item, index in items"
        :key="item.label"
        class="m-switcher__btn a-font_l-m"
        :class="{ '_is-active': modelValue === index }"
        v-bind="item.attributes"
        @click="onChange(item, index)"
        v-html="item.label"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MSwitcher.scss';
</style>
