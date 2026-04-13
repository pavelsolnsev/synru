<script setup lang="ts">
interface IBanner {
  href?: string,
  imageLg?: string,
  imageMd?: string,
  imageSm: string,
  btn_text: string,
}

const {
  banners = [],
} = defineProps<{
  banners?: IBanner[],
}>();
</script>

<template>
  <template v-if="banners">
    <NuxtLink
      v-for="item in banners"
      :key="item.href"
    >
      <picture>
        <source
          :srcset="item.imageLg"
          media="(min-width: 1200px)"
        >
        <source
          :srcset="item.imageMd"
          media="(min-width: 768px)"
        >
        <AImg
          :src="item.imageSm"
          alt="banner"
          loading="lazy"
          decoding="async"
        />
      </picture>
      <AButton
        type="button"
        bg-color="red"
      >
        <span>{{ item.btn_text }}</span>
      </AButton>
    </NuxtLink>
  </template>
</template>

<style lang="scss">
@import './SMainBanner.scss';
</style>
