<script setup lang="ts">
import ImageLg from '~/assets/images/s-happiness-second/s-happiness-second-lg.webp';
import ImageMd from '~/assets/images/s-happiness-second/s-happiness-second-md.webp';
import ImageSm from '~/assets/images/s-happiness-second/s-happiness-second-sm.webp';
import { centersItems, happinessItems } from './sHappinessSecondData';
</script>

<template>
  <MSectionSecond
    class="s-happiness-second"
    title="Департамент заботы"
  >
    <div class="s-happiness-second__main">
      <picture class="s-happiness-second__image">
        <source
          :srcset="ImageLg"
          media="(min-width: 1200px)"
        >
        <source
          :srcset="ImageMd"
          media="(min-width: 768px)"
        >
        <AImg
          :src="ImageSm"
          alt="happiness"
          decoding="async"
          loading="lazy"
        />
      </picture>

      <div
        v-for="item in happinessItems"
        :key="item.title"
        class="s-happiness-second__item"
        :class="item.class"
      >
        <div
          class="s-happiness-second__item__title"
          v-html="item.title"
        />
        <div
          class="s-happiness-second__item__description"
          v-html="item.description"
        />
      </div>

      <picture class="s-happiness-second__image-desktop">
        <source
          :srcset="ImageLg"
          media="(min-width: 1200px)"
        >
        <source
          :srcset="ImageMd"
          media="(min-width: 768px)"
        >
        <AImg
          :src="ImageSm"
          alt="happiness"
          decoding="async"
          loading="lazy"
        />
      </picture>
    </div>

    <div class="s-happiness-second__centers">
      <div class="s-happiness-second__centers__title">
        Расположение многофункциональных центров
      </div>

      <div class="s-happiness-second__centers__items">
        <div
          v-for="item in centersItems"
          :key="item.address"
          class="s-happiness-second__centers__item"
        >
          <div class="s-happiness-second__centers__item__ico">
            <ASvgMono name="pin_3" />
          </div>
          <div class="s-happiness-second__centers__item__wrapper">
            <div
              class="s-happiness-second__centers__item__address"
              v-html="item.address"
            />
            <div
              class="s-happiness-second__centers__item__metro"
            >
              <span>М</span>
              <span
                v-html="item.metro"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </MSectionSecond>
</template>

<style lang="scss" scoped>
@import './SHappinessSecond.scss';
</style>
