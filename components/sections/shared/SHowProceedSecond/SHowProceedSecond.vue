<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';

import { items } from './sHowProceedSecondData';
import { FreeMode } from 'swiper/modules';
import { ROUTES } from '~/constants';

const tabs = items.map((item) => ({ label: item.label }));

const currentTab = ref(0);

const tabItems = computed(() => {
  return items[currentTab.value].items ?? [];
});

const itemHasLkButton = computed(() => {
  if (!tabItems.value?.length) return false;

  return tabItems.value.some((item) => item.lkButton);
});

const {
  swiperRef,
  swiperConfig,
} = useSwiperWrapper({
  modules: [FreeMode],
  freeMode: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});
</script>

<template>
  <MSectionSecond
    title="Как поступить"
    class="s-how-proceed-second"
    :class="{
      '--lk-link' : itemHasLkButton
    }"
  >
    <MTabs
      v-model="currentTab"
      :items="tabs"
      class="s-how-proceed-second__tabs"
    />

    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      class="s-how-proceed-second__tabs__slider"
    >
      <swiper-slide
        v-for="item, index in tabItems"
        :key="item.title"
        class="s-how-proceed-second__item"
      >
        <div
          class="s-how-proceed-second__item__title"
          v-html="item.title"
        />
        <div
          class="s-how-proceed-second__item__bottom"
        >
          <div
            class="s-how-proceed-second__item__desc"
            v-html="item.description"
          />
          <div
            class="s-how-proceed-second__item__num"
          >
            <span>{{ index + 1 }}</span>
          </div>
        </div>
        <AButton
          v-if="item.lkButton"
          bg-color="black"
          :to="ROUTES.LK_REGISTRATION"
        >
          Войти в личный кабинет
        </AButton>
      </swiper-slide>
    </swiper>
  </MSectionSecond>
</template>

<style lang="scss" scoped>
@import './SHowProceedSecond.scss';
</style>
