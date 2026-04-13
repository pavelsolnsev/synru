<script setup lang="ts">
import type { Fonts, SectionConditionalGroup  } from '~/types';

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  entity?: { id: number }
  title?: string;
  titleClass?: Fonts;
  text?: string;
  textClass?: Fonts;
  textItems?: { item: string }[];
  factoidsText?: string;
  factoidsClass?: Fonts;
  factoids?: { item: string }[];
}

const {
  conditionalGroup = [],
  entity,
  title = 'Пример расчёта платежей',
  titleClass = 'a-font_h2',
  text = '',
  textClass = 'a-font_h6',
  textItems = [],
  factoidsText = '',
  factoidsClass = 'a-font_h6',
  factoids = [],
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });
</script>

<template>
  <MSection
    v-if="showSection"
    class="s-credit-calculation"
    :title
    :title-class
  >
    <div class="s-credit-calculation__wrapper">
      <MCardText
        v-if="textItems?.length"
        :text
        :text-class
      >
        <div class="s-credit-calculation__texts">
          <div
            v-for="{item}, index in textItems"
            :key="item"
            class="s-credit-calculation__texts__item"
          >
            <div class="s-credit-calculation__texts__item-number a-font_s-m">
              <span>{{ formatNumberWithLeadingZero(index + 1) }}</span>
            </div>
            <span
              class="a-font_xl-m"
              v-html="item"
            />
          </div>
        </div>
      </MCardText>

      <MCardText
        v-if="factoids?.length"
        class="s-credit-calculation__factoids"
        :text="factoidsText"
        :text-class="factoidsClass"
      >
        <div class="s-credit-calculation__texts">
          <div
            v-for="{item}, index in factoids"
            :key="item"
            class="s-credit-calculation__texts__item s-credit-calculation__texts__item-factoid"
          >
            <span class="s-credit-calculation__texts__item-number a-font_s-m">{{ formatNumberWithLeadingZero(index + 1) }}</span>
            <span
              class="a-font_xl-m"
              v-html="item"
            />
          </div>
        </div>
      </MCardText>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCreditCalculation.scss';
</style>
