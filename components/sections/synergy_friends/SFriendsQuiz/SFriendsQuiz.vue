<script setup lang="ts">
import type { Fonts } from '~/types';

interface Props {
  quizClass?: string;
  title?: string;
  titleClass?: Fonts;
  subTitle?: string;
  subtitleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  bgImages?: { image: string }[];
  tags?: { tag: string }[]
  btnText?: string;
  showBreadcrumbs?: boolean;
  entity?: object;
  routeName?: string;
}

const {
  quizClass,
  title,
  titleClass = 'a-font_banner',
  subTitle,
  subtitleClass = 'a-font_h3',
  description,
  descriptionClass = 'a-font_xl-m',
  bgImages = [],
  tags = [],
  btnText = 'Участвовать',
  entity = {},
  routeName = '',
  showBreadcrumbs = false,
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity });

onBeforeRouteLeave(() => {
  closeQuiz();
});

function closeQuiz() {
  document.documentElement.classList.remove('--js-quiz-visible');
}

function showQuiz() {
  document.documentElement.classList.add('--js-quiz-visible');
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
</script>

<template>
  <MSection
    class="s-quiz"
    :class="quizClass"
  >
    <div class="s-quiz__inner">
      <MBreadcrumbs
        v-if="showBreadcrumbs && breadcrumbs.length"
        :breadcrumbs
      />
      <picture
        class="s-quiz__bg"
      >
        <source
          :srcset="bgImages[2]?.image"
          media="(min-width: 1200px)"
        >
        <source
          :srcset="bgImages[1]?.image"
          media="(min-width: 768px)"
        >
        <AImg
          :src="bgImages[0]?.image"
          alt="Квиз программы лояльности (демо)"
          decoding="async"
        />
      </picture>

      <div class="s-quiz__info">
        <h1
          class="s-quiz__title"
          :class="titleClass"
          v-html="title"
        />
        <div
          class="s-quiz__subtitle"
          :class="subtitleClass"
          v-html="subTitle"
        />
        <div
          class="s-quiz__description"
          :class="descriptionClass"
          v-html="description"
        />
        <AButton @click="showQuiz">
          <span v-html="btnText" />
        </AButton>
      </div>

      <div class="s-quiz__tags">
        <ATag
          v-for="{ tag } in tags"
          :key="tag"
          :text="tag"
          variant="white"
        />
      </div>
    </div>

    <MQuiz @close="closeQuiz" />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SFriendsQuiz.scss';
</style>
