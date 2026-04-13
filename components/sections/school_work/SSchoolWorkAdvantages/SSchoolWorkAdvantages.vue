<script lang="ts" setup>
interface Props {
  title: string
  cards: {
    title: string
    imageLG: string
    imageMD: string
    imageSM: string
  }[]
}

defineProps<Props>();
</script>

<template>
  <MSection class="s-school-work-advantages">
    <div
      class="s-school-work-advantages__title a-font_h4"
      v-html="title"
    />
    <ul class="s-school-work-advantages__cards">
      <li
        v-for="(card, index) in cards"
        :key="card.title"
        class="s-school-work-advantages__card"
      >
        <div class="s-school-work-advantages__index">
          {{ formatNumberWithLeadingZero(index + 1) }}
        </div>
        <div
          class="s-school-work-advantages__name a-font_h6"
          v-html="card.title"
        />
        <ABgImages v-bind="{...card}" />
      </li>
    </ul>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSchoolWorkAdvantages.scss';
</style>
