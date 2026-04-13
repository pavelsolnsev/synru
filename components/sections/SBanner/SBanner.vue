<script setup lang="ts">
type BtnColor = 'red' | 'black' | 'white';

interface Props {
  title?: string;
  titleClass?: string;
  description?: string;
  descriptionClass?: string;
  bgColor?: string;
  bgImageSm?: string;
  bgImageMd?: string;
  bgImageLg?: string;
  imageSm?: string;
  imageMd?: string;
  imageLg?: string;
  btnHref?: string;
  btnColor?: BtnColor;
  btnText?: string;
  btnClick?: () => void;
}

const {
  titleClass = 'a-font_h2',
  descriptionClass = 'a-font_h6',
  bgColor = 'dark',
} = defineProps<Props>();
</script>

<template>
  <div
    class="s-banner"
    :class="`s-banner_bg--${bgColor}`"
  >
    <picture
      v-if="bgImageSm"
      class="s-banner__bg-img"
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
        :src="bgImageSm"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </picture>

    <div class="s-banner__head">
      <div
        v-if="title"
        class="s-banner__title"
        :class="titleClass"
        v-html="title"
      />
      <div
        v-if="description"
        class="s-banner__description"
        :class="descriptionClass"
        v-html="description"
      />
    </div>

    <picture
      v-if="imageSm"
      class="s-banner__img"
    >
      <source
        v-if="imageLg"
        :srcset="imageLg"
        media="(min-width: 1200px)"
      >
      <source
        v-if="imageMd"
        :srcset="imageMd"
        media="(min-width: 768px)"
      >
      <source :srcset="imageSm">
      <AImg
        :src="imageSm"
        loading="lazy"
        decoding="async"
      />
    </picture>

    <template v-if="btnClick">
      <AButton
        :bg-color="btnColor"
        @click="btnClick"
      >
        {{ btnText }}
      </AButton>
    </template>

    <template v-else>
      <AButton
        v-if="btnText"
        :to="btnHref"
        :bg-color="btnColor"
        size="lg"
      >
        {{ btnText }}
      </AButton>
    </template>
    <slot />
  </div>
</template>

<style lang="scss" scoped src="./SBanner.scss" />
