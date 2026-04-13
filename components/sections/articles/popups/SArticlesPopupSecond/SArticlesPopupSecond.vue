<script setup lang="ts">
import { ROUTES } from '~/constants';

const TITLE = 'Собрали для&nbsp;вас всю необходимую информацию о&nbsp;поступлении:';
const FORM_TITLE = 'Зарегистрируйтесь в&nbsp;личном кабинете абитуриента и&nbsp;начните учиться прямо сейчас!';

const ADVANTAGES = [
  {
    title: 'Приёмная комиссия',
    class: '--admission-committee',
  },
  {
    title: 'Поступление на бюджет',
    class: '--budget',
  },
  {
    title: 'Общежитие',
    class: '--dormitory',
  },
  {
    title: 'Какие документы нужны',
    class: '--documents',
  },
  {
    title: 'Перевод из другого учреждения',
    class: '--transfer',
  },
  {
    title: 'Факультеты и специальности',
    class: '--faculty',
  },
  {
    title: 'Оплата и кредит с господдержкой',
    class: '--credit',
  },
];
</script>

<template>
  <MSectionNewResponsive class="s-articles-popup-second">
    <div class="s-articles-popup-second__wrapper">
      <div class="s-articles-popup-second__top">
        <div
          v-dompurify-html="TITLE"
          class="s-articles-popup-second__title a-font_h4"
        />
        <div class="s-articles-popup-second__advantages">
          <ATag
            v-for="advantage in ADVANTAGES"
            :key="advantage.title"
            :class="`s-articles-popup-second__advantage ${advantage.class}`"
            :text="advantage.title"
            variant="black"
          />
        </div>
      </div>
      <div class="s-articles-popup-second__bottom">
        <div class="s-articles-popup-second__bottom__content">
          <div
            v-dompurify-html="FORM_TITLE"
            class="s-articles-popup-second__bottom__title a-font_h6"
          />
          <AButton :to="ROUTES.LK_REGISTRATION">
            Зарегистрироваться
          </AButton>
        </div>
        <AImg src="/img/articles/popups/img/bg-1-2.webp" />
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SArticlesPopupSecond.scss';
</style>
