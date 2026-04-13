<script setup lang="ts">
import Logo from '~/assets/images/global/form-logo.svg?url';
import LogoBlack from '~/assets/images/global/form-logo-black.svg?url';
import { FORM_POLICY_TEXT_CERT } from '~/constants/common';
import type { FontSizeClass, FormBgColor, InputMode } from '~/types';
import AInput from '~/components/atoms/AInput/AInput.vue';
import type { BaseLanderData } from '~~/utils/generateLanderData';
import {
  type FormDataEmailOnly,
  formSchemaEmailOnly,
} from '~/utils/validators';

interface CustomField {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  inputmode?: InputMode;
  fontSize: FontSizeClass;
  size: 'sm' | 'md' | 'lg';
  attributes?: { [key: string]: unknown };
}

const {
  title = 'Заполните форму и&nbsp;наш менеджер свяжется с&nbsp;вами',
  titleClass = 'a-font_h4',
  subtitle = '',
  subtitleClass = 'a-font_h5',
  bgColor = 'transparent',
  btn = 'Подать заявку',
  showLogo = false,
  inputSize,
  actionParams = [],
} = defineProps<{
  title?: string,
  titleClass?: string,
  subtitle?: string,
  subtitleClass?: string,
  bgColor?: FormBgColor,
  btn?: string,
  actionParams?: { param: string }[],
  showLogo?: boolean,
  inputSize?: 'sm' | 'md' | 'lg',
  addFields?: CustomField[]
}>();

const formLogo = bgColor === 'red' ? Logo : LogoBlack;

const {
  formData,
  onSubmit,
  isPending,
  onFormClick,
} = useLanderForm<FormDataEmailOnly>({
  initialFormData: {
    email: '',
    name: 'empty',
    personalDataAgree: false,
  },
  baseLanderData: { title, subtitle, actionParams } satisfies BaseLanderData,
  formSchema: formSchemaEmailOnly,
  onSuccess: () => {
    return showPopUp();
  },
});

const { openModal } = useModalStore();

function showPopUp() {
  openModal('ACertRequestSuccess');
}
</script>

<template>
  <form
    :class="`m-form--bgColor-${bgColor}`"
    class="m-form m-form--min nolander"
    @submit.prevent="onSubmit"
    @click="onFormClick"
  >
    <div
      v-if="title"
      :class="titleClass"
      class="m-form__title"
      v-html="title"
    />

    <div
      v-if="subtitle"
      :class="subtitleClass"
      class="m-form__subtitle"
      v-html="subtitle"
    />

    <div class="m-form__content">
      <AInput
        v-model="formData.email"
        type="email"
        name="email"
        inputmode="email"
        placeholder="Почта"
        :size="inputSize"
      />
      <AButton
        type="submit"
        :disabled="isPending"
      >
        <span>{{ btn }}</span>
      </AButton>
    </div>

    <ACheckbox
      v-model="formData.personalDataAgree"
      :label="FORM_POLICY_TEXT_CERT"
      :initial="formData.personalDataAgree"
      :required="false"
      class="m-form__privacy a-font_xs"
      name="personalDataAgree"
    />

    <AImg
      v-if="(bgColor === 'black' || bgColor === 'red') && showLogo"
      :src="formLogo"
      class="m-form__logo lazy"
      decoding="async"
      alt="form"
    />
  </form>
</template>

<style lang="scss" scoped>
@import './MFormEmailMin.scss';
</style>
