<script setup lang="ts">
import BgImageLg from '~/assets/images/s-seo-form-second/s-seo-form-2lg.webp';
import BgImageMd from '~/assets/images/s-seo-form-second/s-seo-form-2md.webp';
import BgImageSm from '~/assets/images/s-seo-form-second/s-seo-form-2sm.webp';
import type { Fonts } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  items?: { title: string }[]
  formTitle?: string;
  formDescription?: string;
  formBtn?: string;
  actionParams?: { param: string }[];
  routeName?: string;
  noName?: boolean;
}

const {
  title = '',
  titleClass = 'a-font_h3',
  description = '',
  descriptionClass = 'a-font_h6',
  items = [],
  formTitle = '',
  formDescription = '',
  formBtn = '',
  actionParams = [],
  routeName = '',
  noName = false,
} = defineProps<Props>();
</script>

<template>
  <MSection class="s-form">
    <div class="s-form__wrap">
      <div class="s-form__content">
        <h3
          class="s-form__title"
          :class="titleClass"
          v-html="title"
        />
        <h6
          class="s-form__description"
          :class="descriptionClass"
          v-html="description"
        />

        <div class="s-form__items">
          <div
            v-for="item in items"
            :key="item.title"
            class="s-form__item"
          >
            <span
              class="s-form__item__text a-font_m-m"
              v-html="item.title"
            />

            <span class="s-form__item__icon">
              <ASvgMono name="checked" />
            </span>
          </div>
        </div>
        <picture
          class="s-form__image"
        >
          <source
            media="(min-width: 1200px)"
            :srcset="BgImageLg"
          >
          <source
            media="(min-width: 768px)"
            :srcset="BgImageMd"
          >
          <AImg
            :src="BgImageSm"
            alt="form"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <div class="s-form__form">
        <MForm
          :title="formTitle"
          :subtitle="formDescription"
          :subtitle-class="'a-font_h6'"
          :btn="formBtn"
          :form-name="!noName"
          :action-params
          :route-name
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSeoFormSecond.scss';
</style>
