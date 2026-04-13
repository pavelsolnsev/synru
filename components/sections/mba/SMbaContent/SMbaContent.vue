<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
  routeName?: string;
}

const { entity } = defineProps<Props>();

const data = {
  ...(entity.customFields.mba_program_content?.length ? entity.customFields.mba_program_content[0] : {}),
};

const year = new Date().getFullYear();
</script>

<template>
  <MSection
    v-if="data.title"
    class="s-mba-content"
  >
    <div class="s-mba-content__top">
      <h2
        class="s-mba-content__title a-font_h2"
        v-html="data.title"
      />
      <span class="a-font_m-m title-tag">
        <ASvgMono name="reload" />
        <span>Обновлено в {{ year }} году</span>
      </span>
    </div>
    <div
      v-if="data.subtitle"
      class="s-mba-content__subtitle a-font_h6"
      v-html="data.subtitle"
    />
    <ul
      v-if="data.tags && data.tags.length"
      class="s-mba-content__tags"
    >
      <li
        v-for="tag in data.tags"
        :key="tag.tag"
        class="s-mba-content__tag a-font_l-m"
      >
        {{ tag.tag }}
      </li>
    </ul>
    <MMbaContentWrapper
        :base-modules="data.baseModules"
        :bonusModule="data.bonusModules"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaContent';
</style>
