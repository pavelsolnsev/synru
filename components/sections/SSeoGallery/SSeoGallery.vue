<script setup lang='ts'>
import type { SectionConditionalGroup } from '~/types';

interface Props {
  entity: {
    id: number;
    customFields?: {
      'seo-gallery-grid': Array<{
        title: string;
        gallery: { image: string }[];
      }>;
      [key: string]: unknown;
    };
  };
  conditionalGroup?: SectionConditionalGroup[];
}

const {
  entity,
  conditionalGroup = [],
} = defineProps<Props>();

const customFields = entity.customFields?.['seo-gallery-grid']?.at(0);
const title = customFields?.title || 'Что будет в&nbsp;колледже';
const images = customFields?.gallery || [];

const showSection = typeof conditionalGroup !== 'undefined' ? needRenderSection({ conditionalGroup: conditionalGroup, data: { entityId: entity?.id } }) : true;
</script>

<template>
  <MSectionNewResponsive
    v-if="showSection && images.length"
    :title
    :is-responsive-title="true"
    class="s-seo-gallery"
  >
    <div class="s-seo-gallery__content">
      <AImg
        v-for="image in images"
        :key="image.image"
        :src="image.image"
        loading="lazy"
        decoding="async"
      />
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang='scss'>
@import './SSeoGallery.scss';
</style>
