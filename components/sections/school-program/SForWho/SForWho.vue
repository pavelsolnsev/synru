<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import type { SchoolProgramEntity } from '~/types';
import ICON_1 from '~/assets/images/school/1.svg?url';
import ICON_2 from '~/assets/images/school/2.svg?url';
import ICON_3 from '~/assets/images/school/3.svg?url';
import ICON_4 from '~/assets/images/school/4.svg?url';
import ICON_5 from '~/assets/images/school/5.svg?url';
import ICON_6 from '~/assets/images/school/6.svg?url';

interface Props {
  entity: SchoolProgramEntity;
}

const { entity = null } = defineProps<Props>();

const { s_for_who_title: title = '', s_for_who_items: slideItems = [] } = entity?.customFields ?? {};

const icons = [ICON_1, ICON_2, ICON_3, ICON_4, ICON_5, ICON_6];

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
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection
    v-if="slideItems?.length"
    :title
    class="s-for-who"
  >
    <div class="s-for-who__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <div
            v-for="(item, idx) in slideItems"
            :key="item.title"
            class="swiper-slide"
          >
            <p
              class="a-font_h5"
              v-html="item.title"
            />
            <p
              class="a-font_m-m"
              v-html="item.text"
            />
            <AImg
              v-if="icons[idx]"
              :src="icons[idx]"
              :alt="item.title"
            />
          </div>
        </template>
      </swiper>
      <MSwiperNav ref="navRef" />

      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SForWho.scss';
</style>
