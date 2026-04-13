<script lang="ts" setup>
import { synergyApi } from '~/utils/mediaCdn';
import { EGE_PODGOTOVKA, OGE_PODGOTOVKA } from '~/constants/routes';

const data = {
  title: 'Выберите направление подготовки',
  list: [
    {
      title: 'ЕГЭ',
      btn: 'Подробнее',
      imageLG: synergyApi('uploads/content/ege/directions_1_lg.webp'),
      imageSM: synergyApi('uploads/content/ege/directions_1_sm.webp'),
      link: EGE_PODGOTOVKA,
    },
    {
      title: 'ОГЭ',
      btn: 'Подробнее',
      imageLG: synergyApi('uploads/content/ege/directions_2_lg.webp'),
      imageSM: synergyApi('uploads/content/ege/directions_2_sm.webp'),
      link: OGE_PODGOTOVKA,
    },
  ],
};
</script>

<template>
  <MSectionNewResponsive
    class="s-ege-directions"
    :title="data.title"
  >
    <div class="s-ege-directions__list">
      <NuxtLink
        v-for="item in data.list"
        :key="item.title"
        :to="item.link"
        class="s-ege-directions__item"
      >
        <div
          class="s-ege-directions__title a-font_h2"
          v-html="item.title"
        />
        <AButton
          bg-color="black"
          size="sm"
          class="s-ege-directions__btn"
        >
          {{ item.btn }}
        </AButton>
        <picture
          class="s-ege-directions__bg"
        >
          <source
            media="(min-width: 1200px)"
            :srcset="item.imageLG"
          >
          <AImg
            :src="item.imageSM"
            :alt="item.title"
            decoding="async"
            loading="lazy"
          />
        </picture>
      </NuxtLink>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SEgeDirections';
</style>
