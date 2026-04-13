<script setup lang="ts">
import { synergyApi, synergyRu } from '~/utils/mediaCdn';
import { ROUTES } from '~/constants';
import type { ArticleEntity } from '~/types';

const {
  entity = null,
} = defineProps<{
  entity?: ArticleEntity | null;
}>();

const DEFAULT_TITLE = 'Тест на профориентацию';

const title = `
  <span>${entity?.title ?? DEFAULT_TITLE}</span>
  <span class="l-section__title-nums a-font_m-m">нового уровня</span>
`;
</script>

<template>
  <MSection
    :title
    title-class="a-font_h4"
    class="s-intro"
    title-h1
  >
    <p class="s-intro__description a-font_h6">
      Пройди <span style="white-space:nowrap;">онлайн-тест</span> и&nbsp;узнай вместе
      <strong>с&nbsp;искусственным интеллектом</strong>, какая профессия подходит тебе больше всего
    </p>

    <picture>
      <source
        media="(min-width: 1200px)"
        srcset=synergyRu('content/mediacenter/ai-prof/intro/intro-lg.webp')
        type="image/webp"
      >
      <source
        media="(min-width: 768px)"
        srcset=synergyRu('content/mediacenter/ai-prof/intro/intro-md.webp')
        type="image/webp"
      >
      <img src=synergyRu('content/mediacenter/ai-prof/intro/intro-sm.webp')>
    </picture>

    <div class="s-intro__bottom">
      <span class="a-font_h5">100 000+</span>
      <span class="a-font_l-m">школьников сделали выбор с&nbsp;нашей помощью</span>
      <AButton
        :show-arrow="false"
        :to="ROUTES.LK_PROFTEST"
        size="lg"
        class="d-none d-md-flex"
        target="_blank"
      >
        Пройти тест
      </AButton>
    </div>

    <AButton
      :show-arrow="false"
      :to="ROUTES.LK_PROFTEST"
      size="lg"
      bg-color="red"
      class="d-md-none"
      target="_blank"
    >
      Пройти тест
    </AButton>
  </MSection>
</template>

<style lang="scss" scoped>
@import './STestProfIntro';
</style>
