<script setup lang="ts">
import { ROUTES } from '~/constants';

const route = useRoute();
const path = computed(() => route.path);

const smallMenuRoutes = new Set<string>([
  ROUTES.GALLERY,
  ROUTES.VIDEOGALLERY,
  ROUTES.SMI_ABOUT_US,
]);
</script>

<template>
  <main
    class="mediacenter"
    :class="{'--small': smallMenuRoutes.has(path)}"
  >
    <div class="mediacenter__wrapper">
      <slot />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import './SMediaCenter.scss';
</style>
