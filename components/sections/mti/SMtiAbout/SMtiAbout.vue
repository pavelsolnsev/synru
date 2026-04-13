<script setup lang='ts'>
import type { BgImage } from '~/types/BgImage';

interface Props {
  title: string
  subtitle: string
  description: string
  slider1: {
    img: string
  }[]
  slider2: {
    img: string
  }[]
  bgImages: BgImage[]
}

defineProps<Props>();
</script>

<template>
  <MSection
    class="s-mti-about"
    :title
  >
    <div class="s-mti-about__body">
      <div class="s-mti-about__gallery">
        <div
          class="s-mti-about__gallery-item"
          :style="`--slide-count:${slider1.length}`"
        >
          <AImg
            v-for="(img, idx) in slider1"
            :key="img.img"
            :src="img.img"
            :style="`--n:${idx}`"
            decoding="async"
            loading="lazy"
          />
        </div>
        <div
          class="s-mti-about__gallery-item"
          :style="`--slide-count:${slider2.length}`"
        >
          <AImg
            v-for="(img, idx) in slider2"
            :key="img.img"
            :src="img.img"
            :style="`--n:${idx}`"
            class="--toRight"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
      <div
        class="a-font_h5 s-mti-about__title"
        v-html="subtitle"
      />
      <div
        class="a-font_h6  s-mti-about__text"
        v-html="description"
      />
      <ABgImages v-bind="{...bgImages[0]}" />
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SMtiAbout.scss';
</style>
