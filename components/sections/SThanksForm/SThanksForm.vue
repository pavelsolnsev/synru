<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { FetchError } from 'ofetch';
import { ROUTES } from '~/constants';
import { FORM_POLICY_TEXT } from '~/constants/common';
import AInput from '~/components/atoms/AInput/AInput.vue';
import APhoneInput from '~/components/atoms/APhoneInput/APhoneInput.vue';
import { formSchemaWithEmail, type FormDataWithEmail } from '~/utils/validators';

interface RegisterData {
  name: string,
  email: string,
  pretty_phone: string,
  phone: string,
  captcha: string,
}

const CAPTCHA_ELEMENT_ID = 'captcha-form';
const token = shallowRef('');
const { initCaptcha, executeCaptcha } = useSmartCaptcha();
const formatedFormData = shallowRef<RegisterData>();
const isCodeModalOpen = shallowRef(false);
const verificationType = shallowRef<'sms' | 'email'>();
const serverErrors = shallowRef<Record<string, string[]>>({});

const nameErrorLabel = computed(() => serverErrors.value?.name ? serverErrors.value?.name?.join(', ') : '');
const phoneErrorLabel = computed(() => serverErrors.value?.phone ? serverErrors.value?.phone?.join(', ') : '');
const emailErrorLabel = computed(() => serverErrors.value?.email ? serverErrors.value?.email?.join(', ') : '');

const formContent = {
  title: 'Регистрация в личном <br>кабинете абитуриента',
  classTitle: 'a-font_h3',
  subtitle: '',
  imageSm: synergyApi('uploads/content/s-thanks-banner/thanks-form-sm.webp'),
  imageMd: synergyApi('uploads/content/s-thanks-banner/thanks-form-md.webp'),
  imageLg: synergyApi('uploads/content/s-thanks-banner/thanks-form-lg.webp'),
  actionParams: [
    { param: 'form=thanks-lka' },
  ],
  btnText: 'Зарегистрироваться',
};

const title = formContent.title;
const subtitle = formContent.subtitle;
const actionParams = formContent.actionParams;

const {
  formData,
  formErrors,
  onSubmit,
  isPending,
  onFormClick,
} = useLanderForm<FormDataWithEmail>({
  initialFormData: {
    name: '',
    phone: '',
    email: '',
    personalDataAgree: true,
  },
  baseLanderData: { title, subtitle, actionParams } satisfies BaseLanderData,
  formSchema: formSchemaWithEmail,
  onSuccess: async () => {
    if (token.value) {
      onCaptchaSuccess(token.value);
    } else {
      executeCaptcha();
    }
  },
});

const nameInput = useTemplateRef<InstanceType<typeof AInput>>('name');
const phoneInput = useTemplateRef<InstanceType<typeof APhoneInput>>('phone');
const emailInput = useTemplateRef<InstanceType<typeof AInput>>('email');

function onCaptchaSuccess(captchaToken: string) {
  token.value = captchaToken;

  const data = {
    name: formData?.value.name?.trim(),
    email: formData?.value.email?.trim(),
    pretty_phone: formData?.value.phone,
    phone: formData?.value.phone?.replace(/[^0-9]/g, ''),
    captcha: token.value,
  };

  submitPhone(data);
}

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

onMounted(() => {
  initCaptcha(CAPTCHA_ELEMENT_ID, onCaptchaSuccess);
});

async function submitPhone(data: RegisterData) {
  isPending.value = true;

  await sendConfirmationCode(data as unknown as Record<string, string>, {
    onSuccess: () => {
      verificationType.value = 'sms';
      isCodeModalOpen.value = true;
      serverErrors.value = {};
      formErrors.value = {};
      formatedFormData.value = data;
    },
    onError: (error) => {
      onSendConfirmationError(error);

      if (error instanceof FetchError && error.statusCode == 503) {
        sendCodeEmail(data);
      }
    },
  });

  isPending.value = false;
}

async function sendCodeEmail(data: RegisterData) {
  isPending.value = true;

  await sendConfirmationCode(data as unknown as Record<string, string>, {
    type: 'email',
    onSuccess: () => {
      verificationType.value = 'email';
      isCodeModalOpen.value = true;
      serverErrors.value = {};
      formErrors.value = {};
    },
    onError: onSendConfirmationError,
  });

  isPending.value = false;
}

function onSendConfirmationError(error: unknown) {
  if (!(error instanceof FetchError)) {
    console.error(error);
    return;
  }

  if (error.statusCode == 429) {
    serverErrors.value = { phone: ['Слишком много запросов, повторите позже'] };
  } else {
    serverErrors.value = error?.data?.data?.errors;
  }
}
</script>

<template>
  <div :id="CAPTCHA_ELEMENT_ID" />

  <MSection class="s-form s-thanks-form">
    <div class="s-form__wrap">
      <div
        :class="[
          's-form__content',
          's-form__content--bgColor-white',
        ]"
      >
        <picture class="s-form__image">
          <source
            media="(min-width: 1200px)"
            :srcset="formContent.imageLg"
          >
          <source
            media="(min-width: 768px)"
            :srcset="formContent.imageMd"
          >
          <source :srcset="formContent.imageSm">
          <AImg
            :src="formContent.imageSm"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>

      <div class="s-form__form">
        <MLKregistration
          v-if="formatedFormData"
          v-model:is-open="isCodeModalOpen"
          v-model:verification-type="verificationType"
          :title="formContent.title"
          :class-title="formContent.classTitle"
          :form-data="formatedFormData"
        />

        <form
          v-else
          class="m-form m-form--bgColor-white nolander"
          @submit.prevent="onSubmit"
          @click="onFormClick"
        >
          <div
            class="m-form__title"
            :class="formContent.classTitle"
            v-html="formContent.title"
          />
          <div
            v-if="serverErrors"
            class="--errors a-font_m"
          >
            <span
              v-for="(txt, key) in serverErrors"
              :key="key"
            >
              <span v-if="key == 'email'">
                Пользователь с&nbsp;такой почтой уже есть в&nbsp;системе.
                <NuxtLink
                  :to="ROUTES.LK"
                  target="_blank"
                >
                  Войдите по&nbsp;логину и&nbsp;паролю
                </NuxtLink>
              </span>
              <span v-else>
                {{ txt.join(', ') }}
              </span>
            </span>
          </div>

          <div class="m-form__content">
            <AInput
              ref="name"
              v-model="formData.name"
              name="name"
              placeholder="Имя"
              :error="formErrors.name || nameErrorLabel"
            />
            <APhoneInput
              ref="phone"
              v-model="formData.phone"
              :error="formErrors.phone || phoneErrorLabel"
            />
            <AInput
              ref="email"
              v-model="formData.email"
              type="email"
              name="email"
              inputmode="email"
              placeholder="Почта"
              :error="formErrors.email || emailErrorLabel"
            />
          </div>
          <div class="m-form__bottom">
            <AButton
              type="submit"
              :disabled="!formData.personalDataAgree || isPending"
              bg-color="red"
            >
              <span>{{ formContent.btnText }}</span>
            </AButton>

            <ACheckbox
              v-model="formData.personalDataAgree"
              class="m-form__privacy a-font_xs"
              name="personalDataAgree"
              initial
              required
              :label="FORM_POLICY_TEXT"
            />
          </div>

          <ALoader
            v-if="isPending"
          />
        </form>
      </div>
    </div>
  </MSection>
</template>


<style lang="scss" scoped>
@import '../../molecules/MForm/MForm.scss';
@import "../SForm/SForm.scss";
@import './SThanksForm.scss';
</style>
