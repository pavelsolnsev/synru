<script setup lang="ts">
import type { Fonts } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts
}

const {
  title = 'Рассчитайте кредит на образование',
  titleClass = 'a-font_h3',
} = defineProps<Props>();

const RUB_SYMBOL = '₽';

const TIME_RANGE_POINTS = [6, 24, 48, 84];
const TIME_RANGE_LABELS = ['6 месяцев', '2 года', '4 года', '7 лет'];
const TIME_INPUT_RANGE_MAX = 100;
const DEFAULT_TIME_INPUT_RANGE = 67;
const DEFAULT_TIME_INPUT_VALUE = '4 года';

const PRICE_RANGE_POINTS = [10000, 300000, 600000, 1200000, 5000000];
const PRICE_RANGE_LABELS = [`10 000 ${RUB_SYMBOL}`, `300 000 ${RUB_SYMBOL}`, `600 000${RUB_SYMBOL}`, `1 200 000 ${RUB_SYMBOL}`, `5 000 000 ${RUB_SYMBOL}`];
const PRICE_INPUT_RANGE_MAX = 1000;
const DEFAULT_PRICE_INPUT_RANGE = 776;
const DEFAULT_PRICE_INPUT_VALUE = `1600000 ${RUB_SYMBOL}`;

const timeRangeValue = ref(DEFAULT_TIME_INPUT_RANGE);
const timeInputValue = ref(DEFAULT_TIME_INPUT_VALUE);

const priceRangeValue = ref(DEFAULT_PRICE_INPUT_RANGE);
const priceInputValue = ref(DEFAULT_PRICE_INPUT_VALUE);

const isFocusTimeInput = ref(false);
const isFocusPriceInput = ref(false);

const months = computed(() => interpolateRange(TIME_INPUT_RANGE_MAX, TIME_RANGE_POINTS, timeRangeValue.value));
const price = computed(() => interpolateRange(PRICE_INPUT_RANGE_MAX, PRICE_RANGE_POINTS, priceRangeValue.value));

watch(isFocusTimeInput, () => {
  timeInputValue.value = isFocusTimeInput.value
    ? String(months.value)
    : monthToYears(months.value);
});

watch(isFocusPriceInput, () => {
  if (isFocusPriceInput.value) {
    priceInputValue.value = priceInputValue.value.split(' ')[0];
    return;
  }
  if (priceInputValue.value.includes(RUB_SYMBOL)) return;
  priceInputValue.value = `${priceInputValue.value} ${RUB_SYMBOL}`;
});

function onInputKeyPress(event: KeyboardEvent) {
  const regexOnlyNumber = /[0-9]/;

  if (!regexOnlyNumber.test(event.key)) event.preventDefault();
}

function changedTimeInputValue(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const inputValue = +inputElement.value;

  const maxInputValue = TIME_RANGE_POINTS[TIME_RANGE_POINTS.length - 1];
  const minInputValue = TIME_RANGE_POINTS[0];

  const clampedValue = Math.max(minInputValue, Math.min(inputValue, maxInputValue));

  timeInputValue.value = String(clampedValue);
  timeRangeValue.value = interpolateInput(TIME_INPUT_RANGE_MAX, TIME_RANGE_POINTS, clampedValue);
}

function monthToYears(months: number) {
  const getYears = Math.floor(months / 12);
  const getMonths = months % 12;

  const yearPart = getYears > 0 ? declensionOfNumber(getYears, ['год', 'года', 'лет'], true) : '';
  const monthPart = getMonths > 0 ? declensionOfNumber(getMonths, ['месяц', 'месяца', 'месяцев'], true) : '';

  return [yearPart, monthPart].filter(Boolean).join(' ');
}

function changedPriceInputValue(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const price = +inputElement.value;

  const maxPriceValue = PRICE_RANGE_POINTS[PRICE_RANGE_POINTS.length - 1];
  const minPriceValue = PRICE_RANGE_POINTS[0];

  const clampedValue = Math.max(minPriceValue, Math.min(price, maxPriceValue));

  priceInputValue.value = String(clampedValue);
  priceRangeValue.value = interpolateInput(PRICE_INPUT_RANGE_MAX, PRICE_RANGE_POINTS, clampedValue);
}

