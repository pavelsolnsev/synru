<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface Review {
  title: string,
  text?: string,
  image: string,
  video: string,
}

interface Props {
  reviewsStudents: Review[],
  reviewsGraduates: Review[],
  reviewsParents: Review[],
}

const {
  reviewsStudents = [],
  reviewsGraduates = [],
  reviewsParents = [],
} = defineProps<Props>();

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
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});

const tabs = computed(() => [{
  title: 'Студенты',
  value: 'students',
  icon: 'simple-hat2',
}, {
  title: 'Выпускники',
  value: 'graduates',
  icon: 'simple-star3',
}, {
  title: 'Родители',
  value: 'parents',
  icon: 'simple-man-bust2',
}].filter((tab) => reviewsMap[tab.value]?.length > 0));

const selectedTab: Ref<string | number | null> = ref(null);

const reviewsMap: { [key: string]: Review[] } = {
  'students': reviewsStudents,
  'graduates': reviewsGraduates,
  'parents': reviewsParents,
};

const allReviews = computed(() => {
  return selectedTab.value
    ? reviewsMap[selectedTab.value]
    : [...reviewsStudents, ...reviewsGraduates, ...reviewsParents];
});
</script>

<template>
  <MSection
    v-if="allReviews?.length"
    class="s-video-reviews"
    title="Отзывы"
  >
    <MFiltersTabsSliderNav
      v-if="tabs.length > 1"
      :all-tab-icon="true"
      :tabs="tabs"
      @tab-selected="selectedTab = $event"
    />
    <div
      class="s-video-reviews__slider"
      :class="{'is-tabs': tabs.length > 1}"
    >
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <swiperSlide
          v-for="{ image, title, text, video } in allReviews"
          :key="video"
          class="s-video-reviews__slide"
        >
          <MVideoCardVertical
            :video
            :image
            :title
            :text
          />
        </swiperSlide>
      </Swiper>
      <MSwiperNav ref="navRef" />
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SVideoReviews.scss';
</style>
