<script setup lang='ts'>
import { synergyApi } from '~/utils/mediaCdn';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { raitings } from '~/components/sections/SInfoRatings/rationgs-data';

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
  title: '10 000+',
  text: 'Тысячи школьников поступили в&nbsp;вузы своей мечты благодаря нашей системе подготовки',
  icon: '/img/courses/target_icon_2.svg',
}, {
  title: 'Яндекс 4,9 | Google 4,7',
  text: 'Нам доверяют: сотни отзывов и&nbsp;рейтинги в&nbsp;открытых источниках',
  icon: '/img/courses/target_icon_3.svg',
}];
</script>

<template>
  <MSectionNewResponsive
    class="s-ege-ratings"
  >
    <div class="s-ege-ratings__content">
      <picture>
        <source
          srcset="/img/courses/target_lg_circle.webp"
          media="(min-width: 1200px)"
        >
        <AImg
          src="/img/courses/target_sm_circle.webp"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </picture>
      <div class="s-ege-ratings__info">
        <h2 class="a-font_h4">Наша цель&nbsp;— ваш максимальный результат на&nbsp;экзамене</h2>
        <ul class="a-font_l-m">
          <li>У&nbsp;нас есть государственная аккредитация и&nbsp;лицензия на&nbsp;образовательную деятельность</li>
          <li>Соответствуем международным стандартам качества электронного обучения</li>
          <li>85 баллов&nbsp;— средний балл учеников</li>
        </ul>
      </div>
    </div>
    <div class="s-ege-ratings__slider">
      <Swiper v-bind="swiperConfig">
        <SwiperSlide
          v-for="item in slider"
          :key="item.title"
          class="s-ege-ratings__slide"
        >
          <p
            class="a-font_h5 s-ege-ratings__slide-title"
            v-html="item.title"
          />
          <p
            class="a-font_l-m s-ege-ratings__slide-text"
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
    <div class="s-ege-ratings__ratings">
      <div class="s-ege-ratings__ratings-info">
        <p class="a-font_h4">Мы в&nbsp;рейтингах</p>
        <div class="a-font_h6">
          <p>Регулярно обновляем программы обучения, чтобы вы получали только те знания и&nbsp;навыки, которые прямо сейчас востребованы на&nbsp;рынке труда.</p>
          <br>
          <p>Благодаря такому подходу мы занимаем лидирующие позиции в&nbsp;рейтингах по&nbsp;востребованности выпускников и&nbsp;качеству образования.</p>
        </div>
      </div>
      <div class="s-ege-ratings__ratings-slider">
        <Swiper v-bind="swiperConfig">
          <SwiperSlide
            v-for="item in raitings"
            :key="item.name"
            class="s-ege-ratings__ratings-slide"
          >
            <MRatingCard
              :position="item.position"
              :organization="item.organization"
              :year="item.year"
              :image="item.image ?? defaultImage"
              :name="item.name"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </MSectionNewResponsive>
</template>
<style scoped lang='scss'>
@import './SEgeRatings.scss';
</style>
