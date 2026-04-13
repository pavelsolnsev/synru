<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import mapCustomFields from '~/utils/mapCustomFields';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import type { ProgramEntity, ProgramCustomField } from '~/types';
import DefaultImage from '~/assets/images/m_article_card/placeholder_card.svg?url';


interface Props {
  entity: ProgramEntity | null;
}

const { entity = null } = defineProps<Props>();

const { where_can_work = [] }: { where_can_work: ProgramCustomField['where_can_work'] } = mapCustomFields(entity?.custom_field_values || []);

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
    v-if="where_can_work.length"
    title="Где могут работать выпускники"
    class="s-where-work"
  >
    <div class="s-where-work__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <div
            v-for="item,index in where_can_work"
            :key="index"
            class="s-where-work__item swiper-slide"
          >
            <AImg
              class="s-where-work__item-img"
              :src="item.image ?? ''"
              alt="work"
              :srcset="item.image ? item.image : DefaultImage"
              decoding="async"
            />
            <div class="s-where-work__item-desc">
              <p
                class="a-font_h5"
                v-html="item.title"
              />
              <div
                class="a-font_l"
                v-html="item.description"
              />
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
@import './SProgramWhereWork.scss';
</style>

