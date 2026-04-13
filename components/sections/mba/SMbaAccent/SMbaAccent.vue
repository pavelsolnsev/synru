<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
  routeName?: string;
}

const { entity } = defineProps<Props>();

const data = {
  ...(entity.customFields.mba_program_accent?.length ? entity.customFields.mba_program_accent[0] : {}),
};
</script>

<template>
  <MSection
    v-if="data.title && data.cards?.length"
    class="s-mba-accent"
    :title="data.title"
  >
    <div
      v-if="data.cards && data.cards.length"
      class="s-mba-accent__body"
    >
      <div
        v-for="card in data.cards"
        :key="card.title"
        class="s-mba-accent__card"
      >
        <div class="s-mba-accent__card__header">
          <div
            v-if="card.text"
            class="s-mba-accent__text a-font_h5"
            v-html="card.text"
          />

          <AImg
            src="/img/mba/star-ok-2.svg"
            class="s-mba-accent__icon"
          />
        </div>

        <div
          class="s-mba-accent__title a-font_l-m"
          v-html="card.title"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaAccent';
</style>
