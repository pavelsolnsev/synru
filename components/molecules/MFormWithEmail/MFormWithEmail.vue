<script setup lang="ts">
import { FORM_POLICY_TEXT } from '~/constants/common';
import { ROUTES } from '~/constants';
import AInput from '~/components/atoms/AInput/AInput.vue';
import APhoneInput from '~/components/atoms/APhoneInput/APhoneInput.vue';
import type { FormBgColor } from '~/types';
import { formSchemaWithEmail, type FormDataWithEmail } from '~/utils/validators';

const {
  title = 'Заполните форму и&nbsp;наш менеджер свяжется с&nbsp;вами',
  titleClass = 'a-font_h4',
  subtitle = '',
  subtitleClass = 'a-font_h5',
  bgColor = 'transparent',
  formName = true,
  formPhone = true,
  btn = 'Подать заявку',
  btnBgColor = 'red',
  actionParams = [],
} = defineProps<{
  title?: string,
  titleClass?: string,
  subtitle?: string,
  subtitleClass?: string,
  bgColor?: FormBgColor,
  formName?: boolean,
  formPhone?: boolean,
  btn?: string,
  btnBgColor?: 'red' | 'black' | 'white',
  actionParams?: { param: string }[],
}>();

const {
  formData,
  formErrors,
  onSubmit,
  isPending,
  onFormClick,
} = useLanderForm<FormDataWithEmail>({
  initialFormData: {
    name: formName ? '' : 'empty',
    phone: formPhone ? '' : '+7 909 999-99-99',
    personalDataAgree: false,
    email: '',
  },
  baseLanderData: { title, subtitle, actionParams } satisfies BaseLanderData,
  formSchema: formSchemaWithEmail,
  onSuccess: async () => {
    return await navigateTo(`${ROUTES.THANKS}?utm_source=thanks`);
  },
});

const nameInput = useTemplateRef<InstanceType<typeof AInput>>('name');
const phoneInput = useTemplateRef<InstanceType<typeof APhoneInput>>('phone');
const emailInput = useTemplateRef<InstanceType<typeof AInput>>('email');

watch(formErrors, () => {
  if (formErrors.value.name && nameInput.value) {
    nameInput.value.getFocus();
    return;
  }
  if (formErrors.value.phone && phoneInput.value) {
    phoneInput.value.getFocus();
    return;
  }
  if (formErrors.value.email && emailInput.value) {
    emailInput.value.getFocus();
    return;
  }
});

</script>

<template>
  <form
    class="m-form nolander"
    :class="`m-form--bgColor-${bgColor}`"
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
      <input
        v-if="!formName"
        name="name"
        placeholder="Имя"
        type="hidden"
        value="empty"
      >
      <input
        v-if="!formPhone"
        name="phone"
        inputmode="tel"
        placeholder="Телефон"
        type="hidden"
        value="79099999999"
      >
      <AInput
        v-if="formName"
        v-model="formData.name"
        ref="name"
        name="name"
        placeholder="Имя"
        :error="formErrors.name"
      />
      <APhoneInput
        v-if="formPhone"
        v-model="formData.phone"
        ref="phone"
        :error="formErrors.phone"
      />
      <AInput
        v-model="formData.email"
        ref="email"
        type="email"
        name="email"
        inputmode="email"
        placeholder="Почта"
        :error="formErrors.email"
      />
    </div>
    <div class="m-form__bottom">
      <AButton
        type="submit"
        :disabled="isPending"
        :bg-color="btnBgColor"
      >
        <span>{{ btn }}</span>
      </AButton>

      <ACheckbox
        v-model="formData.personalDataAgree"
        :initial="formData.personalDataAgree"
        :required="false"
        :label="FORM_POLICY_TEXT"
        class="m-form__privacy a-font_xs"
        name="personalDataAgree"
      />
    </div>

    <slot />
  </form>
</template>

<style lang="scss" scoped>
@import './MFormWithEmail.scss';
</style>
