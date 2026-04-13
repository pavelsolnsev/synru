<script setup lang="ts">
import type { Fonts } from '~/types';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';

interface Props {
  items: Item[];
  tabClass?: Fonts;
};

interface Item {
  label: string;
  attributes?: object;
  content?: string;
  contentAppend?: string;
}

const {
  items,
  tabClass = 'a-font_l-m',
} = defineProps<Props>();

const modelValue = defineModel({
  type: Number,
  default: 0,
});

const emits = defineEmits<{
  (e: 'click', value: number): void
}>();

const swiperConfig = {
  modules: [FreeMode],
  freeMode: true,
  spaceBetween: 0,
  grabCursor: true,
  observer: true,
  observeParents: true,
  watchOverflow: false,
};

function onTabClick(index: number) {
  modelValue.value = index;
  emits('click', index);
}
</script>

<template>
  <div class="m-tabs m-tabs-js">
    <swiper
      class="m-tabs__btns"
      slides-per-view="auto"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="item, index in items"
        :key="item.label"
        class="m-tabs__btn m-tabs__btn-js swiper-slide"
        :class="[
          {'_is-active': modelValue === index },
          tabClass
        ]"
        @click="onTabClick(index)"
      >
        <span
          v-bind="item.attributes"
          v-html="item.label"
        />
      </swiper-slide>
    </swiper>
    <template
      v-for="(item, index) in items"
      :key="item.label"
    >
      <div
        v-if="index === modelValue && (item.content || item.contentAppend)"
        class="m-tabs__tab a-font_l"
        :class="{'_is-active': index === modelValue}"
      >
        <template v-if="$slots.content">
          <slot
            name="content"
            :item="item"
          >
            <span
              v-if="item.content"
              v-html="item.content"
            />
          </slot>
        </template>
        <template
          v-if="$slots.contentAppend"
        >
          <slot
            name="contentAppend"
            :item="item"
          >
            <span
              v-if="item.contentAppend"
              v-html="item.contentAppend"
            />
          </slot>
        </template>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import './MTabs.scss';
</style>
