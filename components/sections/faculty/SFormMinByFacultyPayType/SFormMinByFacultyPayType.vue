<script setup lang="ts">
import { NOT_FREE_FACULTY_ID } from '~/constants/common';
import type { Fonts, FormBgColor, FacultyEntity } from '~/types';

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
  entity?: FacultyEntity | null,
  actionParams?: { param: string }[]
}

const props = defineProps<Props>();

const freeStart = String(props.entity?.id) !== NOT_FREE_FACULTY_ID;

const formData = {
  ...props,
  title: freeStart ? props.titleFree : props.title,
};
</script>

<template>
  <SFormMin v-bind="formData" />
</template>

