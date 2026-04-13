<script setup lang='ts'>
import { synergyApi } from '~/utils/mediaCdn';
import { raitings } from '~/components/sections/SInfoRatings/rationgs-data';
import { Swiper, SwiperSlide } from 'swiper/vue';

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
</script>

<template>
<div class="m-target-ratings">
  <div class="m-target-ratings__info">
    <p class="a-font_h4">Мы в&nbsp;рейтингах</p>
    <div class="a-font_h6">
      <p>Регулярно обновляем программы обучения, чтобы вы получали только те знания и&nbsp;навыки, которые прямо сейчас востребованы на&nbsp;рынке труда.</p>
      <br>
      <p>Благодаря такому подходу мы занимаем лидирующие позиции в&nbsp;рейтингах по&nbsp;востребованности выпускников и&nbsp;качеству образования.</p>
    </div>
    <ASvgMono name="simple-premium" />
  </div>
  <div class="m-target-ratings__slider">
    <Swiper v-bind="swiperConfig">
      <SwiperSlide
        v-for="item in raitings"
        :key="item.name"
        class="m-target-ratings__slide"
      >
        <MRatingCard
          :position="item.position"
          :organization="item.organization"
          :year="item.year"
          :image="item.image ?? defaultImage"
          :name="item.name"
          :is-responsive-title="true"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</div>
</template>

<style scoped lang='scss'>
@import './MTargetRatings.scss';
</style>