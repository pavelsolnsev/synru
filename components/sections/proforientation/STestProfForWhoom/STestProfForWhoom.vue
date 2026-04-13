<script setup lang="ts">
import { synergyApi, synergyRu } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';

const forWhomList = [
  {
    img: synergyRu('content/mediacenter/ai-prof/for_whom/1.webp'),
    title: 'Школьникам',
    text: 'Поможет решить, идти ли в&nbsp;<span style="white-space:nowrap;">10-й</span> класс или&nbsp;поступать на&nbsp;СПО, какие предметы сдавать на&nbsp;ЕГЭ и&nbsp;какая профессия подходит больше всего',
  },
  {
    img: synergyRu('content/mediacenter/ai-prof/for_whom/2.webp'),
    title: 'Выпускникам и&nbsp;студентам',
    text: 'Покажет, на&nbsp;какую специальность лучше поступать и&nbsp;в&nbsp;какой сфере строить карьеру',
  },
  {
    img: synergyRu('content/mediacenter/ai-prof/for_whom/3.webp'),
    title: 'Взрослым',
    text: 'Подскажет направление, профессию или&nbsp;отрасль, в&nbsp;которой ваши навыки и&nbsp;опыт будут востребованы',
  },
];
</script>

<template>
  <MSection
    title="Кому подходит"
    title-class="a-font_h3"
    class="s-for-whom"
  >
    <ul class="s-for-whom__list">
      <li
        v-for="item in forWhomList"
        :key="item.title"
        class="s-for-whom__item"
      >
        <h6
          class="s-for-whom__item-title a-font_h6"
          v-html="item.title"
        />
        <p
          class="s-for-whom__item-text a-font_m-m"
          v-html="item.text"
        />
        <span class="s-for-whom__item-img">
          <img
            :src="item.img"
            alt=""
          >
        </span>
      </li>
    </ul>
    <AButtonThird
      :to="ROUTES.LK_PROFTEST"
      target="_blank"
      size="lg"
      bg-color="red"
    >
      <span class="a-font_xl-m">Пройти тест</span>
    </AButtonThird>
  </MSection>
</template>

<style lang="scss" scoped>
@import './STestProfForWhoom';
</style>
