<script setup lang="ts">
interface AppLink {
  name: string,
  link: string,
  image: string,
}

const { title = '', appLinks = [] } = defineProps<{
  title?: string,
  appLinks: AppLink[],
}>();
</script>

<template>
  <div class="m-app-links">
    <div class="m-app-links__title a-font_s-m">
      {{ title }}
    </div>
    <div class="m-app-links__wrapper">
      <NuxtLink
        v-for="appLink in appLinks"
        :key="appLink.link"
        :to="appLink.link"
        :aria-label="appLink.name"
        class="m-app-links__item"
        target="_blank"
      >
        <AImg
          :src="appLink.image"
          :data-src="appLink.image"
          :alt="appLink.name"
          class="lazy"
          loading="lazy"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MAppLinks.scss';
</style>
