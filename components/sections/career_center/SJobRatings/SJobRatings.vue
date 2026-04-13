import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
const title = 'Корпорация в&nbsp;рейтингах';
const description = 'Мы постоянно совершенствуем образовательные программы, чтобы вы получали только актуальные знания и&nbsp;востребованные навыки.';

const items = [
  {
    position: '№ 1',
    name: 'Smart Ranking, 2024',
    title: 'среди EdTech-компаний России по&nbsp;выручке',
    imgSm: synergyApi('uploads/content/career_center/s-job-ratings/1_sm.webp'),
    imgLg: synergyApi('uploads/content/career_center/s-job-ratings/1_lg.webp'),
  },
  {
    position: 'Топ-3',
    name: 'HeadHunter, 2023',
    title: 'в&nbsp;национальном рейтинге частных вузов',
    text: 'обучающихся по&nbsp;программам бакалавриата, специалитета и&nbsp;магистратуры',
    imgSm: synergyApi('uploads/content/career_center/s-job-ratings/2_sm.webp'),
    imgLg: synergyApi('uploads/content/career_center/s-job-ratings/2_lg.webp'),
  },
  {
    position: 'Топ-3',
    name: 'HeadHunter, 2024',
    title: 'по востребованности выпускников на&nbsp;рынке труда',
    imgSm: synergyApi('uploads/content/career_center/s-job-ratings/3_sm.webp'),
    imgLg: synergyApi('uploads/content/career_center/s-job-ratings/3_lg.webp'),
  },
  {
    position: '№ 1',
    name: 'Минобрнауки РФ, 2023',
    title: 'по&nbsp;количеству иностранных студентов',
    imgSm: synergyApi('uploads/content/career_center/s-job-ratings/4_sm.webp'),
    imgLg: synergyApi('uploads/content/career_center/s-job-ratings/4_lg.webp'),
  },
];
</script>

<template>
  <MSectionNewResponsive
    class="s-job-ratings"
  >
    <div class="s-job-ratings__inner">
      <div class="s-job-ratings__first">
        <h2
          class="a-font_h2 s-job-ratings__title"
          v-html="title"
        />
        <h6
          class="a-font_h6 s-job-ratings__description"
          v-html="description"
        />
        <ASvgMono name="simple-premium" />
      </div>
      <div class="s-job-ratings__grid">
        <div
          v-for="item in items"
          :key="item.title"
          class="s-job-ratings__item"
        >
          <div class="s-job-ratings__item-top">
            <span
              class="s-job-ratings__item-position"
              v-html="item.position"
            />
            <span
              class="a-font_m-m s-job-ratings__item-name"
              v-html="item.name"
            />
          </div>
          <div class="s-job-ratings__item-bottom">
            <h5
              class="a-font_h5 s-job-ratings__item-title"
              v-html="item.title"
            />
            <p
              v-if="item.text"
              class="a-font_m-m s-job-ratings__item-description"
              v-html="item.text"
            />
          </div>
          <picture>
            <source
              :srcset="item.imgLg"
              media="(min-width: 1200px)"
            >
            <AImg
              :src="item.imgSm"
              :alt="item.name"
            />
          </picture>
        </div>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SJobRatings.scss';
</style>
