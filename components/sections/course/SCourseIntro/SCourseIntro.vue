<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import BgImageLg from '~/assets/images/program/intro/intro-lg.webp';
import BgImageMd from '~/assets/images/program/intro/intro-md.webp';
import BgImageSm from '~/assets/images/program/intro/intro-sm.webp';
import type { CourseEntity, Nullable } from '~/types';
import { KEYS } from '~/constants';
import { FREE_COURSE_DIRECTION_NAME } from '~/constants/common';

interface Props {
  showForm?: boolean;
  formBtn?: string;
  actionParams?: { param: string }[]
  entity?: Nullable<CourseEntity>;
  routeName?: string;
}

const {
  showForm = false,
  actionParams: propsActionParams = [],
  formBtn,
  entity = null,
  routeName = '',
} = defineProps<Props>();

const { data: forms, execute: fetchCourseTrainingForms } = await useFetch(`/api/courses/getFormsByCourseId/${entity?.id}`, {
  transform(res) {
    const courseForms = [] as string[];

    if (!res || !res.data?.length) return courseForms;

    res.data.forEach(({ attributes }) => courseForms.push(attributes.short_name));

    return courseForms;
  },
  deep: false,
  watch: false,
  immediate: false,
  key: `${KEYS.COURSE_DIRECTION_NAME}-${entity?.id}`,
});

const { data: direction, execute: fetchCourseDirection } = await useFetch(`/api/courses/${entity?.id}/direction`, {
  deep: false,
  watch: false,
  immediate: false,
  transform(res) {
    if (!res) return null;
    return res.data.attributes.name;
  },
});

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: modalFormTitle,
    formName: true,
    formPhone: true,
    actionParams: actionParams,
  });
}

await Promise.all([
  fetchCourseTrainingForms(),
  fetchCourseDirection(),
]);

const breadcrumbsWithoutDirection = generateBreadcrumbs({ routeName, entity: entity ?? {} });

const breadcrumbs = direction.value
  ? [
      ...breadcrumbsWithoutDirection.slice(0, -1),
      { title: direction.value, link: '#' },
      breadcrumbsWithoutDirection[breadcrumbsWithoutDirection.length - 1],
    ]
  : breadcrumbsWithoutDirection;

const { course_triggers = [] } = entity?.customFields ?? {};

const partnerText = entity?.properties?.partner_text
  ? entity.properties.partner_text
  : 'Партнёрская программа';

const slides = [
  {
    title: 'Длительность',
    text: course_triggers[0]?.duration_hours,
  },
  {
    title: 'Формат обучения',
    tags: forms.value?.length ? forms.value : null,
  },
  {
    title: 'Продолжительность',
    text: formatDaysToMonths(entity?.properties.duration_days),
  },
  {
    title: 'Старт обучения',
    text: courseFormatStartDate(course_triggers),
  },
  {
    title: 'Диплом',
    text: course_triggers[0]?.diploma ?? '',
  },
].filter((slide) => Boolean(slide.text || slide.tags));

const modalFormTitle = direction.value === FREE_COURSE_DIRECTION_NAME
  ? `Оставьте заявку и мы откроем <span span class='--free-red' > бесплатный </span> доступ к обучению`
  : `Оставьте заявку и мы откроем <span class='--free-red'>бесплатный</span> доступ к вводной части обучения`;

const actionParams = useCourseActionParams({
  defaultParams: [
    { param: 'grcampaign=e_mail_chain_vpo' },
    { param: 'form=foreign_entrant' },
    { param: 'level=Курсы' },
    ...propsActionParams,
  ],
  directionName: direction.value,
  courseSlug: entity!.slug,
});
</script>

<template>
  <MSection class="s-intro">
    <div class="s-intro__wrap">
      <div class="s-intro__desc">
        <MBreadcrumbs :breadcrumbs />
        <div
          v-if="entity?.properties?.international || entity?.properties?.partner_show"
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
        <div class="s-intro__text a-font_h6">
          Отправьте заявку <br>и&nbsp;начните учиться <span class="--free-red">бесплатно</span>
        </div>
        <template v-if="showForm">
          <MQuizForm
            :action-params
            :btn="formBtn"
            :title="`Отправьте заявку <br>и&nbsp;начните учиться <span class='--free-red'>бесплатно</span>`"
          />
        </template>
        <template v-else>
          <AButton @click="openForm()">
            <span>Начать бесплатно</span>
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
      <swiper
        slides-per-view="auto"
        grab-cursor
        resistance
        :resistance-ratio="0"
        :space-between="0"
      >
        <swiper-slide
          v-for="item in slides"
          :key="item.title"
          class="s-intro__info-item"
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
@import '../../program/SProgramIntro/SProgramIntro.scss';
@import './SCourseIntro.scss';
</style>
