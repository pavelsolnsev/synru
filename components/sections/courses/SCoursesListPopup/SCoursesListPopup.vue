<script setup lang="ts">
import { Fancybox } from '@fancyapps/ui';
import { FREE_COURSE_DIRECTION_NAME } from '~/constants/common';

interface MFormExpose {
  submitForm: () => void;
}

const {
  name = '',
  slug = '',
  triggers = [],
  learningProgram = [],
  whatLearn = [],
  isFree = false,
  faculty = '',
  routeName,
} = defineProps<{
  name?: string;
  slug?: string;
  triggers?: {
    title: string,
    content?: string | string[],
  }[];
  learningProgram?: { title: string }[];
  whatLearn?: { title: string }[];
  isFree?: boolean,
  faculty?: string;
  routeName: string;
}>();

const triggerItems = ref<{
  title: string,
  content?: string | string[],
}[]>([]);

const popupRef = templateRef<HTMLElement | null>('popupRef');

const directionName = computed(() => (isFree ? FREE_COURSE_DIRECTION_NAME : null));
const courseSlug = computed(() => (slug.split('/').pop()!));

const actionParams = computed(() => useCourseActionParams({
  defaultParams: [
    { param: 'grcampaign=e_mail_chain_vpo' },
    { param: `form=${routeName === 'priemnaya_komissiya' && faculty === 'Медицинский факультет' ? 'medfac' : 'postupi_short'}` },
    { param: 'level=Курсы' },
  ],
  directionName,
  courseSlug,
}));

defineEmits(['update:isVisible']);

watchEffect(() => {
  triggerItems.value = triggers.filter((trigger) => !!trigger?.content);
});

function open() {
  formActiveClass.value = '';

  Fancybox.show([
    {
      src: '#s-courses-list-popup',
    },
  ], {
    mainClass: 's-programs-list-fancy',
    hideScrollbar: true,
    dragToClose: false,
  },
  );
}

function close() {
  Fancybox.close();
}

defineExpose({
  open,
});

const formValue = ref({});
const formRef = templateRef<MFormExpose | null>('formRef');

const formActiveClass = shallowRef('');

function onClickHandler() {
  if (popupRef?.value) {
    popupRef.value.scrollIntoView({ block: 'start' , behavior: 'smooth' });
  }

  setTimeout(() => {
    formActiveClass.value = 'active';
    formRef.value?.submitForm();
  }, 500);
}
</script>

<template>
  <div
    id="s-courses-list-popup"
    class="s-programs-list-popup"
  >
    <div class="s-programs-list-popup__wrap">
      <div
        ref="popupRef"
        class="s-programs-list-popup__inner"
      >
        <p class="s-programs-list-popup__title a-font_h5">Курс</p>
        <h3 class="s-programs-list-popup__name a-font_h3">
          {{ name }}
        </h3>

        <MForm
          :key="name"
          ref="formRef"
          v-model="formValue"
          :class="formActiveClass"
          title-class="a-font_h5"
          title="Начните учиться бесплатно"
          btn="Начните бесплатно"
          form-name
          form-phone
          :action-params="actionParams.value"
          :route-name
          :show-errors="true"
        />

        <div
          v-if="triggerItems.length"
          class="s-programs-list-popup__triggers"
        >
          <div
            v-for="trigger in triggerItems"
            :key="trigger.title"
            class="s-programs-list-popup__triggers-block"
          >
            <span class="s-programs-list-popup__triggers-block-name a-font_m-m">
              {{ trigger.title }}
            </span>

            <span
              v-if="Array.isArray(trigger.content)"
              class="s-programs-list-popup__triggers-block-text
              a-font_m-m"
            >
              <span
                v-for="item in trigger.content"
                :key="item"
              >
                {{ item }}
              </span>
            </span>

            <span
              v-else
              class="s-programs-list-popup__triggers-block-text a-font_m-m"
            >
              {{ trigger.content }}
            </span>
          </div>
        </div>

        <div class="s-programs-list-popup__blocks">
          <div
            v-if="whatLearn.length"
            class="s-programs-list-popup__block"
          >
            <h4 class="s-programs-list-popup__block-title a-font_h5">
              Чему вы научитесь
            </h4>
            <div class="s-programs-list-popup__block-grid">
              <div
                v-for="(subject, i) in whatLearn"
                :key="subject.title"
                class="s-programs-list-popup__block-grid-item"
              >
                <div class="s-programs-list-popup__block-grid-item-top">
                  <ANum
                    :num="formatNumberWithLeadingZero(i + 1)"
                    class="a-num--md a-font_l-m"
                  />
                </div>
                <div class="s-programs-list-popup__block-grid-text a-font_xs-m">{{ subject.title }}</div>
              </div>
            </div>
          </div>

          <div class="s-programs-list-popup__blocks">
            <div
              v-if="learningProgram.length"
              class="s-programs-list-popup__block"
            >
              <h4 class="s-programs-list-popup__block-title a-font_h5">
                Программа обучения
              </h4>
              <div class="s-programs-list-popup__block-grid">
                <div
                  v-for="(subject, i) in learningProgram"
                  :key="subject.title"
                  class="s-programs-list-popup__block-grid-item"
                >
                  <div class="s-programs-list-popup__block-grid-item-top">
                    <ANum
                      :num="formatNumberWithLeadingZero(i + 1)"
                      class="a-num--md a-font_l-m"
                    />
                  </div>
                  <div class="s-programs-list-popup__block-grid-text a-font_xs-m">{{ subject.title }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="s-programs-list-popup__bottom a-font_xs-m">
      <NuxtLink
        class="s-programs-list-popup__bottom-btn"
        :to="slug"
        @click="close"
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
      <span
        class="s-programs-list-popup__bottom-btn"
        @click="onClickHandler"
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
        <span>Записаться</span>
      </span>
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
  &.fancybox__content>.f-button.is-close-btn {
    background-color: var(--a-color_grey_10);

    @include desktop() {
      top: calc(var(--scale)* 8);
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
</style>

<style lang="scss" scoped>
@import './SCoursesListPopup.scss';
</style>
