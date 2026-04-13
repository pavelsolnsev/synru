<script setup lang="ts">
import BgImgLg from '~/assets/images/s-how-proceed-third/s-how-proceed-third-lg.webp';
import BgImgMd from '~/assets/images/s-how-proceed-third/s-how-proceed-third-md.webp';
import BgImgSm from '~/assets/images/s-how-proceed-third/s-how-proceed-third-sm.webp';
import { levels } from './sHowProceedThirdData';

const items = levels.map((level) => ({ label: level.title }));

const currentItem = ref(0);

const currentItemText = computed(() => {
  return levels[currentItem.value]?.text;
});
</script>

<template>
  <MSection class="s-how-proceed-third">
    <div class="s-how-proceed-third__wrapper">
      <picture
        class="s-how-proceed-third__img"
      >
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
          alt="how-proceed"
          decoding="async"
          loading="lazy"
        />
      </picture>

      <div class="s-how-proceed-third__text">
        <div class="s-how-proceed-third__title a-font_h2">Как поступить</div>

        <div class="s-how-proceed-third__description a-font_l-m">
          Условия поступления отличаются в&nbsp;зависимости от&nbsp;выбранного вами уровня образования
        </div>
      </div>

      <div class="s-how-proceed-third__levels">
        <MSwitcher
          v-model="currentItem"
          :items
        />

        <div
          class="s-how-proceed-third__levels__text a-font_l-m"
          v-html="currentItemText"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SHowProceedThird.scss';
</style>
