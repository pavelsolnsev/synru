<script setup lang="ts">
import AppleStoreIcon from '~/assets/images/m_app_links/apple.svg?url';
import GooglePlayIcon from '~/assets/images/m_app_links/google.svg?url';
import { APP_LINKS } from '~/constants';
import type { Fonts } from '~/types';

interface Props {
  quizClass?: string;
  title?: string;
  titleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  bgImages?: Image[];
  showBreadcrumbs?: boolean;
}

interface Image {
  image: string;
}

const {
  showBreadcrumbs = false,
  bgImages = [],
  title = '',
  titleClass = 'a-font_h1',
  description = '',
  descriptionClass = 'a-font_h6',
} = defineProps<Props>();

const appLinks = [
  {
    name: 'App Store',
    link: APP_LINKS.APP_STORE,
    image: AppleStoreIcon,
  },
  {
    name: 'Google Play',
    link: APP_LINKS.GOOGLE_PLAY,
    image: GooglePlayIcon,
  },
];
</script>

<template>
  <SQuiz
    class="s-quiz-students"
    :title
    :title-class
    :description
    :description-class
    :show-breadcrumbs
    :bg-images
  >
    <MAppLinks :app-links />
  </SQuiz>
</template>

<style lang="scss">
@import './SQuizStudents.scss';
</style>
