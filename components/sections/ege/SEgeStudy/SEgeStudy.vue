<script setup lang="ts">
interface Props {
  title: string
  img: string
  cards: {
    title: string
    subtitle: string
  }[]
}

defineProps<Props>();
</script>

<template>
  <MSectionNewResponsive class="s-ege-study">
    <div class="s-ege-study__body">
      <div class="s-ege-study__info">
        <AImg
          :src="img"
          class="s-ege-study__bg"
        />
        <div
          class="s-ege-study__title a-font_h4"
          v-html="title"
        />
      </div>
      <div class="s-ege-study__scroll-wrapper">
        <ul class="s-ege-study__list">
          <li
            v-for="(item, index) in cards"
            :key="item.title"
            class="s-ege-study__item"
          >
            <div class="s-ege-study__top">
              <div
                class="s-ege-study__item-title a-font_slider-text"
                v-html="item.title"
              />
              <ASvgMono
                name="simple-check3"
                class="s-ege-study__icon"
              />
            </div>
            <div
              class="s-ege-study__item-subtitle a-font_l-m"
              v-html="item.subtitle"
            />
            <ASvgMono
              v-if="index === cards.length - 1"
              name="gerb_3"
              class="s-ege-study__gerb"
            />
          </li>
        </ul>
      </div>
    </div>
  </MSectionNewResponsive>
</template>

<style lang="scss" scoped>
@import './SEgeStudy';
</style>
