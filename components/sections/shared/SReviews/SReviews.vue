<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';

interface Props {
  title?: string;
  items?: Item[];
  hasEntity?: boolean;
  entity?: Entity | null;
}

interface Item {
  img?: string;
  image?: string;
  name?: string;
  date?: string;
  info?: string;
  text?: string;
}

interface Entity {
  custom_field_values?: unknown[];
}

const {
  title = 'Отзывы студентов',
  hasEntity = false,
  entity = {},
  items  = [],
} = defineProps<Props>();

const customFields = hasEntity ? mapCustomFields(entity?.custom_field_values) : null;
const reviews = customFields ? customFields['reviews']?.at(0)['items'] : [];

const sectionTitle: string = hasEntity
  ? customFields['reviews']?.at(0)['title']
  : title;

const sectionItems: Item[] = reviews?.length ? reviews : items ?? [];

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
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    horizontalClass: 'swiper-scrollbar',
    draggable: true,
    hide: false,
  },
});
</script>

<template>
  <MSection
    v-if="sectionItems.length"
    class="s-reviews"
    :title="sectionTitle"
  >
    <div class="s-reviews__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <MReview
            v-for="item in sectionItems"
            :key="item.text"
            class="swiper-slide"
            :image="item.img || item.image"
            :info="item.date || item.info"
            :name="item.name"
            :text="item.text"
          />
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
@import './SReviews.scss';
</style>
