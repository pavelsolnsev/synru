<script setup lang='ts'>
import type { Fonts } from '~/types';

interface Props {
  hideRune?: boolean;
  title?: string;
  titleClass: Fonts;
  subtitle?: string;
  subtitleClass: Fonts;
  text?: string;
  textClass: Fonts;
  img?: string;
  icons?: { icon: string }[];
  tags?: { tag: string }[];
}

const {
  hideRune = false,
  title = '',
  titleClass = 'a-font_h2',
  subtitle = '',
  subtitleClass = 'a-font_h5',
  text = '',
  textClass = 'a-font_h6',
  img = '',
  icons = [],
  tags = [],
} = defineProps<Props>();

const mapIcons = icons.map(({ icon }) => icon);
const mapTags = tags.map(({ tag }) => tag);
</script>

<template>
  <MSection class="s-grid-text-img">
    <MCardText
      :title
      :text="subtitle"
      :icons="mapIcons"
      :tags="mapTags"
      :title-class
      :text-class="subtitleClass"
    >
      <ASvgMono
        v-if="!hideRune"
        class="s-grid-text-img__rune"
        name="simple-rune"
      />
      <div
        :class="textClass"
        v-html="text"
      />
    </MCardText>
    <AImg
      :src="img"
      alt=""
      decoding="async"
      loading="lazy"
    />
  </MSection>
</template>

<style scoped lang='scss'>
@import './SGridTextImg.scss';
</style>
