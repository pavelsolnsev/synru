<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';
import type { BreadcrumbItem } from '~/types';

const { breadcrumbs = [] } = defineProps<{
  breadcrumbs: BreadcrumbItem[],
}>();

const route = useRoute();

const breadcrumbsWithEmoji = computed(() => {
  if (breadcrumbs.length === 0) return [];

  return breadcrumbs.map((item, index) => {
    if (index === breadcrumbs.length - 1) {
      return item;
    }

    return {
      ...item,
      title: `<span class="emoji">🚩 </span>${item.title}`,
    };
  });
});

function isLast(idx: number): boolean {
  return idx === breadcrumbs.length - 1 && idx != 0;
}

function absentHref(item: BreadcrumbItem) {
  return !item.link || item.link === '#';
}

const NuxtLink = resolveComponent('NuxtLink');
</script>

<template>
  <swiper
    :modules="[FreeMode]"
    :space-between="0"
    :resistance-ratio="0"
    resistance
    free-mode
    grab-cursor
    slides-per-view="auto"
    class="m-breadcrumbs swiper a-font_xs"
    itemscope
    itemtype="https://schema.org/BreadcrumbList"
  >
    <swiper-slide
      v-for="(item, idx) in breadcrumbsWithEmoji"
      :key="item.title"
      class="swiper-slide"
    >
      <span
        :class="{
          'm-breadcrumbs__link--last': isLast(idx)
        }"
        class="m-breadcrumbs__link"
        itemprop="itemListElement"
        itemtype="https://schema.org/ListItem"
        itemscope
      >
        <component
          :is="isLast(idx) || absentHref(item) ? 'span' : NuxtLink"
          :to="isLast(idx) || absentHref(item) ? null : item.link"
          :external="isLast(idx) || !item.external ? null : true"
          :itemprop="isLast(idx) ? '' : 'item'"
        >
          <span
            itemprop="name"
            v-html="item.title"
          />
        </component>
        <link
          v-if="isLast(idx)"
          itemprop="item"
          :href="route.path"
        >
        <meta
          itemprop="position"
          :content="`${idx + 1}`"
        >
      </span>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
@import './MBreadcrumbs.scss';
</style>
