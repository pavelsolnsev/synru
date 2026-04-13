<script setup lang="ts">
interface Props {
  position?: string | number;
  difference?: string;
  organization?: string;
  year?: string;
  name?: string;
  image?: string;
  to?: string;
  isResponsiveTitle?: boolean,
}

const {
  position: propsPosition = '',
  organization = '',
  year = '',
  image = '',
  name = '',
  to,
  isResponsiveTitle = false,
} = defineProps<Props>();

if (isResponsiveTitle) {
  useFitText('titleRef');
}

const position = typeof propsPosition === 'number'
  ? `№ ${propsPosition}`
  : propsPosition;

const component = to ? resolveComponent('NuxtLink') : 'div';
</script>

<template>
  <component
    :is="component"
    :to
    class="m-rating-card"
  >
    <div class="m-rating-card__header">
      <div class="m-rating-card__position">
        <ASvgMono name="polygon" />
        <span
          class="m-rating-card__num"
          v-html="position"
        />
      </div>

      <div class="m-rating-card__organization a-font_m-m">
        <span v-html="organization" />
        <span
          v-if="year"
          v-html="`, ${year}`"
        />
      </div>
    </div>

    <div class="m-rating-card__bottom a-font_h5">
      <p
        ref="titleRef"
        class="m-rating-card__name"
        v-html="name"
      />
    </div>

    <AImg
      class="m-rating-card__image"
      alt="rating"
      decoding="async"
      loading="lazy"
      :src="image"
    />
  </component>
</template>

<style lang="scss" scoped>
@import './MRatingCard.scss';
</style>
