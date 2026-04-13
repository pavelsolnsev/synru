<script setup lang="ts">
import type { BgImage } from '~/types/BgImage';

interface Prices {
  all: string
  discount: string
  final: string
}

interface Props {
  title: string
  subtitle: string
  prices: Prices[]
  bgImages: BgImage[]
  btnPrice: string
}

defineProps<Props>();

const tags = ['2 месяца', '10 проектов в портфолио', 'Гарантия трудоустройства'];

const priceInfo = {
  all: {
    label: 'Полная стоимость курса:',
    icon: 'certificate-label',
  },
  discount: {
    label: 'Со скидкой 60%:',
    icon: 'certificate-ticket',
  },
  final: {
    label: 'С учётом сертификата:',
    icon: 'certificate-gift',
  },
};
</script>

<template>
  <MSection class="s-certificate-work">
    <div class="s-certificate-work__body">
      <ABgImages v-bind="{...bgImages[0]}" />

      <div class="s-certificate-work__text-info">
        <h2 class="s-certificate-work__title">{{ title }}</h2>
        <div
          class="s-certificate-work__subtitle"
          v-html="subtitle"
        />
        <ul class="s-certificate-work__tags">
          <li
            v-for="tag in tags"
            :key="tag"
            class="s-certificate-work__tag"
          >
            {{ tag }}
          </li>
        </ul>
        <AButton
          class="a-btn--md a-font_s-m s-certificate-work__tablet-button"
        >
          Забрать {{ btnPrice }} ₽
        </AButton>
      </div>

      <ul class="s-certificate-work__price-info">
        <li
          v-for="(value, key) in prices[0]"
          :key="value"
          class="s-certificate-work__price"
        >
          <div class="s-certificate-work__top">
            <div class="s-certificate-work__label">{{ priceInfo[key].label }}</div>
            <ASvgMono
              :name="priceInfo[key].icon"
              class="s-certificate-work__icon"
            />
          </div>
          <div class="s-certificate-work__bottom">
            {{ value }} <span class="s-certificate-work__ruble">Р</span>
          </div>
        </li>
      </ul>
    </div>
  </MSection>
</template>

<style scoped lang="scss">
@import './SCertificateWork.scss';
</style>
