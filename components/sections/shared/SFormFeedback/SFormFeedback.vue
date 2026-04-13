<script setup lang="ts">
import { KEYS } from '~/constants';
import { FORM_FIELDS } from './formFeedbackData';
import type { AdmissionsFilterData } from '~/types';
import { FORM_POLICY_TEXT } from '~/constants/common';
import { formFeedbackSchema, type FormFeedbackData } from '~~/utils/validators';
import { ROUTES } from '~/constants';
import type { BaseLanderData } from '~~/utils/generateLanderData';

interface FieldValue {
  value: string;
  class: string;
  placeholder: string;
  options?: string[];
}

const FILIAL_INPUT_NAME = 'feedback-filial';

const actionParams = [{ param: 'form=form-feedback' }, { param: 'grcampaign=e_mail_chain_vpo' }];

const formDataFeedback: Record<string, { question: string, answer: string }> = {};
const userAnswer = ref('');

const fieldValues = ref(
  FORM_FIELDS.reduce((acc, field) => {
    const initialFieldValue = {
      value: '',
      class: '',
      placeholder: field.placeholder,
    };

    acc[field.name] = initialFieldValue;
    return acc;
  }, {} as Record<string, FieldValue>),
);

const { data: regionCitiesData, execute: fetchRegionCities } = await useFetch('/api/cities/filter', {
  deep: false,
  watch: false,
  key: KEYS.REGIONS_FILTER_DATA,
  getCachedData(key, nuxtApp) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    return data ? data : undefined;
  },
  immediate: false,
});

const {
  formData,
  formErrors,
  onSubmit,
  isPending,
  onFormClick,
} = useLanderForm<FormFeedbackData>({
  initialFormData: {
    name: '',
    phone: '',
    personalDataAgree: false,
    comments: '',
    'feedback-status': '',
    'feedback-filial': '',
    'feedback-type': '',
    'feedback-theme': '',
    'feedback-text': '',
  },
  baseLanderData: { title: '', actionParams } satisfies BaseLanderData,
  formSchema: formFeedbackSchema,
  onSuccess: async () => {
    return await navigateTo(`${ROUTES.THANKS}?utm_source=thanks`, {
      external: true,
    });
  },
});

function onInputFocus(inputName: string) {
  const filialInputOptions = fieldValues.value[FILIAL_INPUT_NAME]?.options;

  if (inputName === FILIAL_INPUT_NAME && !Array.isArray(filialInputOptions)) {
    addFilialInputOptions();
  }
}

async function addFilialInputOptions() {
  await fetchRegionCities();

  const cities = formatRegionCities(regionCitiesData.value);

  fieldValues.value[FILIAL_INPUT_NAME].options = cities;
}

function formatRegionCities(regionCities: null | undefined | Record<string, AdmissionsFilterData>) {
  if (!regionCities) return [];

  const cities = new Set<string>();

  Object.keys(regionCities).forEach((key) => {
    const city = regionCities[key];
    const cityName = city.value;

    if (!cityName || cities.has(cityName)) return;

    cities.add(cityName);
  });

  return [...cities].sort();
}

function changedFormValue(e: Event) {
  if (!e.target) return;

  const target = e.target as HTMLInputElement | HTMLSelectElement;
  const fieldName = target.name;

  const question = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement ? target.placeholder : target.options[0]?.value;

  formDataFeedback[fieldName] = {
    answer: target.value,
    question,
  };

  userAnswer.value = '';

  for (const value of Object.values(formDataFeedback)) {
    userAnswer.value += `${value.question}: ${value.answer}; `;
  }
}

watch(userAnswer, () => {
  formData.value.comments = userAnswer.value;
});
</script>

<template>
  <form
    id="form-feedback"
    class="form-feedback nolander"
    @change="changedFormValue"
    @submit.prevent="onSubmit"
    @click="onFormClick"
  >
    <div class="form-feedback__wrap">
      <MCardText
        :tags="['30 дней']"
        title-class="a-font_h4"
        title="Уважаемый посетитель"
        text-class="a-font_s"
        text="Если у&nbsp;вас есть вопрос, предложение или&nbsp;жалоба, пожалуйста, заполните короткую форму и&nbsp;изложите суть обращения в&nbsp;текстовом поле ниже. Мы обязательно с&nbsp;ним ознакомимся и&nbsp;в&nbsp; 30&nbsp;-&nbsp;дневный срок ответим на&nbsp;указанный вами адрес электронной почты."
        tag-class="a-font_xs-m"
      />
      <input
        v-model="userAnswer"
        type="hidden"
        name="comments"
      >
      <template
        v-for="field in FORM_FIELDS"
        :key="field.name"
      >
        <component
          :is="field.component"
          v-model="formData[field.name as keyof typeof formData]"
          :class="fieldValues[field.name].class"
          :name="field.name"
          :placeholder="field.placeholder"
          :options="fieldValues[field.name].options ?? field.options ?? []"
          :error="formErrors[field.name as keyof typeof formErrors]"
          v-bind="field.attributes"
          @focus="onInputFocus(field.name)"
        />
      </template>

      <div class="a-font_xs">
        * все поля обязательны для заполнения
      </div>

      <div class="form-feedback__bottom">
        <AButton
          type="submit"
          :disabled="isPending"
        >
          <span>Отправить</span>
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
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import "./SFormFeedback.scss";
</style>
