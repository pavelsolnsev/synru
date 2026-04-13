import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
const title = '<strong>Объединили</strong> университет, образовательные платформы, <nobr>HR-агентства</nobr> и&nbsp;цифровые сервисы в&nbsp;единую систему подбора квалифицированных кадров в&nbsp;РФ и&nbsp;за&nbsp;рубежом';
const notice = 'Карта актуальна на&nbsp;момент публикации и&nbsp;может измениться';

const imgSm = synergyApi('uploads/content/career_center/s-job-map/map_sm.webp');
const imgLg = synergyApi('uploads/content/career_center/s-job-map/map_lg.webp');
</script>

<template>
  <MSectionNewResponsive class="s-job-map">
    <div class="s-job-map__inner">
      <h4
        v-if="title"
        class="a-font_h4 s-job-map__title"
        v-html="title"
      />
      <p
        class="a-font_l-m"
        v-html="notice"
      />
      <picture>
        <source
          :srcset="imgLg"
          media="(min-width: 1200px)"
        >
        <AImg
          :src="imgSm"
          alt="map"
        />
      </picture>
    </div>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SJobMap.scss';
</style>
