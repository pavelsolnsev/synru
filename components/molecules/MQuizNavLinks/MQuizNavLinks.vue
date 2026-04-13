<script setup lang="ts">
import { FreeMode } from 'swiper/modules';
import { Swiper } from 'swiper/vue';

interface NavItem {
  title: string;
  attrType: 'class' | 'id';
  attrName: string
}

interface Props {
  navItems: NavItem[]
}

const {
  navItems = [],
} = defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
}  = useSwiperWrapper({
  modules: [FreeMode],
  freeMode: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
});

function onNavItemClick(item: NavItem) {
  if (!import.meta.client) return;

  const selectorTypeMap = {
    'id': '#',
    'class': '.',
  };

  const selector = selectorTypeMap[item.attrType];
  const selectorName = item.attrName;
  if (!selector) return;

  const findBlock = document.querySelector(`${selector}${selectorName}`);

  if (findBlock) {
    const { top } = findBlock.getBoundingClientRect();

    window.scrollBy({ top: top - 120, behavior: 'smooth' });
  }
}
</script>

<template>
  <div
    v-if="navItems.length"
    class="m-quiz-nav-links"
  >
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
    >
      <template #wrapper-start>
        <button
          v-for="item in navItems"
          :key="item.title"
          class="swiper-slide"
          @click="onNavItemClick(item)"
        >
          <span v-html="item.title" />
        </button>
      </template>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import './MQuizNavLinks.scss';
</style>
