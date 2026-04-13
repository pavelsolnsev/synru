<script lang="ts" setup>
import type { BgImage } from '~/types/BgImage';

interface Props {
  title: string
  bgImages: BgImage[]
  cards: {
    title: string
    subtitle: string
    bgImage: string
  }[]
}

defineProps<Props>();
</script>

<template>
  <MSection class="s-magistracy-about">
    <div class="s-magistracy-about__body">
      <div class="s-magistracy-about__main-info">
        <h2
          class="s-magistracy-about__title a-font_h4"
          v-html="title"
        />
        <ABgImages v-bind="{...bgImages[0]}" />
      </div>
      <ul class="s-magistracy-about__cards">
        <li
          v-for="card in cards"
          :key="card.title"
          class="s-magistracy-about__card"
        >
          <div
            class="s-magistracy-about__card-title a-font_h5"
            v-html="card.title"
          />
          <div
            class="s-magistracy-about__card-subtitle"
            v-html="card.subtitle"
          />
          <div class="s-magistracy-about__card-bg">
            <AImg
              :src="card.bgImage"
              :alt="card.title"
              class="s-magistracy-about__img"
            />
          </div>
        </li>
      </ul>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMagistracyAbout.scss';
</style>
