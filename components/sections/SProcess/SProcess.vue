<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';
import type { SchoolProgramEntity, FormsTrainingResponse } from '~/types';
import { KEYS } from '~/constants';
import DefaultImg from '~/assets/images/global/placeholder_card.svg?url';

interface Props {
  entity: SchoolProgramEntity;
}

const { entity = null } = defineProps<Props>();

const { data: formTrainings } = await useFetch(`/api/school-programs/getFormsBySchoolProgramId/${entity?.id}`, {
  key: `${KEYS.SCHOOL_PROGRAM_FORMS}-${entity?.id}`,
  query: {
    'filter[published]': true,
    'page[size]': 0,
  },
  watch: false,
  deep: false,
  transform({ data }: FormsTrainingResponse): string[] {
    if (!data) return [];

    return data.map(({ attributes }) => (attributes.short_name));
  },
});

const { s_process: processItems = [] } = entity?.customFields ?? {};

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
    v-if="processItems?.length"
    class="s-process"
    title="Как проходит обучение"
  >
    <div class="s-process__slider">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <div
            v-for="item in processItems"
            :key="item.title"
            class="swiper-slide"
          >
            <template v-if="formTrainings?.length">
              <ATag
                v-for="form in formTrainings"
                :key="form"
                :text="form"
                variant="white"
                font-size="a-font_xs-m"
                class="a-tag--blur"
              />
            </template>

            <AImg
              :src="item.image ? item.image : DefaultImg"
              :alt="item.title"
              data-srcset=""
              decoding="async"
            />

            <MAccordionItem
              :title="{ text: item.title }"
              :item-key="item.title"
              icon="arrow_outward"
              class="--not-click"
            >
              <div
                class="a-font_m-m"
                v-html="item.text"
              />
            </MAccordionItem>
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
@import './SProcess.scss';
</style>
