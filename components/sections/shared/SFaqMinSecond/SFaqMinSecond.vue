<script setup lang="ts">
import type { ProgramEntity, ProgramCustomField, AccordionItem, SectionConditionalGroup   } from '~/types';
import mapCustomFields from '~/utils/mapCustomFields';

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  title?: string
  multipleOpen?: boolean;
  items?: Faq;
  itemsTitleClass?: string,
  itemsTextClass?: string,
  hasEntity?: boolean;
  entity?: ProgramEntity | null;
  hideSectionTitle?: boolean;
}

type Faq = ProgramCustomField['faq'];

const {
  conditionalGroup = [],
  title = 'Часто задаваемые вопросы',
  multipleOpen = false,
  entity = null,
  itemsTitleClass = 'a-font_h5',
  itemsTextClass = 'a-font_m',
  hasEntity = false,
  items = [],
  hideSectionTitle = false,
} = defineProps<Props>();

const { faq = [] }: { faq: Faq } = mapCustomFields(entity?.custom_field_values || []);

const faqItems = hasEntity
  ? mapFaqItems(faq)
  : mapFaqItems(items);

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });

function mapFaqItems(faqItems: Faq) {
  return faqItems.map((item, index) => {
    return {
      title: { text: item.question, className: itemsTitleClass },
      content: { text: item.answer, className: itemsTextClass },
      isOpen: index === 0 ? true : false,
      itemKey: `faqItems${index}`,
      icon: 'simple-plus',
    } as AccordionItem;
  });
}
</script>

<template>
  <MSectionSecond
    v-if="faqItems.length && showSection"
    class="s-faq"
    :title="hideSectionTitle ? '' : title"
  >
    <div
      class="s-faq__inner"
      itemscope
      itemtype="https://schema.org/FAQPage"
    >
      <MAccordion
        :multiple-open
        :items="faqItems"
        schema="faq"
      />
    </div>
  </MSectionSecond>
</template>

<style lang="scss" scoped>
@import './SFaqMinSecond.scss';
</style>
