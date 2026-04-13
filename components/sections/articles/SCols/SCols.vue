<script setup lang="ts">
const {
  open = false,
} = defineProps<{
  open: boolean,
}>();

const {
  menu,
  activeRoutes,
  defaultOpenedMenu,
} = useArticlesMenu();
</script>

<template>
  <MSection class="s-cols">
    <div class="s-cols__wrapper">
      <MArticlesMenu
        :menu
        :open
        :active-routes
        :default-opened-menu
      />
      <div class="s-cols__main">
        <slot />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCols.scss';
</style>
