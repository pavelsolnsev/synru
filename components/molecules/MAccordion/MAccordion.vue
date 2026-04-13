<script setup lang="ts">
import type { AccordionItem, AccordionItemWithSchema } from '~/types';

const { items, multipleOpen = false, schema = '' } = defineProps<{
  items: AccordionItem[],
  multipleOpen?: boolean,
  schema?: 'faq' | 'list' | ''
}>();

const accordionItems: Ref<AccordionItemWithSchema[]> = ref([...items as AccordionItemWithSchema[]].map((item) => {
  item.schema = schema;
  return item;
}));

function handleClick(key: string) {
  accordionItems.value.forEach((item: AccordionItem) => {
    item.isOpen = item.title.text === key
      ? !item.isOpen
      : multipleOpen ? item.isOpen : false;
  });
}
</script>

<template>
  <template
    v-for="item in accordionItems"
    :key="item.title.text"
  >
    <MAccordionItem
      v-bind="item"
      @triggered="handleClick(item.title.text)"
    />
  </template>
</template>
