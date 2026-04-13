<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { centerCards, curatorCards } from './happinessData';
import { ROUTES } from '~/constants';
import BannerImg from '~/assets/images/s_happiness/banner.webp';

const swiperConfig = {
  grabCursor: true,
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
};
</script>

<template>
  <MSection
    title="Департамент заботы"
    class="s-happiness"
  >
    <div class="s-happiness__content">
      <div class="s-happiness__grid">
        <MCardText
          title-class="a-font_h5"
          title="Сотрудники этого подразделения занимаются не&nbsp;просто решением всевозможных проблем, они стараются сделать всё, чтобы вы&nbsp;получали от&nbsp;учебы удовольствие, чтобы демо-вуз стал вашим вторым домом."
          text="<p>После поступления вы&nbsp;сможете обращаться в&nbsp;Департамент заботы.</p><p>За&nbsp;каждым учащимся закреплен куратор. Он&nbsp;подскажет расписание, напомнит о&nbsp;сроках сдачи, проконсультирует по&nbsp;вопросам оплаты и&nbsp;предложит мероприятия, отвечающие вашим интересам.</p><p>Для вашего удобства разработан студенческий многофункциональный центр, оптимизирующий документооборот и&nbsp;облегчающий получение различных справок и&nbsp;регистраций.</p>"
          text-class="a-font_l-m"
          :icons="['simple-smile', 'simple-star']"
        >
          <AButton
            :to="ROUTES.HAPPINESS_DEPARTMENT"
          >
            <span>Подробнее</span>
          </AButton>
        </MCardText>
        <div class="s-happiness__banner">
          <AImg
            :src="BannerImg"
            alt="Департамент заботы"
            decoding="async"
            width="336"
            height="224"
          />
          <AButton
            :to="ROUTES.HAPPINESS_DEPARTMENT"
          >
            <span>Подробнее</span>
          </AButton>
        </div>
      </div>
      <div class="s-happiness__block">
        <div class="s-happiness__block-title a-font_h4">
          Узнать о&nbsp;вашем персональном кураторе можно:
        </div>
        <div class="s-happiness__block-curator-slider">
          <swiper
            v-bind="swiperConfig"
            slides-per-view="auto"
          >
            <swiper-slide
              v-for="item in curatorCards"
              :key="item.link"
              class="s-happiness__curator-card"
            >
              <div
                class="a-font_h6"
                v-html="item.title"
              />
              <NuxtLink
                :to="item.href"
                class="a-tag"
              >
                <ATag
                  :text="item.link"
                  variant="primary"
                />
              </NuxtLink>
              <AImg
                :src="item.img"
                :alt="item.link"
                loading="lazy"
                decoding="async"
                width="120"
                height="120"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="s-happiness__block">
        <div class="s-happiness__block-title a-font_h4">
          Студенческие многофункциональные центры расположены:
        </div>
        <div class="s-happiness__block-center-slider">
          <swiper
            v-bind="swiperConfig"
            slides-per-view="auto"
          >
            <swiper-slide
              v-for="item in centerCards"
              :key="item.title"
              class="s-happiness__center-card"
            >
              <div
                class="s-happiness__center-card-title a-font_h6"
                v-html="item.title"
              />
              <div class="s-happiness__center-card-bottom a-font_l-m">
                <p v-html="item.text" />
                <div class="s-happiness__center-card-icon">
                  <ASvgMono name="simple-placemark-dot" />
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SHappiness.scss';
</style>
