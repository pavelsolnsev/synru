<script lang="ts" setup>
import type { BgImage } from '~/types/BgImage';

interface Props {
  title: string
  subtitle: string
  bgImages: BgImage[]
  cards: {
    title: string
    subtitle: string
  }[]
}

defineProps<Props>();
</script>

<template>
  <MSection class="s-school-work-platform">
    <div class="s-school-work-platform__body">
      <div class="s-school-work-platform__top">
        <h2
          class="s-school-work-platform__title a-font_h3"
          v-html="title"
        />
        <div
          class="s-school-work-platform__subtitle a-font_h6"
          v-html="subtitle"
        />
        <AImg
          :src="bgImages[0].imageLG"
          :alt="title"
          class="s-school-work-platform__background"
        />
        <ABgImages
          v-bind="{...bgImages[0]}"
          class="s-school-work-platform__tablet-bg"
        />
        <div class="s-school-work-platform__links">
          <a
            href="https://apps.apple.com/ru/app/synergy-lms/id1059060742"
            target="_blank"
            class="s-school-work-platform__link"
          >
            <ASvgMono name="appstore-black" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.example.demoapp&hl=ru"
            target="_blank"
            class="s-school-work-platform__link"
          >
            <ASvgMono name="google-black" />
          </a>
        </div>
      </div>
      <ul class="s-school-work-platform__cards">
        <li
          v-for="(card, index) in cards"
          :key="card.title"
          class="s-school-work-platform__card"
        >
          <div class="s-school-work-platform__wrapper">
            <div
              class="s-school-work-platform__card-title a-font_h5"
              v-html="card.title"
            />
            <div class="s-school-work-platform__index">
              {{ formatNumberWithLeadingZero(index + 1) }}
            </div>
          </div>
          <div
            class="s-school-work-platform__card-subtitle"
            v-html="card.subtitle"
          />
        </li>
      </ul>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSchoolWorkPlatform.scss';
</style>
