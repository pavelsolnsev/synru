<script setup lang="ts">
import AInput from '~/components/atoms/AInput/AInput.vue';
import APhoneInput from '~/components/atoms/APhoneInput/APhoneInput.vue';
import { FORM_POLICY_TEXT_CERT } from '~/constants/common';
import type { BaseLanderData } from '~/utils/generateLanderData';
import {
  type FormDataWithEmail,
  formSchemaWithEmail,
} from '~/utils/validators';

interface Props {
  title: string
  certAmount: string
  certCode: string
  actionParams: { param: string }[]
  showCertFields: boolean
}

const { openModal } = useModalStore();

const { certCode, actionParams, title, showCertFields = true } = defineProps<Props>();

const {
  formData,
  formErrors,
  isPending,
  onSubmit,
  onFormClick,
} = useLanderForm<FormDataWithEmail>({
  initialFormData: {
    name: '',
    phone: '',
    email: '',
    personalDataAgree: false,
  },
  baseLanderData: { title, actionParams } satisfies BaseLanderData,
  formSchema: formSchemaWithEmail,
  onSuccess: () => {
    return showPopUp();
  },
});

const localCode = shallowRef('');
const localCertError = computed(() => localCode.value !== certCode);
const localCertSSum = computed(() => localCertError.value ? '0,00' : '7 000,00');

function onSubmitCustom () {
  if (!showCertFields || !localCertError.value) onSubmit();
}

function showPopUp() {
  openModal('ACertSuccess');
}
</script>

<template>
  <div class="m-form-activate">
    <h2 class="m-form-activate__title">{{ title }}</h2>

    <form
      class="m-form-activate__form m-form"
      @submit.prevent="onSubmitCustom"
      @click="onFormClick"
    >
      <AInput
        ref="name"
        v-model="formData.name"
        class="m-form-activate__custom-input m-form-activate__name"
        name="name"
        placeholder="Имя"
        :error="formErrors.name"
        size="md"
      />

      <APhoneInput
        ref="phone"
        v-model="formData.phone"
        class="m-form-activate__custom-input m-form-activate__phone"
        size="md"
        :error="formErrors.phone"
      />

      <AInput
        ref="email"
        v-model="formData.email"
        type="email"
        name="email"
        class="m-form-activate__custom-input m-form-activate__email"
        inputmode="email"
        placeholder="Почта"
        size="md"
      />

      <div
        v-if="showCertFields"
        class="m-form-activate__wrapper"
      >
        <div class="m-form-activate__item">
          <div class="m-form-activate__custom-label">
            Номер сертификата
          </div>

          <AInput
            ref="code"
            v-model="localCode"
            class="m-form-activate__custom-input"
            name="code"
            placeholder="Код активации"
            size="md"
          />
        </div>
        <div class="m-form-activate__item">
          <div class="m-form-activate__custom-label">
            Сумма сертификата
          </div>

          <div class="m-form-activate__amount">{{ localCertSSum }}  <span class="m-form-activate__ruble">Р</span></div>
        </div>
      </div>

      <AButton
        type="submit"
        class="m-form-activate__submit"
        :disabled="isPending"
        size="md"
      >
        <span>Активировать</span>
      </AButton>

      <ACheckbox
        v-model="formData.personalDataAgree"
        :label="FORM_POLICY_TEXT_CERT"
        :initial="formData.personalDataAgree"
        class="a-font_xs m-form-activate__checkbox"
        name="personalDataAgree"
      />
    </form>
  </div>
</template>

<style lang="scss">
@import './MFormCertActivate.scss';
</style>
