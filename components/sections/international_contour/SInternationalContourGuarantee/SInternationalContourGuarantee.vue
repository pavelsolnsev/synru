import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
const data = {
  title: 'Что гарантируем?',
  bg_lg: synergyApi('uploads/content/podbor/guarantee_lg.webp'),
  bg_sm: synergyApi('uploads/content/podbor/guarantee_sm.webp'),
  cards: [
    {
      title: 'Легальное оформление сотрудников',
      subtitle: 'Обеспечиваем полное соответствие миграционному законодательству: <br>все документы оформляются официально',
    },
    {
      title: 'Квалифицированная рабочая сила',
      subtitle: 'Предоставляем только проверенных кандидатов, <br>прошедших тестирование и&nbsp;обучение в&nbsp;нашем центре',
    },
    {
      title: 'Поддержка',
      subtitle: 'Курируем сотрудников после трудоустройства: <br>помогаем с&nbsp;адаптацией и&nbsp;решаем вопросы',
    },
  ],
};
</script>

<template>
  <MSectionNewResponsive
    class="s-international-contour-guarantee"
  >
    <div class="s-international-contour-guarantee__body">
      <div class="s-international-contour-guarantee__left">
        <picture class="s-international-contour-guarantee__bg">
          <source
            media="(min-width: 1200px)"
            :srcset="data.bg_lg"
          >
          <AImg
            :src="data.bg_sm"
            :alt="data.title"
            decoding="async"
            loading="lazy"
          />
        </picture>
        <div
          class="s-international-contour-guarantee__title"
          v-html="data.title"
        />
      </div>
      <div class="s-international-contour-guarantee__cards">
        <div
          v-for="card in data.cards"
          :key="card.title"
          class="s-international-contour-guarantee__card"
        >
          <div class="s-international-contour-guarantee__top">
            <ASvgMono
              name="simple-check3"
              class="s-international-contour-guarantee__icon"
            />
            <div class="a-font_slider-text s-international-contour-guarantee__card-title">{{ card.title }}</div>
          </div>
          <div
            class="s-international-contour-guarantee__subtitle a-font_l-m"
            v-html="card.subtitle"
          />
        </div>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SInternationalContourGuarantee';
</style>


