<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    default: '',
  },
  advantages: {
    type: Array,
    default: () => [],
  },
  program: {
    type: Array,
    default: () => [],
  },
  content: {
    type: Object,
    default: () => ({}),
  },
  heroCards: {
    type: Array,
    default: () => [],
  }
});

const programItemsIsOpened = reactive(props.program.reduce((acc, _, index) => {
  return Object.assign(acc, { [index]: false });
}, {}));

defineEmits(['update:isVisible']);

const {
  swiperRef,
  swiperConfig,
} = useSwiperWrapper({
  slidesPerView: 'auto',
  spaceBetween: 0,
});

function open() {
  Fancybox.show([
    {
      src: '#s-programs-list-popup',
      hideScrollbar: true,
      touch: false,
      dragToClose: false,
    },
  ], {
    mainClass: 's-programs-list-fancy',
    on: {
      close: () => {
        Object.keys(programItemsIsOpened).forEach((key) => {
          programItemsIsOpened[key] = false;
        });
      },
    },
  },
  );
}

defineExpose({
  open,
});

const formValue = ref({});

const programBlockClass = computed(() => props.program.at(0)?.description?.at(0)
  ? 's-programs-list-popup__block-list'
  : 's-programs-list-popup__block-grid',
);

const getProgramBlockItemClass = (programItem) => {
  return programItem?.description?.at(0)
    ? 's-programs-list-popup__block-item'
    : 's-programs-list-popup__block-grid-item';
};

const toggleOpened = (index) => {
  programItemsIsOpened[index] = !programItemsIsOpened[index];
};

function makeDescription(programItem) {
  if (!Array.isArray(programItem.description)) {
    return programItem.description;
  }

  return '<ul>' + programItem.description.map((item) => `<li>${item}</li>`).join('') + '</ul>';
}

let formBlock = null;

const formActiveClass = shallowRef('');
const formRef = templateRef('formRef');

function onApplyBtnClick() {
  if (!formBlock) formBlock = document.querySelector('#s-mba-program-popup-form');

  formBlock?.scrollIntoView({ block: 'start' , behavior: 'smooth' });

  setTimeout(() => {
    formActiveClass.value = 'active';
    formRef.value?.submitForm();
  }, 500);
}

const filteredAdvantages = computed(() => {
  return props.advantages.filter((adv) => adv.value && adv.text);
});
</script>

<template>
  <div
    id="s-programs-list-popup"
    class="s-programs-list-popup"
  >
    <div class="s-programs-list-popup__wrap">
      <div class="s-programs-list-popup__inner">
        <h3 class="s-programs-list-popup__name a-font_h3">
          {{ name }}
        </h3>

        <MForm
          id="s-mba-program-popup-form"
          :key="name"
          ref="formRef"
          v-model="formValue"
          title-class="a-font_h5"
          title="Поступите на программу"
          btn="Подать заявку"
          :class="formActiveClass"
          :show-errors="true"
          :form-name="false"
          :action-params="[
            {param: 'grcampaign=e_mail_chain_vpo'},
            {param: 'form=postupi_short'},
            {param: 'form_title=Записаться+на программу'},
          ]"
        />

        <div class="s-programs-list-popup__blocks">
          <div
            v-if="filteredAdvantages.length"
            class="s-programs-list-popup__block"
          >
            <swiper
              ref="swiperRef"
              class="s-programs-list-popup__slider swiper"
              v-bind="swiperConfig"
            >
              <template #wrapper-start>
                <div
                  v-for="item in filteredAdvantages"
                  :key="item.text"
                  class="s-programs-list-popup__slider-item swiper-slide"
                >
                  <span class="a-font_h4">{{ item.value }}</span>
                  <span class="a-font_m-m"> {{ item.text }}</span>
                </div>
              </template>
            </swiper>
          </div>

          <div
            v-if="program.length"
            class="s-programs-list-popup__block"
          >
            <h4 class="s-programs-list-popup__block-title a-font_h5">Программа</h4>

            <div :class="programBlockClass">
              <div
                v-for="(programItem, index) in program"
                :key="programItem.title"
                :class="[getProgramBlockItemClass(programItem), { '--opened': programItemsIsOpened[index] }]"
                @click="toggleOpened(index)"
              >
                <template v-if="programItem?.description?.at(0)">
                  <div class="s-programs-list-popup__block-item-title a-font_l-m">
                    {{ programItem.title }}
                  </div>
                  <div
                    class="s-programs-list-popup__block-item-text a-font_xs-m"
                    v-html="makeDescription(programItem)"
                  />
                  <span class="s-programs-list-popup__block-item-toggle" />
                </template>
                <template v-else>
                  <div class="s-programs-list-popup__block-grid-item-top">
                    <ANum
                      :num="formatNumberWithLeadingZero(index + 1)"
                      :classes="'a-num--md a-font_l-m'"
                    />
                  </div>
                  <div class="s-programs-list-popup__block-grid-text a-font_xs-m">{{ programItem.title }}</div>
                </template>
              </div>
            </div>
          </div>

          <MMbaHeroCards
              v-if="heroCards.length"
              :cards="heroCards"
              popup-slider-version
          />

          <MMbaContentWrapper
              v-if="Object.keys(content).length"
              :base-modules="content.baseModules"
              :bonus-modules="content.bonusModules"
          />
        </div>
      </div>
    </div>
    <div class="s-programs-list-popup__bottom a-font_xs-m">
      <span
        class="s-programs-list-popup__bottom-btn"
        @click="onApplyBtnClick"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#ED131C"
            d="m12 22-7.57-4v-6.2L0 9.4 12 3l12 6.41v8.48h-2.56v-7.1l-1.87 1V18L12 22Zm0-9.06 6.65-3.53L12 5.88 5.35 9.41 12 12.94Zm0 6.2 5-2.65v-3.35l-5 2.68-5-2.68v3.35l5 2.65Z"
          />
        </svg>
        <span>Поступить</span>
      </span>
      <NuxtLink
        class="s-programs-list-popup__bottom-btn"
        :to="slug"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#7E7F81"
            d="M10.84 16.97h2.32v-5.92h-2.32v5.92ZM12 9.41c.35 0 .64-.12.87-.35.24-.24.35-.53.35-.88 0-.34-.11-.63-.35-.87a1.18 1.18 0 0 0-.87-.35c-.35 0-.64.12-.87.35-.24.24-.35.53-.35.87 0 .35.11.64.35.88.23.23.52.35.87.35ZM12 22a10.08 10.08 0 0 1-9.21-6.09A9.76 9.76 0 0 1 2 12a10.08 10.08 0 0 1 6.09-9.21A9.76 9.76 0 0 1 12 2a10.08 10.08 0 0 1 9.21 6.09c.53 1.21.79 2.52.79 3.91a10.08 10.08 0 0 1-6.09 9.21A9.76 9.76 0 0 1 12 22Zm0-2.53c2.1 0 3.86-.72 5.3-2.16A7.22 7.22 0 0 0 19.48 12c0-2.1-.72-3.86-2.16-5.3A7.22 7.22 0 0 0 12 4.52c-2.1 0-3.86.72-5.3 2.16A7.22 7.22 0 0 0 4.52 12c0 2.1.72 3.86 2.16 5.3A7.22 7.22 0 0 0 12 19.48Z"
          />
        </svg>
        <span>Подробнее</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
