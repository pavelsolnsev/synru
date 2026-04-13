<script setup lang="ts">
import Logo from '~/assets/images/s_university_target/logo.svg?url';
import type { Fonts } from '~/types';

interface Props {
  title?: string;
  secondTitle?: string;
  secondTitleClass?: Fonts;
  text?: string;
  textClass?: Fonts;
  showTextButton?: boolean;
  icons?: { icon: string }[];
  videoBgImages?: { image: string }[];
  video?: string;
  videoTag?: string;
  achievements?: { title: string, text: string, icon: string }[];
  priorities?: { title: string, text: string, image: string }[];
  showTalisman?: boolean;
  showDocuments?: boolean;
  ratings?: Rating[];
}

interface Rating {
  name: string;
  subname?: string;
  link?: string;
  organization: string;
  logo?: string;
  year?: string;
  position: number | string;
  difference: string;
}

const {
  title = '',
  secondTitle = '',
  secondTitleClass = 'a-font_h4',
  text = '',
  textClass = 'a-font_h6',
  showTextButton = false,
  icons = [],
  videoBgImages = [],
  video = '',
  videoTag = '',
  achievements = [],
  priorities = [],
  showTalisman = false,
  showDocuments = false,
  ratings = [],
} = defineProps<Props>();

const mapIcons = icons.map(({ icon }) => icon);
</script>

<template>
  <div class="s-university__wrapper">
    <AImg
      :src="Logo"
      alt="synergy"
      class="s-university__title-logo"
    />
    <MSection
      class="s-university"
      :title
    >
      <MUniversityTarget
        :title="secondTitle"
        :title-class="secondTitleClass"
        :text
        :text-class
        :show-text-button
        :icons="mapIcons"
        :image-lg="videoBgImages[2]?.image"
        :image-md="videoBgImages[1]?.image"
        :image="videoBgImages[0]?.image"
        :video
        :tag="videoTag"
        :achievements
        :priorities
      />
    </MSection>
    <STalisman v-if="showTalisman" />
    <SLicense v-if="showDocuments" />
    <SRatings
      title="Участие в рейтингах"
      :raitings="ratings"
    />
  </div>
</template>

<style lang="scss" scoped>
@import './SUniversityTarget.scss';
@import '../../STalisman/STalisman.scss';
</style>
