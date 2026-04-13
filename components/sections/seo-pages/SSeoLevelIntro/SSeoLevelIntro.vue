<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';

interface Entity {
  name?: string;
  short_name?: string;
}

interface Props {
  className?: string;
  title?: string;
  text?: string;
  imgLg?: string;
  imgMd?: string;
  imgSm?: string;
  tags?: { tag: string }[];
  slides?: { title: string; text: string }[];
  entity: Entity & {
    customFields?: {
      'seo-level-intro': Array<{
        className: string | null;
        title: string;
        text: string;
        imgLg: string;
        imgMd: string;
        imgSm: string;
        slides: Array<{
          title: string;
          text: string;
        }>;
        tags: Array<{ tag: string }>;
      }>;
    }
    [key: string]: unknown;
  };
  routeName: string;
}

const props = defineProps<Props>();

const className = props.entity.customFields?.['seo-level-intro']?.at(0)?.className || (props.className || '');
const title = props.entity.customFields?.['seo-level-intro']?.at(0)?.title || (props.title || '');
const text = props.entity.customFields?.['seo-level-intro']?.at(0)?.text || (props.text || '');
const imgLg = props.entity.customFields?.['seo-level-intro']?.at(0)?.imgLg || (props.imgLg || '');
const imgMd = props.entity.customFields?.['seo-level-intro']?.at(0)?.imgMd || (props.imgMd || '');
const imgSm = props.entity.customFields?.['seo-level-intro']?.at(0)?.imgSm || (props.imgSm || '');
const slides = props.entity.customFields?.['seo-level-intro']?.at(0)?.slides || (props.slides || []);

const tags = props.entity.customFields?.['seo-level-intro']?.at(0)?.tags || (props.tags || [{
  tag: 'Для выпускников 9–11-x классов',
}, {
  tag: 'Для всех, кто хочет сменить профессию',
}]);


const breadcrumbs = generateBreadcrumbs({ routeName: props.routeName, entity: props.entity });

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
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
          class="s-level-intro__tags a-font_l-m"
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
          btn="Отправить"
          :action-params="[{ param: 'form=pervyy+ekran_k' }]"
          :route-name
        />
      </div>
    </div>

    <div
      v-if="slides.length"
      class="s-level-intro__slider"
    >
      <Swiper v-bind="swiperConfig">
        <SwiperSlide
          v-for="slide, idx in slides"
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
@import './SSeoLevelIntro.scss';
</style>
