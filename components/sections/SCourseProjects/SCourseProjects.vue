<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import type { CourseEntity, Nullable } from '~/types';

interface Props {
  hasEntity?: boolean;
  entity?: Nullable<CourseEntity>;
}

const {
  entity = null,
} = defineProps<Props>();

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
  resistance:true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});

const { course_portfolio = [] } = entity?.customFields ?? {};
</script>

<template>
  <MSection
    v-if="course_portfolio?.[0]?.items?.length"
    class="s-course-projects"
    :title="course_portfolio?.[0]?.title || 'Портфолио'"
    title-class="a-font_h4"
  >
    <p
      v-if="course_portfolio?.[0]?.subtitle"
      class="a-font_h6 s-course-projects__subtitle"
      v-html="course_portfolio?.[0]?.subtitle"
    />
    <div class="s-course-projects__swiper">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="item in course_portfolio?.[0]?.items"
          :key="item.title!"
          class="s-course-projects__slide"
        >
          <p
            v-if="item.tag"
            class="a-font_s-m s-course-projects__slide-tag"
            v-html="item.tag"
          />
          <p
            class="a-font_h5 s-course-projects__slide-title"
            v-html="item.title"
          />
          <p
            v-if="item.text"
            class="a-font_l s-course-projects__slide-text"
            v-html="item.text"
          />
          <AImg
            v-if="item.image"
            :src="item.image"
            :alt="item.title!"
            decoding="async"
            loading="lazy"
          />
        </SwiperSlide>
      </Swiper>
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
      <MSwiperNav ref="navRef" />
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SCourseProjects.scss';
</style>
