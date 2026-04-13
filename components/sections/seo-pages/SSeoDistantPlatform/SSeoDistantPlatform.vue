<script setup lang='ts'>
import { synergyApi } from '~/utils/mediaCdn';
import { LK_REGISTRATION } from '~/constants/routes';

const title = 'Попробуйте <span>бесплатно</span>';
const text = 'платформу для&nbsp;дистанционного обучения';
const textPlatforms = 'Работает на всех устройствах';
const mobIco = synergyApi('uploads/content/s-seo-distant-platform/mob.webp');
const deskIco = synergyApi('uploads/content/s-seo-distant-platform/desk.webp');
</script>

<template>
  <MSection
    class="s-seo-distant-platform"
  >
    <div class="s-seo-distant-platform__inner">
      <h3 class="a-font_h2 s-seo-distant-platform__title" v-html="title" />
      <p class="a-font_h6 s-seo-distant-platform__text" v-html="text" />
      <div class="s-seo-distant-platform__bottom">
        <div class="s-seo-distant-platform__platforms">
          <img
            :src="mobIco"
            alt=""
            decoding="async"
            loading="lazy"
          />
          <img
            :src="deskIco"
            alt=""
            decoding="async"
            loading="lazy"
          />
          <span v-html="textPlatforms" />
        </div>
        <AButton
          :to="LK_REGISTRATION"
          :external="true"
          target="_blank"
        >
          Попробовать
        </AButton>
      </div>
    </div>
  </MSection>
</template>
<style scoped lang='scss'>
@import './SSeoDistantPlatform.scss';
</style>
