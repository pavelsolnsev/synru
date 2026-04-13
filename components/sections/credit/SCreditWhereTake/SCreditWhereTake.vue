<script setup lang="ts">
import { ROUTES } from '~/constants';

const items = [
  {
    title: 'Оплачивайте среднее профессиональное и&nbsp;высшее образование',
    bank: 'Сбер',
    link: ROUTES.CREDIT_SBERBANK,
    class: '--sber',
  },
  {
    title: 'Оплачивайте высшее и&nbsp;второе высшее образование',
    bank: 'Т-банк',
    link: ROUTES.CREDIT_T_BANK,
    class: '--tbank',
  },
];
</script>

<template>
  <MSection
    class="s-credit-where-take"
    title="Где можно оформить кредит"
  >
    <div class="s-credit-where-take__wrapper">
      <div
        v-for="item in items"
        :key="item.link"
        class="s-credit-where-take__item"
      >
        <div class="s-credit-where-take__item__left">
          <div class="s-credit-where-take__item__header">
            <div
              class="s-credit-where-take__item__title a-font_h6"
              v-html="item.title"
            />
            <div
              class="s-credit-where-take__item__logo"
              :class="item.class"
            >
              <span v-html="item.bank" />
            </div>
          </div>

          <AButtonThird
            class="s-credit-where-take__item__link"
            bg-color="red"
            :to="item.link"
          >
            <div class="s-credit-where-take__item__link-text">
              <span class="a-font_m-m">Подробные условия и документы</span>
              <ASvgMono name="arrow_outward" />
            </div>
          </AButtonThird>
        </div>

        <div class="s-credit-where-take__item__right">
          <div
            class="s-credit-where-take__item__logo"
            :class="item.class"
          >
            <span v-html="item.bank" />
          </div>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCreditWhereTake.scss';
</style>
