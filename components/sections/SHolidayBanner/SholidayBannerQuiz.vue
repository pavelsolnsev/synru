<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { LK_REGISTRATION } from '~/constants/routes';

const { timeLeft } = useEndOfDayCount();
const title = 'Для&nbsp;тебя подарок ко Дню студента';
const description = '<span class="red">10 000 <span class="ruble-icon">Р</span></span> для&nbsp;оплаты любого направления обучения зa регистрацию в&nbsp;личном кабинете абитуриента';
const btn = 'Зарегистрироваться';
const imgSm = synergyApi('uploads/content/s-main-banner-ny/holiday_modal_sm.webp');
const imgMd = synergyApi('uploads/content/s-main-banner-ny/holiday_modal_md.webp');
const imgLg = synergyApi('uploads/content/s-main-banner-ny/holiday_modal_lg.webp');
const timerTitle = 'Предложение действительно';
const timerTxt = 'В&nbsp;ЛК можно узнать о&nbsp;популярных программах обучения, выбрать подходящую именно вам и&nbsp;загрузить документы для&nbsp;поступления';
</script>

<template>
  <div
    class="s-modal-quiz-ny"
  >
    <picture class="a-bg-images">
      <source
        :srcset="imgLg"
        media="(min-width: 1200px)"
      >
      <source
        :srcset="imgMd"
        media="(min-width: 768px)"
      >
      <AImg
        :src="imgSm"
        :alt="title"
      />
    </picture>
    <div class="s-modal-quiz-ny__content">
      <div
        class="s-modal-quiz-ny__title a-font_h3"
        v-html="title"
      />
      <div
        class="s-modal-quiz-ny__description a-font_h5"
        v-html="description"
      />
      <AButton
        :to="LK_REGISTRATION"
        size="lg"
        bg-color="red"
        target="_blank"
      >
        {{ btn }}
      </AButton>
    </div>

    <div class="s-modal-quiz-ny__bottom">
      <div class="s-modal-quiz-ny__timer">
        <div
          class="s-modal-quiz-ny__timer-title"
          v-html="timerTitle"
        />
        <div
          class="s-modal-quiz-ny__timer-widget"
        >
          <span v-html="timeLeft.hours" />
          <span v-html="timeLeft.minutes" />
          <span v-html="timeLeft.seconds" />
        </div>
      </div>
      <p
        class="s-modal-quiz-ny__txt"
        v-html="timerTxt"
      />
      <AButton
        size="lg"
        bg-color="red"
        :to="LK_REGISTRATION"
        target="_blank"
      >
        {{ btn }}
      </AButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SholidayBannerQuiz.scss';
</style>
