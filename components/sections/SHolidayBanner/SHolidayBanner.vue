
import { synergyApi } from '~/utils/mediaCdn';
<script setup lang="ts">
import { Fancybox } from '@fancyapps/ui';

const title_1 = 'ПОЗДРАВЛЯЕМ С&nbsp;ДНЁМ СТУДЕНТА';
const title_2 = '';
const description = 'Дарим 10&nbsp;000&nbsp;<span class="ruble-icon">Р</span> на&nbsp;обучение';
const btn = 'Забрать подарок';
const imgSm = synergyApi('uploads/content/s-main-banner-ny/holiday_banner_sm.webp');
const imgMd = synergyApi('uploads/content/s-main-banner-ny/holiday_banner_md.webp');
const imgLg = synergyApi('uploads/content/s-main-banner-ny/holiday_banner_lg.webp');

const { openModal } = useModalStore();
</script>

<template>
  <div
    class="s-main-banner-ny"
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
        :alt="title_2"
      />
    </picture>
    <div class="s-main-banner-ny__content">
      <div class="s-main-banner-ny__title">
        <span v-html="title_1" />
        <span v-html="title_2" />
      </div>
      <div
        class="s-main-banner-ny__description"
        v-html="description"
      />
      <AButton
        size="lg"
        bg-color="black"
        @click="openModal('SholidayBannerQuiz')"
      >
        {{ btn }}
      </AButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SHolidayBanner.scss';
</style>
