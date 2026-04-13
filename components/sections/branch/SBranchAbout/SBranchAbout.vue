<script setup lang="ts">
import BgImgLg from '~/assets/images/branch/s_about/s-branch-about-lg.webp';
import BgImgMd from '~/assets/images/branch/s_about/s-branch-about-md.webp';
import BgImgSm from '~/assets/images/branch/s_about/s-branch-about-sm.webp';
import { cards } from './sBranchAboutData';
import type { RegionCity } from '~/types';

interface RegionCityWithPlaceData extends RegionCity {
  place_title: string;
  place_order: number;
}

interface Props {
  places?: RegionCityWithPlaceData[]
}

const { places = [] } = defineProps<Props>();

const text = places?.length > 1
  ? 'Выберите удобный пункт<br> приёмной комиссии и получите <div class="--free">бесплатную</div><span> консультацию по<br> вопросам поступления и обучения в демо-вузе'
  : 'Получите <div class="--free">бесплатную</div> консультацию по&nbsp;вопросам поступления и&nbsp;обучения в&nbsp;демо-вузе';
</script>

<template>
  <MSection class="s-branch-about">
    <div
      class="s-branch-about__info a-font_h4"
    >
      <div
        class="s-branch-about__text"
        v-html="text"
      />
      <picture class="s-branch-about__image">
        <source
          :srcset="BgImgLg"
          media="(min-width: 1200px)"
        >
        <source
          :srcset="BgImgMd"
          media="(min-width: 768px)"
        >
        <AImg
          :src="BgImgSm"
          alt="image"
        />
      </picture>
    </div>

    <div class="s-branch-about__cards">
      <div
        v-for="{title, image} in cards"
        :key="title"
        class="s-branch-about__card"
      >
        <div
          class="s-branch-about__card__text a-font_h6"
          v-html="title"
        />
        <AImg
          class="s-branch-about__card__image"
          :src="image"
          :alt="title"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SBranchAbout.scss';
</style>
