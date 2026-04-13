<script setup>
import { transform } from '../SMbaProgramsList/transformMbaProgramsFilterData';
import { Navigation, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

const props = defineProps({
  entity: {
    type: Object,
    default: () => ({}),
  },
  routeName: {
    type: String,
    default: '',
  },
});

const { data = [] } = await useFetch('/api/mba/getMbaProgramsFilterData', {
  watch: false,
  deep: false,
  transform,
});

const popup = ref(null);
const popupData = ref({});

const {
  programs,
} = data.value || { programs: [] };

const HIDDEN_PROGRAM_ALIASES = [
  '/mba/executive_mba/executive_mba',
  '/business_education/mini_mba',
  '/business_education/synergy_blended_mba',
  '/business_education/synergy_online_mba',
  '/business_education/synergy_classic_mba',
  '/business_education/executive_mba_strategiia_i_liderstvo',
];

const programsToShow = programs.filter((program) => {
  return program.id != props.entity.id
    && !HIDDEN_PROGRAM_ALIASES.includes(program.link);
});

function showPopup(program) {
  popupData.value = {};
  popupData.value = {
    name: program.name,
    slug: program.link,
    advantages: program.advantages,
    program: program.program,
  };

  popup.value.open();
};

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
</script>

<template>
  <MSection
    v-if="programsToShow.length"
    title="Другие программы"
    class="s-mba-programs-slider"
  >
    <Swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      class="s-mba-programs-slider__slider"
    >
      <SwiperSlide
        v-for="program in programsToShow"
        :key="program.id"
        class="s-mba-programs-slider__slide"
      >
        <NuxtLink
          :to="program.link"
          class="s-mba-programs-slider__link"
        >
          <div class="s-mba-programs-slider__types">
            <div
              v-for="type in program.forms"
              :key="type.text"
              class="s-mba-programs-slider__type a-font_l-m"
              v-html="type.text"
            />
          </div>
          <div
            class="s-mba-programs-slider__title a-font_h5"
            v-html="program.name"
          />
          <AButton
            class="s-mba-programs-slider__btn"
            @click.prevent="showPopup(program)"
          >
            <span class="a-font_s-m">Поступить</span>
          </AButton>
        </NuxtLink>
      </SwiperSlide>
      <MSwiperNav ref="navRef" />
    </Swiper>
    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </MSection>
  <SBsProgramsListPopup
    ref="popup"
    v-bind="popupData"
  />
</template>

<style lang="scss">
@import './SMbaProgramsSlider';
</style>
