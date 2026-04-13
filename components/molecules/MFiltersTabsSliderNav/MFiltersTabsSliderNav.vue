<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { FreeMode, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';

interface Props {
  tabs: Tab[];
  firstTabText?: string;
  allTabIcon?: boolean;
  showFormTab?: boolean;
  formTabTitle?: string;
  formTitle?: string;
  formSubtitle?: string;
  formBtn?: string;
  formActionParams?: { param: string }[]
}

interface Tab {
  title: string;
  value: string | number | null;
  icon?: string;
}

const {
  tabs = [],
  firstTabText = 'Все',
  allTabIcon = false,
  showFormTab = false,
  formTabTitle = 'Помогите выбрать',
  formTitle,
  formSubtitle,
  formBtn,
  formActionParams = [],
} = defineProps<Props>();

const showAllTab: Tab = {
  title: firstTabText,
  value: null,
  icon: allTabIcon ? 'faculty_all' : '',
};

const FORM_TAB_VALUE = 'form_tab_value';

const formTab: Tab = {
  title: formTabTitle,
  value: FORM_TAB_VALUE,
  icon: '',
};

const allTabs: ComputedRef<Tab[]> = computed(() => [
  showAllTab,
  ...(showFormTab ? [formTab] : []),
  ...tabs,
]);

const modelValue = defineModel({
  type: [Number, String, null] as PropType<number | string | null>,
  default: null,
});

const prevSlideButton = ref();
const nextSlideButton = ref();

const swiperConfig = {
  modules: [FreeMode, Navigation],
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  freeMode: true,
  resistance: true,
  resistanceRatio: 0,
  observer: true,
  observeParents: true,
};

const onSwiperInit = (swiper: SwiperType) => {
  nextTick(() => {
    swiper.navigation.init();
    swiper.navigation.update();
  });
};

function handleClick(value: string | number | null) {
  if (value === FORM_TAB_VALUE) {
    openForm();
    return;
  }

  modelValue.value = value;
  emit('tabSelected', value);
}

const emit = defineEmits<{
  tabSelected: [value: string | number | null];
}>();

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    formPhone: true,
    btn: formBtn,
    title: formTitle,
    subtitle: formSubtitle,
    actionParams: formActionParams,
  });
}
</script>

<template>
  <div class="m-filters-tabs-slider m-filters-tabs-slider--nav sticky">
    <div class="m-filters-tabs-slider__filters">
      <swiper
        v-bind="swiperConfig"
        :navigation="{ nextEl: nextSlideButton, prevEl: prevSlideButton }"
        slides-per-view="auto"
        @swiper="onSwiperInit"
      >
        <template #wrapper-start>
          <MFilterTab
            v-for="{ title, value, icon } in allTabs"
            :key="title"
            class="swiper-slide"
            :title
            :icon
            :active="modelValue === value"
            @click="() => handleClick(value)"
          />
        </template>
        <button
          ref="prevSlideButton"
          class="swiper-button-prev"
        >
          <ASvgMono name="arr-slider-nav-prev" />
        </button>
        <button
          ref="nextSlideButton"
          class="swiper-button-next"
        >
          <ASvgMono name="arr-slider-nav-next" />
        </button>
      </swiper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MFiltersTabsSliderNav.scss';
</style>
