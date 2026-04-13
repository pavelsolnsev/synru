<script setup lang="ts">
import type { BaseLanderData } from '~/utils/generateLanderData';
import { formSchema } from '~/utils/validators';
import APhoneInput from '~/components/atoms/APhoneInput/APhoneInput.vue';
import { FORM_POLICY_TEXT } from '~/constants/common';

const {
  routeName = '',
  direction = '',
} = defineProps<{
  direction: string
  routeName?: string
}>();

const backgroundImages = {
  imageLG: '/img/mti/modal_bg_lg.webp',
  imageMD: '/img/mti/modal_bg_md.webp',
  imageSM: '/img/mti/modal_bg_sm.webp',
};

const title = computed(() => {
  return `Выберите уровень образования и&nbsp;скачайте программы МТИ по&nbsp;направлению «${direction}»`;
});

const levels = ['Колледж', 'Бакалавриат', 'Специалитет'];

const chosenLevel = shallowRef(levels[0]);

function changeLevel(level: string) {
  chosenLevel.value = level;
}

const comment = computed(() => {
  return `Направление: ${direction}, Уровень образования ${chosenLevel.value}`;
});

const storedName = window?.localStorage.getItem('name');

const actionParams = [{ param: 'form=postupi_short_mti ' }];

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
    comments: comment.value,
  },
  baseLanderData: { title: title.value, actionParams } satisfies BaseLanderData,
  formSchema,
  onSuccess: async () => {
    const path = getNavigationPath({ routeName });
    const external = path.startsWith('http') ? true : false;
    return await navigateTo(path, { external });
  },
});

const phoneInput = useTemplateRef<InstanceType<typeof APhoneInput>>('phone');

watch(formErrors, () => {
  if (formErrors.value.phone && phoneInput.value) {
    phoneInput.value.getFocus();
    return;
  }
});

watch(comment, (newComment) => {
  formData.value.comments = newComment;
});
</script>

<template>
  <div class="m-modal-mti-direction">
    <ABgImages
      v-bind="backgroundImages"
      class="m-modal-mti-direction__bg"
    />
    <div class="m-modal-mti-direction__top">
      <div
        class="m-modal-mti-direction__title a-font_h5"
        v-html="title"
      />
      <div class="m-modal-mti-direction__levels">
        <ACheckboxAnimated
          v-for="level in levels"
          :key="level"
          :label="level"
          type="radio"
          name="education-level"
          :initial="level === chosenLevel"
          :model-value="level === chosenLevel"
          @update:model-value="(val) => val && changeLevel(level)"
        />
      </div>
      <div class="m-modal-mti-direction__subtitle a-font_l-m">Презентацию о программах обучения и условиях поступления<br>вы получите по СМС и в Telegram</div>
    </div>
    <form
      class="m-modal-mti-direction__form"
      @submit.prevent="onSubmit"
      @click="onFormClick"
    >
      <div class="wrapper">
        <APhoneInput
          ref="phone"
          v-model="formData.phone"
          class="m-modal-mti-direction__form-input"
          :error="formErrors.phone"
        />
        <AButton
          type="submit"
          class="m-modal-mti-direction__form-submit"
          :disabled="isPending"
        >
          <span>Скачать</span>
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
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import './MModalMtiDirection.scss';
</style>
