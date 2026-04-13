<script setup lang="ts">
interface Props {
  title?: string;
  items?: { title?: string; to?: string; ico?: string }[]
}

const {
  title,
  items = [],
} = defineProps<Props>();
</script>

<template>
  <div
    v-if="items?.length"
    class="s-article-specialities"
  >
    <h4
      class="s-article-specialities__title a-font_h4"
      v-html="title"
    />

    <div class="s-article-specialities__list a-font_xl-m">
      <NuxtLink
        v-for="item in items"
        :key="item.title"
        class="s-article-specialities__link"
        :to="item.to"
      >
        <span
          class="s-article-specialities__link-title"
          v-html="item.title"
        />
        <span
          class="s-article-specialities__link-ico"
        >
          <AImg
            v-if="item.ico"
            :src="item.ico"
            loading="lazy"
            decoding="async"
          />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleSpecialities.scss';
</style>