function interpolateRange(steps: number, rangePoints: number[], value: number) {
  // Находим индекс диапазона, к которому относится значение
  let startIndex = 0;
  for (let i = 0; i < rangePoints.length - 1; i++) {
    const lowerBound = (i * (steps / (rangePoints.length - 1)));
    const upperBound = ((i + 1) * (steps / (rangePoints.length - 1)));

    if (value >= lowerBound && value <= upperBound) {
      startIndex = i;
      break;
    }
  }

  // Локальная нормализация внутри текущего диапазона
  const localMin = startIndex * (steps / (rangePoints.length - 1));
  const localMax = (startIndex + 1) * (steps / (rangePoints.length - 1));

  // Нормализуем значение в диапазоне [0, 1]
  const rangeValue = (value - localMin) / (localMax - localMin);

  // Линейная интерполяция
  return Math.round(
    rangePoints[startIndex] + rangeValue * (rangePoints[startIndex + 1] - rangePoints[startIndex]),
  );
}

function interpolateInput(steps: number, rangePoints: number[], value: number) {
  // Находим, к какому диапазону относится значение
  let startIndex = 0;
  for (let i = 0; i < rangePoints.length - 1; i++) {
    if (value >= rangePoints[i] && value <= rangePoints[i + 1]) {
      startIndex = i;
      break;
    }
  }

  // Определяем начальное и конечное значения диапазона
  const rangeStart = rangePoints[startIndex];
  const rangeEnd = rangePoints[startIndex + 1];

  // Нормализуем значение внутри текущего диапазона [0, 1]
  const proportion = (value - rangeStart) / (rangeEnd - rangeStart);

  // Вычисляем минимальные и максимальные шаги для текущего диапазона
  const stepMin = startIndex * (steps / (rangePoints.length - 1));
  const stepMax = (startIndex + 1) * (steps / (rangePoints.length - 1));

  // Линейная интерполяция для получения окончательного интерполированного значения
  return Math.round(stepMin + proportion * (stepMax - stepMin));
}
</script>

<template>
  <MSection
    class="s-calc"
    :title
    :title-class
  >
    <div class="s-calc__container">
      <div class="s-calc__form">
        <div class="s-calc__input --time">
          <p class="a-font_s-m s-calc__input-label">
            Какой срок обучения в кредит
          </p>
          <div class="s-calc__input-wrap">
            <p class="a-font_l-m s-calc__input-placeholder">
              Введите дату
            </p>
            <input
              type="text"
              class="a-font_l-m"
              :value="timeInputValue"
              @keypress="onInputKeyPress"
              @input="changedTimeInputValue"
              @focus="isFocusTimeInput = true"
              @blur="isFocusTimeInput = false"
            >
            <input
              v-model="timeRangeValue"
              :max="TIME_INPUT_RANGE_MAX"
              type="range"
              step="1"
              min="0"
              @input="timeInputValue = monthToYears(months)"
            >
          </div>
          <div class="s-calc__input-info a-font_xs">
            <span
              v-for="label in TIME_RANGE_LABELS"
              :key="label"
            >
              {{ label }}
            </span>
          </div>
        </div>

        <hr>

        <div class="s-calc__input --price">
          <p class="a-font_s-m s-calc__input-label">
            Сколько стоит обучение
          </p>
          <div class="s-calc__input-wrap">
            <p class="a-font_l-m s-calc__input-placeholder">
              Введите свою сумму
            </p>
            <input
              type="text"
              class="a-font_l-m"
              :value="priceInputValue"
              @keypress="onInputKeyPress"
              @input="changedPriceInputValue"
              @focus="isFocusPriceInput = true"
              @blur="isFocusPriceInput = false"
            >
            <input
              v-model="priceRangeValue"
              :max="PRICE_INPUT_RANGE_MAX"
              type="range"
              step="1"
              min="0"
              @input="priceInputValue = `${price} ${RUB_SYMBOL}`"
            >
          </div>
          <div class="s-calc__input-info a-font_xs">
            <span
              v-for="label in PRICE_RANGE_LABELS"
              :key="label"
            >
              {{ label }}
            </span>
          </div>
        </div>
      </div>
      <SCalcInfo
        :price="Number(priceInputValue.split(' ')[0])"
        :months
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCalc.scss';
</style>
