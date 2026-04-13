<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { levels } from './sFriendsLevelsData';
import LevelBg from '~/assets/images/friends/levels/s-friends-levels-advantage.webp';

const {
  swiperRef,
  swiperConfig,
}  = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
});
</script>

<template>
  <MSection
    class="s-friends-levels"
    title="Твои привилегии в&nbsp;программе"
  >
    <swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      class="s-friends-levels__items"
    >
      <swiper-slide
        v-for="level, index in levels"
        :key="level.title"
        class="s-friends-levels__item"
      >
        <div
          class="s-friends-levels__item__percentage a-font_banner"
          v-html="level.percent"
        />
        <div
          class="s-friends-levels__item__percentage-text a-font_l-m"
          v-html="level.percentText"
        />

        <div
          class="s-friends-levels__item__advantages a-font_l-m"
        >
          <template
            v-for="advantage in level.advantages"
            :key="advantage"
          >
            <div class="s-friends-levels__item__advantage">
              <ASvgMono
                class="s-friends-levels__item__advantage-icon"
                name="plus"
              />
              <div
                class="s-friends-levels__item__advantage-text"
                v-html="advantage"
              />
            </div>
          </template>
        </div>

        <div class="s-friends-levels__item__line" />

        <div
          class="s-friends-levels__item__title"
          v-html="level.title"
        />

        <div
          class="s-friends-levels__item__subtitle a-font_m-m"
          v-html="level.subtitle"
        />

        <AImg
          v-if="index === levels.length - 1"
          class="s-friends-levels__item__bg"
          alt="level"
          :src="LevelBg"
        />
      </swiper-slide>
    </swiper>

    <MFormMin
      bg-color="black"
      show-logo
      title="Присоединяйся к&nbsp;нашей программе и&nbsp;зарабатывай"
      :action-params="[{param: 'form=friends_level'}]"
    />
  </MSection>
</template>

<style lang="scss" scoped>
@import './SFriendsLevels.scss';
</style>
