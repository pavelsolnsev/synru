<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import formateDateToLocale from '~/utils/formateDateToLocale';

interface Props {
  studentLifeItems: {
    image: string,
    video: string,
    title: string,
    date: string,
    tag?: string,
  }[],
}

defineProps<Props>();

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

const { openModal } = useModalStore();

function onClickVideo(link: string) {
  if (!link) return;
  openModal('MModalIframe', {
    src: link,
  });
}
</script>

<template>
  <MSection
    v-if="studentLifeItems?.length"
    class="s-student-news"
    title="Студенческая жизнь"
  >
    <div class="s-student-news__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="(item, index) in studentLifeItems"
          :key="index"
          class="s-student-news__slide"
        >
          <div @click.prevent="onClickVideo(item.video)">
            <div class="s-student-news__wrap">
              <APlay v-if="item.video" />
              <AImg
                class="s-student-news__img lazy"
                decoding="async"
                loading="lazy"
                :src="item.image"
                :data-srcset="item.image"
              />
              <div class="a-font_l-m s-student-news__top">
                <div
                  v-if="item.date"
                  class="s-student-news__date"
                >
                  {{ formateDateToLocale(item.date.split('-').reverse().join('.')) }}
                </div>
                <div
                  v-if="item.tag"
                  class="s-student-news__tag"
                >
                  #{{ item.tag }}
                </div>
              </div>
            </div>
            <div
              class="s-student-news__title a-font_h5"
              v-html="item.title"
            />
          </div>
        </SwiperSlide>
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
@import './SStudentNews.scss';
</style>
