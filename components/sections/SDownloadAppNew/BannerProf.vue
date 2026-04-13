<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';
</script>

<template>
  <div class="s-download-app-new__left s-download-app-new__prof">
    <picture>
      <source
        media="(min-width: 1200px)"
        srcset=synergyApi('uploads/content/s-download-app/prof_lg.webp')
      >
      <AImg
        src=synergyApi('uploads/content/s-download-app/prof_sm.webp')
        alt="download"
        loading="lazy"
        decoding="async"
      />
    </picture>
    <div class="a-font_h4 s-download-app-new__prof-title">Тест на <br>профориентацию</div>
    <div class="a-font_h6 s-download-app-new__prof-description">Узнайте вместе с&nbsp;искусственным <br>интеллектом, какая профессия <br>подходит вам больше всего</div>
    <AButton
      :to="ROUTES.LK_PROFTEST"
      bg-color="red"
      target="_blank"
    >
      <span>Пройти тест</span>
    </AButton>
  </div>
</template>

<style lang="scss" scoped>
.s-download-app-new__prof {
  overflow: hidden;
  position: relative;
  gap: scale(12);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: scale(365);
  padding: var(--padding_def);
  border-radius: scale(8);
  color: var(--a-color_white);
  text-align: left;
  @include desktop {
    border-radius: scale(16);
  }

  &-title {
    @include desktop {
      margin: 0 0 auto;
      font-size: scale(64);
      line-height: 1;
    }
  }

  &-description {
    @include tablet(max) {
      margin: 0 0 auto;
    }
  }

  .a-btn {
    @include desktop {
      width: scale(412);
    }
  }

  picture {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }
}
</style>
