<script setup lang="ts">
import type { AccordionItem } from '~/types';
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
}

const {
  entity,
} = defineProps<Props>();

const programs = entity.customFields?.learning_program || [];

const items = programs.map((item, index) => {
  return {
    title: { text: item.title, className: 'a-font_h6' },
    content: {
      text: item.description,
      className: 'a-font_l-m',
    },
    icon: 'plus',
    isOpen: index === 0 && item.description ? true : false,
    itemKey: `edu-program-${index}`,
  } as AccordionItem;
});
</script>

<template>
  <MSection
    v-if="items.length"
    title="Программа обучения"
    class="s-edu-program"
  >
    <div class="s-edu-program__inner">
      <MAccordion
        :items
        multiple-open
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaProgram.scss';
</style>
