<script setup lang="ts">
import type { Fonts } from '~/types';

type BtnColor = 'red' | 'black' | 'white';

interface Props {
  title?: string;
  titleClass?: string;
  description?: string;
  descriptionClass?: string;
  bgColor?: string;
  imageSm?: string;
  imageMd?: string;
  imageLg?: string;
  btnHref?: string;
  btnColor?: BtnColor;
  btnText?: string;
  formTitle?: string;
  formTitleClass?: Fonts;
  formSubtitle?: string;
  formSubtitleClass?: Fonts;
  formBtnText?: string;
  formMail?: boolean;
  actionParams?: { param: string }[]
}

const {
  formTitle = '',
  formTitleClass = 'a-font_h4',
  formSubtitle = '',
  formSubtitleClass = 'a-font_h6',
  formBtnText = 'Отправить',
  formMail = false,
  actionParams = [],
  ...props
} = defineProps<Props>();

const form = {
  title: formTitle,
  titleClass: formTitleClass,
  subtitle: formSubtitle,
  subtitleClass: formSubtitleClass,
  formName: true,
  formPhone: true,
  formMail: formMail,
  btn: formBtnText,
  actionParams: actionParams,
};

const { openModal } = useModalStore();
const modalProps = {
  title: formTitle,
  titleClass: formTitleClass,
  subtitle: formSubtitle,
  subtitleClass: formSubtitleClass,
  formName: true,
  formPhone: true,
  formMail: formMail,
  btn: formBtnText,
  actionParams: actionParams,
}
</script>

<template>
  <SBanner
    v-if="btnHref"
    v-bind="props"
    :btn-click="() => openModal('MModalForm', modalProps)"
  />
</template>


