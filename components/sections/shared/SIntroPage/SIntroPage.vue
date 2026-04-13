<script setup lang="ts">
import BgImageLg from '~/assets/images/s_quiz/lg.webp';
import BgImageMd from '~/assets/images/s_quiz/md.webp';
import BgImageSm from '~/assets/images/s_quiz/sm.webp';
import generateBreadcrumbs from '~/utils/generateBreadcrumbs';
import type { Fonts } from '~/types';

interface Props {
  classname?: string,
  title?: string;
  titleClass?: Fonts;
  description?: string;
  descriptionClass?: Fonts;
  bgImages?: Image[];
  showBreadcrumbs?: boolean;
  entity?: object;
  routeName?: string;
}

interface Image {
  image: string;
}

const {
  showBreadcrumbs = false,
  bgImages = [],
  classname = '',
  title = '',
  titleClass = 'a-font_h0',
  description = '',
  descriptionClass = 'a-font_h6',
  entity = {},
  routeName = '',
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity });
</script>

<template>
  <div>
    <MBreadcrumbs
      v-if="showBreadcrumbs && breadcrumbs.length"
      :breadcrumbs
    />
    <MSection
      :class="'s-intro-page ' + classname"
      v-bind="$attrs"
    >
      <picture class="s-intro-page__bg">
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
      <div class="s-intro-page__intro">
        <h1
          v-if="title"
          class="s-intro-page__intro-title"
          :class="titleClass"
          v-html="title"
        />
        <div
          v-if="description"
          class="s-intro-page__intro-description"
          :class="descriptionClass"
          v-html="description"
        />
      </div>
    </MSection>
  </div>
</template>

<style lang="scss" scoped>
@import './SIntroPage.scss';
</style>
