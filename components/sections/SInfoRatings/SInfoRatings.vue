<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { raitings } from '~/components/sections/SInfoRatings/rationgs-data';
import Image from '~/assets/images/m-rating-card/synergy.webp';

interface Props {
  btnLink?: string
  img?: string
  routeName?: string;
}

const {
  img = '/img/SInfoRatings/s-info-ratings.webp',
  btnLink = '',
  routeName = '',
} = defineProps<Props>();

const {
  swiperConfig,
} = useSwiperWrapper({
  enabled: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
  breakpoints: {
    1200: {
      enabled: false,
    },
  },
});

const textSlider = [{
  title: '500 000+',
  text: 'Наших выпускников уже достигли карьерных высот',
  icon: 'simple-man-bust',
}, {
  title: 'Международные стандарты',
  text: 'Член EFQUEL, Magna Charta Universitatum Europearum; участник IAU при ЮНЕСКО',
  icon: 'simple-world',
}, {
  title: 'Разнообразие образовательных программ',
  text: 'Университет, колледж, школа, онлайн-курсы и MBA: у нас есть программы обучения <br>для любого уровня, профессии и целей',
  icon: 'simple-papers',
}];

const showItems = shallowRef(4);
</script>

<template>
  <MSection class="s-info-ratings">
    <div class="s-info-ratings__info">
      <div class="s-info-ratings__info-banner">
        <div class="s-info-ratings__info-banner-text">
          <h2 class="a-font_h4"><span class="red">Качественное образование</span> с&nbsp;1988&nbsp;года</h2>
          <p class="a-font_h6">Более 30 лет мы объединяем академические знания и&nbsp;практические навыки в&nbsp;системе обучения, которая<br>помогает выпускникам достигать целей и&nbsp;строить <br>успешную карьеру в&nbsp;России и&nbsp;за&nbsp;рубежом.</p>
          <AButtonThird
            v-if="btnLink && !checkIsLandingPage({page: routeName})"
            rounding="rect"
            :to="btnLink"
          >
            Подробнее
          </AButtonThird>
        </div>
        <picture class="s-info-ratings__info-banner-img">
          <AImg
            :src="img"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <div class="s-info-ratings__info-slider">
        <Swiper v-bind="swiperConfig">
          <SwiperSlide
            v-for="item in textSlider"
            :key="item.title"
            class="s-info-ratings__info-slider-item"
          >
            <p
              class="a-font_h5 --title"
              v-html="item.title"
            />
            <p
              class="a-font_l-m"
              v-html="item.text"
            />
            <ASvgMono :name="item.icon" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div class="s-info-ratings__ratings">
      <div class="s-info-ratings__ratings-text">
        <h2 class="s-info-ratings__ratings-title a-font_h2">
          <AImg
            class="s-info-ratings__ratings-img"
            alt="Демо-вуз"
            loading="lazy"
            decoding="async"
            :src="Image"
          />
          в&nbsp;рейтингах
        </h2>
        <p class="a-font_h5">
          Мы постоянно совершенствуем образовательные программы, чтобы&nbsp;вы&nbsp;получали только актуальные
          знания и&nbsp;востребованные навыки.
        </p>
        <p class="a-font_h6">Благодаря этому демо-вуз занимает лидирующие позиции в&nbsp;рейтингах вузов России (пример для портфолио).</p>
      </div>
      <div class="s-info-ratings__ratings-slider">
        <MRatingCard
          v-for="item in raitings"
          :key="item.name"
          :position="item.position"
          :organization="item.organization"
          :year="item.year"
          :image="item.image"
          :name="item.name"
        />
        <AButtonThird
          v-if="showItems < raitings.length"
          bg-color="light-white"
          @click="showItems += 4"
        >
          Показать ещё
        </AButtonThird>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import '../SRatings/SRatings.scss';
@import './SInfoRatings.scss';
</style>
