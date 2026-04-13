<script lang="ts" setup>
import type { BgImage } from '~/types/BgImage';

interface Props {
  title: string
  subtitle: string,
  description: string,
  cardsTitle: string,
  bgImages: BgImage[]
  cards: {
    title: string
    subtitle: string
    icon: string
  }[]
}

defineProps<Props>();
</script>

<template>
  <MSection
    :title
    class="s-school-work-law"
  >
    <div class="s-school-work-law__top">
      <div class="s-school-work-law__info">
        <div
          class="s-school-work-law__subtitle a-font_h5"
          v-html="subtitle"
        />
        <div class="s-school-work-law__wrapper">
          <div
            class="s-school-work-law__description"
            v-html="description"
          />
          <div class="s-school-work-law__icons">
            <ASvgMono
              name="law-server"
              class="s-school-work-law__icon"
            />
            <ASvgMono
              name="law-case"
              class="s-school-work-law__icon"
            />
          </div>
        </div>
      </div>
      <div class="s-school-work-law__photo">
        <ABgImages v-bind="{...bgImages[0]}" />
      </div>
    </div>
    <div
      class="s-school-work-law__cards-title a-font_h4"
      v-html="cardsTitle"
    />
    <ul class="s-school-work-law__cards">
      <li
        v-for="card in cards"
        :key="card.title"
        class="s-school-work-law__card"
      >
        <div
          class="s-school-work-law__card-title a-font_h5"
          v-html="card.title"
        />
        <AImg
          :src="`/img/school-work/law-card_${card.icon}.svg`"
          alt="bg"
          class="s-school-work-law__card-bg"
        />
        <div
          class="s-school-work-law__card-subtitle"
          v-html="card.subtitle"
        />
      </li>
    </ul>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSchoolWorkLaw.scss';
</style>
