import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
const results = [
  {
    ico: 'simple-hat',
    imgSm: synergyApi('uploads/content/career_center/s-job-result/1_sm.webp'),
    imgLg: synergyApi('uploads/content/career_center/s-job-result/1_lg.webp'),
    text: 'студентов и&nbsp;выпускников получили оффер в&nbsp;первые месяцы поиска работы через&nbsp;наш Центр карьеры',
  },
  {
    ico: 'simple-group',
    imgSm: synergyApi('uploads/content/career_center/s-job-result/2_sm.webp'),
    imgLg: synergyApi('uploads/content/career_center/s-job-result/2_lg.webp'),
    text: 'подобранных сотрудников не&nbsp;покидают компанию в&nbsp;первый год, а&nbsp;доля замен по&nbsp;контракту не&nbsp;превышает&nbsp;5%',
  },
];
</script>

<template>
  <MSectionNewResponsive
    class="s-job-result"
    title="Результат в&nbsp;цифрах"
  >
    <div class="s-job-result__grid">
      <div
        v-for="item in results"
        :key="item.text"
        class="s-job-result__item"
      >
        <picture>
          <source
            :srcset="item.imgLg"
            media="(min-width: 1200px)"
          >
          <AImg
            :src="item.imgSm"
            alt="precent"
          />
        </picture>
        <div class="s-job-result__text">
          <ASvgMono :name="item.ico" />
          <h5
            class="a-font_h5"
            v-html="item.text"
          />
        </div>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SJobResult.scss';
</style>
