<script setup lang="ts">
interface Props {
  title?: string;
  text?: string;
  imageLg?: string;
  imageMd?: string;
  image?: string;
  items?: Item[];
  isResponsive?: boolean;
}

interface Item {
  title?: string;
  text?: string;
  image?: string;
  imageLg?: string;
  imageMd?: string;
  classname?: string;
}

const {
  text = '',
  title = 'Обучаем самым <br>востребованным <br>профессиям',
  imageLg = '',
  imageMd = '',
  image = '',
  items = [],
  isResponsive = false,
} = defineProps<Props>();
</script>

<template>
    <component
      :is="isResponsive ? 'MSectionNewResponsive' : 'MSection'"
      class="s-about"
      :class="{'--section-responsive': isResponsive}"
    >
    <div class="s-about__grid">
      <MCardText
        title-class="a-font_h4"
        text-class="a-font_h6"
        tag-class="a-font_m-m"
        :title
        :text
      >
        <picture>
          <source
            v-if="imageLg"
            :srcset="imageLg"
            media="(min-width: 1200px)"
          >
          <source
            v-if="imageMd"
            :srcset="imageMd"
            media="(min-width: 768px)"
          >
          <AImg
            :src="image"
            :alt="title"
            decoding="async"
            loading="lazy"
          />
        </picture>
      </MCardText>
      <div
        v-if="items.length"
        class="s-about__slider"
      >
        <div
          v-for="item in items"
          :key="item.title"
          class="swiper-slide"
        >
          <div
            class="s-about__card"
            :class="item.classname"
          >
            <span
              class="s-about__card-title a-font_h5"
              v-html="item.title"
            />
            <span
              class="s-about__card-text a-font_s-m"
              v-html="item.text"
            />
            <picture class="s-about__card-img">
              <source
                v-if="item.imageLg"
                :srcset="item.imageLg"
                media="(min-width: 1200px)"
              >
              <source
                v-if="item.imageMd"
                :srcset="item.imageMd"
                media="(min-width: 768px)"
              >
              <AImg
                v-if="item.image"
                :src="item.image"
                :alt="item.title"
                decoding="async"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  </component>
</template>

<style lang="scss" scoped>
@import './SLevelInfo.scss';
</style>
