<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
  routeName?: string;
}

const { entity } = defineProps<Props>();

const data = {
  ...(entity.customFields.mba_program_graphics?.length ? entity.customFields.mba_program_graphics[0] : {}),
};

const bgImagesProps = {
  imageLG: data.imageLG ?? '',
  imageMD: data.imageMD ?? '',
  imageSM: data.imageSM ?? '',
} as const;
</script>

<template>
  <MSection
    v-if="data.title"
    class="s-mba-graphics"
  >
    <div class="s-mba-graphics__body">
      <ABgImages
        v-if="data.imageLG || data.imageMD || data.imageSM"
        v-bind="bgImagesProps"
      />
      <div class="s-mba-graphics__info">
        <h2
          class="s-mba-graphics__title a-font_h2"
          v-html="data.title"
        />
        <div
          v-if="data.subtitle"
          class="s-mba-graphics__subtitle a-font_h4"
          v-html="data.subtitle"
        />
      </div>
      <div
        v-if="data.cards && data.cards.length"
        class="s-mba-graphics__cards"
      >
        <div
          v-for="card in data.cards"
          :key="card.title"
          class="s-mba-graphics__card"
        >
          <div class="s-mba-graphics__top">
            <div
              class="s-mba-graphics__card-title a-font_h3"
              v-html="card.title"
            />
            <AImg
              :src="`/img/mba/${card.icon}.svg`"
              class="s-mba-graphics__icon"
            />
          </div>
          <div
            class="s-mba-graphics__description a-font_slider-text"
            v-html="card.subtitle"
          />
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaGraphics';
</style>
