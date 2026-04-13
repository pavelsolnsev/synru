<script setup lang="ts">
import { FORM_POLICY_TEXT } from '~/constants/common';
import { ROUTES } from '~/constants';
import AInput from '~/components/atoms/AInput/AInput.vue';
import type { FormBgColor } from '~/types';
import { formSchemaEmailOnly, type FormDataEmailOnly } from '~/utils/validators';

const {
  title = 'Заполните форму и&nbsp;наш менеджер свяжется с&nbsp;вами',
  titleClass = 'a-font_h4',
  subtitle = '',
  subtitleClass = 'a-font_h5',
  bgColor = 'transparent',
  btn = 'Подать заявку',
  btnBgColor = 'red',
  actionParams = [],
} = defineProps<{
  title?: string,
  titleClass?: string,
  subtitle?: string,
  subtitleClass?: string,
  bgColor?: FormBgColor,
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
} = useLanderForm<FormDataEmailOnly>({
  initialFormData: {
    name: '',
    personalDataAgree: false,
    email: '',
  },
  baseLanderData: { title, subtitle, actionParams } satisfies BaseLanderData,
  formSchema: formSchemaEmailOnly,
  onSuccess: async () => {
    return await navigateTo(`${ROUTES.THANKS}?utm_source=thanks`);
  },
});

const nameInput = useTemplateRef<InstanceType<typeof AInput>>('name');
const emailInput = useTemplateRef<InstanceType<typeof AInput>>('email');

watch(formErrors, () => {
  if (formErrors.value.name && nameInput.value) {
    nameInput.value.getFocus();
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
      <AInput
        v-model="formData.name"
        ref="name"
        name="name"
        placeholder="Имя"
        :error="formErrors.name"
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
@import './MFormNameEmail.scss';
</style>
