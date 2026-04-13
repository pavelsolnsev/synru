<script setup lang="ts">
import { synergyApi, synergyRu } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';

const skillsList = [
  {
    img: synergyRu('content/mediacenter/ai-prof/skills/1.webp'),
    title: 'Реальные <br>данные',
    text: 'Обучали нейросеть на&nbsp;данных 100&nbsp;000+ школьников и&nbsp;выпускников, а&nbsp;также поступающих в&nbsp;университеты и&nbsp;колледжи',
  },
  {
    img: synergyRu('content/mediacenter/ai-prof/skills/2.webp'),
    title: 'Точность <br>98%',
    text: 'Алгоритмы основаны на&nbsp;проверенных психодиагностических методиках и&nbsp;разработаны совместно с&nbsp;экспертами психологии и&nbsp;профориентации',
  },
  {
    img: synergyRu('content/mediacenter/ai-prof/skills/3.webp'),
    title: 'Доказанная <br>эффективность',
    text: '71% выпускников трудоустраиваются по&nbsp;специальности. Демо-вуз занимает высокие позиции по&nbsp;трудоустройству выпускников и&nbsp;входит в&nbsp;<span style="white-space:nowrap;">топ-3</span> по&nbsp;среднему уровню их зарплат (пример для портфолио)',
  },
];
</script>

<template>
  <MSection
    :title="'Объединили научно обоснованные методы <br>и&nbsp;мощь современных технологий'"
    :title-class="'a-font_h3'"
    class="s-skills"
  >
    <div class="s-skills__list">
      <div
        v-for="item in skillsList"
        :key="item.title"
        class="s-skills__item"
      >
        <div class="s-skills__item-top">
          <h6
            class="s-skills__item-title a-font_h6"
            v-html="item.title"
          />
          <span class="s-skills__item-img">
            <img
              :src="item.img"
              :alt="item.title.replace(/<br>/g, ' ')"
            >
          </span>
        </div>
        <p
          class="s-skills__item-text a-font_m-m"
          v-html="item.text"
        />
      </div>
    </div>
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
@import './STestProfSkills';
</style>
