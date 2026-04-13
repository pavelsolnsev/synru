<script setup lang="ts">
import type { ProgramEntity, ProgramCustomField, AccordionItem, SectionConditionalGroup   } from '~/types';
import mapCustomFields from '~/utils/mapCustomFields';
import { replaceYearInHTML } from '~/utils/replaceYearInHtml';

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  title?: string
  titleClass?: string;
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
  titleClass = 'a-font_h2',
  multipleOpen = false,
  entity = null,
  itemsTitleClass = 'a-font_h5',
  itemsTextClass = 'a-font_m',
  hasEntity = false,
  items = [],
  hideSectionTitle = false,
} = defineProps<Props>();

const { faq: rawFaq = [] }: { faq: Faq } = mapCustomFields(entity?.custom_field_values || []);

const faq = rawFaq
  .filter((item) => item.answer)
  .map((item) => {
    item.answer = item.answer
      ?.replace(/&amp;/g, '&')
      ?.replace(/&lt;/g, '<')
      ?.replace(/&gt;/g, '>');

    return item;
  });

const faqItems = hasEntity
  ? mapFaqItems(faq)
  : mapFaqItems(items);

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });

function mapFaqItems(faqItems: Faq) {
  return faqItems.map((item, index) => {
    return {
      title: { text: replaceYearInHTML(item.question), className: itemsTitleClass },
      content: { text: item.answer, className: itemsTextClass },
      isOpen: index === 0 ? true : false,
      itemKey: `faqItems${index}`,
      icon: 'simple-plus',
    } as AccordionItem;
  });
}
</script>

<template>
  <MSectionNewResponsive
    v-if="faqItems.length && showSection"
    class="s-faq"
    :title="hideSectionTitle ? '' : title"
    :title-class="titleClass"
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
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SFaqMin.scss';
</style>
