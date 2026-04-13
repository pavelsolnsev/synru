<script setup lang="ts">
import img1 from '~/assets/images/s-articles-header/btn_1.webp';
import img2 from '~/assets/images/s-articles-header/btn_2.webp';
import img3 from '~/assets/images/s-articles-header/btn_3.webp';
import img4 from '~/assets/images/s-articles-header/btn_4.webp';
import img5_1 from '~/assets/images/s-articles-header/btn_5_1.webp';
import img5_2 from '~/assets/images/s-articles-header/btn_5_2.webp';
import { Swiper } from 'swiper/vue';
import { ROUTES } from '~/constants';

const {
  swiperRef,
  swiperConfig,
}  = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance:true,
  resistanceRatio: 0,
});

const emits = defineEmits(['openMenu']);

const { openModal } = useModalStore();
</script>

<template>
  <header>
    <div
      id="header"
      class="s-header"
    >
      <NuxtLink
        class="s-header__logo"
        to="/"
      >
        <ALogo />
      </NuxtLink>

      <div class="s-header__slider">
        <swiper
          ref="swiperRef"
          v-bind="swiperConfig"
        >
          <template #wrapper-start>
            <NuxtLink
              class="swiper-slide a-font_m-m s-header__link"
              :to="ROUTES.ADMISSION_COMMITTEE"
            >
              <span>Приёмная комиссия</span>
              <AImg
                alt="admission"
                :src="img1"
              />
            </NuxtLink>

            <button
              class="a-font_m-m swiper-slide --red s-header__link --quiz-popup-opener"
              @click.stop="showQuizPopup([{param: 'form=podabrat_programmu'}])"
            >
              <span>Подобрать программу</span>
              <AImg
                alt="admission"
                :src="img2"
              />
            </button>

            <button
              class="a-font_m-m swiper-slide --start-free s-header__link --quiz-popup-opener"
              @click.stop="openModal('SArticlesPopupFirst')"
            >
              <span>Начать бесплатно</span>
              <AImg
                alt="admission"
                :src="img5_1"
              />
              <AImg
                alt="admission"
                :src="img5_2"
              />
            </button>

            <button
              class="swiper-slide a-font_m-m s-header__link"
              @click.stop="openModal('SArticlesPopupSecond')"
            >
              <span>Хочу поступить</span>
              <AImg
                alt="admission"
                :src="img3"
              />
            </button>

            <NuxtLink
              class="swiper-slide a-font_m-m s-header__link"
              :to="ROUTES.CREDIT"
            >
              <span>Кредит на образование</span>
              <AImg
                alt="admission"
                :src="img4"
              />
            </NuxtLink>
          </template>
        </swiper>
      </div>

      <div class="s-header__tools">
        <div class="s-header__search">
          <MSearch placeholder="Поиск" />
          <button class="s-header__search-toggler">
            <ASvgMono name="loupe-outline" />
          </button>
        </div>

        <button
          class="s-header__burger"
          @click="emits('openMenu')"
        >
          <span class="s-header__burger-icon" />
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import './SArticlesHeader.scss';
</style>

<style lang="scss">
.m-modal-wrapper.--modal-s-articles-popup-first,
.m-modal-wrapper.--modal-s-articles-popup-second {
  overflow: auto;
  background-color: rgba(28, 28, 28, 0.9);
  .m-modal-content {
    align-items: initial;
    justify-content: initial;
  }
  .m-modal-close {
    background-color: var(--a-color_grey_40) !important;
  }
}
</style>
