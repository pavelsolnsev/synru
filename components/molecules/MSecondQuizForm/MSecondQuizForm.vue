<script setup lang="ts">
import type AInputSecond from '~/components/atoms/AInputSecond/AInputSecond.vue';
import type APhoneInputSecond from '~/components/atoms/APhoneInputSecond/APhoneInputSecond.vue';
import { ROUTES } from '~/constants';
import { PRIVACY } from '~/constants/documents';
type BgColor = 'red' | 'black' | 'white';

const {
  title = '',
  subtitle = '',
  btn = 'Отправить',
  actionParams = [],
  btnColor = 'red',
} = defineProps<{
  title?: string,
  subtitle?: string,
  btn?: string,
  btnColor?: BgColor,
  actionParams?: { param: string }[]
}>();

const FORM_POLICY_TEXT = `Даю согласие на&nbsp;обработку персональных данных и&nbsp;соглашаюсь <span class="m-quiz-form__privacy-link" style="white-space:nowrap;"><a href="${PRIVACY}" target="_blank">с&nbsp;политикой конфиденциальности.</a></span>`;

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

if (!formData.value.name) {
  formData.value.name = 'empty';
}

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
    class="m-quiz-form nolander"
    @submit.prevent="onSubmit"
    @click="onFormClick"
  >
    <div class="m-quiz-form__header">
      <input
        name="name"
        placeholder="Имя"
        type="hidden"
        value="empty"
      >
      <APhoneInputSecond
        ref="phone"
        v-model="formData.phone"
        size="lg"
        :error="formErrors.phone"
      />
      <AButtonMain
        size="lg"
        :disabled="!formData.personalDataAgree || isPending"
        :bg-color="btnColor"
      >
        <span v-html="btn" />
      </AButtonMain>
    </div>

    <div class="m-quiz-form__bottom">
      <ACheckboxSecond
        v-model="formData.personalDataAgree"
        class="m-quiz-form__privacy a-font_xs-r"
        name="personalDataAgree"
        initial
        required
        :label="FORM_POLICY_TEXT"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import './MSecondQuizForm.scss';
</style>
