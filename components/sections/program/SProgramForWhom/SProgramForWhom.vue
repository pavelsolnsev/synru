<script setup lang="ts">
import type { ProgramEntity } from '~/types';
import formatNumberWithLeadingZero from '~/utils/formatNumberWithLeadingZero';

interface Props {
  entity: ProgramEntity | null;
}

const { entity = null } = defineProps<Props>();

const forWhom = entity?.customFields?.for_whom || [];
</script>

<template>
  <MSection
    v-if="forWhom.length"
    title="Программа подойдёт"
    class="s-for-whom"
  >
    <div class="s-for-whom__wrap">
      <div
        v-for="item, index in forWhom"
        :key="index"
        class="s-for-whom__item a-font_h6"
      >
        <div
          class="s-for-whom__item-title"
          v-html="item.title ?? item.text"
        />
        <div class="s-for-whom__item-num">
          {{ formatNumberWithLeadingZero(index + 1) }}
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SProgramForWhom.scss';
</style>
