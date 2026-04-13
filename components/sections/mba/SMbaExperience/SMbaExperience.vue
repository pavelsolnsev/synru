<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
  routeName?: string;
}

const { entity } = defineProps<Props>();

const data = {
  ...(entity.customFields.mba_program_experience?.length ? entity.customFields.mba_program_experience[0] : {}),
};
</script>

<template>
  <MSection
    v-if="data.title"
    class="s-mba-experience"
  >
    <div class="s-mba-experience__body">
      <div class="s-mba-experience__left">
        <h2
          class="s-mba-experience__title a-font_h4"
          v-html="data.title"
        />
        <div
          v-if="data.tags && data.tags.length"
          class="s-mba-experience__bottom"
        >
          <ul class="s-mba-experience__tags">
            <li
              v-for="tag in data.tags"
              :key="tag.title"
              class="s-mba-experience__tag a-font_l-m"
              v-html="tag.title"
            />
          </ul>
          <ASvgMono
            name="diamond"
            class="s-mba-experience__icon"
          />
        </div>
      </div>
      <div
        v-if="data.cards && data.cards.length"
        class="s-mba-experience__right"
      >
        <div
          v-for="card in data.cards"
          :key="card.title"
          class="s-mba-experience__card"
        >
          <div
            class="a-font_h2 s-mba-experience__card-title"
            v-html="card.title"
          />
          <div
            class="s-mba-experience__description a-font_slider-text"
            v-html="card.discription"
          />
          <AImg
            class="s-mba-experience__bg"
            :src="card.bg"
            :alt="card.title"
          />
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaExperience';
</style>
