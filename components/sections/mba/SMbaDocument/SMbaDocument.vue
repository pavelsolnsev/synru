<script setup lang="ts">
import type { MbaProgramEntity } from '~/types/MbaProgramEntity';

interface Props {
  entity: MbaProgramEntity;
  routeName?: string;
}

const { entity } = defineProps<Props>();

const data = {
  ...(entity.customFields.mba_program_document?.length ? entity.customFields.mba_program_document[0] : {}),
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
    class="s-mba-document"
  >
    <div class="s-mba-document__body">
      <h2
        class="s-mba-document__title a-font_h2"
        v-html="data.title"
      />
      <div
        v-if="data.description"
        class="s-mba-document__description a-font_h6"
        v-html="data.description"
      />
      <ABgImages
        v-if="data.imageLG || data.imageMD || data.imageSM"
        v-bind="bgImagesProps"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMbaDocument.scss';
</style>
