<script setup lang="ts">
import type { ArticleZoomable } from '~/types';
import { useWindowSize } from '@vueuse/core';

interface Props {
  image: ArticleZoomable;
  articleId?: number;
}

const {
  image,
  articleId,
} = defineProps<Props>();

const sectionRef = useTemplateRef('sectionRef');
let body: null | HTMLBodyElement = null;

const scrollCount = shallowRef(0);
const MAX_SCROLL_COUNT = 9;

const { width: windowWidth } = useWindowSize();
const isDesktop = computed(() => windowWidth.value >= 1200);

const url = image?.url ?? '';

const urlSlug = url.split('/').at(-1);

const params: Record<string, string> = {
  title: image.title ?? '',
  'filter[level]': image.level ?? '',
  'about_title': image.title_about ?? '',
  'about_text': image.text_about ?? '',
  'utm_source': 'SiteSynergy',
  'utm_medium': 'site',
  'utm_campaign': 'educatartikles',
  'utm_term': 'promo',
  'marketer': 'rev',
  'produkt': urlSlug ?? '',
  'utm_gen': '3',
  'utm_content': String(articleId),
};

const urlSearchParams = new URLSearchParams(params);

const paramString = urlSearchParams?.toString();

const fullUrl = `${url}?${paramString}`;

onMounted(() => {
  if (!isDesktop.value) return;

  const findBody = document.querySelector('body');

  if (!findBody) return;

  body = findBody;

  body.addEventListener('wheel', wheel);
});

onUnmounted(() => {
  body?.removeEventListener('wheel', wheel);
});

async function wheel(event: WheelEvent) {
  const deltaY = event.deltaY;

  if (!sectionRef.value) return;

  const blockRect = sectionRef.value.getBoundingClientRect();

  const isBelowBlock = blockRect.top < window?.innerHeight;

  if (!isBelowBlock) return;

  if (scrollCount.value === 9) {
    return await navigateTo(fullUrl, { external: true });
  }

  if (deltaY > 0) {
    scrollCount.value = Math.min(scrollCount.value + 1, MAX_SCROLL_COUNT);
  }

  else if (deltaY < 0) {
    scrollCount.value = Math.max(scrollCount.value - 1, 0);
  }
}
</script>

<template>
  <div
    v-if="image?.url"
    ref="sectionRef"
    class="image-container"
  >
    <NuxtLink
      :to="fullUrl"
    >
      <picture>
        <source
          :srcset="image?.image_lg ?? ''"
          media="(min-width: 1200px)"
        >
        <source
          :srcset="image?.image_md ?? ''"
          media="(min-width: 768px)"
        >
        <AImg
          :src="image?.image_sm ?? ''"
          class="zoomable-image"
          alt="Zooming Image"
          :style="{transform: `scale(${1}.${scrollCount})`}"
        />
      </picture>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@import './SArticleZoomableImg.scss';
</style>
