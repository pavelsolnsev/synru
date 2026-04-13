<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { KEYS } from '~/constants';

const props = defineProps({
  entity: {
    type: Object,
    default: () => ({}),
  },
  routeName: {
    type: String,
    required: true,
  },
  actionParams: {
    type: Array,
    default: () => ([]),
  },
});

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

const { data } = await useFetch('/api/getProgramFiltersData', {
  watch: false,
  deep: false,
  key: KEYS.PROGRAMS_FILTERS_DATA,
});

const {
  programs: cards = [],
} = data.value || {};

const { course_triggers = [] } = props.entity?.customFields ?? {};

const title = course_triggers[0]?.programs_title || 'Академические программы';


const programs = course_triggers[0]?.programs;
const programsIds = programs ? new Set(programs.split(', ')) : new Set();

const filterPrograms = programsIds.size
  ? cards.filter((card) => card.type === 'programs' && programsIds.has(card.id))
  : [];

const { popupData, showPopup } = useProgramPopup(props.routeName);
</script>

<template>
  <MSection
    v-if="filterPrograms.length"
    class="s-programs-slider"
    :title="title"
    title-class="a-font_h4"
  >
    <Swiper
      ref="swiperRef"
      v-bind="swiperConfig"
    >
      <SwiperSlide
        v-for="program in filterPrograms"
        :key="program.id"
        class="s-programs-slider__slide"
      >
        <MSpecialtyCard
          :id="program.id"
          :name="program.name"
          :faculty="program.faculty.text"
          :level="program.level.text"
          :place="program.place"
          :link="program.link"
          :is-new="program.new"
          :is-popular="program.isPopular"
          :is-partner="program.partner"
          :ico="program.direction_ico"
          :is-show-enroll="program.popup"
          btn-text="Поступить"
          @enroll="showPopup(program)"
        />
      </SwiperSlide>
    </Swiper>
    <MSwiperNav ref="navRef" />
    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />

    <SCoursesListPopup
      ref="coursePopup"
      v-bind="popupData"
    />
    <SProgramsListPopup
      ref="programPopup"
      v-bind="popupData"
      :action-params="props.actionParams"
    />
  </MSection>
</template>
<style scoped lang='scss'>
@import './SProgramsSlider.scss';
</style>
