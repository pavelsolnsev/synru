<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import CardImage from '~/assets/images/s-foreign-documents/folder.webp';
import { documents } from './sForeignDocumentsData';

const {
  swiperRef,
  swiperConfig,
}  = useSwiperWrapper({
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
});
</script>

<template>
  <MSection class="s-foreign-documents">
    <div class="s-foreign-documents__wrapper">
      <div class="s-foreign-documents__top">
        <div class="s-foreign-documents__title a-font_h2">
          Какие документы нужны для&nbsp;поступления
        </div>

        <div class="s-foreign-documents__attention">
          <div class="s-foreign-documents__attention__title a-font_h6">
            ВНИМАНИЕ!
          </div>

          <div class="s-foreign-documents__attention__text a-font_l-r">
            Если в&nbsp;документе, удостоверяющем личность, и&nbsp;в&nbsp;документе о&nbsp;предыдущем образовании отсутствует перевод на&nbsp;русский язык, необходимо предоставить нотариально заверенный перевод.
          </div>
        </div>
      </div>

      <div class="s-foreign-documents__slider">
        <swiper
          ref="swiperRef"
          v-bind="swiperConfig"
        >
          <swiper-slide
            v-for="document, index in documents"
            :key="document.title"
            class="s-foreign-documents__document"
          >
            <AImg
              class="s-foreign-documents__document__image"
              alt="document"
              loading="lazy"
              :src="CardImage"
            />
            <div
              class="s-foreign-documents__document__title a-font_h6"
              v-html="document.title"
            />

            <div class="s-foreign-documents__document__bottom">
              <div
                class="s-foreign-documents__document__desc a-font_l-m"
                v-html="document.text"
              />
              <div class="s-foreign-documents__document__num a-font_h6">{{ formatNumberWithLeadingZero(index + 1) }}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SForeignDocuments.scss';
</style>
