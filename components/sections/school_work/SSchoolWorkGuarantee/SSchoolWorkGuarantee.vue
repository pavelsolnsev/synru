<script lang="ts" setup>
import type { BgImage } from '~/types/BgImage';

interface Props {
  title: string
  subtitle: string,
  description: string,
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
    class="s-school-work-guarantee"
    :title
  >
    <div class="s-school-work-guarantee__body">
      <div class="s-school-work-guarantee__top">
        <div class="s-school-work-guarantee__info">
          <div
            class="s-school-work-guarantee__title a-font_h4"
            v-html="subtitle"
          />
          <div
            class="s-school-work-guarantee__description"
            v-html="description"
          />
        </div>
        <div class="s-school-work-guarantee__photo">
          <ABgImages v-bind="{...bgImages[0]}" />
        </div>
      </div>
      <ul class="s-school-work-guarantee__cards">
        <li
          v-for="card in cards"
          :key="card.title"
          class="s-school-work-guarantee__card"
        >
          <div class="s-school-work-guarantee__wrapper">
            <div
              class="s-school-work-guarantee__card-title a-font_h5"
              v-html="card.title"
            />
            <ASvgMono
              :name="card.icon"
              class="s-school-work-guarantee__card-icon"
            />
          </div>

          <div
            class="s-school-work-guarantee__card-subtitle"
            v-html="card.subtitle"
          />
        </li>
      </ul>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSchoolWorkGuarantee.scss';
</style>
