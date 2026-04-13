<script setup lang="ts">
import { Fancybox } from '@fancyapps/ui';

interface MFormExpose {
  submitForm: () => void;
}

const {
  name = '',
  slug = '',
  triggers = [],
  learningProgram = [],
  whatLearn = [],
  faculty = '',
  actionParams = [],
  routeName,
  level = '',
} = defineProps<{
  name?: string;
  slug?: string;
  triggers?: {
    title: string,
    content?: string | string[],
  }[];
  learningProgram?: { title: string, description?: string }[];
  whatLearn?: { title: string, text?: string }[];
  faculty?: string;
  actionParams?: { param: string }[];
  routeName: string;
  level?: string;
}>();

const specifiedActionParams = shallowReactive<{ param: string }[]>(actionParams);

watchEffect(() => {
  if (!slug) return;

  const params = [...actionParams];
  const formRow = params.find((row) => row.param.startsWith('form='));

  if (formRow) {
    const defaultFormValue = 'postupi_short';
    const [_, actionParamsFormValue] = formRow.param.split('=');
    const formValue = actionParamsFormValue ? actionParamsFormValue : defaultFormValue;

    formRow.param = `form=${ routeName === 'priemnaya_komissiya' && faculty === 'Медицинский факультет' ? 'medfac' : formValue }`;
  }

  specifiedActionParams.push({
    param: `version=${slug?.split('/').pop()}`,
  });

  specifiedActionParams.push({
    param: `level=${level}`,
  });
});

defineEmits(['update:isVisible']);

const whatLearnItems = ref<(typeof whatLearn[0] & { isOpen: boolean })[]>([]);
const learningProgramItems = ref<(typeof learningProgram[0] & { isOpen: boolean })[]>([]);
const popupRef = templateRef('popupRef');

const formTitle = computed(() => level === 'Колледж' ? 'Узнайте средний балл аттестата для поступления и скачайте программу обучения' : 'Узнайте минимальный проходной балл и&nbsp;скачайте программу обучения');

const subtitle = 'Презентацию о&nbsp;программе вы получите по&nbsp;СМС и&nbsp;в&nbsp;Telegram';

const formButtonText = 'Скачать программу';

let formBlock: null | HTMLDivElement = null;

watchEffect(() => {
  whatLearnItems.value = whatLearn.map((item) => {
    return { ...item, isOpen: false };
  });
});

watchEffect(() => {
  learningProgramItems.value = learningProgram.map((item) => {
    return { ...item, isOpen: false };
  });
});

function open() {
  formActiveClass.value = '';

  Fancybox.show([
    {
      src: '#s-programs-list-popup',
    },
  ], {
    mainClass: 's-programs-list-fancy',
    hideScrollbar: true,
    dragToClose: false,
  },
  );
}

defineExpose({
  open,
});

const formValue = ref({});

const formActiveClass = shallowRef('');
const formRef = templateRef<MFormExpose | null>('formRef');

function onApplyBtnClick() {
  if (!formBlock) formBlock = document.querySelector('#s-program-popup-form');

  formBlock?.scrollIntoView({ block: 'start' , behavior: 'smooth' });

  setTimeout(() => {
    formActiveClass.value = 'active';
    formRef.value?.submitForm();
  }, 500);
}
</script>

<template>
  <div
    id="s-programs-list-popup"
    class="s-programs-list-popup"
  >
    <div class="s-programs-list-popup__wrap">
      <div
        ref="popupRef"
        class="s-programs-list-popup__inner"
      >
        <p class="s-programs-list-popup__title a-font_h5">
          Специальность
        </p>
        <h3 class="s-programs-list-popup__name a-font_h3">
          {{ name }}
        </h3>

        <APopupProgramInfo />

        <MForm
          id="s-program-popup-form"
          :key="name"
          ref="formRef"
          v-model="formValue"
          :class="formActiveClass"
          title-class="a-font_h5"
          subtitle-class="a-font_m-m"
          :form-name="false"
          :title="formTitle"
          :subtitle
          :btn="formButtonText"
          :action-params="specifiedActionParams"
          :route-name
          :show-errors="true"
        />

        <div
          v-if="triggers.length"
          class="s-programs-list-popup__triggers"
        >
          <div
            v-for="trigger in triggers"
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
              v-html="trigger.content"
            />
          </div>
        </div>

        <div class="s-programs-list-popup__blocks">
          <div
            v-if="whatLearnItems.length"
            class="s-programs-list-popup__block"
          >
            <h4 class="s-programs-list-popup__block-title a-font_h5">
              Что вы будете изучать
            </h4>
            <div class="s-programs-list-popup__block-list">
              <div
                v-for="subject in whatLearnItems"
                :key="subject.title"
                class="s-programs-list-popup__block-item"
                :class="{ '--opened': subject.isOpen }"
                @click="subject.isOpen = !subject.isOpen"
              >
                <div class="s-programs-list-popup__block-item-title a-font_l-m">
                  {{ subject.title }}
                </div>
                <div
                  class="s-programs-list-popup__block-item-text a-font_xs-m"
                  v-html="subject.text"
                />
                <span class="s-programs-list-popup__block-item-toggle" />
              </div>
            </div>
          </div>

          <div class="s-programs-list-popup__blocks">
            <div
              v-if="learningProgramItems.length"
              class="s-programs-list-popup__block"
            >
              <h4 class="s-programs-list-popup__block-title a-font_h5">
                Учебная программа
              </h4>
              <div class="s-programs-list-popup__block-list">
                <div
                  v-for="programItem in learningProgramItems"
                  :key="programItem.title"
                  class="s-programs-list-popup__block-item"
                  :class="{ '--opened': programItem.isOpen }"
                  @click="programItem.isOpen = !programItem.isOpen"
                >
                  <div class="s-programs-list-popup__block-item-title a-font_l-m">
                    {{ programItem.title }}
                  </div>
                  <div
                    class="s-programs-list-popup__block-item-text a-font_xs-m"
                    v-html="programItem.description"
                  />
                  <span class="s-programs-list-popup__block-item-toggle" />
                </div>
              </div>
            </div>
          </div>
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
      <SBottomButtons />
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
      margin-bottom: scale(12) !important;
    }

    &__subtitle {
      margin-bottom: scale(12) !important;
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
@import './SProgramListPopup.scss';
</style>
