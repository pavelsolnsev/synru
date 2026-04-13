<script setup lang="ts">
import { topMenu2 } from './headerData';

const path = computed(() => useRoute().path);
</script>

<template>
  <nav
    class="s-header__nav"
    itemscope
    itemtype="https://schema.org/SiteNavigationElement"
  >
    <APriemnayaKomissiya />
    <div class="s-header__levels">
      <AMenuLink
        v-for="{ title, to, attributes, bgColor, textColor } in topMenu2"
        :key="to"
        :bg-color
        :text-color
        :to
        :active="path === to || `${path}/` === to"
        itemprop="url"
        v-bind="attributes"
      >
        <span v-html="title" itemprop="name" />
      </AMenuLink>
    </div>
    <slot />
  </nav>
</template>

<style lang="scss" scoped>
@import './SHeader.scss';
</style>
