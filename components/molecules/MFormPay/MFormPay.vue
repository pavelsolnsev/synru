<script setup lang="ts">
import Doc from '~/assets/images/global/dogovor.jpg';
import { FORM_POLICY_TEXT } from '~/constants/common';
import type { FormBgColor, InputMode } from '~/types';

interface FormPayInput {
  type: 'email'
    | 'hidden'
    | 'number'
    | 'tel'
    | 'text',
  label?: string,
  placeholder?: string,
  name: string,
  class?: string,
  required?: 'required',
  pattern?: string,
  inputmode?: InputMode,
  min?: number,
  step?: number | 'any',
}

interface Props {
  title?: string,
  titleClass?: string,
  subtitle?: string,
  subtitleClass?: string,
  bgColor?: FormBgColor,
  btn?: string,
  action?: string,
}

const {
  title = 'Заполните форму для&nbsp;оплаты',
  titleClass = 'a-font_h4',
  subtitle = '',
  subtitleClass = 'a-font_h5',
  bgColor = 'transparent',
  btn = 'Оплатить',
} = defineProps<Props>();

const buttonDisabled = ref(true);

const paymentFields: FormPayInput[] = [
  {
    type: 'text',
    placeholder: 'Фамилия',
    name: 'fio_f',
    required: 'required',
    inputmode: 'text' as InputMode,
  },
  {
    type: 'text',
    placeholder: 'Имя',
    name: 'fio_i',
    required: 'required',
    inputmode: 'text' as InputMode,
  },
  {
    type: 'text',
    placeholder: 'Отчество',
    name: 'fio_o',
    inputmode: 'text' as InputMode,
  },
  {
    type: 'email',
    placeholder: 'E-mail',
    name: 'email',
    class: '--email',
    required: 'required',
    inputmode: 'email' as InputMode,
  },
  {
    type: 'text',
    label: 'Номер договора <span class="tooltip" tabindex="-1">?</span>',
    placeholder: '2222',
    name: 'contract_num_num',
    class: '--extra-field --contract',
    required: 'required',
    pattern: '^[0-9/]+$',
  },
  {
    type: 'number',
    label: 'Сумма к&nbsp;оплате',
    placeholder: '0,00 ₽',
    name: 'sum',
    class: '--extra-field',
    required: 'required',
    min: 10,
    step: 'any',
  },
];

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalInline', {
    src: Doc,
  });
}

function updateSubmitButton(aggree: boolean | undefined) {
  buttonDisabled.value = aggree ? false : true;
}

function onFieldClick(e: Event) {
  e.preventDefault();

  const target = e.target as HTMLElement;

  if (target?.classList?.contains('tooltip')) openForm();
}
</script>

<template>
  <form
    id="pay"
    action="javascript:void(null);"
    :class="`m-form--bgColor-${bgColor}`"
    class="m-form nolander"
    name="paymentForm"
    x-data="{accept: true}"
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
      <template
        v-for="field in paymentFields"
        :key="field.name"
      >
        <ALabel
          v-if="field.label"
          :label="field.label"
          @click.stop="onFieldClick"
        >
          <AInput
            v-bind="field"
          />
        </ALabel>
        <AInput
          v-else
          v-bind="field"
        />
      </template>
    </div>

    <div class="m-form__bottom">
      <AButton
        type="submit"
        :disabled="buttonDisabled"
      >
        <span>{{ btn }}</span>
      </AButton>

      <ACheckbox
        :initial="false"
        :required="true"
        :label="FORM_POLICY_TEXT"
        class="m-form__privacy a-font_xs"
        name="personalDataAgree"
        @update:model-value="updateSubmitButton"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
@import './MFormPay.scss';
</style>
