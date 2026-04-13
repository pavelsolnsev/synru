<script setup lang="ts">
interface Props {
  image?: string;
  title?: string;
  date?: string;
}

const {
  image = '',
  title = '',
  date = '',
} = defineProps<Props>();
</script>

<template>
  <div class="photo-gallery__item">
    <AImg :src="image" />
    <div
      class="a-font_xl"
      v-html="title"
    />
    <div
      class="a-font_l photo-gallery__date"
      v-html="date"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './MPhotoGallery.scss';
</style>
