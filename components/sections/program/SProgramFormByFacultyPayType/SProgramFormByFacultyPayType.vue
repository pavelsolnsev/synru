<script setup lang="ts">
import { KEYS } from '~/constants';
import { NOT_FREE_FACULTY_ID } from '~/constants/common';
import type { ProgramEntity,Fonts, FormBgColor   } from '~/types';
import type { ProgramInfoResponse } from '../SProgramIntro/SProgramIntro.vue';

interface Props {
  title: string,
  titleFree: string;
  titleClass?: Fonts,
  subtitle?: string,
  subtitleClass?: Fonts,
  bgColor?: FormBgColor,
  formMail?: boolean,
  btn: string,
  showLogo?: boolean,
  entity?: ProgramEntity | null,
  actionParams?: { param: string }[]
}

const {
  entity,
  ...props
} = defineProps<Props>();

const query = {
  'include': 'faculty.customFieldValues,level.customFieldValues,forms',
};

/**
 * Запрос и кэширование аналогично секции SProgramIntro
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

const facultyId = rawData.value
  ? transformResponse(rawData.value)
  : null;

const freeStart = facultyId !== NOT_FREE_FACULTY_ID;

const formData = {
  ...props,
  title: freeStart ? props.titleFree : props.title,
};

function transformResponse(data: ProgramInfoResponse) {
  const findFaculty = data.included.find((include) => include.type === 'faculties');

  return findFaculty ? findFaculty.id : null;
}
</script>

<template>
  <SFormMin v-bind="formData" />
</template>

