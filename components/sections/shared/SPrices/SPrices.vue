<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import Rub from '~/assets/icons/svg-mono/rub.svg?url';

const rubImage = `<img src="${Rub}" class="ico" alt="rub" itemprop="image">`;

const SMALL_SCREEN_INITIAL_ITEMS_COUNT = 2;
const showAllItems = shallowRef(false);

const prices = [
  { tag: 'Колледж', title: `от&nbsp;15&nbsp;000&nbsp;${rubImage}` },
  { tag: 'Бакалавриат', title: `от&nbsp;19&nbsp;000&nbsp;${rubImage}` },
  { tag: 'Магистратура', title: `от&nbsp;28&nbsp;000&nbsp;${rubImage}` },
  { tag: 'Аспирантура', title: `от&nbsp;50&nbsp;000&nbsp;${rubImage}` },
  { tag: 'Ординатура', title: `от&nbsp;50&nbsp;000&nbsp;${rubImage}` },
  { tag: 'Второе высшее', title: `от&nbsp;19&nbsp;000&nbsp;${rubImage}` },
];

const remainingItems = prices.length - SMALL_SCREEN_INITIAL_ITEMS_COUNT;

const {
  swiperConfig,
  swiperRef,
  navRef,
} = useSwiperWrapper({
  modules: [Navigation],
  showSwiperNavigation: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance:true,
  resistanceRatio: 0,
});
</script>

<template>
  <MSection
    title="Стоимость за&nbsp;семестр"
    class="s-prices"
  >
    <div class="s-prices__description a-font_h5">
      Отличается в&nbsp;зависимости от&nbsp;выбранной программы, ступени и&nbsp;формы обучения
    </div>
    <div class="s-prices__wrap s-prices__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <swiper-slide
          v-for="{ tag, title } in prices"
          :key="tag"
          style="width: auto;"
        >
          <MCardTagTitle
            :tag
            :title
            tag-font-size="a-font_m-m"
            show-bg-image
          />
        </swiper-slide>
      </swiper>
      <MSwiperNav ref="navRef" />

      <div class="s-prices__grid">
        <MCardTagTitle
          v-for="{ tag, title }, index in prices"
          :key="tag"
          :class="{
            '--show': index < SMALL_SCREEN_INITIAL_ITEMS_COUNT
              || showAllItems
          }"
          :tag
          :title
          tag-font-size="a-font_m-m"
          show-bg-image
        />

        <AButtonThird
          v-if="!showAllItems"
          @click="showAllItems = true"
        >
          Показать ещё ({{ remainingItems }})
        </AButtonThird>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SPrices.scss';
</style>
