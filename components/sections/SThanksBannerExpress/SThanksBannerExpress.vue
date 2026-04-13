import { synergyApi } from '~/utils/mediaCdn';
<script lang="ts" setup>
const { width: windowWidth } = useWindowSize();

const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1200);
const description = ' Вам на&nbsp;почту в&nbsp;ближайшее время будет направлен логин&nbsp;и&nbsp;пароль от&nbsp;личного кабинета. Доступ&nbsp;к&nbsp;курсам появится в&nbsp;течение 24 часов';
const descriptionFont = computed(() => isTablet.value ? 'a-font_h6' : 'a-font_h5');
</script>

<template>
  <MSection class="s-thanks-banner-express">
    <div class="s-thanks-banner-express__wrap">
      <div class="s-thanks-banner-express__text-container">
        <div>
          <h1 class="s-thanks-banner-express__title">Спасибо!</h1>
          <p
            class="s-thanks-banner-express__description"
            :class="descriptionFont"
          >
          <span class="s-thanks-banner-express__success-text">Ваша оплата принята!</span>

          <span v-dompurify-html="description" />
        </p>
        </div>

        <AButton
          class="s-thanks-banner-express__btn"
          bg-color="black"
          @click="navigateTo('/')"
        >
          На главную
        </AButton>
      </div>

      <div class="s-thanks-banner-express__picture-container">
        <picture class="s-thanks-banner-express__picture">
          <source
            media="(min-width: 1200px)"
            srcset=synergyApi('uploads/content/s-thanks-banner-express/banner-lg.webp')>
          <source
            media="(min-width: 768px)"
            srcset=synergyApi('uploads/content/s-thanks-banner-express/banner-md.webp')
          >
          <AImg
            src=synergyApi('uploads/content/s-thanks-banner-express/banner-sm.webp')
            decoding="async"
            alt="lk"
          />
        </picture>

        <SThanksBannerExpressCards class="s-thanks-banner-express__cards --desktop" />
      </div>
    </div>

    <SThanksBannerExpressCards class="s-thanks-banner-express__cards --compact" />
  </MSection>
</template>

<style lang="scss" scoped>
@import "./SThanksBannerExpress.scss";
</style>
