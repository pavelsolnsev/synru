<script lang="ts" setup>
import { FetchError } from 'ofetch';
import { ROUTES } from '~/constants';

interface RegisterData {
  name: string,
  email: string,
  pretty_phone: string,
  phone: string,
  captcha: string,
}

const {
  title,
  classTitle,
  formData,
} = defineProps<{
  title?: string;
  classTitle?: string;
  formData?: RegisterData;
}>();

const CAPTCHA_ELEMENT_ID = 'captcha-code';
const isCodeModalOpen = defineModel<boolean>('isOpen', { required: true });
const verificationType = defineModel<'sms' | 'email' | undefined>('verificationType', { required: true });

const token = shallowRef();
const pendingAction = shallowRef<'email' | 'phone'>();
const isSuccess = shallowRef(false);
const serverErrors = shallowRef<Record<string, string[]>>({});
const disabledBtnResend = computed(() => timer.value > 0);
const isPending = shallowRef(false);
const { initCaptcha, executeCaptcha } = useSmartCaptcha();

const {
  code,
  inputs,
  inputsRefs,
  timer,
  onInput,
  handleKeyDown,
  handlePaste,
  resetTimer,
} = useLKRegistrationBase({ isCodeModalOpen });

async function submitRegistration(code: string) {
  isPending.value = true;

  const codeData = {
    code: Number(code),
  };

  const data = { ...formData, ...codeData };

  try {
    const response = await $fetch<{ success: boolean }>('/api/lk/register', {
      method: 'POST',
      body: data,
    });

    if (response.success) {
      isSuccess.value = true;

      navigateTo(ROUTES.LK, {
        external: true,
        open: {
          target: '_blank',
        },
      });
    }
    isPending.value = false;
  } catch (error) {
    if (!(error instanceof FetchError)) {
      console.error(error);
      return;
    }

    serverErrors.value = error?.data?.data?.errors;
    isPending.value = false;
  }
}

function onCaptchaSuccess(captchaToken: string) {
  token.value = captchaToken;

  let data = { ...formData };
  if (token.value && token.value.length) {
    const newCaptha = {
      captcha: token.value,
    };

    data = { ...formData, ...newCaptha };
  }

  if (pendingAction.value === 'phone') {
    sendConfirmationCode(data, {
      onSuccess: () => {
        verificationType.value = 'sms';
      },
      onError: onSendConfirmationError,
    });
  } else {
    resetTimer();

    sendConfirmationCode(data, {
      type: 'email',
      onSuccess: () => {
        verificationType.value = 'email';
      },
      onError: onSendConfirmationError,
    });
  }

  resetTimer();
  pendingAction.value = undefined;
}

function onSendConfirmationError(error: unknown) {
  if (!(error instanceof FetchError)) {
    console.error(error);
    return;
  }

  if (error.statusCode == 429) {
    serverErrors.value = { phone: ['Слишком много запросов, повторите позже'] };
  } else {
    serverErrors.value = error.message || error.data?.data.errors;
  }
}

function checkCaptcha(type: 'email' | 'phone') {
  pendingAction.value = type;

  if (token.value) {
    onCaptchaSuccess(token.value);
  } else {
    executeCaptcha();
  }
}

watch(code, (newCode) => {
  if (newCode.every((digit: string) => digit.length === 1)) {
    submitRegistration(code.value.join(''));
  }
}, { deep: true });

watch(isCodeModalOpen, () => {
  serverErrors.value = {};
});

onMounted(() => {
  initCaptcha(CAPTCHA_ELEMENT_ID, onCaptchaSuccess);
});
</script>

<template>
  <div
    v-if="isSuccess"
    class="m-lk-registration"
  >
    <h3
      class="m-lk-registration__title"
      :class="classTitle"
      v-html="title"
    />
    <h4 class="m-lk-registration__subtitle a-font_h4">Вы зарегистрированы</h4>
    <p class="m-lk-registration__send-code a-font_m">
      Вы можете войти в&nbsp;личный кабинет <br>с&nbsp;помощью номера телефона или&nbsp;логина и&nbsp;пароля,
      <br>которые мы отправили вам на&nbsp;почту
    </p>
  </div>


  <form
    v-if="!isSuccess"
    class="m-lk-registration nolander"
  >
    <h3
      class="m-lk-registration__title"
      :class="classTitle"
      v-html="title"
    />
    <h4 class="m-lk-registration__subtitle a-font_h4">Подтвердите доступ</h4>

    <p class="m-lk-registration__send-code a-font_m">
      Мы отправили код на
      <template v-if="verificationType === 'sms'">
        номер
        <span>{{ formData?.pretty_phone }}</span>
      </template>
      <template v-if="verificationType === 'email'">
        почту
        <span>{{ formData?.email }}</span>
      </template>
    </p>

    <div class="m-lk-registration__inner">
      <AInput
        v-for="(digit, index) in inputs.slice(0, code.length)"
        :key="index"
        ref="inputsRefs"
        v-model="digit.value"
        maxlength="1"
        @input="onInput($event, index)"
        @keydown="handleKeyDown($event, index)"
        @paste="handlePaste"
      />
    </div>

    <div
      v-if="serverErrors?.code"
      class="m-lk-registration__errors a-font_xs"
    >
      {{ serverErrors?.code?.join(', ') }}
    </div>

    <div :id="CAPTCHA_ELEMENT_ID" />

    <AButton
      :disabled="disabledBtnResend"
      @click.prevent="checkCaptcha('phone')"
    >
      Запросить код повторно &nbsp;
      <span v-if="timer">({{ timer }})</span>
    </AButton>

    <p
      class="m-lk-registration__email a-font_m"
      @click="checkCaptcha('email')"
    >
      отправить код на почту
    </p>

    <ALoader
      v-if="isPending"
    />
  </form>
</template>

<style lang="scss" scoped>
@import './MLKregistration.scss';
</style>
