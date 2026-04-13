<script setup lang="ts">
import type { BusinessProgramEntity, AccordionItem } from '~/types';

interface Props {
  entity: BusinessProgramEntity;
}

const {
  entity,
} = defineProps<Props>();

const {
  's-program-program': program = {},
} = mapBusinessProgramBlocks(entity.properties.blocks);

const { items: eduProgram = [] } = Array.isArray(program) ? {} : program;

const items = eduProgram.map((item, index) => {
  const contentText = Array.isArray(item.description) ? item.description[0] : item.description;

  return {
    title: { text: item.title, className: 'a-font_h6' },
    content: {
      text: contentText,
      className: 'a-font_l-m',
    },
    icon: 'plus',
    isOpen: index === 0 && contentText ? true : false,
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
@import './SBusinessProgramEduProgram.scss';
</style>
