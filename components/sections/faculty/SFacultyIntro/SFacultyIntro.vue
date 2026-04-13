<script setup lang="ts">
import BgImageLg from '~/assets/images/faculty/intro-new/1920.webp';
import BgImageMd from '~/assets/images/faculty/intro-new/768.webp';
import BgImageSm from '~/assets/images/faculty/intro-new/360.webp';
import { NOT_FREE_FACULTY_ID } from '~/constants/common';
import type { FacultyEntity } from '~/types';
import { replaceYearInHTML } from '~/utils/replaceYearInHtml';

interface Props {
  showForm?: boolean;
  actionParams?: { param: string }[],
  formBtn?: string,
  formText?: string;
  entity?: FacultyEntity | null;
  routeName?: string;
}

const {
  showForm = false,
  actionParams = [],
  formBtn,
  formText,
  entity = null,
  routeName = '',
} = defineProps<Props>();

const formTextWithCurrentYear = formText ? replaceYearInHTML(formText) : '';

const route = useRoute();

const title = route.query.title
  ? route.query.title
  : entity?.properties?.advanced_name || entity?.name;

const { data } = useFetch(`/api/faculties/getFacultyById/${entity?.id}`, {
  query: {
    include: 'programsCount,coursesCount',
  },
  transform(res: { data: { attributes: { programs_count?: number, courses_count?: number } } }) {
    const programsCount = res.data.attributes.programs_count ?? 0;
    const coursesCount = res.data.attributes.courses_count ?? 0;
    const totalCount = programsCount + coursesCount;
    return {
      programsCount: declensionOfNumber(totalCount, ['специальность', 'специальности', 'специальностей'], true),
    };
  },
  deep: false,
  watch: false,
});

const breadcrumbs = generateBreadcrumbs({ routeName, entity: entity ?? {} });

const logo = entity?.preview_image;
const { preview_additional = '' } = entity?.customFields ?? {};
const freeStart = String(entity?.id) !== NOT_FREE_FACULTY_ID;

const buttonText = freeStart
  ? 'Начать бесплатно'
  : 'Подать заявку';

const formTitle = freeStart
  ? 'Узнайте минимальный проходной балл и&nbsp;получите <span class="--free-red">бесплатный</span> доступ к&nbsp;началу обучения'
  : 'Подать заявку';

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: formTitle,
    btn: 'Отправить',
    formName: false,
    formPhone: true,
    actionParams: [{param: 'form=foreign_entrant'}],
  });
}

useSeoMeta({
  ogImage: logo?.replace('.svg', '.webp'),
});
</script>

<template>
  <MSection
    class="s-intro"
    :class="{
      '--faculty-free': freeStart,
      '--form': showForm,
      '--faculty-partner': preview_additional,
    }"
  >
    <picture class="s-intro__bg">
      <source
        :srcset="BgImageLg"
        media="(min-width: 1200px)"
      >
      <source
        :srcset="BgImageMd"
        media="(min-width: 768px)"
      >
      <AImg
        :src="BgImageSm"
        alt="faculty"
      />
    </picture>
    <div class="s-intro__inner">
      <MBreadcrumbs :breadcrumbs />
      <div
        class="s-intro__img"
        :class="{ 's-intro__img-partner': preview_additional }"
      >
        <AImg
          class="s-intro__img-main"
          :class="{ 's-intro__img-main-large': !preview_additional }"
          :src="logo"
          alt="faculty"
        />
        <AImg
          v-if="preview_additional"
          class="s-intro__img-additional"
          :src="preview_additional"
          alt="faculty"
        />
      </div>
      <div class="s-intro__text">
        <ATag
          v-if="data?.programsCount"
          :text="data.programsCount"
          variant="black"
          font="a-font_xl-m"
        />
        <h1
          v-dompurify-html="title"
          class="s-intro__title a-font_h2"
        />
        <div class="s-intro__bottom">
          <template v-if="showForm">
            <div
              class="s-intro__bottom-form-text a-font_slider-text"
              v-html="formTextWithCurrentYear"
            />
            <MQuizForm
              :action-params
              :btn="formBtn"
            />
          </template>
          <template v-else>
            <div
              v-if="freeStart"
              class="s-intro__descr"
            >
              <div class="a-font_slider-text">
                Подберите программу обучения,<br> узнайте минимальный проходной балл <br>и&nbsp;начните учиться
                <span class="--free-red">бесплатно</span>
              </div>
            </div>
            <AButton @click="openForm()">
              <span v-html="buttonText" />
            </AButton>
          </template>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import "./SFacultyIntro.scss";
</style>
