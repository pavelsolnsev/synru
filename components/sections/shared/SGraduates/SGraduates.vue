<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar, FreeMode } from 'swiper/modules';

interface Props {
  graduates: Item[];
  athletes: Item[];
}

interface Item {
  name: string;
  info?: string;
  image: string;
  text?: string;
}

const {
  athletes = [],
  graduates = [],
} = defineProps<Props>();

const tabs = [{ label: 'Наши выпускники' }, { label: 'Наши спортсмены' }];

const activeTab = ref(0);
</script>

<template>
  <MSection
    class="s-graduates"
  >
    <MTabs
      v-model="activeTab"
      class="s-graduates__nav --full"
      tab-class="a-font_l-m"
      :items="tabs"
    />
    <template
      v-for="item, index in [graduates, athletes]"
      :key="index"
    >
      <div
        v-show="activeTab === index"
        class="m-tabs__tab s-graduates__tab"
      >
        <swiper
          slides-per-view="auto"
          grab-cursor
          observer
          observe-parents
          resistance
          free-mode
          :modules="[Navigation, Scrollbar, FreeMode]"
          :resistance-ratio="0"
          :space-between="0"
          :scrollbar="{
            horizontalClass: 'swiper-scrollbar',
            el: `.s-graduates__tab .swiper-scrollbar-${index}`,
          }"
          :navigation="{
            prevEl: `.s-graduates-nav-${index} .swiper-button-prev`,
            nextEl: `.s-graduates-nav-${index} .swiper-button-next`
          }"
        >
          <template #wrapper-start>
            <MGraduateCard
              v-for="{ image: img, info, name, text }, slideIndex in item"
              :key="slideIndex"
              class="swiper-slide"
              :info
              :name
              :text
              :img
            />
          </template>
        </swiper>
        <MSwiperNav :class="`s-graduates-nav-${index}`" />

        <div :class="`swiper-scrollbar-${index} swiper-scrollbar`" />
      </div>
    </template>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SGraduates.scss';
</style>
