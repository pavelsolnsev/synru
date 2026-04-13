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
  <MSection class="s-dodemba-about">
    <div class="s-dodemba-about__body">
      <div
        v-if="bgImages[0].imageLG"
        class="s-dodemba-about__bg s-dodemba-about__bg_lg"
      >
        <AImg
          :src="bgImages[0].imageLG"
          alt="background"
        />
      </div>
      <div class="s-dodemba-about__info">
        <div
          v-if="bgImages[0].imageMD"
          class="s-dodemba-about__bg s-dodemba-about__bg_md"
        >
          <AImg
            :src="bgImages[0].imageMD"
            alt="background"
          />
        </div>
        <div
          v-if="bgImages[0].imageSM"
          class="s-dodemba-about__bg s-dodemba-about__bg_sm"
        >
          <AImg
            :src="bgImages[0].imageSM"
            alt="background"
          />
        </div>
        <h2 class="s-dodemba-about__title">{{ title }}</h2>
        <div
          class="s-dodemba-about__subtitle"
          v-html="subtitle"
        />
      </div>
      <ul class="s-dodemba-about__cards">
        <li
          v-for="(item, i) in cards"
          :key="item.title"
          class="s-dodemba-about__card"
        >
          <div class="s-dodemba-about__top">
            <span
              class="s-dodemba-about__top-title"
              v-html="item.title"
            />
            <div class="s-dodemba-about__icon">{{ formatNumberWithLeadingZero(i + 1) }}</div>
          </div>

          <div
            class="s-dodemba-about__bottom"
            v-html="item.subtitle"
          />
        </li>
      </ul>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDodEmbaAbout.scss';
</style>
