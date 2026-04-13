<script setup lang="ts">
import { THANKS } from '~/constants/routes';
const route = useRoute();

const showSWidget = (route.path === THANKS ? false : true) && false;

const isVisibleUpButton = ref(false);
</script>

<template>
  <div class="s-fixed-bottom">
    <MUpButton @visible="(isVisible) => isVisibleUpButton = isVisible" />
    <SBottomButtons />
    <SWidget
      v-if="showSWidget"
      :is-visible-up-button
    />
  </div>
</template>

<style lang="scss" scoped>
@import './SFixedBottom.scss';
</style>
