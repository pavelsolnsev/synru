<script setup lang="ts">
import type { AccordionItem, ArticleListsWidget, Nullable } from '~/types';

interface Props {
  list?: Nullable<ArticleListsWidget>
}

interface ListItem extends AccordionItem {
  isTable?: boolean;
}

const {
  list = null,
} = defineProps<Props>();

const items = Array.isArray(list?.items) ?
    ref(list?.items?.map((item, index) => {
      return {
        title: { text: item.title ?? '', className: 'a-font_xl-m' },
        content: { text: item.text ?? '' },
        itemKey: `${item.title}${index}`,
        isOpen: true,
        isTable: isContentTable(item.text),
      } as ListItem;
    }))
  : [];

function isContentTable(content: string | null) {
  if (!content?.trim()) return false;

  const TABLE_TAG = '<table';
  const TABLE_CLASS = 'class="table"';

  return content.startsWith(TABLE_TAG) || content.includes(TABLE_CLASS);
}
</script>

<template>
  <div
    v-if="items?.length"
    class="s-article-toggled"
  >
    <MAccordionItem
      v-for="item in items"
      :key="item.itemKey"
      :title="item.title"
      :content="item.isTable ? undefined : item.content"
      :is-open="item.isOpen"
      :item-key="item.itemKey"
      icon="simple-plus"
      @triggered="item.isOpen = !item.isOpen"
    >
      <template
        v-if="item.isTable"
        #default
      >
        <SArticleTable :table="item.content?.text ?? ''" />
      </template>
    </MAccordionItem>
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleListsWidget.scss';
</style>
