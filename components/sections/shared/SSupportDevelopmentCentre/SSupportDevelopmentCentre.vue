<script setup lang="ts">
import CardBottomLg from '~/assets/images/s-support-development-centre/s-support-development-centre-bottom-lg.webp';
import CardBottomMd from '~/assets/images/s-support-development-centre/s-support-development-centre-bottom-md.webp';
interface Props {
  title?: string;
  cardTitle?: string;
  cardImages?: { img: string }[]
  items: { title?: string; description?: string; img?: string; icon?: string }[]
  bottomText?: string;
}

const {
  title,
  cardImages = [],
  cardTitle,
  items = [],
  bottomText,
} = defineProps<Props>();
</script>

<template>
  <MSection
    class="s-support-development-center"
    :title
  >
    <div class="s-support-development-center__wrapper">
      <div class="s-support-development-center__card">
        <picture class="s-support-development-center__card__img">
          <source
            :srcset="cardImages[2]?.img"
            media="(min-width: 1200px)"
          >
          <source
            :srcset="cardImages[1]?.img"
            media="(min-width: 768px)"
          >
          <AImg
            :src="cardImages[0].img"
            alt="cardImg"
            loading="lazy"
            decoding="async"
          />
        </picture>
        <div
          class="s-support-development-center__card__text a-font_h4"
          v-html="cardTitle"
        />
      </div>

      <div class="s-support-development-center__items">
        <div
          v-for="item,index in items"
          :key="index"
          class="s-support-development-center__item"
        >
          <div class="s-support-development-center__item__left">
            <div class="s-support-development-center__item__header">
              <div
                class="s-support-development-center__item__title a-font_h4"
                v-html="item.title"
              />
              <ASvgMono
                v-if="item.icon"
                :name="item.icon"
              />
            </div>

            <div
              class="s-support-development-center__item__description a-font_l-m"
              :class="{'--has-img': item.img}"
              v-html="item.description"
            />
          </div>

          <div
            v-if="item.img"
            class="s-support-development-center__item__img"
          >
            <AImg
              :src="item.img"
              alt="centre"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div class="s-support-development-center__bottom-card">
        <picture>
          <source
            :srcset="CardBottomLg"
            media="(min-width: 1200px)"
          >
          <source
            :srcset="CardBottomMd"
            media="(min-width: 768px)"
          >
          <AImg
            :src="CardBottomMd"
            alt="card-bottom"
            loading="lazy"
            decoding="async"
          />
        </picture>

        <div
          class="a-font_h5"
          v-html="bottomText"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSupportDevelopmentCentre.scss';
</style>
