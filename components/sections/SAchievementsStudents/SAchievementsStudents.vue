<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface Props {
  achievements: Achievement[];
  entity: Entity | null;
  hasEntity: boolean;
}

interface Entity {
  customFields: { achievement: Achievement[] };
}

interface Achievement {
  title: string;
  text: string;
  image: string;
}

const {
  achievements = [],
  entity = null,
  hasEntity = false,
} = defineProps<Props>();

const entityAchievements = entity?.customFields?.achievement ?? [];

const items = hasEntity
  ? entityAchievements
  : achievements;

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection
    v-if="items.length"
    title="Достижения наших студентов"
    class="s-achievements-students"
  >
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="(item, index) in items"
        :key="index"
        class="s-achievements-students__item"
      >
        <div class="s-achievements-students__item-top">
          <AImg
            class="s-achievements-students__item-img lazy"
            decoding="async"
            :src="item.image"
            :data-srcset="item.image"
            :alt="item.title"
          />
          <div
            class="s-achievements-students__item-name a-font_h6"
            v-html="item.title"
          />
        </div>
        <div
          class="s-achievements-students__item-text a-font_xl-m"
          v-html="item.text"
        />
      </swiper-slide>
      <MSwiperNav ref="navRef" />
    </swiper>

    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </MSection>
</template>

<style lang="scss" src="./SAchievementsStudents.scss" scoped />
