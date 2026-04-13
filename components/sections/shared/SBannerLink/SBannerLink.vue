<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
  href?: string;
  imageLg?: string;
  imageSm?: string;
}

const {
  title: rawTitle = '',
  description = '',
  href = '',
  imageLg = '',
  imageSm = '',
} = defineProps<Props>();

const title = rawTitle
  ? rawTitle?.replace('&lt;', '<')?.replace('&gt;', '>')
  : '';
</script>

<template>
  <MSectionNewResponsive
    class="s-banner-link"
  >
    <NuxtLink
      :to="href"
    >
      <div class="s-banner-link__wrapper">
        <div
          v-if="title"
          v-dompurify-html="title"
          class="a-font_h5"
        />
        <div
          v-if="description"
          v-dompurify-html="description"
          class="s-banner-link__description a-font_xs-r"
        />
      </div>

      <picture class="s-banner-link__image">
        <source
          :srcset="imageLg"
          media="(min-width: 1200px)"
        >
        <source
          :srcset="imageLg"
          media="(min-width: 768px)"
        >
        <AImg
          :src="imageSm"
          alt="banner"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </NuxtLink>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SBannerLink.scss';
</style>
