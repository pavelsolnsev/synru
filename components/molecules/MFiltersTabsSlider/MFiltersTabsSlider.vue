<script setup lang="ts">
import { Swiper } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface Props {
  tabs: Tab[];
  showHelpTab?: boolean;
  helpFormTitle?: string;
  helpFormSubtitle?: string;
  helpFormActionParams?: { param: string }[]
}

interface Tab {
  title: string;
  value: string | number | null;
  icon?: string;
}

const {
  tabs = [],
  showHelpTab = false,
  helpFormTitle,
  helpFormSubtitle,
  helpFormActionParams = [],
} = defineProps<Props>();

const emit = defineEmits(['update:modelValue', 'change']);

const showAllTab: Tab = {
  title: '<span class="d-none d-xl-inline-block">Популярные</span>',
  value: null,
  icon: 'faculty_all',
};

const allTabs: ComputedRef<Tab[]> = computed(() => [
  showAllTab,
  ...tabs,
]);

const modelValue = defineModel({
  type: [Number, String, null] as PropType<number | string | null>,
  default: null,
});

const {
  swiperRef,
  swiperConfig,
}  = useSwiperWrapper({
  modules: [FreeMode],
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  freeMode: true,
  resistance: true,
  resistanceRatio: 0,
  observer: true,
  observeParents: true,
});

const { openModal } = useModalStore();

function openHelp() {
  openModal('MModalForm', {
    formPhone: true,
    subtitleClass: "a-font_h6",
    btn: "Отправить",
    title: helpFormTitle,
    subtitle: helpFormSubtitle,
    actionParams: helpFormActionParams,
  });
}

watch(modelValue,
  (newValue: number | string | null) => {
    emit('update:modelValue', newValue);
    emit('change');
  });
</script>

<template>
  <div class="m-filters-tabs-slider">
    <div class="--clear-btn-wrap">
      <MFilterTab
        class="--reset"
        :title="showAllTab.title"
        :active="modelValue === null"
        :icon="showAllTab.icon"
        @click="modelValue = null"
      />
    </div>
    <div class="m-filters-tabs-slider__filters">
      <swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <template #wrapper-start>
          <MFilterTab
            v-if="showHelpTab"
            title="Помогите выбрать"
            class="swiper-slide"
            icon="question"
            icon-first
            @click="openHelp()"
          />
          <MFilterTab
            v-for="{ title, value, icon } in allTabs.slice(1)"
            :key="title"
            class="swiper-slide"
            :title
            :icon
            :active="modelValue === value"
            @click="modelValue = value"
          />
        </template>
      </swiper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MFiltersTabsSlider.scss';
</style>
