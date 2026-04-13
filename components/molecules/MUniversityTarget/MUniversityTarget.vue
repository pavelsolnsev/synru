<script setup lang="ts">
import type { Fonts } from '~/types';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import { ROUTES } from '~/constants';

interface Props {
  title?: string;
  titleClass?: Fonts;
  text?: string;
  textClass?: Fonts;
  showTextButton?: boolean;
  tags?: string[];
  icons?: string[];
  image?: string;
  imageLg?: string;
  imageMd?: string;
  videoBg?: string;
  video?: string;
  tag?: string;
  priorities?: Priority[];
  achievements?: Achievement[];
}

interface Priority {
  title: string;
  text: string;
  image: string;
}

interface Achievement {
  title: string;
  text: string;
  icon: string;
}

const {
  icons = [],
  image = '',
  imageLg = '',
  imageMd = '',
  tag = '',
  tags = [],
  text = '',
  textClass = 'a-font_h6',
  showTextButton = false,
  title = '',
  titleClass = 'a-font_h4',
  video = '',
  videoBg = '',
  achievements = [],
  priorities = [],
} = defineProps<Props>();

const textButton = `<a class="d-none d-xl-flex a-btn a-btn--primary a-btn--lg a-font_xl-m a-btn--red" href="${ROUTES.ABOUT_UNIVERSITY}""><span>Подробнее</span></a>`;

const cardText = showTextButton
  ? `${text}${textButton}`
  : text;

const {
  swiperConfig,
} = useSwiperWrapper({
  slidesPerView: 'auto',
  spaceBetween: 0,
});
</script>

<template>
  <div class="s-university__grid">
    <MCardText
      class="s-university__first"
      :text="cardText"
      :title
      :title-class
      :text-class
      :tags
      :icons
    />
    <MVideoCard
      class="s-university__video"
      :image
      :image-lg
      :image-md
      :video-bg
      :video
      :tag
    />
    <swiper
      v-if="priorities.length"
      class="s-university__priorities"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="priority in priorities"
        :key="priority.title"
        class="swiper-slide"
      >
        <div class="s-university__priorities-card">
          <h4
            class="s-university__priorities-card-title a-font_h5"
            v-html="priority.title"
          />
          <span
            class="s-university__priorities-card-text a-font_xl-m"
            v-html="priority.text"
          />
          <span class="s-university__priorities-card-img">
            <AImg
              :src="priority.image"
              :alt="priority.title"
              loading="lazy"
              decoding="async"
            />
          </span>
        </div>
      </swiper-slide>
    </swiper>
    <swiper
      v-if="achievements.length"
      class="s-university__achievs"
      v-bind="swiperConfig"
    >
      <swiper-slide
        v-for="achievement in achievements"
        :key="achievement.title"
        class="swiper-slide"
      >
        <div class="s-university__achievs-card">
          <div
            class="s-university__achievs-card-title a-font_h4"
            v-html="achievement.title"
          />
          <span
            class="s-university__achievs-card-text a-font_l-m"
            v-html="achievement.text"
          />
          <span
            v-if="achievement.icon"
            class="s-university__achievs-card-img"
          >
            <AImg
              :src="achievement.icon"
              alt="achievement"
              loading="lazy"
            />
          </span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss" scoped>
@import './MUniversityTarget.scss';
</style>

<style lang="scss">
@import '../../atoms/AButton/AButton.scss';
</style>
