<script setup lang="ts">
interface Props {
  alt?: string;
}

const {
  alt = 'image',
} = defineProps<Props>();

const cleanedAlt = transformAlt(alt);

function transformAlt(alt: string | null) {
  const DEFAULT_ALT = 'image';

  if (typeof alt !== 'string' || alt.trim() === '') return DEFAULT_ALT;

  return alt
    .replace(/&nbsp;|&shy;|<br\s*\/?>/gi, ' ')
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
</script>

<template>
  <img
    itemprop="image"
    :alt="cleanedAlt"
  >
</template>