.fancybox__container {
  &.s-programs-list-fancy {
    z-index: indexes("program-popup");
  }
}

.s-programs-list-popup {
  @include desktop {
    &.fancybox__content>.f-button.is-close-btn {
      right: auto;
      top: scale(8);
      left: scale(-68);
    }
  }

  .m-form {
    height: auto;
    padding: scale(12) scale(12) scale(20);
    margin: 0 0 scale(20);
    background-color: var(--a-color_grey_40);
    border-radius: scale(16);

    @include tablet(min, $p_lg) {
      margin: 0 0 scale(40);
    }

    @include desktop {
      padding-top: scale(24);

      &__call {
        margin-bottom: scale(40);
      }
    }

    &__content {
      @include tablet() {
        grid-template-columns: 1fr 1fr;
      }
    }

    &__title {
      margin-bottom: scale(24);
    }

    &__subtitle {
      margin-bottom: scale(20);
    }

    .a-input {
      background-color: var(--a-color_white);
    }

    .a-chekbox__label::before {
      background-color: var(--a-color_white);
      border-color: var(--a-color_white);
    }
  }
}

.s-programs-list-popup__block-item-text {
  ul {
    list-style-type: disc;
    padding-left: calc(var(--scale)* 8);
    list-style-position: inside;

    li::marker {
      font-size: calc(var(--scale)* 10);
    }
  }
}

.s-programs-list-popup__block-grid {
  display: grid;
  gap: scale(8);

  @include tablet(min, $p_md) {
    grid-template-columns: 1fr 1fr;
  }

  @include desktop {
    grid-template-columns: 1fr 1fr 1fr;
    gap: scale(20);
  }

  &-item-top {
    display: grid;
    align-items: center;
    grid-auto-flow: column;
    width: max-content;
    gap: scale(4);

    @include desktop {
      gap: scale(8);
    }
  }

  &-item {
    display: grid;
    gap: scale(32);
    grid-template-rows: min-content;
    height: 100%;
    padding: scale(12);
    background-color: var(--a-color_white);
    border-radius: scale(12);

    @include desktop {
      gap: scale(48);
      padding: scale(24);
    }
  }

  &-text {
    margin-top: auto;
  }
}
.s-programs-list-popup__slider {
  .swiper-wrapper {
    box-sizing: border-box;
  }
}
.s-programs-list-popup.fancybox__content {
  @include desktop(min) {
      padding: calc(var(--scale)* 24) calc(var(--scale)* 24) calc(var(--scale)* 20) !important;
    }
}
</style>

<style lang="scss" scoped>
@import '../SProgramListPopup/SProgramListPopup.scss';
</style>
