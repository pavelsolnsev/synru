<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar } from 'swiper/modules';
import { raitings } from '~/components/sections/SInfoRatings/rationgs-data';

const { data } = await useFetch('/api/faculties', {
  query: {
    'fields[faculties]': 'id,name',
    'filter[published]': true,
    'page[size]': 0,
    nolinks: 1,
  },
  deep: false,
  watch: false,
});

const {
  data: faculties = [],
} = data.value ?? {};

const options = faculties?.map((faculty) => faculty?.attributes?.name);

const {
  swiperConfig,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Scrollbar],
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection class="s-reviews-intro">
    <div class="s-reviews-intro__banner">
      <picture class="s-reviews-intro__banner-image">
        <source
          srcset="/img/SReviewsIntro/s-reviews-intro_lg.webp"
          media="(min-width: 1200px)"
        >
        <source
          srcset="/img/SReviewsIntro/s-reviews-intro_md.webp"
          media="(min-width: 768px)"
        >
        <AImg
          src="/img/SReviewsIntro/s-reviews-intro_sm.webp"
          alt=""
          decoding="async"
        />
      </picture>
      <div class="s-reviews-intro__banner-content">
        <h1 class="a-font_banner">Отзывы <br>о демо-вузе</h1>
        <p class="a-font_slider-text s-reviews-intro__text">
          Мы ценим каждый отзыв студентов и&nbsp;выпускников. Ваша обратная связь помогает нам соответствовать самым высоким стандартам.
        </p>
      </div>
      <MReviewForm
        :options
        :action-params="[{param: 'form=otziv'}]"
      />
    </div>

    <div class="s-reviews-intro__ratings">
      <div class="s-reviews-intro__ratings-content">
        <h2 class="a-font_h4">Мы в рейтингах</h2>
        <p class="a-font_h6 s-reviews-intro__ratings-content-text">
          Регулярно обновляем программы обучения, чтобы вы получали только те знания и&nbsp;навыки, которые прямо сейчас востребованы на&nbsp;рынке труда.
          <br><br>
          Благодаря такому подходу мы занимаем лидирующие позиции в&nbsp;рейтингах по&nbsp;востребованности выпускникови качеству образования.
        </p>
        <picture class="s-reviews-intro__ratings-image">
          <source
            srcset="/img/SReviewsIntro/s-reviews-ratings_lg.webp"
            media="(min-width: 1200px)"
          >
          <source
            srcset="/img/SReviewsIntro/s-reviews-ratings_md.webp"
            media="(min-width: 768px)"
          >
          <AImg
            src="/img/SReviewsIntro/s-reviews-ratings_sm.webp"
            alt=""
            decoding="async"
          />
        </picture>
      </div>
      <div class="s-reviews-intro__slider">
        <swiper v-bind="swiperConfig">
          <swiper-slide
            v-for="item in raitings"
            :key="item.name"
            class="s-reviews-intro__slider-item"
          >
            <MRatingCard
              class="s-ratings__slide"
              :position="item.position"
              :organization="item.organization"
              :year="item.year"
              :image="item.image"
              :name="item.name"
            />
          </swiper-slide>
        </swiper>
        <div
          ref="scrollbarRef"
          class="swiper-scrollbar"
        />
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SReviewsIntro.scss';
</style>
