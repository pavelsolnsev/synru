<script setup lang="ts">
import { sveden } from './headerData';
</script>

<template>
  <div class="s-header__top">
    <NuxtLink
      v-if="false"
      :to="sveden.to"
      :external="sveden.external"
      class="s-header__top-sveden a-font_xs"
    >
      <span v-html="sveden.text" />
    </NuxtLink>
    <div v-else />
    <button
      type="button"
      class="s-header__top-eyes"
    >
      <span class="a-font_xs">Версия для&nbsp;слабовидящих</span>
      <ASvgMono name="eye" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import './SHeader.scss';
</style>
