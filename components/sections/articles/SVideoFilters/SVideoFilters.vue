<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import { video } from '../SVideoList/SVideoListData';

const { width: windowWidth } = useWindowSize();

const limit = computed(() => {
  return windowWidth.value < 768 ? 6 : 9;
});

const filters = ['SMM','Таргетинг','Лидогенерация','SEO','Автоматизация','Маркетплейсы','Продвижение','Реклама'];
const page = shallowRef<number>(1);
const tabId = shallowRef<string>('');

const filteredVideo = computed(() => {
  return !tabId.value ? video : video.filter((item) => item.category === tabId.value);
});

function isVisibleCard(index: number, category: string) {
  return (!tabId.value || category === tabId.value) && (index < page.value * limit.value);
}

function reset() {
  tabId.value = '';
  page.value = 1;
}

function clickTab(val: string) {
  tabId.value = val;
  page.value = 1;
}
</script>

<template>
  <MSection
    class="s-video-filters"
  >
    <div class="s-video-filters__list">
      <MFilterTab
        title="Все направления"
        :active="!tabId"
        @click.prevent="reset"
      />
      <MFilterTab
        v-for="item in filters"
        :key="item"
        :title="item"
        :active="tabId === item"
        @click.prevent="clickTab(item)"
      />
    </div>

    <div class="s-video-filters__result">
      <template
        v-for="(item, index) in filteredVideo"
        :key="index"
      >
        <MArticleVideo
          v-if="isVisibleCard(index, item.category)"
          :video="item.video"
          :image="item.image"
          :title="item.title"
          :text="item.text"
          :tag="item.tag"
        />
      </template>
    </div>
    <MMore
      v-if="page < filteredVideo.length / limit"
      type="button"
      text="Показать ещё"
      @click.stop="page++"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SVideoFilters.scss';
</style>
