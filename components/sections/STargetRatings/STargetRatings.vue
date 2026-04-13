<script setup lang='ts'>
import { synergyApi } from '~/utils/mediaCdn';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { raitings } from '~/components/sections/SInfoRatings/rationgs-data';
import type { SectionConditionalGroup } from '~/types';

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  hideButton?: boolean;
  entity?: { id: number };
}

const {
  conditionalGroup = [],
  entity,
  hideButton = false,
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

const defaultImage = synergyApi('uploads/content/s-ratings/star.svg');

const slider = [{
  title: '1995 год',
  text: 'Работаем и обучаем 30+ лет',
  icon: '/img/courses/target_icon_1.svg ',
}, {
  title: '500 000+',
  text: 'Наших выпускников уже достигли карьерных высот',
  icon: '/img/courses/target_icon_2.svg',
}, {
  title: '400+',
  text: 'Программ дополнительного образования',
  icon: '/img/courses/target_icon_3.svg',
}];
</script>

<template>
  <MSectionNewResponsive
    v-if="showSection"
    class="s-target-about"
  >
    <div class="s-target-about__content">
      <picture>
        <source
          srcset="/img/courses/target_lg.webp"
          media="(min-width: 1200px)"
        >
        <AImg
          src="/img/courses/target_sm.webp"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </picture>
      <div class="s-target-about__info">
        <h2 class="a-font_h4">Наша цель&nbsp;— качественное образование для&nbsp;вашей успешной карьеры</h2>
        <ul class="a-font_l-m">
          <li>Более 30 лет обучаем актуальным и&nbsp;востребованным профессиям</li>
          <li>Соответствуем международным стандартам качества электронного обучения</li>
          <li>Делаем упор на&nbsp;практику, чтобы вы могли начать карьеру сразу после получения диплома или&nbsp;даже раньше</li>
        </ul>
        <AButton
          v-if="!hideButton"
          to="/about"
        >
          Подробнее
        </AButton>
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
            class="a-font_h5"
            v-html="item.title"
          />
          <p
            class="a-font_l-m s-target-about__slide-text"
            v-html="item.text"
          />
          <AImg
            :src="item.icon"
            alt=""
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
@import './STargetRatings.scss';
</style>
