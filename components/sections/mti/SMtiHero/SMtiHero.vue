<script lang="ts" setup>
import generateBreadcrumbs from '~/utils/generateBreadcrumbs';
import type { BgImage } from '~/types/BgImage';

interface Props {
  title: string
  subtitle: string
  routeName?: string
  entity?: { id?: number, name?: string; short_name?: string; }
  formTitle: string
  formBtn: string
  actionParams: string
  formBg?: string
  bgImages: BgImage[]
  cards: {
    title: string
    subtitle: string
    icon: string
  }[]
}

const {
  routeName = '',
  entity = {},
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity });

const numberOneStyle = ['number_one', 'school_1', 'gymnasium'];

const isNumberOneStyle = numberOneStyle.includes(routeName);
</script>

<template>
  <MSection class="s-mti-hero">
    <div class="s-mti-hero__body">
      <div class="s-mti-hero__top">
        <ABgImages
          v-bind="{...bgImages[0]}"
          class="s-mti-hero__bg"
        />
        <div class="s-mti-hero__info">
          <MBreadcrumbs
            :breadcrumbs
            class="s-mti-hero__breadcrumb"
          />
          <h1
            class="s-mti-hero__title"
            :class="isNumberOneStyle ? 'number_one' : 'a-font_h2'"
            v-html="title"
          />
          <div class="s-mti-hero__subtitle a-font_xl-m">
            <ASvgMono
              v-if="!isNumberOneStyle"
              name="pin-new"
              class="s-mti-hero__subtitle-icon"
            />
            <span
              :class="isNumberOneStyle ? 'a-font_h5' : undefined"
              v-html="subtitle"
            />
          </div>
        </div>

        <div class="s-mti-hero__form">
          <AImg
            v-if="formBg"
            :src="formBg"
            alt="bg"
            class="s-mti-hero__form-bg"
          />
          <div
            class="s-mti-hero__form-title a-font_h4"
            v-html="formTitle"
          />
          <MQuizForm
            :btn="formBtn"
            :action-params="[{param: actionParams}]"
            class="s-mti-hero__form-quiz"
            theme="dark"
          />
        </div>
      </div>
      <div class="s-mti-hero__scroll-wrapper">
        <ul class="s-mti-hero__cards">
          <li
            v-for="card in cards"
            :key="card.title"
            class="s-mti-hero__card"
          >
            <div class="s-mti-hero__wrapper">
              <div
                class="s-mti-hero__card-title"
                v-html="card.title"
              />
              <ASvgMono :name="card.icon" />
            </div>
            <div
              class="s-mti-hero__card-subtitle a-font_s-m"
              v-html="card.subtitle"
            />
          </li>
        </ul>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SMtiHero.scss';
</style>
