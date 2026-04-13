<script setup lang="ts">
import CardLine from '~/assets/images/s_prices/card-line.svg?url';
import CardLineMob from '~/assets/images/s_prices/card-line_mob.svg?url';
import type { TagVariant, Fonts } from '~/types';

interface Props {
  tag?: string;
  tagType?: TagVariant;
  tagFontSize?: Fonts;
  title?: string;
  titleClass?: Fonts;
  imgLg?: string;
  imgSm?: string;
  showBgImage?: boolean;
}

const {
  title = '',
  titleClass = 'a-font_h4',
  tag = '',
  tagType = 'white',
  tagFontSize = '',
  imgLg = '',
  imgSm = '',
  showBgImage = false,
} = defineProps<Props>();
</script>

<template>
  <div class="m-card-tag-title">
    <ATag
      :text="tag"
      :variant="tagType"
      :font="tagFontSize"
    />
    <div
      class="m-card-tag-title__title"
      :class="titleClass"
      v-html="title"
    />
    <picture
      v-if="showBgImage"
    >
      <source
        :srcset="imgLg || CardLine"
        media="(min-width: 1200px)"
      >
      <AImg
        :src="imgSm || CardLineMob"
        alt="cardImg"
      />
    </picture>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@import './MCardTagTitle.scss';
</style>
