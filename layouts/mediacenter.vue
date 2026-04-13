<script setup lang="ts">
const {
  menu,
  activeRoutes,
  defaultOpenedMenu,
  showMenu,
} = useArticlesMenu();
</script>

<template>
  <SArticlesHeader @open-menu="showMenu = !showMenu" />
  <SMediaCenter>
    <MArticlesMenu
      :menu
      :active-routes
      :default-opened-menu
      :open="showMenu"
    />
    <slot />
  </SMediaCenter>
  <SDownloadAppNew />
  <SFooter />
  <SFixedBottom />
</template>
