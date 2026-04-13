<script lang="ts" setup>
import type { BgImage } from '~/types/BgImage';

interface Props {
  title: string
  subtitle: string,
  cardTitle: string,
  bgImages: BgImage[]
  cards: {
    title: string
    icon: string
  }[]
  tags: {
    title: string
  }[]
}

defineProps<Props>();
</script>

<template>
  <MSection class="s-school-work-offer">
    <div class="s-school-work-offer__top">
      <ABgImages v-bind="{...bgImages[0]}" />
      <h2
        class="s-school-work-offer__title a-font_h3"
        v-html="title"
      />
      <div
        class="s-school-work-offer__subtitle a-font_h5"
        v-html="subtitle"
      />
      <ul class="s-school-work-offer__tags">
        <li
          v-for="tag in tags"
          :key="tag.title"
          class="s-school-work-offer__tag"
        >
          {{ tag.title }}
        </li>
      </ul>
    </div>
    <div
      class="s-school-work-offer__cards-title a-font_h4"
      v-html="cardTitle"
    />
    <ul class="s-school-work-offer__cards">
      <li
        v-for="(card, index) in cards"
        :key="card.title"
        class="s-school-work-offer__card"
      >
        <div class="s-school-work-offer__index">{{ formatNumberWithLeadingZero(index + 1) }}</div>
        <div
          class="s-school-work-offer__card-title a-font_h5"
          v-html="card.title"
        />
        <AImg
          :src="`/img/school-work/offer-card_${card.icon}.svg`"
          alt="bg"
          class="s-school-work-offer__card-bg"
        />
        <AImg
          src="/img/school-work/offer-element.svg"
          alt="bg"
          class="s-school-work-offer__card-element"
        />
      </li>
    </ul>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSchoolWorkOffer.scss';
</style>
