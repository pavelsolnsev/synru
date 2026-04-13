<script setup>
import Rub from '~/assets/icons/svg-mono/rub.svg?url';
import { mainLevelsData } from '~/components/sections/shared/SLevels/levelsData';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    default: '',
  },
  triggers: {
    type: Array,
    default: () => [],
  },
  actionParams: {
    type: Array,
    default:() => ([]),
  },
  programs: {
    type: Array,
    default:() => ([]),
  },
  levels: {
    type: Array,
    default:() => ([]),
  },
  freeStart: {
    type: Boolean,
    default: true,
  },
  formTitle: {
    type: String,
    default: '',
  },
});

defineEmits(['update:isVisible']);

const INITIAL_CARD_COUNT = 6;
const popupRef = templateRef('popupRef');

const formTitle = computed(() => {
  if (props.formTitle) return props.formTitle;

  return props.freeStart
    ? 'Подберите программу обучения, узнайте минимальный проходной балл и начните учиться бесплатно'
    : 'Узнайте минимальный проходной балл';
});

const subtitle = computed(() =>props.formTitle ? 'Презентацию о&nbsp;программе вы получите по&nbsp;СМС и&nbsp;в&nbsp;Telegram' : '');

const formButtonText = computed(() => {
  if (props.formTitle) return 'Скачать программу';

  return props.freeStart
    ? 'Начните бесплатно'
    : 'Хочу поступить';
});

const specifiedActionParams = shallowReactive(props.actionParams);
const route = useRoute();

watchEffect(() => {
  if (!props.slug) return;

  const versionIndex = specifiedActionParams.findIndex((paramRow) => paramRow.param.startsWith('version='));


  if (versionIndex !== -1) {
    specifiedActionParams.splice(versionIndex, 1);
  }

  const facultyAlias = getLastPathSegment(props.slug);

  const version = calculateFacultyPopupVersion(route.path, facultyAlias);

  if (version) {
    specifiedActionParams.push({
      param: `version=${version}`,
    });
  }
});

function open() {
  formActiveClass.value = '';

  Fancybox.show([
    {
      src: '#s-faculty-list-popup',
      hideScrollbar: true,
      touch: false,
      dragToClose: false,
    },
  ], {
    mainClass: 's-programs-list-fancy',
  },
  );
}

defineExpose({
  open,
});

const prices = [
  { level: 'Колледж', slug: 'college', price: 150 },
  { level: 'Бакалавриат', slug: 'pervoe_vysshee', price: 300 },
  { level: 'Специалитет', slug: 'speczialitet', price: 300 },
  { level: 'Магистратура', slug: 'magistracy', price: 350 },
  { level: 'Аспирантура', slug: 'postgraduate_study', price: 500 },
  { level: 'Ординатура', slug: 'ordinatura', price: 500 },
  { level: 'Второе высшее', slug: 'second_highest', price: 300 },
];

let formBlock = null;

function getTrainingPeriod(level) {
  const selectLevel = prices.filter((price) => price.level === level)[0].slug;
  return mainLevelsData[selectLevel].items.find((item) => item.text.includes('срок обучения')).title;
}

function filteredPrices(level) {
  return prices.filter((price) => price.level === level);
}

const formValue = ref({});

const formActiveClass = shallowRef('');
const formRef = templateRef('formRef');

function onApplyBtnClick() {
  if (!formBlock) formBlock = document.querySelector('#s-faculty-popup-form');

  formBlock?.scrollIntoView({ block: 'start' , behavior: 'smooth' });

  setTimeout(() => {
    formActiveClass.value = 'active';
    formRef.value?.submitForm();
  }, 500);
}
</script>

<template>
  <div
    id="s-faculty-list-popup"
    class="s-programs-list-popup"
  >
    <div class="s-programs-list-popup__wrap">
      <div
        ref="popupRef"
        class="s-programs-list-popup__inner"
      >
        <h3
          class="s-programs-list-popup__name a-font_h3"
          v-html="name"
        />

        <APopupProgramInfo />

        <MForm
          id="s-faculty-popup-form"
          ref="formRef"
          :key="name"
          v-model="formValue"
          :class="formActiveClass"
          title-class="a-font_h5"
          subtitle-class="a-font_m-m"
          :title="formTitle"
          :subtitle
          :btn="formButtonText"
          :action-params="specifiedActionParams"
          :form-name="false"
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

        <h4 class="a-font_h5">Стоимость обучения</h4>
        <div class="s-programs-list-popup__block-grid">
          <div
            v-for="level in levels"
            :key="level"
            class="price-card"
          >
            <p class="a-font_h6">{{ level }}</p>
            <p
              class="price-card__subtitle a-font_s-m"
              v-html="getTrainingPeriod(level)"
            />
            <p
              v-for="price in filteredPrices(level)"
              :key="price.level"
              class="a-font_slider-text"
            >
              от {{ price.price * 6 }}
              <AImg
                :src="Rub"
                class="ico"
                alt="rub"
              />{{ '/сем' }}
            </p>
          </div>
        </div>

        <h4 class="a-font_h5">Специальности</h4>
        <ProgramResults
          :cards="programs"
          :initial-card-count="INITIAL_CARD_COUNT"
        >
          <template #default="{ item: program }">
            <MSpecialtyCard
              :id="program.id"
              :name="program.name"
              :faculty="program.faculty.text"
              :level="program.level.text"
              :place="program.place"
              :is-new="program.new"
              :is-popular="program.isPopular"
              :is-partner="program.partner"
              is-show-enroll
              @enroll="onApplyBtnClick"
            />
          </template>
        </ProgramResults>
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

<style lang="scss" scoped>
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

    :deep() {
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
@import './SFacultyListPopup.scss';
</style>
