<script setup lang="ts">
const TITLE = 'Демо-вуз&nbsp;—<br>пример главного блока';
const DESCRIPTION = 'У нас есть аккредитация и лицензия на образовательную деятельность, поэтому мы выдаём дипломы государственного образца';
const FORM_TITLE = 'Оставьте номер телефона и&nbsp;начните учиться бесплатно прямо сейчас';
const BTN_TEXT = 'Отправить';

const ADVANTAGES = [
  {
    title: '30+',
    icon: `/img/articles/popups/icons/1-1.svg`,
    description: 'лет обучаем актуальным и&nbsp;востребованным профессиям',
  },
  {
    title: '500 000+',
    icon: `/img/articles/popups/icons/1-2.svg`,
    description: 'выпускников<br>с&nbsp;2001&nbsp;года',
  },
  {
    title: '40+',
    icon: `/img/articles/popups/icons/1-3.svg`,
    description: 'факультетов: от&nbsp;медицины и&nbsp;юриспруденции до театра и&nbsp;нейроанимации',
  },
  {
    title: '1000+',
    icon: `/img/articles/popups/icons/1-4.svg`,
    description: 'программ: колледж, высшее и&nbsp;дополнительное образование',
  },
];

const BENEFITS = [
  {
    title: 'Проанализируем ваши таланты и&nbsp;интересы на&nbsp;консультации',
  },
  {
    title: 'Подберём востребованную специальность с&nbsp;хорошей зарплатой',
  },
];

const ACTION_PARAMS = [{ param: 'form=nachat_besplatno_top' }];
</script>

<template>
  <MSectionNewResponsive
    class="s-articles-popup-first"
  >
    <div class="s-articles-popup-first__wrapper">
      <div
        v-dompurify-html="TITLE"
        class="s-articles-popup-first__title a-font_h4"
      />
      <div
        v-dompurify-html="DESCRIPTION"
        class="s-articles-popup-first__description a-font_l-m"
      />
      <div class="s-articles-popup-first__advantages">
        <div
          v-for="advantage in ADVANTAGES"
          :key="advantage.title"
          class="s-articles-popup-first__advantage"
        >
          <div class="s-articles-popup-first__advantage__header">
            <div
              v-dompurify-html="advantage.title"
              class="s-articles-popup-first__advantage__title a-font_xl-m"
            />
            <AImg
              :src="advantage.icon"
              class="s-articles-popup-first__advantage__img"
            />
          </div>

          <div
            v-dompurify-html="advantage.description"
            class="s-articles-popup-first__advantage__bottom a-font_xs-m"
          />
        </div>
      </div>

      <ul class="s-articles-popup-first__benefits">
        <li
          v-for="benefit in BENEFITS"
          :key="benefit.title"
        >
          <span
            v-dompurify-html="benefit.title"
            class="a-font_l-m"
          />
        </li>
      </ul>

      <div class="s-articles-popup-first__form-desktop">
        <MForm
          :form-name="false"
          :title="FORM_TITLE"
          :btn="BTN_TEXT"
          :action-params="ACTION_PARAMS"
          title-class="a-font_h6"
        />
        <AImg src="/img/articles/popups/img/bg-1-1.webp" />
      </div>

      <MForm
        class="--mobile"
        :form-name="false"
        :title="FORM_TITLE"
        :btn="BTN_TEXT"
        :action-params="ACTION_PARAMS"
        title-class="a-font_h6"
        bg-color="grey_40"
      />
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SArticlesPopupFirst.scss';
</style>
