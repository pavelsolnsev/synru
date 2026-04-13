<script setup lang="ts">
import type { Fonts } from '~/types';

interface Props {
  label?: string;
  placeholder?: string;
  placeholderClass?: Fonts;
  options?: Options;
  name?: string;
  otherOption?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: string;
}

type OptionPrimitive = string | number;

type OptionObject = {
  value: string | null;
  text: string;
  popular?: boolean;
  disabled?: boolean;
  action?: string;
  class?: string;
  icon?: { type: string; name: string }
};

type Options = Array<OptionPrimitive> | Array<OptionObject>;

const {
  label = '',
  placeholder = '',
  options = [],
  name = '',
  otherOption = false,
  disabled = false,
  error = false,
  size = '',
  placeholderClass = 'a-font_xl-m',
} = defineProps<Props>();

const modelValue = defineModel({
  type: [String, Number] as PropType<string | number | null>,
  default: '',
});

const emits = defineEmits<{
  (e: 'action', value: string): void
}>();

const otherOptionInputRef = ref<HTMLInputElement | null>(null);

const showOptions = ref(false);
const isChecked = ref(false);
const isShowOtherInput = ref(false);
const selectedOption = ref<OptionPrimitive | OptionObject | null>(initialSelectedOption(modelValue.value));

const selectedOptionText = computed(() => {
  if (!selectedOption.value) {
    return placeholder;
  }

  if (isOptionObject(selectedOption.value)) {
    return selectedOption.value.text;
  }

  return selectedOption.value;
});

function isOptionObject(option: OptionObject | OptionPrimitive): option is OptionObject {
  return (option as OptionObject).text !== undefined;
}

function onSelectClick() {
  showOptions.value = !showOptions.value;
};

function onOptionClick(option: OptionPrimitive | OptionObject) {
  if (isOptionObject(option) && option.disabled) return;

  if (isOptionObject(option) && option.action) {
    emits('action', option.action);
    showOptions.value = false;
    return;
  }

  selectedOption.value = option;
  isChecked.value = true;
  isShowOtherInput.value = false;
  modelValue.value = isOptionObject(option) ? option.value : option;
  showOptions.value = false;
};

function onOtherOptionClick() {
  isChecked.value = false;
  selectedOption.value = null;
  modelValue.value = placeholder;
  isShowOtherInput.value = true;
  nextTick(() => {
    if (otherOptionInputRef.value) {
      otherOptionInputRef.value.focus();
    }
  });
}

function onOutsideSelectClick() {
  showOptions.value = false;
};

function initialSelectedOption(initialModelValue: string | number | null) {
  if (!initialModelValue) return null;

  const findInitialOption = options.find((option) => {
    if (isOptionObject(option)) {
      return option.value === initialModelValue;
    }

    return option === initialModelValue;
  });

  return findInitialOption ?? null;
}

watch(modelValue, () => {
  if (modelValue.value === null) {
    selectedOption.value = null;
    isChecked.value = false;
  }
});
</script>

<template>
  <span
    class="a-uikit-select"
    :class="[
      error && 'error',
      disabled && '--disabled',
      size && `--size-${size}`,
    ]"
    :name
  >
    <!-- Заголовок -->
    <span
      v-if="label"
      class="a-uikit-select__label"
      v-html="label"
    />
    <!-- Выбранный option -->
    <span
      v-click-outside="onOutsideSelectClick"
      class="a-uikit-select__input"
      :class="{
        '_open': showOptions,
        '_checked': isChecked,
        '_other': isShowOtherInput
      }"
      @click="onSelectClick"
    >
      <!-- поле ввода своего option (доступен после клика на option "Другое") -->
      <input
        v-if="isShowOtherInput"
        ref="otherOptionInputRef"
        v-model="modelValue"
        class="a-font_xl-m"
        type="text"
        :placeholder
      >
      <!-- текст выбранного option -->
      <span
        class="a-uikit-select__placeholder"
        :class="placeholderClass"
        v-html="selectedOptionText"
      />
      <!-- выпадающий список options -->
      <span
        v-if="options.length"
        class="a-uikit-select__list a-font_m-m"
      >
        <span class="a-uikit-select__list-inner --selects">
          <span
            v-for="option in options"
            :key="typeof option === 'object' ? option.text : option"
            class="a-uikit-select__list-option"
            :class="[
              {
                '--popular': isOptionObject(option) && option.popular,
                '--disabled': isOptionObject(option) && option.disabled,
              },
              isOptionObject(option) && option.class
            ]"
            @click.stop="onOptionClick(option)"
          >
            <input
              type="radio"
            >
            <!-- текст option -->
            <span
              v-html="typeof option === 'object' ? option.text : option"
            />
            <ASvgMono
              v-if="isOptionObject(option) && option.icon"
              :type="option.icon.type"
              :name="option.icon.name"
            />
          </span>
          <!-- option "Другое" -->
          <span
            v-if="otherOption"
            class="a-uikit-select__list-option a-uikit-select__list-option_other"
            @click="onOtherOptionClick"
          >
            <input
              type="radio"
            >
            Другое
          </span>
        </span>
      </span>
      <span
        v-else
        class="a-uikit-select__list a-font_m-m"
      >
        Нет данных
      </span>
    </span>
  </span>
</template>

<style lang='scss' scoped>
@import './AUikitSelect.scss';
</style>
