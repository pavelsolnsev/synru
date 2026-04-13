<script setup lang="ts">
import { useWindowScroll , useThrottleFn } from '@vueuse/core';

const { y } = useWindowScroll();
const page = shallowRef<number>(1);
const stopLoading = shallowRef(false);

const items = computed(() => {
  return new Array(page.value);
});

//- для тестирования: имитация бесконечной погрузки блоков при скролле
const handleScroll = useThrottleFn((oldVal: number, newVal: number) => {
  if (stopLoading.value) return;

  if( newVal > (document.documentElement.scrollHeight - window.innerHeight * 1.75) && newVal < oldVal ) {
    stopLoading.value = true;
    page.value++;
    stopLoading.value = true;
  }
  stopLoading.value = false;
}, 200, true);

watch(y, handleScroll);
</script>

<template>
  <MArticleBreadcrumbs />
  <SArticlePreview :has-promo="true" />
  <SVideoList
    title="Вам может понравиться"
    :per-page="3"
    :paginator="true"
  />
  <MPromo />
  <SArticlePreview :has-promo="true" />
  <SRecommendCources />
  <template
    v-for="(item, index) in items"
    :key="index"
  >
    <SArticlePreview :has-promo="true" />
    <MPromo />
  </template>
</template>
