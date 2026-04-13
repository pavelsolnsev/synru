<script setup lang="ts">
import { PRIVACY } from '~/constants/documents';
import APhoneInput from '~/components/atoms/APhoneInput/APhoneInput.vue';

type BgColor = 'red' | 'black' | 'white';

const {
  title = '',
  subtitle = '',
  btn = 'Отправить',
  actionParams = [],
  btnColor = 'red',
  routeName = '',
  theme = 'white',
} = defineProps<{
  title?: string,
  subtitle?: string,
  btn?: string,
  btnColor?: BgColor,
  actionParams?: { param: string }[],
  routeName?: string;
  theme?: 'white' | 'dark';
}>();

const FORM_POLICY_TEXT = `Даю согласие на&nbsp;обработку<br> персональных данных и&nbsp;соглашаюсь <span class="m-quiz-form__privacy-link" style="white-space:nowrap;"><a href="${PRIVACY}" target="_blank">с&nbsp;политикой конфиденциальности.</a></span>`;

const storedName = window?.localStorage.getItem('name');

const {
  formData,
  formErrors,
  onSubmit,
  isPending,
  onFormClick,
} = useLanderForm({
  initialFormData: {
    name: storedName || 'empty',
    phone: '',
    personalDataAgree: false,
  },
  baseLanderData: { title, subtitle, actionParams } satisfies BaseLanderData,
  formSchema,
  onSuccess: async () => {
    const path = getNavigationPath({ routeName });
    return await navigateTo(path, { external: true });
  },
});

const phoneInput = useTemplateRef<InstanceType<typeof APhoneInput>>('phone');
const agreeKey = ref<number>(1);

watch(formErrors, () => {
  if (formErrors.value.phone && phoneInput.value) {
    phoneInput.value.getFocus();
    return;
  }
});

watch(() => formData.value.personalDataAgree, () => {
  agreeKey.value += agreeKey.value;
});

watch(() => formData.value.phone, () => {
  agreeKey.value += agreeKey.value;
  formData.value.personalDataAgree = true;
});
</script>

<template>
  <form
    class="m-quiz-form nolander"
    :class="`m-quiz-form_${theme}`"
    @submit.prevent="onSubmit"
    @click="onFormClick"
  >
    <div class="m-quiz-form__header">
      <input
        v-model="formData.name"
        name="name"
        placeholder="Имя"
        type="hidden"
      >
      <APhoneInput
        ref="phone"
        v-model="formData.phone"
        size="lg"
        :error="formErrors.phone"
      />
      <AButton
        size="lg"
        :disabled="isPending"
        :bg-color="btnColor"
      >
        <span v-html="btn" />
      </AButton>
    </div>

    <div class="m-quiz-form__bottom">
      <ACheckbox
        :key="agreeKey"
        v-model="formData.personalDataAgree"
        :initial="formData.personalDataAgree"
        :required="false"
        :label="FORM_POLICY_TEXT"
        class="m-quiz-form__privacy a-font_xs-r"
        name="personalDataAgree"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import './MQuizForm.scss';
</style>
