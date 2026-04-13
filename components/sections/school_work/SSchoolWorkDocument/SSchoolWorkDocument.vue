<script lang="ts" setup>
interface Props {
  title: string
  cards: {
    title: string
    subtitle: string
    imageLG: string
    imageMD: string
    imageSM: string
  }[]
}

defineProps<Props>();
</script>

<template>
  <MSection
    class="s-school-work-document"
    :title
  >
    <div class="s-school-work-document__body">
      <div class="s-school-work-document__card-first">
        <div class="s-school-work-document__wrapper">
          <div
            class="s-school-work-document__title-first a-font_h4"
            v-html="cards[0].title"
          />
          <div
            class="s-school-work-document__subtitle-first"
            v-html="cards[0].subtitle"
          />
        </div>
        <div class="s-school-work-document__bg-first">
          <ABgImages v-bind="{...cards[0]}" />
        </div>
      </div>
      <div class="s-school-work-document__card-second">
        <div
          class="s-school-work-document__title-second a-font_h4"
          v-html="cards[1].title"
        />
        <div
          class="s-school-work-document__subtitle-second"
          v-html="cards[1].subtitle"
        />
        <ABgImages v-bind="{...cards[1]}" />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SSchoolWorkDocument.scss';
</style>
