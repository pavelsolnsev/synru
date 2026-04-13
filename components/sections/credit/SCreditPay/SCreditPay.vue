<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';
import ImageLg from '~/assets/images/credit/credit_pay/credit_pay_lg.webp';
import ImageMd from '~/assets/images/credit/credit_pay/credit_pay_md.webp';
import { creditPay1, creditPay2, creditPay3 } from './sCreditPayData';

interface Props {
  presentation?: string;
  documents?: { title: string; text: string; icon: string }[]
  minorsItems?: { title: string; text?: string }[]
}

const {
  presentation = '',
  documents = [],
  minorsItems = [],
} = defineProps<Props>();

const title = presentation
  ? 'Оплачивайте обучение у&nbsp;нас с&nbsp;кредитом от&nbsp;«СберБанка» и&nbsp;поддержкой государства'
  : 'Какие документы вам понадобятся:';

const titleClass = presentation
  ? 'a-font_h3'
  : 'a-font_h2';

const secondItems = documents?.length
  ? documents
  : creditPay2;

const thirdItems = minorsItems?.length
  ? minorsItems
  : creditPay3;
</script>

<template>
  <MSection
    :title
    :title-class
    class="s-pay-credit"
  >
    <template v-if="presentation">
      <div class="s-pay-credit__slider">
        <swiper
          :modules="[FreeMode]"
          :space-between="0"
          :resistance-ratio="0"
          slides-per-view="auto"
          grab-cursor
          resistance
          free-mode
        >
          <swiper-slide
            v-for="item in creditPay1"
            :key="item.title"
          >
            <AImg
              :src="item.image"
              loading="lazy"
              alt="pay_credit"
              decoding="async"
            />
            <div
              class="swiper__title a-font_h5"
              v-html="item.title"
            />
            <div
              class="swiper__text a-font_xl-m"
              v-html="item.text"
            />
          </swiper-slide>
        </swiper>
      </div>
      <AButton
        :to="presentation"
        target="_blank"
        class="s-pay-credit__info-btn"
      >
        <span>
          Узнать больше о программе
        </span>
      </AButton>

      <h3 class="a-font_h4 s-pay-credit__title">
        Какие документы вам понадобятся:
      </h3>
    </template>

    <div class="s-pay-credit__docs">
      <div
        v-for="item in secondItems"
        :key="item.title"
        class="s-pay-credit__doc"
      >
        <ASvgMono :name="`simple-${item.icon}`" />
        <div
          class="s-pay-credit__doc-title a-font_h5"
          v-html="item.title"
        />
        <div
          class="s-pay-credit__doc-text a-font_m-m"
          v-html="item.text"
        />
      </div>
    </div>

    <h3 class="a-font_h4 s-pay-credit__title">
      Дополнительно для&nbsp;несовершеннолетних студентов:
    </h3>
    <div class="s-pay-credit__dop">
      <div class="s-pay-credit__dop-docs">
        <div
          v-for="item,index in thirdItems"
          :key="item.title"
          class="s-pay-credit__dop-doc"
        >
          <div class="s-pay-credit__dop-num a-font_l-m">
            {{ formatNumberWithLeadingZero(index + 1) }}
          </div>
          <div
            class="a-font_h5 s-pay-credit__dop-doc-title"
            :class="[index < 2 && '--large']"
            v-html="item.title"
          />
          <div
            v-if="item.text"
            class="a-font_m-m s-pay-credit__dop-doc-text"
            v-html="item.text"
          />
        </div>
      </div>

      <picture>
        <source
          :srcset="ImageLg"
          media="(min-width: 1200px)"
        >
        <AImg
          :src="ImageMd"
          alt="credit_pay"
        />
      </picture>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCreditPay.scss';
</style>
