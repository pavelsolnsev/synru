<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
  routeName?: string;
}

const BGs = {
  imageLG: '/img/mba/organized_lg.webp',
  imageMD: '/img/mba/organized_md.webp',
  imageSM: '/img/mba/organized_sm.webp',
};

const { entity } = defineProps<Props>();

const data = {
  ...(entity.customFields.mba_program_organized?.length ? entity.customFields.mba_program_organized[0] : {}),
};
</script>

<template>
  <MSection
    v-if="data.title"
    class="s-mba-organized"
    :title="data.title"
  >
    <div class="s-mba-organized__body">
      <div class="s-mba-organized__left">
        <div class="s-mba-organized__info">
          <ABgImages
            v-bind="BGs"
            class="s-mba-organized__bg"
          />
          <div class="s-mba-organized__bottom">
            <div
              v-if="data.subtitle"
              class="s-mba-organized__subtitle"
              v-html="data.subtitle"
            />
            <div
              v-if="data.description"
              class="s-mba-organized__description a-font_slider-text"
              v-html="data.description"
            />
          </div>
        </div>
        <div
          v-if="data.cards && data.cards.length"
          class="s-mba-organized__card s-mba-organized__card_last"
        >
          <div class="s-mba-organized__card-top">
            <div
              class="s-mba-organized__card-title a-font_h5"
              v-html="data.cards[data.cards.length - 1].title"
            />
            <AImg
              class="s-mba-organized__card-icon"
              :src="`/img/mba/${data.cards[data.cards.length - 1].icon}.svg`"
              :alt="data.cards[data.cards.length - 1].title"
            />
          </div>
          <div
            class="s-mba-organized__card-subtitle a-font_l-m"
            v-html="data.cards[data.cards.length - 1].subtitle"
          />
        </div>
      </div>
      <div
        v-if="data.cards && data.cards.length"
        class="s-mba-organized__cards"
      >
        <div
          v-for="card in data.cards"
          :key="card.title"
          class="s-mba-organized__card"
        >
          <div class="s-mba-organized__card-top">
            <div
              class="s-mba-organized__card-title a-font_h5"
              v-html="card.title"
            />
            <AImg
              class="s-mba-organized__card-icon"
              :src="`/img/mba/${card.icon}.svg`"
              :alt="card.title"
            />
          </div>
          <div
            class="s-mba-organized__card-subtitle a-font_l-m"
            v-html="card.subtitle"
          />
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaOrganized';
</style>
