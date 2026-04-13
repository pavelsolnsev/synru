<script setup lang="ts">
import { FORM_POLICY_TEXT } from '~/constants/common';
import type { FormBgColor } from '~/types';
import { ROUTES } from '~/constants';
import AInput from '~/components/atoms/AInput/AInput.vue';
import APhoneInput from '~/components/atoms/APhoneInput/APhoneInput.vue';

const {
  title = 'Заполните форму и&nbsp;наш менеджер свяжется с&nbsp;вами',
  titleClass = 'a-font_h4',
  subtitle = '',
  subtitleClass = 'a-font_h5',
  bgColor = 'transparent',
  formName = true,
  formPhone = true,
  formMail = false,
  btn = 'Подать заявку',
  btnBgColor = 'red',
  actionParams = [],
  redirectPath = '',
  routeName = '',
} = defineProps<{
  title?: string,
  titleClass?: string,
  subtitle?: string,
  subtitleClass?: string,
  bgColor?: FormBgColor,
  formName?: boolean,
  formPhone?: boolean,
  formMail?: boolean,
  btn?: string,
  btnBgColor?: 'red' | 'black' | 'white',
  actionParams?: { param: string }[],
  redirectPath?: string,
  routeName?: string;
  showErrors?: boolean;
}>();

watch(() => actionParams, () => {
  generate({ title, subtitle, actionParams });
});

const storedName = window?.localStorage.getItem('name');

const {
  formData,
  formErrors,
  onSubmit,
  isPending,
  onFormClick,
  generate,
} = useLanderForm({
  initialFormData: {
    name: !formName ? (storedName || 'empty') : (storedName || ''),
    phone: '',
    personalDataAgree: false,
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

    if (redirectPath) {
      return await navigateTo(redirectPath, { external: true });
    }

    const path = getNavigationPath({ routeName });

    return await navigateTo(path, {
      external: true,
    });
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

function submitForm() {
  onSubmit();
}

defineExpose({
  submitForm,
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
        :value="formData.name"
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
        ref="name"
        v-model="formData.name"
        name="name"
        placeholder="Имя"
        :error="formErrors.name"
        :show-errors
      />
      <APhoneInput
        v-if="formPhone"
        ref="phone"
        v-model="formData.phone"
        :error="formErrors.phone"
        :show-errors
      />
      <AInput
        v-if="formMail"
        type="email"
        name="email"
        inputmode="email"
        placeholder="Почта"
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
        :label="FORM_POLICY_TEXT"
        :required="false"
        class="m-form__privacy a-font_xs"
        name="personalDataAgree"
      />
    </div>

    <slot />
  </form>
</template>

<style lang="scss" scoped>
@import './MForm.scss';
</style>
