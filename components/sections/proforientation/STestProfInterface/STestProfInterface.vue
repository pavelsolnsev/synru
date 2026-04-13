import { synergyApi, synergyRu } from '~/utils/mediaCdn';
<script setup lang="ts">
const interfaceList = [
  {
    img: {
      sm: synergyRu('content/mediacenter/ai-prof/interface/1-sm.webp'),
      md: synergyRu('content/mediacenter/ai-prof/interface/1-md.webp'),
      lg: synergyRu('content/mediacenter/ai-prof/interface/1-lg.webp'),
    },
    title: 'Индивидуальный <br>цифровой профиль',
    text: '<p>Нейросеть определит ваш тип мышления, уровень коммуникабельности, творческого потенциала, лидерских и&nbsp;других качеств.</p><p>На&nbsp;основе вашего профиля система укажет, в&nbsp;каких областях вы&nbsp;будете чувствовать себя комфортно и&nbsp;сможете работать эффективно.</p>',
  },
  {
    img: {
      sm: synergyRu('content/mediacenter/ai-prof/interface/2-sm.webp'),
      md: synergyRu('content/mediacenter/ai-prof/interface/2-md.webp'),
      lg: synergyRu('content/mediacenter/ai-prof/interface/2-lg.webp'),
    },
    title: 'Список подходящих профессий',
    text: '<p>Вы&nbsp;получите подбор профессий, которые лучше всего соответствуют вашему профилю.</p><p>Каждая рекомендованная специальность входит в&nbsp;число наиболее перспективных и&nbsp;востребованных с&nbsp;учётом прогноза <nobr>на 10&ndash;15 лет</nobr> вперёд.</p><p>Для&nbsp;профессии приводится описание и&nbsp;обоснование, почему она вам подходит.</p>',
  },
  {
    img: {
      sm: synergyRu('content/mediacenter/ai-prof/interface/3-sm.webp'),
      md: synergyRu('content/mediacenter/ai-prof/interface/3-md.webp'),
      lg: synergyRu('content/mediacenter/ai-prof/interface/3-lg.webp'),
    },
    title: 'Аналитика по&nbsp;профессиям в&nbsp;режиме реального времени',
    text: '<p>По&nbsp;каждой рекомендованной специальности вы&nbsp;получите детальную профессиональную аналитику:</p><ul><li>Средний уровень зарплат по&nbsp;отрасли</li><li>Перспективы карьерного роста</li><li>Регионы и&nbsp;<span style="white-space:nowrap;">компании-лидеры,</span> где требуются такие специалисты</li></ul><p>Нейросеть также укажет ключевые навыки для&nbsp;успеха в&nbsp;этой профессии: какие из&nbsp;них уже есть у&nbsp;вас, а&nbsp;какие предстоит развивать.</p>',

  },
  {
    img: {
      sm: synergyRu('content/mediacenter/ai-prof/interface/4-sm.webp'),
      md: synergyRu('content/mediacenter/ai-prof/interface/4-md.webp'),
      lg: synergyRu('content/mediacenter/ai-prof/interface/4-lg.webp'),
    },
    title: 'Персональная образовательная траектория',
    text: '<p>Что сдавать на&nbsp;ЕГЭ, куда поступать и&nbsp;какую программу выбрать: всё, чтобы впоследствии вы&nbsp;смогли работать по&nbsp;идеальной для&nbsp;вас профессии.</p>',

  },
];
</script>

<template>
  <MSection
    title="Что вас ждёт"
    title-class="a-font_h3"
    class="s-interface"
  >
    <div class="s-interface__inner">
      <div
        v-for="(item, index) in interfaceList"
        :key="index"
        class="s-interface__block"
      >
        <h4
          class="s-interface__block-title a-font_h4"
          v-html="item.title"
        />
        <div
          class="s-interface__block-text a-font_l-m"
          v-html="item.text"
        />
        <picture>
          <source
            :srcset="item.img.lg"
            media="(min-width: 1200px)"
            type="image/webp"
          >
          <source
            :srcset="item.img.md"
            media="(min-width: 768px)"
            type="image/webp"
          >
          <img :src="item.img.sm">
        </picture>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './STestProfInterface';
</style>
