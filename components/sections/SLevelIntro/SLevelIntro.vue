<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';

interface Props {
  className?: string;
  title?: string;
  text?: string;
  imgLg?: string;
  imgMd?: string;
  imgSm?: string;
  hideForm?: boolean;
  showBtnQuiz?: boolean;
  tags?: { tag: string }[];
  slides?: { title: string; text: string }[];
  entity?: object;
  routeName?: string;
}

const {
  className = '',
  title = '',
  text = '',
  imgLg = '',
  imgMd = '',
  imgSm = '',
  hideForm = false,
  showBtnQuiz = false,
  slides = [],
  tags = [{
    tag: 'Для выпускников 9–11-x классов',
  }, {
    tag: 'Для всех, кто хочет сменить профессию',
  }],
  entity = {},
  routeName = '',
} = defineProps<Props>();

const breadcrumbs = generateBreadcrumbs({ routeName, entity });

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 8,
  resistance: true,
  resistanceRatio: 0,
  breakpoints: {
    1200: {
      spaceBetween: 20,
    },
  },
});

useSeoMeta({
  ogImage: imgMd,
});
</script>

<template>
  <MSection
    class="s-level-intro"
    :class="className"
  >
    <div class="s-level-intro__inner">
      <MBreadcrumbs
        v-if="breadcrumbs.length"
        :breadcrumbs
      />

      <picture>
        <source
          :srcset="imgLg"
          media="(min-width: 1200px)"
        >
        <source
          :srcset="imgMd"
          media="(min-width: 768px)"
        >
        <AImg
          :src="imgSm"
          :alt="title"
          decoding="async"
        />
      </picture>
      <div class="s-level-intro__content">
        <h1
          class="s-level-intro__title a-font_banner"
          v-html="title"
        />
        <ul
          v-if="tags.length"
          class="s-level-intro__tags a-font_xl-m"
          :class="routeName === 'magistracy_new' ? 'column-revers' : undefined"
        >
          <li
            v-for="tag in tags"
            :key="tag.tag"
            v-html="tag.tag"
          />
        </ul>
        <p
          class="a-font_h6 s-level-intro__text"
          v-html="text"
        />
        <MQuizForm
          v-if="!hideForm && !showBtnQuiz"
          btn="Отправить"
          :action-params="[{ param: routeName === 'magistracy_new' ? 'form=pervyy+ekran' : 'form=pervyy+ekran_k' }]"
          :route-name
        />
        <AButton
          v-if="hideForm && showBtnQuiz"
          class="s-level-intro__btn"
          @click.stop="showQuizPopup([
            { param:'form=kviz_pervyy_ekran' }
          ])"
        >
          <span>Подобрать программу</span>
        </AButton>
      </div>
    </div>

    <div
      v-if="slides.length"
      class="s-level-intro__slider"
      :class="slides.length > 4 ? 'over' : undefined"
    >
      <Swiper v-bind="swiperConfig">
        <SwiperSlide
          v-for="(slide, idx) in slides"
          :key="slide.title"
          class="s-level-intro__slide-item"
        >
          <p
            class="a-font_h5"
            v-html="slide.title"
          />
          <p
            class="a-font_m-m s-level-intro__slide-item-text"
            v-html="slide.text"
          />
          <p class="s-level-intro__num">{{ formatNumberWithLeadingZero(idx + 1) }}</p>
        </SwiperSlide>
      </Swiper>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SLevelIntro.scss';
</style>
