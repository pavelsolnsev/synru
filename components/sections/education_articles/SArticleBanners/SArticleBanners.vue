import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
const {
  href = '',
  imageLg = synergyApi('uploads/content/storybook/molecules/m-article-card-second/marticlecardsecond.webp'),
  imageMd = synergyApi('uploads/content/storybook/molecules/m-article-card-second/marticlecardsecond.webp'),
  imageSm = synergyApi('uploads/content/storybook/molecules/m-article-card-second/marticlecardsecond.webp'),
  btnText = '',
} = defineProps<{
  href?: string,
  imageLg?: string,
  imageMd?: string,
  imageSm?: string,
  btnText?: string,
}>();
</script>

<template>
  <div class="s-article-banners">
    <slot>
      <div class="s-article-banners__space" />
      <MArticlesBannerSecond
        :image-sm
        :image-md
        :image-lg
        :to="href"
        :btn-text="btnText"
      />
    </slot>
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleBanners.scss';
</style>
