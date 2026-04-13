<script setup lang="ts">
import type { Fonts, FormBgColor, CourseEntity, Nullable } from '~/types';
import { FREE_COURSE_DIRECTION_NAME } from '~/constants/common';
import { replaceYearInHTML } from '~/utils/replaceYearInHtml';

interface Props {
  title: string;
  titleClass?: Fonts;
  subtitle?: string;
  subtitleClass?: Fonts;
  bgColor?: FormBgColor;
  formMail?: boolean;
  btn: string;
  actionParams?: { param: string }[];
  showLogo?: boolean;
  routeName?: string;
  entity?: unknown;
}

const {
  title,
  titleClass = 'a-font_h3',
  subtitle = '',
  subtitleClass = 'a-font_h6',
  bgColor,
  formMail,
  btn,
  actionParams = [],
  showLogo,
  entity = null,
  routeName = '',
} = defineProps<Props>();

const titleWithCurrentYear = title ? replaceYearInHTML(title) : '';
const subtitleWithCurrentYear = subtitle ? replaceYearInHTML(subtitle) : '';

const direction = ref<Nullable<string>>(null);

let formTitle = titleWithCurrentYear;

if (entityIsCourse(entity)) {
  const { data } = await useFetch(`/api/courses/${entity?.id}/direction`, {
    deep: false,
    watch: false,
    transform(res) {
      if (!res) return null;
      return res.data.attributes.name;
    },
  });

  direction.value = data.value;

  if (direction.value === FREE_COURSE_DIRECTION_NAME) {
    formTitle = `Оставьте заявку, и мы откроем <span class="--free-white">бесплатный</span><br>доступ к обучению`;
  }
}

const formActionParams = entityIsCourse(entity) ? useCourseActionParams({
  defaultParams: actionParams,
  directionName: direction.value,
  courseSlug: entity?.slug,
}) : actionParams;

function entityIsCourse(entity: unknown): entity is CourseEntity {
  return routeName === 'course';
}
</script>

<template>
  <MSection class="s-form-min">
    <MFormMin
      :title="formTitle"
      :title-class="titleClass"
      :subtitle="subtitleWithCurrentYear"
      :subtitle-class="subtitleClass"
      :bg-color="bgColor"
      :form-mail="formMail"
      :btn="btn"
      :action-params="formActionParams"
      :show-logo="showLogo"
    />
  </MSection>
</template>

