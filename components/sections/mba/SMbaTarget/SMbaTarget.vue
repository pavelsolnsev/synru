<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { slider, gridItemsBGs } from '~/components/sections/mba/SMbaTarget/SMbaTargetData';

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
    class="s-mba-target"
  >
    <div class="s-mba-target__content">
      <picture>
        <source
          srcset="/img/courses/target_lg.webp"
          media="(min-width: 1200px)"
        >
        <source
          srcset="/img/courses/target_md.webp"
          media="(min-width: 768px)"
        >
        <AImg
          src="/img/courses/target_sm.webp"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </picture>
      <div class="s-mba-target__info">
        <h2 class="a-font_h4">Наша цель&nbsp;— качественное образование для&nbsp;вашей успешной карьеры</h2>
        <ul class="a-font_l-m">
          <li>Более 30 лет обучаем актуальным и&nbsp;востребованным профессиям</li>
          <li>Соответствуем международным стандартам качества электронного обучения</li>
          <li>Строим обучение на&nbsp;практике, реальных <span class="nobr">бизнес-кейсах</span> и&nbsp;опыте ведущих компаний</li>
        </ul>
      </div>
    </div>
    <div class="s-mba-target__slider">
      <Swiper v-bind="swiperConfig">
        <SwiperSlide
          v-for="item in slider"
          :key="item.title"
          class="s-mba-target__slide"
        >
          <p
            class="a-font_h5"
            v-html="item.title"
          />
          <p
            class="a-font_l-m s-mba-target__slide-text"
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
    <div class="s-mba-target__grid">
      <div class="grid-item-1">
        <ABgImages v-bind="gridItemsBGs[0]" />
      </div>
      <div class="grid-item-2">
        <ABgImages v-bind="gridItemsBGs[1]" />
        <span class="a-font_h4">Лидеры <br>бизнес-образования</span>
        <ul class="a-font_l-m">
          <li>1 место по&nbsp;качеству обучения для&nbsp;предпринимателей («Интерфакс»)</li>
          <li>7 аккредитаций AMBA (UK)</li>
          <li><span class="nobr">Топ-5</span> в&nbsp;народном рейтинге <span class="nobr">бизнес-школ</span></li>
        </ul>
      </div>
      <div class="grid-item-3">
        <ABgImages v-bind="gridItemsBGs[2]" />
      </div>
      <div class="grid-item-4">
        <ABgImages v-bind="gridItemsBGs[3]" />
        <span class="a-font_h4 title">От руководителя отдела до CEO</span>
        <span class="tag a-font_l-m">25 программ</span>
        <span class="a-font_xl-m description">Независимо от вашего уровня — руководите командой, отделом <br>или всей компанией — мы поможем вам добиться целей</span>
      </div>
      <div class="grid-item-5">
        <ABgImages v-bind="gridItemsBGs[4]" />
      </div>
      <div class="grid-item-6">
        <ABgImages v-bind="gridItemsBGs[5]" />
      </div>
      <div class="grid-item-7">
        <ABgImages v-bind="gridItemsBGs[6]" />
      </div>
      <div class="grid-item-8">
        <ABgImages v-bind="gridItemsBGs[7]" />
        <span class="a-font_h4">Организовываем B2B-обучение<br>для крупных игроков рынка</span>
      </div>
    </div>
  </MSection>
</template>
<style scoped lang='scss'>
@import './SMbaTarget';
</style>
