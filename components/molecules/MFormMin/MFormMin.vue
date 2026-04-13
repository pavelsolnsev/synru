<script setup lang="ts">
import Logo from '~/assets/images/global/form-logo.svg?url';
import LogoBlack from '~/assets/images/global/form-logo-black.svg?url';
import { FORM_POLICY_TEXT } from '~/constants/common';
import type { FontSizeClass, FormBgColor, InputMode } from '~/types';
import { formSchema } from '~~/utils/validators';
import { ROUTES } from '~/constants';
import AInput from '~/components/atoms/AInput/AInput.vue';
import APhoneInput from '~/components/atoms/APhoneInput/APhoneInput.vue';
import type { BaseLanderData } from '~~/utils/generateLanderData';

interface CustomField {
  type: string;
  label?: string;
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
  formMail = false,
  btn = 'Подать заявку',
  showLogo = false,
  inputSize,
  addFields = [],
  actionParams = [],
  routeName = '',
} = defineProps<{
  title?: string,
  titleClass?: string,
  subtitle?: string,
  subtitleClass?: string,
  bgColor?: FormBgColor,
  formMail?: boolean,
  btn?: string,
  actionParams?: { param: string }[],
  showLogo?: boolean,
  inputSize?: 'sm' | 'md' | 'lg',
  addFields?: CustomField[],
  routeName?: string;
}>();

const emits = defineEmits<{
  (e: 'customFieldFocus', event: FocusEvent): void;
  (e: 'customFieldBlur', event: FocusEvent): void;
}>();

const formLogo = bgColor === 'red' ? Logo : LogoBlack;

const {
  formData,
  formErrors,
  onSubmit,
  isPending,
  onFormClick,
} = useLanderForm({
  initialFormData: {
    name: '',
    phone: '',
    personalDataAgree: false,
  },
  baseLanderData: { title, subtitle, actionParams } satisfies BaseLanderData,
  formSchema,
  onSuccess: async () => {
    const path = getNavigationPath({ routeName });
    const external = path.startsWith('http') ? true : false;
    return await navigateTo(path, { external });
  },
});

const nameInput = useTemplateRef<InstanceType<typeof AInput>>('name');
const phoneInput = useTemplateRef<InstanceType<typeof APhoneInput>>('phone');

watch(formErrors, () => {
  if (formErrors.value.name && nameInput.value) {
    nameInput.value.getFocus();
    return;
  }
  if (formErrors.value.phone && phoneInput.value) {
    phoneInput.value.getFocus();
    return;
  }
});
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
        ref="name"
        v-model="formData.name"
        name="name"
        placeholder="Имя"
        :size="inputSize"
        :error="formErrors.name"
      />
      <APhoneInput
        ref="phone"
        v-model="formData.phone"
        :size="inputSize"
        :error="formErrors.phone"
      />
      <AInput
        v-if="formMail"
        type="email"
        name="email"
        inputmode="email"
        placeholder="Почта"
        :size="inputSize"
      />
      <template
        v-for="item, index in addFields"
        :key="index"
      >
        <component
          :is="item.label ? 'AInputLabel' : 'AInput'"
          :type="item.type"
          :label="item.label"
          :name="item.name"
          :inputmode="item.inputmode"
          :placeholder="item.placeholder"
          :size="item.size"
          :font-size="item.fontSize"
          v-bind="item.attributes"
          @focus="emits('customFieldFocus', $event)"
          @blur="emits('customFieldBlur', $event)"
        />
      </template>
      <AButton
        type="submit"
        :disabled="isPending"
      >
        <span>{{ btn }}</span>
      </AButton>
    </div>

    <ACheckbox
      v-model="formData.personalDataAgree"
      :label="FORM_POLICY_TEXT"
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
      loading="lazy"
    />
  </form>
</template>

<style lang="scss" scoped>
@import './MFormMin.scss';
</style>
