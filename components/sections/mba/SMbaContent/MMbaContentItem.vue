<script setup lang="ts">
import type { contentModule } from '~/types/MbaProgramEntity';

interface Props extends contentModule {
  number: string;
}

const props = defineProps<Props>();

const isOpen = shallowRef(false);

function handleClick() {
  if (props.content) {
    isOpen.value = !isOpen.value;
  }
}
</script>

<template>
  <li
    class="m-mba-content-item"
    :class="isOpen ? 'open' : undefined"
    @click="handleClick"
  >
    <div class="m-mba-content-item__header">
      <div class="m-mba-content-item__number a-font_m-m">
        <span>{{ number }}</span>
        <span>Модуль</span>
      </div>
      <div
        class="m-mba-content-item__title"
        :class="isOpen ? 'a-font_h5' : 'a-font_h6'"
        v-html="title"
      />
      <div class="m-mba-content-item__icon">
        <ASvgMono name="simple-plus" />
      </div>
    </div>
    <Transition name="accordion">
      <div
        v-if="isOpen"
        class="m-mba-content-item__body"
      >
        <div class="m-mba-content-item__content">
          <ul
            v-if="tags && tags.length"
            class="s-mba-content__tags"
          >
            <li
              v-for="tag in tags"
              :key="tag.tag"
              class="s-mba-content__tag a-font_l-m"
            >
              {{ tag.tag }}
            </li>
          </ul>
          <div
            v-if="content"
            class="s-mba-content__text a-font_h6"
            v-html="content"
          />
        </div>
      </div>
    </Transition>
  </li>
</template>

<style lang="scss" scoped>
@import './SMbaContent';
</style>
