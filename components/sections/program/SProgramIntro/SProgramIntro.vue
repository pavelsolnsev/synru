<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import BgImageLg from '~/assets/images/program/intro/intro-lg.webp';
import BgImageMd from '~/assets/images/program/intro/intro-md.webp';
import BgImageSm from '~/assets/images/program/intro/intro-sm.webp';
import DefaultFacultyIcon from '~/assets/images/program/intro/default-intro-icon.svg?url';
import type { LevelCustomFields, ProgramEntity } from '~/types';
import { KEYS } from '~/constants';
import { NOT_FREE_FACULTY_ID } from '~/constants/common';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { replaceYearInHTML } from '~/utils/replaceYearInHtml';

interface Props {
  showForm?: boolean;
  actionParams?: { param: string }[],
  formBtn?: string,
  formText?: string,
  entity?: null | ProgramEntity;
  routeName?: string;
}

export interface ProgramInfoResponse {
  included: [FacultyIncluded, LevelIncluded, FormsIncluded];
}

interface ProgramInfo {
  faculty_icon: string;
  level: string;
  forms: string[];
  free_education: boolean;
}

interface FacultyIncluded {
  id: string;
  type: 'faculties';
  attributes: FacultyAttributes;
}

interface LevelIncluded {
  id: string;
  type: 'levels';
  attributes: LevelAttributes;
}

interface FormsIncluded {
  id: string;
  type: 'forms';
  attributes: FormsAttributes;
}

interface FacultyAttributes {
  name: string;
  short_name: string;
  slug: string;
  description: string;
  preview_image: string;
  intro_image: string;
  rank: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  properties: { popular: boolean };
  url?: null;
  custom_field_values?: unknown[];
}

interface LevelAttributes {
  name: string;
  slug: string;
  description: string;
  published: boolean;
  rank: number;
  created_at: string;
  updated_at: string;
  properties?: null;
  url: string;
  custom_field_values: LevelCustomFields[];
}

interface FormsAttributes {
  name: string;
  slug: string;
  short_name: string;
  description: string;
  rank: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  properties?: null;
}

const {
  showForm = false,
  actionParams = [],
  formBtn,
  formText,
  entity = null,
  routeName = '',
} = defineProps<Props>();

const freeStart = ref(true);
const breadcrumbs = generateBreadcrumbs({ routeName, entity: entity ?? {} });
const computedFormText = computed(() => data?.level === 'Колледж' ? 'Узнайте средний балл аттестата для поступления, оставив заявку' : formText ? replaceYearInHTML(formText) : '');

const query = {
  'include': 'faculty.customFieldValues,level.customFieldValues,forms',
};

/**
 * Чтобы исключить лишние запросы к серверу, этот запрос дублировать в секциях сущности программа (папка components/program)
 */
const { data: rawData } = await useFetch<ProgramInfoResponse>(`/api/programs/getProgramById/${entity?.id}`, {
  key: `${KEYS.PROGRAM}${entity?.id}${JSON.stringify(query)}`,
  query,
  getCachedData(key, nuxtApp) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];

    return data ? data : undefined;
  },
  deep: false,
  watch: false,
});

const data = transformRes(rawData.value);

const buttonText = freeStart.value
  ? 'Начать бесплатно'
  : 'Хочу поступить';

const preButtonText = freeStart.value
  ? 'Узнайте проходной балл <br>и начните учиться <span class="--free-red">бесплатно</span>'
  : 'Узнайте минимальный проходной балл';

const formTitle = freeStart.value
  ? 'Узнайте минимальный проходной балл и&nbsp;получите <span class="--free-red">бесплатный</span> доступ к&nbsp;началу обучения'
  : 'Узнайте минимальный проходной балл';

const {
  program_triggers = [],
} = mapCustomFields(entity?.custom_field_values);

const careerText = data.forms.includes('Онлайн') && entity?.properties?.international?.includes('Дубай')
  ? 'Консультация от Центра карьеры'
  : program_triggers.length
    ? (program_triggers[0].career ?? '')
    : '';

const partnerText = entity?.properties?.partner_text
  ? entity.properties.partner_text
  : 'Партнёрская программа';

const slides = [
  {
    title: 'Уровень образования',
    text: data?.level,
  },
  {
    title: 'Срок обучения',
    text: program_triggers.length ? (program_triggers[0].duration ?? '') : '',
  },
  {
    title: 'Формат обучения',
    tags: data?.forms?.length ? data.forms : null,
  },
  {
    title: 'Результат обучения',
    text: program_triggers.length ? (program_triggers[0].result ?? '') : '',
  },
  {
    title: 'Карьера',
    text: program_triggers.length ? careerText : '',
  },
].filter((slide) => Boolean(slide.text || slide.tags));

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
});

