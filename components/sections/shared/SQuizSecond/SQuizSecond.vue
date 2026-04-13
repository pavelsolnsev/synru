<script setup lang="ts">
interface Props {
  title?: string;
  showBreadcrumbs?: boolean;
  showNav?: boolean;
  navItems: { title: string; attrType: 'class' | 'id'; attrName: string }[]
  description?: string;
  bgImages: { image: string }[]
  actionParams?: { param: string }[]
  routeName: string;
}

const {
  title,
  description,
  routeName,
  navItems = [],
  bgImages = [],
  actionParams = [],
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity: {} });
</script>

<template>
  <MSectionSecond class="s-quiz-second">
    <MBreadcrumbs
      v-if="showBreadcrumbs && breadcrumbs.length"
      :breadcrumbs
    />

    <MQuizNavLinks :nav-items />

    <div class="s-quiz-second__main">
      <h1
        class="s-quiz-second__title"
        v-html="title"
      />
      <div
        class="s-quiz-second__desc a-font_h6"
        v-html="description"
      />

      <MSecondQuizForm :action-params />

      <picture
        class="s-quiz-second__img"
      >
        <source
          :srcset="bgImages[2].image"
          media="(min-width: 1200px)"
        >
        <source
          :srcset="bgImages[1].image"

          media="(min-width: 768px)"
        >
        <AImg
          :srcset="bgImages[0].image"
          :alt="title"
        />
      </picture>
    </div>
  </MSectionSecond>
</template>

<style lang="scss" scoped>
@import './SQuizSecond.scss';
</style>
