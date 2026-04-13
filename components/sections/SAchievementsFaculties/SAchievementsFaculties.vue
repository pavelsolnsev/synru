<script setup lang="ts">
import type { Fonts, ArticleCard } from '~/types';

interface Props {
  titleClass?: Fonts;
  textClass?: Fonts;
  title: string,
  articles?: Articles[];
};

type Articles = Omit<ArticleCard, 'titleClass' | 'textClass' | 'dateClass'>;

const {
  articles = [],
  textClass,
  title,
  titleClass,
} = defineProps<Props>();
</script>

<template>
  <MSection
    class="s-achievements-faculties"
    :title
  >
    <MArticlesSlider
      :articles
      :text-class
      :title-class
    />
  </MSection>
</template>

<style lang="scss" src="./SAchievementsFaculties.scss" scoped />
