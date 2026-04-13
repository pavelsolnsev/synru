<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import declensionOfNumber from '~/utils/declensionOfNumber';

interface Type {
  value: string;
  label: string;
  count: number;
}

interface Link {
  label: string;
  to: string;
  count: number;
}

const { types } = defineProps<{
  types: Array<Type | Link>
}>();

const type = defineModel<string>({
  default: 'fromSix',
});

const emit = defineEmits<{
  changed: [value: string];
}>();

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});

function typeChanged(value: string) {
  emit('changed', value);
}

function isLink(type: Type | Link): type is Link {
  return (type as Link).to !== undefined;
}
</script>

<template>
  <div
    v-if="types.length"
    class="m-level-filter__cards"
  >
    <swiper v-bind="swiperConfig">
      <template #wrapper-start>
        <template
          v-for="item in types"
          :key="item.label"
        >
          <NuxtLink
            v-if="isLink(item)"
            class="swiper-slide m-level-filter__card"
            :to="item.to"
          >
            <span
              class="m-level-filter__card-title a-font_xl-m"
              v-html="item.label"
            />
            <span
              class="m-level-filter__card-programs a-font_s"
            >
              {{ declensionOfNumber(item.count, ['курс', 'курса', 'курсов'], true) }}
            </span>
          </NuxtLink>
          <label
            v-else
            class="swiper-slide m-level-filter__card"
            :class="{
              'checked': type === item.value
            }"
          >
            <span
              class="m-level-filter__card-title a-font_xl-m"
              v-html="item.label"
            />
            <span
              class="m-level-filter__card-programs a-font_s"
            >
              {{ declensionOfNumber(item.count, ['курс', 'курса', 'курсов'], true) }}
            </span>
            <input
              v-model="type"
              type="radio"
              name="level"
              :checked="type === item.value"
              :value="item.value"
              @change="() => typeChanged(item.value)"
            >
          </label>
        </template>
      </template>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import './MCoursesTypeFilterSlider';
</style>
