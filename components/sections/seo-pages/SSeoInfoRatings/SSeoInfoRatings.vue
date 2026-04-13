<script setup lang='ts'>
interface Props {
  btnLink?: string
  image?: string
  entity: {
    customFields?: {
      'seo-info-ratings': Array<{
        image?: string;
        btnLink?: string;
      }>;
      [key: string]: unknown;
    };
  }
}

const props = defineProps<Props>();

const image = props.entity.customFields?.['seo-info-ratings']?.at(0)?.image || (props.image || '');
const btnLink = props.entity.customFields?.['seo-info-ratings']?.at(0)?.btnLink || (props.btnLink || '');
</script>

<template>
  <SInfoRatings
    :btn-link
    :img="image"
  />
</template>
