<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
  routeName?: string;
}

const { entity } = defineProps<Props>();

const data = {
  ...(entity.customFields.mba_program_result?.length ? entity.customFields.mba_program_result[0] : {}),
};
</script>

<template>
  <MSection
    v-if="data.title"
    class="s-mba-result"
    :title="data.title"
  >
    <div class="s-mba-result__scroll-wrapper">
      <div
        v-if="data.cards && data.cards.length"
        class="s-mba-result__body"
      >
        <div
          v-for="(card, index) in data.cards"
          :key="card.title"
          class="s-mba-result__card"
        >
          <div class="s-mba-result__num">
            {{ formatNumberWithLeadingZero(index + 1) }}
          </div>
          <div
            class="s-mba-result__title a-font_h6"
            v-html="card.title"
          />
          <AImg
            :src="`/img/mba/${card.icon}.svg`"
            class="s-mba-result__icon"
          />
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaResult';
</style>