const { openModal } = useModalStore();

function openFormIntro() {
  openModal('MModalForm', {
    title: formTitle,
    btn: 'Отправить',
    formName: true,
    formPhone: true,
    actionParams: [
      { param: 'grcampaign=e_mail_chain_vpo' },
      { param: 'form=foreign_entrant' },
    ]
  });
}

tryOnMounted(() => {
  const { path } = useRoute();
  const levelsMap = useStorage('levelsMap', {} as Record<string, string>, sessionStorage);

  if (!(path in levelsMap.value)) {
    levelsMap.value[path] = data?.level || '';
  }
})

function transformRes(res: ProgramInfoResponse | null) {
  const programInfo: ProgramInfo = {
    faculty_icon: DefaultFacultyIcon,
    free_education: false,
    level: '',
    forms: [],
  };

  if (!res || !res.included.length) return programInfo;

  const includedHandlers = {
    faculties: updateProgramFacultyInfo,
    levels: updateProgramLevelInfo,
    forms: updateProgramFormInfo,
  } as Record<'faculties' | 'levels' | 'forms', (includedInfo: unknown, program: ProgramInfo) => void>;

  res.included.forEach((includedData) => {
    if (Object.hasOwn(includedHandlers, includedData.type)) {
      const includedHandler = includedHandlers[includedData.type];

      includedHandler(includedData, programInfo);
    }
  });

  return programInfo;
};

function updateProgramFacultyInfo(faculty: FacultyIncluded, programInfo: ProgramInfo) {
  freeStart.value = faculty.id !== NOT_FREE_FACULTY_ID;

  programInfo.faculty_icon = faculty.attributes.preview_image ?? DefaultFacultyIcon;
  programInfo.free_education = mapCustomFields(faculty.attributes.custom_field_values ?? [])['free_education'];
}

function updateProgramLevelInfo(level: LevelIncluded, programInfo: ProgramInfo) {
  programInfo.level = level.attributes.name ?? '';
}

function updateProgramFormInfo(forms: FormsIncluded, programInfo: ProgramInfo) {
  programInfo.forms.push(forms.attributes.short_name);
}

</script>

<template>
  <MSection class="s-intro">
    <div class="s-intro__wrap">
      <div class="s-intro__desc">
        <MBreadcrumbs :breadcrumbs />
        <div
          v-if="entity?.properties?.international || entity?.properties.partner_show"
          class="s-intro__tags a-font_m-m"
        >
          <div
            v-if="entity?.properties?.international"
            class="s-intro__tag"
          >
            <ASvgMono name="pin-new" />
            <span v-html="entity.properties.international" />
          </div>
          <div
            v-if="entity?.properties?.partner_show"
            class="s-intro__tag"
          >
            <ASvgMono name="star-new" />
            <span v-html="partnerText" />
          </div>
        </div>
        <h1
          class="a-font_h3 s-intro__title"
          v-html="entity?.name"
        />
        <template v-if="showForm">
          <div
            class="s-intro__form-text a-font_h6"
            v-html="computedFormText"
          />
          <MQuizForm
            :action-params
            :btn="formBtn"
          />
        </template>
        <template v-else>
          <div
            class="s-intro__text a-font_h6"
            v-html="preButtonText"
          />
          <AButton @click="openFormIntro()">
            <span v-html="buttonText" />
          </AButton>
        </template>
      </div>
      <div class="s-intro__promo">
        <picture class="s-intro__image">
          <source
            v-if="!entity?.image"
            :srcset="BgImageLg"
            media="(min-width: 1200px)"
          >
          <source
            v-if="!entity?.image"
            :srcset="BgImageMd"
            media="(min-width: 768px)"
          >
          <AImg
            :src="entity?.image ?? BgImageSm"
            alt="program"
          />
        </picture>
      </div>
    </div>
    <div class="s-intro__slider">
      <swiper v-bind="swiperConfig">
        <swiper-slide
          v-for="item in slides"
          :key="item.title"
          class="s-intro__info-item"
          :class="{ '--forms': item.tags }"
        >
          <div
            class="s-intro__info-item-title a-font_m-m"
            v-html="item.title"
          />
          <div
            v-if="item.text"
            class="s-intro__info-item-text a-font_m-m"
            v-html="item.text"
          />
          <div
            v-if="item.tags && item.tags.length"
            class="s-intro__info-item-tags"
          >
            <ATag
              v-for="tag in item.tags"
              :key="tag"
              :text="tag"
              variant="black"
              font="a-font_m-m"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SProgramIntro.scss';
</style>
