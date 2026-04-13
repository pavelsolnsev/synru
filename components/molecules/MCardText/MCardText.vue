<script setup lang="ts">
import type { Fonts } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  text?: string;
  textClass?: Fonts;
  tags?: string[];
  tagClass?: Fonts;
  icons?: string[];
  isBig?: boolean;
  bgImageLg?: string;
  bgImageMd?: string;
  bgImage?: string;
  isResponsiveTitle?: boolean,
}

const {
  title = '',
  titleClass = 'a-font_h4',
  text = '',
  textClass = 'a-font_h6',
  icons = [],
  tags = [],
  tagClass = 'a-font_m-m',
  isBig = false,
  bgImage = '',
  bgImageLg = '',
  bgImageMd = '',
  isResponsiveTitle = false,
} = defineProps<Props>();

if (isResponsiveTitle) {
  useFitText('titleRef');
}
</script>

<template>
  <div
    class="m-card-text"
    :class="{
      'm-card-text--big': isBig,
    }"
  >
    <div
      class="m-card-text__title"
      :class="titleClass"
    >
      <slot name="title" v-if="$slots.title"></slot>
      <template v-else-if="title">
        <div ref="titleRef" v-dompurify-html="title" />
      </template>
    </div>
    <div
      v-if="text"
      v-dompurify-html="text"
      class="m-card-text__text"
      :class="textClass"
    />
    <picture
      v-if="bgImage"
      class="m-card-text__image"
    >
      <source
        v-if="bgImageLg"
        :srcset="bgImageLg"
        media="(min-width: 1200px)"
      >
      <source
        v-if="bgImageMd"
        :srcset="bgImageMd"
        media="(min-width: 768px)"
      >
      <AImg
        :src="bgImage"
        alt="cardImg"
        loading="lazy"
        decoding="async"
      />
    </picture>
    <div
      v-if="$slots.default || tags.length || icons.length"
      class="m-card-text__bottom"
    >
      <div
        v-if="$slots.default"
        class="m-card-text__block a-font_h6"
      >
        <slot />
      </div>
      <div
        v-if="tags.length"
        class="m-card-text__tags"
      >
        <ATag
          v-for="tag in tags"
          :key="tag"
          :text="tag"
          :font="tagClass"
          variant="black"
        />
      </div>
      <div
        v-if="icons.length"
        class="m-card-text__icons a-font_h5"
      >
        <div
          v-for="name in icons"
          :key="name"
          class="m-card-text__icon"
        >
          <ASvgMono :name />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MCardText.scss';
</style>
