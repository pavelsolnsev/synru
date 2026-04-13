<script setup lang="ts">
import { ROUTES } from '~/constants';
import { synergyRu } from '~/utils/mediaCdn';
</script>

<template>
  <div class="s-promo">
    <picture>
      <source
        media="(min-width: 1200px)"
        :srcset="synergyRu('content/mediacenter/ai-prof/promo/1-lg.webp')"
        type="image/webp"
      >
      <source
        media="(min-width: 768px)"
        :srcset="synergyRu('content/mediacenter/ai-prof/promo/1-md.webp')"
        type="image/webp"
      >
      <img :src="synergyRu('content/mediacenter/ai-prof/promo/1-sm.webp')">
    </picture>
    <div class="s-promo__txt">
      <h3 class="s-promo__title a-font_h3">
        Начните строить свою идеальную карьеру уже сегодня
      </h3>
      <p class="s-promo__description a-font_l-m">
        100&nbsp;000+ учеников, выпускников и&nbsp;абитуриентов сделали выбор с&nbsp;нашей
        помощью
      </p>
      <AButton
        :show-arrow="false"
        :to="ROUTES.LK_PROFTEST"
        size="lg"
        bg-color="red"
        target="_blank"
      >
        <span>Начать сейчас</span>
      </AButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './STestProfPromo.scss';
</style>
