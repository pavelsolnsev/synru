<script setup lang="ts">
import type { AccordionItemWithSchema } from '~/types';

const accordionItem = withDefaults(defineProps<AccordionItemWithSchema>(), {
  content: () => ({}),
  icon: 'chevron-down',
  isOpen: false,
  external: false,
});

const emit = defineEmits(['triggered']);

const slots = useSlots();

function handleClick() {
  if (accordionItem.content?.text || slots?.default) {
    emit('triggered');
  }
}

const schemaQuestionAttrs: Record<string, string> | null = accordionItem.schema === 'faq' ? {
  itemscope: '',
  itemprop: 'mainEntity',
  itemtype: 'https://schema.org/Question',
} : null;

const schemaAnswerAttrs: Record<string, string> | null = accordionItem.schema === 'faq' ? {
  itemscope: '',
  itemprop: 'acceptedAnswer',
  itemtype: 'https://schema.org/Answer',
} : null;

const schemaItemListAttrs: Record<string, string> | null = accordionItem.schema === 'list' ? {
  itemscope: '',
  itemtype: 'https://schema.org/ItemList',
} : null;
</script>

<template>
  <div
    class="m-accordion"
    :class="{ '--open': accordionItem.isOpen }"
    v-bind="schemaQuestionAttrs"
  >
    <div
      class="m-accordion__header"
      @click="handleClick"
    >
      <NuxtLink
        v-if="accordionItem.title.href"
        :to="accordionItem.title.href"
        :class="accordionItem.title.className || 'a-font_h5'"
        :external="accordionItem.external || undefined"
        class="m-accordion__title"
        :itemprop="schemaItemListAttrs ? 'url' : (schemaQuestionAttrs ? 'name' : undefined)"
      >
        <span
          v-html="accordionItem.title.text"
          :itemprop="schemaItemListAttrs ? 'name' : undefined"
        />
      </NuxtLink>
      <div
        v-else
        :class="accordionItem.title.className || 'a-font_h5'"
        class="m-accordion__title"
        :itemprop="schemaQuestionAttrs ? 'name' : undefined"
        v-html="accordionItem.title.text"
      />

      <div
        v-if="accordionItem.content.text || $slots.default"
        class="m-accordion__icon"
      >
        <ASvgMono :name="accordionItem.icon" />
      </div>
    </div>

    <div
      :class="accordionItem.content.className || 'a-font_m'"
      class="m-accordion__content"
      v-bind="schemaAnswerAttrs"
    >
      <div
        v-if="$slots.default"
        class="m-accordion__wrap"
        :itemprop="schemaAnswerAttrs ? 'text' : undefined"
      >
        <slot />
      </div>
      <div
        v-if="accordionItem.content.text"
        class="m-accordion__wrap"
        :itemprop="schemaAnswerAttrs ? 'text' : undefined"
        v-html="accordionItem.content.text"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './MAccordionItem.scss';
</style>
