<script setup lang="ts">
const { showMenu } = useArticlesMenu();
</script>

<template>
  <SArticlesHeader @open-menu="showMenu = !showMenu" />
  <SCols
    :open="showMenu"
  >
    <slot />
  </SCols>
  <SDownloadAppNew />
  <SFooter />
  <SFixedBottom />
</template>
