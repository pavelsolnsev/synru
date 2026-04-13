<script lang="ts" setup>
const { width: windowWidth } = useWindowSize();
const isDesktop = computed(() => windowWidth.value >= 1200);

const cards = [
  '50 + курсов по&nbsp;различным направлениям',
  'Чат с&nbsp;куратором',
  'Сертификат после прохождения каждого курса',
];

function formatIndex(idx: number): string {
  const number = idx + 1;
  return number < 10 ? `0${number}` : `${number}`;
}

const cardTitleFont = computed(() => isDesktop.value ? 'a-font_m-m' : 'a-font_s-m');
</script>

<template>
  <div class="s-thanks-banner-express-cards">
    <h6 class="s-thanks-banner-express-cards__list-title">
      Что есть в личном кабинете?
    </h6>
    <div class="s-thanks-banner-express-cards__list">
      <div
        v-for="(text, idx) in cards"
        :key="text"
        class="s-thanks-banner-express-cards__card"
      >
        <span
          v-dompurify-html="text"
          class="s-thanks-banner-express-cards__card-title"
          :class="cardTitleFont"
        />

        <span class="s-thanks-banner-express-cards__card-number a-font_xs-m">
          {{ formatIndex(idx) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./SThanksBannerExpressCards.scss";
</style>
