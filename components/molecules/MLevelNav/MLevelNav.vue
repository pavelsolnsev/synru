<script setup lang="ts">
import type { MenuLinkColor } from '~/types';
import { Swiper, SwiperSlide } from 'swiper/vue';

interface Props {
  items: Level[]
}

interface Level {
  title: string;
  to: string;
  bgColor?: MenuLinkColor,
  textColor?: MenuLinkColor,
}

const {
  items = [],
} = defineProps<Props>();

const route = useRoute();
</script>

<template>
  <div class="m-level-nav swiper-container">
    <swiper
      slides-per-view="auto"
      grab-cursor
    >
      <swiper-slide
        v-for="{ title, to, bgColor, textColor } in items"
        :key="title"
      >
        <AMenuLink
          :to
          :bg-color
          :text-color
          :active="route.path === to"
        >
          {{ title }}
        </AMenuLink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import './MLevelNav.scss';
</style>
