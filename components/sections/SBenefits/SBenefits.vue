<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import type { SchoolProgramEntity } from '~/types';

interface Props {
  entity?: SchoolProgramEntity;
  hasEntity: boolean;
  title?: string;
  benefitsItems?: BenefitItem[];
}

interface BenefitItem {
  icon?: string;
  title: string;
  text?: string;
}

const {
  hasEntity = false,
  entity = null,
  benefitsItems = [],
} = defineProps<Props>();

const slides: BenefitItem[] = hasEntity
  ? entity?.customFields?.school_benefits ?? []
  : benefitsItems;

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
    v-if="slides?.length"
    class="s-benefits"
    :title
  >
    <div class="s-benefits__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <div
            v-for="(item, idx) in slides"
            :key="item.title"
            class="swiper-slide"
          >
            <div class="s-benefits__slide">
              <span class="s-benefits__slide-ico">
                <ASvgMono :name="item.icon ?? 'simple-rune'" />
              </span>
              <span class="s-benefits__slide-num">
                {{ idx + 1 }}
              </span>
              <div class="s-benefits__slide-inner">
                <h5
                  class="s-benefits__slide-title a-font_h5"
                  v-html="item.title"
                />
                <div
                  v-if="item.text"
                  class="span s-benefits__slide-text a-font_l-m"
                  v-html="item.text"
                />
              </div>
            </div>
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
@import './SBenefits.scss';
</style>

<style lang="scss">
.s-benefits__slider {
  .swiper {
    overflow: visible;
  }

  .swiper-button-prev {
    margin-top: 0;
  }

  .swiper-button-next {
    margin-top: 0;
  }
}
</style>
