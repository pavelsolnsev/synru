<script setup lang="ts">
import generateBreadcrumbs from '~/utils/generateBreadcrumbs';
import BgImageLg from '~/assets/images/s_quiz/lg.webp';
import BgImageMd from '~/assets/images/s_quiz/md.webp';
import BgImageSm from '~/assets/images/s_quiz/sm.webp';
import type { Fonts } from '~/types';

interface Props {
  routeName: string;
  title?: string;
  titleClass?: Fonts;
  bgImages?: Image[];
  showBreadcrumbs?: boolean;
  buttonText?: string;
}

interface Image {
  image: string;
}

const {
  showBreadcrumbs = false,
  bgImages = [],
  title = '',
  titleClass = 'a-font_h0',
  buttonText = '',
  routeName = '',
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity: {} });

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Стать партнером',
    formName: true,
    formPhone: true,
    actionParams: [
      {param: 'form=franchises_quiz'}
    ],
  });
}
</script>

<template>
  <MBreadcrumbs
    v-if="showBreadcrumbs && breadcrumbs.length"
    class="--before-quiz"
    :breadcrumbs
  />
  <MSection
    class="s-quiz"
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
    <div class="s-quiz__intro">
      <h1
        v-if="title"
        class="s-quiz__intro-title"
        :class="titleClass"
        v-html="title"
      />
      <div class="s-quiz__btns">
        <AButton
          v-if="buttonText"
          class="s-quiz__intro-btn"
          bg-color="red"
          @click="openForm"
        >
          <span v-html="buttonText" />
        </AButton>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import '../../shared/SQuiz/SQuiz.scss';
@import './SQuizFranchises.scss';
</style>
