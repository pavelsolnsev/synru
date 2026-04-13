<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import Placeholder from '~/assets/images/global/placeholder_card.svg?url';

interface Team {
  img: string,
  title: string,
  subtitle: string,
  text: string,
  socialLink?: string,
  socialNameLogo?: string
}

interface Props {
  title: string,
  titleCard: string,
  textCard: string,
  teams: Team[]
}

defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  navRef,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Navigation, Scrollbar],
  showSwiperNavigation: true,
  showSwiperScrollbar: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
  scrollbar: {
    draggable: true,
    hide: false,
    horizontalClass: 'swiper-scrollbar',
  },
});
</script>

<template>
  <MSection
    class="s-kvn-teams"
    :title
  >
    <MCardText
      title-class="a-font_h5"
      text-class="a-font_xl-m"
      :title="titleCard"
      :text="textCard"
    />
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      class="s-kvn-teams__slider"
    >
      <swiper-slide
        class="m-card-text"
      >
        <MCardText
          title-class="a-font_h5"
          text-class="a-font_xl-m"
          class="swiper-slide"
          style="height: 100%;"
          :title="titleCard"
          :text="textCard"
        />
      </swiper-slide>
      <swiper-slide
        v-for="(team, index) in teams"
        :key="index"
        class="s-kvn-teams__item"
      >
        <AImg
          data-srcset=""
          decoding="async"
          :src="Placeholder"
          :srcset="team.img"
          :alt="team.title"
        />
        <div class="a-font_m-m s-kvn-teams__item-desc">
          <p class="s-kvn-teams__item-subtitle">
            Команда
          </p>
          <p
            class="s-kvn-teams__item-title a-font_h5"
            v-html="team.title"
          />
          <div class="s-kvn-teams__item-text">
            <b>
              {{ team.subtitle }}
            </b>
            <p v-html="team.text" />
          </div>
          <AButtonThird
            v-if="team.socialLink"
            size="lg_m"
            :to="team.socialLink"
          >
            <span>Присоединиться</span>
            <ASvgMono
              v-if="team.socialNameLogo"
              :name="team.socialNameLogo"
            />
          </AButtonThird>
        </div>
      </swiper-slide>
      <MSwiperNav ref="navRef" />
    </swiper>
    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SKvnTeams.scss';
</style>
