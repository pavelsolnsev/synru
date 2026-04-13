<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { SectionConditionalGroup } from '~/types';
import Logo from '~/assets/images/main/s_main_about_university/logo.svg?url';

interface Props {
  title?: string,
  conditionalGroup?: SectionConditionalGroup[];
  entity?: { id: number };
}

const {
  title = 'О демо-вузе',
  conditionalGroup = [],
  entity,
} = defineProps<Props>();

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});

const slider = [{
  title: '500 000+',
  text: 'Наших выпускников уже достигли карьерных высот',
  icon: '/img/SSeoAboutRaitings/icon-1.webp ',
}, {
  title: 'Международные стандарты',
  text: 'Член EFQUEL, Magna Charta <br>Universitatum Europearum; <br>участник IAU при&nbsp;ЮНЕСКО',
  icon: '/img/SSeoAboutRaitings/icon-2.webp',
}, {
  title: 'Разнообразие образовательных программ',
  text: 'Университет, колледж, школа, онлайн-курсы и&nbsp;MBA: у&nbsp;нас есть программы обучения для&nbsp;любого уровня, профессии и&nbsp;целей',
  icon: '/img/SSeoAboutRaitings/icon-3.webp',
}];
</script>

<template>
  <MSectionNewResponsive
    v-if="showSection"
    :title
    class="s-target-about"
  >
    <AImg
      :src="Logo"
      alt="synergy"
      class="title-logo"
    />
    <div class="s-target-about__content">
      <picture>
        <source
          srcset="/img/SSeoAboutRaitings/seo_about_lg.webp"
          media="(min-width: 1200px)"
        >
        <AImg
          src="/img/SSeoAboutRaitings/seo_about_sm.webp"
          loading="lazy"
        />
      </picture>
      <div class="s-target-about__info">
        <h3 class="a-font_h4"><span class="red">Качественное образование</span> с&nbsp;1988&nbsp;года</h3>
        <div class="a-font_h6 s-target-about__text">
          <p>Более 30 лет мы объединяем академические знания и&nbsp;практические навыки в&nbsp;системе обучения, которая помогает выпускникам достигать целей и&nbsp;строить успешную карьеру в&nbsp;России и&nbsp;за&nbsp;рубежом.</p>
        </div>
      </div>
    </div>
    <div class="s-target-about__slider">
      <Swiper v-bind="swiperConfig">
        <SwiperSlide
          v-for="item in slider"
          :key="item.title"
          class="s-target-about__slide"
        >
          <p
            class="a-font_h5 s-target-about__slide-title"
            v-html="item.title"
          />
          <p
            class="a-font_l-m s-target-about__slide-text"
            v-html="item.text"
          />
          <AImg
            :src="item.icon"
            decoding="async"
            loading="lazy"
          />
        </SwiperSlide>
      </Swiper>
    </div>
    <MTargetRatings />
  </MSectionNewResponsive>
</template>

<style scoped lang='scss'>
@import './SSeoAboutRaitings.scss';
</style>
