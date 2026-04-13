<script setup lang="ts">
import { proceedCards } from './howProceedData';
import { ROUTES } from '~/constants';

interface Props {
  showButton?: boolean;
  buttonText?: string;
  buttonHref?: string;
}

const {
  showButton = false,
  buttonHref = ROUTES.LK,
  buttonText = 'Подать документы онлайн',
} = defineProps<Props>();
</script>

<template>
  <MSection
    class="s-how-proceed"
    title="Как поступить"
  >
    <div class="s-how-proceed__slider">
      <div
        v-for="item in proceedCards"
        :key="item.text"
        class="how-proceed-card"
      >
        <ANum :num="`0${item.num}`" />
        <div
          class="how-proceed-card__text a-font_h6"
          v-html="item.text"
        />
        <picture
          class="how-proceed-card__img"
          loading="lazy"
        >
          <source

            :srcset="item.imageLg"
            media="(min-width: 1200px)"
          >
          <AImg
            :src="item.image"
            :alt="item.num"
          />
        </picture>
      </div>
    </div>
    <div class="s-how-proceed__bottom">
      <AButton
        v-if="showButton"
        bg-color="black"
        size="lg"
        :to="buttonHref"
      >
        <span v-html="buttonText" />
      </AButton>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SHowProceed.scss';
</style>
