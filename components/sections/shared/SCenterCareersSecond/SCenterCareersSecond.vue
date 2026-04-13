<script setup lang="ts">
interface Props {
  title?: string;
  cardText?: string;
  cardTag?: string;
  cardIcons?: { icon: string }[];
  images?: { img: string }[]
  items: { title?: string; description?: string; icon?: string }[]
}

const {
  title = 'Центр карьеры',
  cardText,
  cardTag,
  cardIcons = [],
  images = [],
  items = [],
} = defineProps<Props>();

const tags = cardTag ? [cardTag] : [];
const icons = cardIcons.map(({ icon }) => icon);
</script>

<template>
  <MSection
    class="s-center-career-second"
    :title
  >
    <div class="s-center-career-second__top">
      <MCardText
        title-class="a-font_h5"
        :title="cardText"
        :tags
        :icons
        tag-class="a-font_s-m"
      />
      <picture
        class="s-center-career-second__image"
      >
        <source
          :srcset="images[2]?.img"
          media="(min-width: 1200px)"
        >
        <source
          :srcset="images[1]?.img"
          media="(min-width: 768px)"
        >
        <AImg
          :src="images[0]?.img"
          alt="career"
          loading="lazy"
          decoding="async"
        />
      </picture>
    </div>

    <div class="s-center-career-second__items">
      <div
        v-for="item, index in items"
        :key="index"
        class="s-center-career-second__item"
      >
        <div class="s-center-career-second__item__header">
          <div
            class="s-center-career-second__item__title a-font_h4"
            v-html="item.title"
          />
          <ASvgMono
            type="colors"
            :name="item.icon ?? ''"
          />
        </div>

        <div
          class="s-center-career-second__item__description a-font_l-m"
          v-html="item.description"
        />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCenterCareersSecond.scss';
</style>
