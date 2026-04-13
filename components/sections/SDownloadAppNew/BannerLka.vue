<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';

</script>

<template>
  <div class="s-download-app-new__lka">
    <picture>
      <source
        media="(min-width: 1200px)"
        srcset=synergyApi('uploads/content/s-download-app/lka_lg.webp')
      >
      <AImg
        src=synergyApi('uploads/content/s-download-app/lka_sm.webp')
        alt="download"
        loading="lazy"
        decoding="async"
      />
    </picture>
    <div class="a-font_h4 s-download-app-new__lka-title">
      Всё самое важное&nbsp;&mdash; в&nbsp;личном кабинете абитуриента
    </div>
    <AButton
      :to="ROUTES.LK"
      bg-color="red"
      target="_blank"
    >
      <span>Войти</span>
    </AButton>
  </div>
</template>

<style lang="scss" scoped>
.s-download-app-new__lka {
  overflow: hidden;
  position: relative;
  z-index: 1;
  gap: scale(8);
  flex-direction: column;
  display: flex;
  min-height: scale(365);
  padding: var(--padding_def);
  border-radius: scale(8);
  background-color: var(--a-color_grey_40);
  cursor: pointer;
  text-align: center;
  color: var(--a-color_white);
  transition: var(--transition);
  &:hover { opacity: .8 }
  @include tablet() {
    min-height: scale(351);
    height: auto;
  }
  @include desktop(min) {
    gap: scale(20);
    height: scale(379);
    border-radius: scale(16);
    text-align: left;
  }

  &-title {
    margin: scale(8) 0 auto;
    text-align: left;
    color: var(--a-color_white);
    @include desktop {
      max-width: scale(512);
      margin: 0 0 auto;
    }
  }

  .a-btn {
    @include desktop {
      width: scale(320);
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
