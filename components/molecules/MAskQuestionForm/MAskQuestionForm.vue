<script setup lang="ts">
import { FORM_POLICY_TEXT } from '~/constants/common';
import type { FormBgColor } from '~/types';
import { formAskQuestionSchema } from '~~/utils/validators';
import { ROUTES } from '~/constants';
import APhoneInput from '~/components/atoms/APhoneInput/APhoneInput.vue';
import type { BaseLanderData } from '~~/utils/generateLanderData';
import type ATextarea from '~/components/atoms/ATextarea/ATextarea.vue';

const {
  title = 'Заполните форму и&nbsp;наш менеджер свяжется с&nbsp;вами',
  titleClass = 'a-font_h4',
  subtitle = '',
  subtitleClass = 'a-font_h5',
  bgColor = 'transparent',
  btn = 'Подать заявку',
  btnBgColor = 'red',
  actionParams = [],
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
  formTextarea?: boolean,
  btn?: string,
  btnBgColor?: 'red' | 'black' | 'white',
  actionParams?: { param: string }[],
  routeName?: string;
}>();

const {
  formData,
  formErrors,
  onSubmit,
  isPending,
  onFormClick,
} = useLanderForm<FormAskQuestionData>({
  initialFormData: {
    name: '',
    phone: '',
    personalDataAgree: false,
    comments: '',
  },
  baseLanderData: { title, subtitle, actionParams } satisfies BaseLanderData,
  formSchema: formAskQuestionSchema,
  onSuccess: async () => {
    const path = getNavigationPath({ routeName });
    const external = path.startsWith('http') ? true : false;
    return await navigateTo(path, { external });
  },
});

const phoneInput = useTemplateRef<InstanceType<typeof APhoneInput>>('phone');
const commentsInput = useTemplateRef<InstanceType<typeof ATextarea>>('comments');

watch(formErrors, () => {
  if (formErrors.value.phone && phoneInput.value) {
    phoneInput.value.getFocus();
    return;
  }
  if (formErrors.value.comments && commentsInput.value) {
    commentsInput.value.getFocus();
    return;
  }
});

tryOnMounted(() => {
  if (!formData.value.name) {
    formData.value.name = 'empty';
  }
});
</script>

<template>
  <form
    :class="`m-form--bgColor-${bgColor}`"
    class="m-form"
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
        v-model="formData.name"
        name="name"
        placeholder="Имя"
        type="hidden"
      >
      <APhoneInput
        ref="phone"
        v-model="formData.phone"
        :error="formErrors.phone"
      />
      <ATextarea
        ref="comments"
        v-model="formData.comments"
        type="text"
        name="comments"
        inputmode="text"
        placeholder="Задайте ваш вопрос"
        :error="formErrors.comments"
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
  </form>
</template>

<style lang="scss" scoped>
@import './MAskQuestionForm.scss';
</style>
