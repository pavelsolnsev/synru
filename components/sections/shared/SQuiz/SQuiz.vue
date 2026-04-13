<script setup lang="ts">
import BgImageLg from '~/assets/images/s_quiz/lg.webp';
import BgImageMd from '~/assets/images/s_quiz/md.webp';
import BgImageSm from '~/assets/images/s_quiz/sm.webp';
import { ROUTES } from '~/constants';
import generateBreadcrumbs from '~/utils/generateBreadcrumbs';
import type { Fonts } from '~/types';
import { replaceYearInHTML } from '~/utils/replaceYearInHtml';

interface Props {
  quizClass?: string;
  title?: string;
  titleClass?: Fonts;
  subTitle?: string;
  subtitleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  bgImages?: Image[];
  tags?: Tag[]
  showBreadcrumbs?: boolean;
  showQuizButton?: boolean;
  showForm?: boolean;
  actionParams?: { param: string }[],
  formBtn?: string,
  quizBtnText?: string;
  showButton?: boolean;
  btnText?: string;
  btnLink?: string;
  video?: string;
  entity?: object;
  routeName?: string;
}

interface Tag {
  tag: string;
}

interface Image {
  image: string;
}

const {
  showBreadcrumbs = false,
  bgImages = [],
  video = '',
  title = '',
  titleClass = 'a-font_h0',
  subTitle = '',
  subtitleClass = 'a-font_h6',
  quizClass = '',
  description = '',
  descriptionClass = 'a-font_h6',
  showQuizButton = false,
  showForm = false,
  actionParams = [],
  formBtn,
  quizBtnText = '',
  showButton = false,
  btnText = '',
  btnLink = '',
  tags = [],
  entity = {},
  routeName = '',
} = defineProps<Props>();

const titleWithCurrentYear = title ? replaceYearInHTML(title) : '';
const subTitleWithCurrentYear = subTitle ? replaceYearInHTML(subTitle) : '';
const descriptionWithCurrentYear = description ? replaceYearInHTML(description) : '';

const path = useRoute().path;

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
  <div>
    <MBreadcrumbs
      v-if="showBreadcrumbs && breadcrumbs.length"
      class="--before-quiz"
      :breadcrumbs
    />
    <MSection
      class="s-quiz"
      :class="[quizClass, showForm && '--form']"
      v-bind="$attrs"
    >
      <picture class="s-quiz__bg">
        <source
          :srcset="bgImages[2]?.image ?? BgImageLg"
          media="(min-width: 1200px)"
        >

        <source
          :srcset="bgImages[1]?.image ?? BgImageMd"
          media="(min-width: 768px)"
        >
        <AImg
          :src="bgImages[0]?.image ?? BgImageSm"
          alt="quiz"
          decoding="async"
        />
      </picture>
      <div
        v-if="path === ROUTES.HOMEPAGE && video"
        class="s-quiz__bg s-quiz__bg_video"
      >
        <video
          playsinline
          muted
          loop
          preload="none"
          :data-autoplay="true"
        >
          <source
            :data-src="video"
            type="video/mp4"
          >
        </video>
      </div>
      <div class="s-quiz__intro">
        <div
          v-if="tags?.length"
          class="s-quiz__intro-tags"
        >
          <ATag
            v-for="{ tag } in tags"
            :key="tag"
            class="a-tag--blur"
            :text="tag"
            variant="white"
          />
        </div>
        <h1
          v-if="titleWithCurrentYear"
          class="s-quiz__intro-title"
          :class="titleClass"
          v-html="titleWithCurrentYear"
        />
        <div
          v-if="subTitleWithCurrentYear"
          class="s-quiz__intro-subtitle"
          :class="subtitleClass"
          v-html="subTitleWithCurrentYear"
        />
        <div
          v-if="descriptionWithCurrentYear"
          class="s-quiz__intro-description"
          :class="descriptionClass"
          v-html="descriptionWithCurrentYear"
        />
        <template v-if="$slots.default">
          <div class="s-quiz__intro-block">
            <slot />
          </div>
        </template>
        <div class="s-quiz__btns">
          <template v-if="showForm">
            <MQuizForm
              :action-params
              :btn="formBtn"
              :subtitle="subTitle"
              :title
            />
          </template>
          <template v-else>
            <AButton
              v-if="showQuizButton"
              class="s-quiz__intro-btn --js-show-quiz"
              @click="showQuiz"
            >
              <span v-html="quizBtnText" />
            </AButton>
            <AButton
              v-if="showButton"
              class="s-quiz__intro-btn"
              :to="btnLink"
              bg-color="white"
            >
              <span v-html="btnText" />
            </AButton>
          </template>
        </div>
      </div>
      <MQuiz @close="closeQuiz" />
    </MSection>
  </div>
</template>

<style lang="scss" scoped>
@import './SQuiz.scss';
</style>
