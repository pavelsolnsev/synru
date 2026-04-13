<script setup lang="ts">
import { ROUTES } from '~/constants';

const aboutList = [
  {
    title: 'Проводит комплексную диагностику',
    text: 'Тестирование охватывает ваши интересы, склонности, тип мышления и&nbsp;мягкие навыки. Именно они на&nbsp;80% определяют успех в&nbsp;будущей профессии',
  },
  {
    title: 'Анализирует массивы данных',
    text: 'Подробный анализ 150&nbsp;млн вакансий в&nbsp;режиме реального времени. ИИ подбирает только те&nbsp;профессии, которые востребованы прямо сейчас и&nbsp;подходят именно&nbsp;вам',
  },
  {
    title: 'Строит персональную карьерную траекторию',
    text: 'На&nbsp;основе полученных данных строится индивидуальный карьерный путь, начиная со&nbsp;школы: выбор профильного класса и&nbsp;предметов на&nbsp;ЕГЭ',
  },
];
</script>

<template>
  <MSection
    :title="'Как работает нейросеть?'"
    title-class="a-font_h3"
    class="s-about"
  >
    <ul class="s-about__list">
      <li
        v-for="(item, idx) in aboutList"
        :key="idx"
        class="s-about__item"
      >
        <h6 class="s-about__item-title a-font_h6">
          {{ item.title }}
        </h6>
        <p
          class="s-about__item-text a-font_m-m"
          v-html="item.text"
        />
        <span class="s-about__item-num a-font_h6">
          0{{ idx + 1 }}
        </span>
      </li>
    </ul>
    <AButtonThird
      :to="ROUTES.LK_PROFTEST"
      target="_blank"
      size="lg"
      bg-color="red"
    >
      <span class="a-font_xl-m">Начать комплексную диагностику</span>
    </AButtonThird>
  </MSection>
</template>



<style lang="scss" scoped>
@import './STestProfWork';
</style>
