<script setup lang="ts">
import { cards } from './sChancesEntryData';
</script>

<template>
  <MSection
    class="s-chances-entry"
    title="Как повысить шансы на&nbsp;поступление"
  >
    <div class="s-chances-entry__wrapper">
      <div
        v-for="item in cards"
        :key="item.title"
        class="s-chances-entry__item"
        :class="item.class"
      >
        <div class="s-chances-entry__item__header">
          <div
            class="s-chances-entry__item__header-title"
            :class="item.titleClass ? item.titleClass : 'a-font_h5'"
            v-html="item.title"
          />
          <ASvgMono
            v-if="item.icon"
            type="colors"
            :name="item.icon"
          />
        </div>
        <div
          class="s-chances-entry__item__header__footer"
          :class="item.textClass ? item.textClass : 'a-font_l-m'"
          v-html="item.text"
        />
        <AImg
          v-if="item.image"
          class="s-chances-entry__image"
          alt="chance"
          :src="item.image"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SChancesEntry.scss';
</style>
