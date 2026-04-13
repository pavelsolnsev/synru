<script setup lang="ts">
import { ROUTES } from '~/constants';
import { FORM_POLICY_TEXT } from '~/constants/common';
import AInputSecond from '~/components/atoms/AInputSecond/AInputSecond.vue';
import APhoneInputSecond from '~/components/atoms/APhoneInputSecond/APhoneInputSecond.vue';
import type { BaseLanderData } from '~~/utils/generateLanderData';

interface Props {
  title?: string;
  subtitle?: string;
  formName?: boolean,
  formPhone?: boolean,
  formMail?: boolean,
  btn?: string,
  actionParams?: { param: string }[],
}

const {
  title = '',
  subtitle = '',
  actionParams = [],
  formName,
  formPhone,
} = defineProps<Props>();


watch(() => actionParams, () => {
  generate({ title, subtitle, actionParams });
});

const {
  formData,
  formErrors,
  onSubmit,
  isPending,
  onFormClick,
  generate,
} = useLanderForm({
  initialFormData: {
    name: formName ? '' : 'empty',
    phone: formPhone ? '' : '+7 909 999-99-99',
    personalDataAgree: true,
  },
  baseLanderData: { title, subtitle, actionParams } satisfies BaseLanderData,
  formSchema,
  onSuccess: async () => {
    if (actionParams.some((item) => item.param.includes('form=getcatalog'))) {
      await navigateTo(`${ROUTES.THANKS}?utm_source=thanks`, {
        open: {
          target: '_blank',
        },
      });

      return await navigateTo(`${ROUTES.CATALOG}?utm_campaign=catalog-0&utm_content=catalog-0&utm_medium=e_mail_chain_catalog&utm_source=maillist&utm_term=`, {
        external: true,
      });
    }

    return await navigateTo(`${ROUTES.THANKS}?utm_source=thanks`, {
      external: true,
    });
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
      <AInputSecond
        v-if="formName"
        ref="name"
        v-model="formData.name"

        name="name"
        placeholder="Имя"
        :error="formErrors.name"
      />

      <APhoneInputSecond
        v-if="formPhone"
        ref="phone"
        v-model="formData.phone"
        :error="formErrors.phone"
      />
      <AInputSecond
        v-if="formMail"
        type="email"
        name="email"
        inputmode="email"
        placeholder="Почта"
      />
    </div>
    <div class="m-form__bottom">
      <ACheckboxSecond
        v-model="formData.personalDataAgree"
        class="m-form__privacy"
        name="personalDataAgree"
        initial
        required
        :label="FORM_POLICY_TEXT"
      />

      <AButtonMain
        type="submit"
        :disabled="!formData.personalDataAgree || isPending"
      >
        <span v-html="btn" />
      </AButtonMain>
    </div>

    <slot />
  </form>
</template>

<style lang="scss" scoped>
@import './MFormSecond.scss';
</style>
