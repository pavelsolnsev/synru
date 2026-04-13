<script setup lang="ts">
interface Props {
  price: number;
  months: number;
}

const {
  price, // Стоимость обучения
  months, // Срок обучения в месяцах
} = defineProps<Props>();

const creditInfo = computed(() => {
  const years = months > 12 ? Math.floor(months / 12) : 1; // Срок обучения в годах
  const percentRate = 0.03; // Процентная ставка
  const graceMonthPeriod = months + 9; // Количество месяцев льготного периода
  const monthPercentRate = percentRate / 12; // Ежемесячная процентная ставка
  const finalPercent = price * monthPercentRate * graceMonthPeriod; // итоговая сумма процентов за льготный период

  const percentFirstYear = price * monthPercentRate * 0.4 / years; // проценты за первый год
  const percentSecondYear = price * monthPercentRate * 0.6 / (years / 2); // проценты за второй год
  const percentThirdYear = price * monthPercentRate; // проценты за третий год

  // Уплаченные проценты за льготный период
  const paidPercentGracePeriod = months > 24
    ? percentFirstYear * 12 + percentSecondYear * 12 + percentThirdYear * (graceMonthPeriod - 24)
    : months > 12
      ? percentFirstYear * 12 + percentThirdYear * (graceMonthPeriod - 12)
      : percentThirdYear * graceMonthPeriod;

  const remainingPercent = finalPercent - paidPercentGracePeriod;
  const totalDebt = price + remainingPercent;

  const all = (totalDebt * monthPercentRate * ((1 + monthPercentRate) ** 180)) / (((1 + monthPercentRate) ** 180 ) - 1);

  return {
    months,
    percentFirstYear,
    percentSecondYear,
    percentThirdYear,
    all,
  };
});

const firstYear = computed(() => {
  return Math.round(creditInfo.value.percentFirstYear);
});

const secondYear = computed(() => {
  return Math.round(creditInfo.value.percentSecondYear);
});

const thirdYear = computed(() => {
  if (creditInfo.value.months <= 12) return Math.round(creditInfo.value.percentFirstYear);
  if (creditInfo.value.months <= 24) return Math.round(creditInfo.value.percentSecondYear);
  return Math.round(creditInfo.value.percentThirdYear);
});

const allCost = computed(() => {
  return Math.round(creditInfo.value.all);
});

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Узнать условия кредита',
    btn: 'Отправить',
    formName: true,
    formPhone: true,
    actionParams: [
      {param: 'form=credit_calculator'}
    ],
  });
}

</script>

<template>
  <div class="s-calc__res">
    <p class="a-font_h4 s-calc__res-title">
      Ваш ежемесячный платёж
    </p>
    <div class="s-calc__res-wrap">
      <div class="s-calc__res-item">
        <div>
          <p class="a-font_xl-m">
            Пока вы учитесь
          </p>
          <p class="a-font_xs-m s-calc__res-item-subtitle">
            Выплачиваете только проценты
          </p>
          <ACardCheck />
        </div>
        <p
          v-if="creditInfo.months > 12"
          class="s-calc__price a-font_h6"
        >
          <span>
            <span class="--first-price">
              {{ firstYear }}
            </span>
            ₽/мес
          </span>
          <span class="a-font_xs-m">
            в 1-й год
          </span>
        </p>

        <p
          v-if="creditInfo.months > 24"
          class="s-calc__price a-font_h6"
        >
          <span>
            <span class="--second-price">
              {{ secondYear }}
            </span>
            ₽/мес
          </span>
          <span class="a-font_xs-m">
            в 2-й год
          </span>
        </p>

        <p class="s-calc__price a-font_h6">
          <span>
            <span class="--third-price">
              {{ thirdYear }}
            </span>
            ₽/мес
          </span>
          <span class="a-font_xs-m">
            до конца обучения <br>+9 месяцев
          </span>
        </p>
      </div>

      <div class="s-calc__res-item">
        <div>
          <p class="a-font_xl-m">
            После обучения
          </p>
          <p class="a-font_xs-m s-calc__res-item-subtitle">
            Выплачиваете основную сумму
          </p>
          <ACardCheck />
        </div>

        <p class="s-calc__price a-font_h6 --all">
          <span>
            <span>
              {{ allCost }}
            </span>
            ₽/мес
          </span>
          <span class="a-font_xs-m">
            до 15 лет
          </span>
        </p>
      </div>
    </div>

    <AButton @click="openForm()">
      <span>Узнать условия</span>
    </AButton>
  </div>
</template>

<style lang="scss" scoped>
@import './SCalc.scss';
</style>
