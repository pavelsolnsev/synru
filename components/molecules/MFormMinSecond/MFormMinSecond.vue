<script setup lang="ts">
import Logo from '~/assets/images/global/form-logo-second.svg?url';
import { ROUTES } from '~/constants';
import { FORM_POLICY_TEXT } from '~/constants/common';
import AInputSecond from '~/components/atoms/AInputSecond/AInputSecond.vue';
import APhoneInputSecond from '~/components/atoms/APhoneInputSecond/APhoneInputSecond.vue';
import type { BaseLanderData } from '~~/utils/generateLanderData';

const {
  title = '',
  subtitle = '',
  formMail = false,
  btn = 'Подать заявку',
  actionParams = [],
} = defineProps<{
  title?: string,
  subtitle?: string,
  formMail?: boolean,
  btn?: string,
  actionParams?: { param: string }[],
}>();

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
    personalDataAgree: true,
  },
  baseLanderData: { title, subtitle, actionParams } satisfies BaseLanderData,
  formSchema,
  onSuccess: async () => {
    return await navigateTo(`${ROUTES.THANKS}?utm_source=thanks`);
  },
});

const nameInput = useTemplateRef<InstanceType<typeof AInputSecond>>('name');
const phoneInput = useTemplateRef<InstanceType<typeof APhoneInputSecond>>('phone');

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
    class="m-form nolander"
    @submit.prevent="onSubmit"
    @click="onFormClick"
  >
    <div class="m-form__text">
      <div
        v-if="title"
        class="m-form__title"
        v-html="title"
      />

      <div
        v-if="subtitle"
        class="m-form__subtitle"
        v-html="subtitle"
      />
    </div>

    <div class="m-form__content">
      <AInputSecond
        ref="name"
        v-model="formData.name"
        name="name"
        placeholder="Имя"
        class="m-form__content__name"
        :error="formErrors.name"
      />
      <APhoneInputSecond
        ref="phone"
        v-model="formData.phone"
        :error="formErrors.phone"
        class="m-form__content__phone"
      />
      <AInputSecond
        v-if="formMail"
        type="email"
        name="email"
        inputmode="email"
        placeholder="Почта"
      />
      <ACheckboxSecond
        v-model="formData.personalDataAgree"
        class="m-form__content__privacy"
        name="personalDataAgree"
        required
        initial
        :label="FORM_POLICY_TEXT"
      />
      <AButtonMain
        type="submit"
        :disabled="!formData.personalDataAgree || isPending"
      >
        <span>{{ btn }}</span>
      </AButtonMain>
    </div>

    <AImg
      :src="Logo"
      class="m-form__logo"
      decoding="async"
      alt="form"
      loading="lazy"
    />
  </form>
</template>

<style lang="scss" scoped>
@import './MFormMinSecond.scss';
</style>
