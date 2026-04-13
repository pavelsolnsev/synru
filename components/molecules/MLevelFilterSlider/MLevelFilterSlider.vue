<script setup lang="ts">
import { Navigation, FreeMode } from 'swiper/modules';
import { Swiper } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import declensionOfNumber from '~/utils/declensionOfNumber';

interface Levels {
  [key: Level['value']]: Level;
}

export interface Level {
  value: number;
  text: string;
  disabled?: boolean;
  rank: number;
  count: number;
}

const {
  levels = {},
  words = ['программа', 'программы', 'программ'],
} = defineProps<{
  levels: Levels,
  words?: string[],
}>();

const level = defineModel<number>({
  default: 1,
});

const levelSlides = computed(() => {
  return Object.values(levels).filter((level) => level.count).sort((a, b) => a.rank - b.rank);
});

const emit = defineEmits(['change']);

const prevSlideButton = ref();
const nextSlideButton = ref();

const {
  swiperConfig,
} = useSwiperWrapper({
  modules: [FreeMode, Navigation],
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  freeMode: true,
  resistance: true,
  resistanceRatio: 0,
});

function levelChanged(value: number) {
  emit('change', value);
}
</script>

<template>
  <div
    v-if="levelSlides.length"
    class="m-level-filter__cards"
  >
    <swiper
      v-bind="swiperConfig"
      :navigation="{ nextEl: nextSlideButton, prevEl: prevSlideButton }"
    >
      <template #wrapper-start>
        <label
          v-for="item in levelSlides"
          :key="item.text"
          class="swiper-slide m-level-filter__card"
          :class="{
            'checked': level === item.value,
          }"
        >
          <span
            class="m-level-filter__card-title a-font_xl-m"
            v-html="item.text"
          />
          <span class="m-level-filter__card-programs a-font_s">
            {{ declensionOfNumber(item.count, words, true) }}
          </span>
          <input
            v-model="level"
            type="radio"
            name="level"
            :checked="level === item.value"
            :value="item.value"
            @change="() => levelChanged(item.value)"
          >
        </label>
      </template>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import './MLevelFilterSlider';
</style>
