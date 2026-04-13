<script setup lang="ts">
</script>

<template>
  <MSection class="s-presentation-banner">
    <picture>
      <source
        srcset="/img/personnel_reserve/presentation_lg.webp"
        media="(min-width: 1200px)"
      >
      <AImg
        src="/img/personnel_reserve/presentation_sm.webp"
        alt=""
        decoding="async"
        loading="lazy"
      />
    </picture>
    <div class="a-font_h2 s-presentation-banner__title">Получить презентацию</div>
    <div class="a-font_h6">и узнать больше о&nbsp;«Кадровом&nbsp;резерве»</div>
    <AButton
      size="lg"
      to="https://t.me/Kadrovyy_rezerv_bot?start=dl-1736859441525"
      target="_blank"
    >
      Получить в Telegram
    </AButton>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SPresentationBanner.scss';
</style>
