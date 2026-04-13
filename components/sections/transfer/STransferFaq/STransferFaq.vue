<script lang="ts" setup>
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import { Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

interface Props {
  title: string
  items: {
    answer: string
    question: string
  }[]
  itemsTextClass?: string
  itemsTitleClass?: string
}

defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
}  = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  spaceBetween: 20,
  resistance: true,
  resistanceRatio: 0,
  slidesPerView: 4,
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection
    class="s-transfer-faq"
    :title
  >
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      class="s-transfer-faq__slider"
    >
      <swiper-slide
        v-for="item in items"
        :key="item.question"
        class="s-transfer-faq__item"
      >
        <div class="s-transfer-faq__top a-font_l-m">
          <span>{{ item.question }}</span>
          <ASvgMono name="arrow-long" />
        </div>
        <div
          class="s-transfer-faq__bottom a-font_l-m"
          v-html="item.answer"
        />
      </swiper-slide>
      <swiper-slide
        v-for="num in 3"
        :key="num"
        class="s-transfer-faq__item fake"
      />
      <MSwiperNav ref="navRef" />
    </swiper>

    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </MSection>
  <SFaqMin
    class="tablet-only"
    :items
    :items-text-class
    :items-title-class
    :title
  />
</template>

<style lang="scss" scoped>
@import './STransferFaq';
</style>
