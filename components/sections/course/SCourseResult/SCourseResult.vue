<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import mapCustomFields from '~/utils/mapCustomFields';
import type { CourseEntity, CourseCustomField } from '~/types';
import { useWindowSize } from '@vueuse/core';
import DocImage from '~/assets/images/program/result/doc.svg?url';

interface Props {
  entity: CourseEntity | null;
}

const { entity = null } = defineProps<Props>();

const {
  additional_documents:additionalDocuments = [],
}: { additional_documents: CourseCustomField['additional_documents'] } = mapCustomFields(entity?.custom_field_values || []);

const { width: windowWidth } = useWindowSize();
</script>

<template>
  <MSection
    v-if="additionalDocuments.length"
    class="s-result"
  >
    <div class="s-result__item">
      <h3 class="s-result__item-title a-font_h3">
        Документ об&nbsp;образовании
      </h3>
      <p class="s-result__item-subtitle a-font_h5">
        По&nbsp;окончании обучения вы получите документ, который можно добавить к&nbsp;резюме при&nbsp;трудоустройстве
      </p>
      <p class="s-result__item-text a-font_l">
        Он подтверждает качественную подготовку специалиста и&nbsp;наличие у&nbsp;него навыков, необходимых для&nbsp;успешной работы по&nbsp;профессии.
      </p>
    </div>

    <div class="s-result__item">
      <swiper
        class="s-result__slider"
        effect="fade"
        :modules="[Pagination, Navigation]"
        :grab-cursor="true"
        :slides-per-view="1"
        :free-mode="false"
        :space-between="windowWidth / 360 * 12"
        :resistance="true"
        :resistance-ratio="0"
        :navigation="{
          nextEl: '.s-result__slider .swiper-button-next',
          prevEl: '.s-result__slider .swiper-button-prev'
        }"
        :pagination="{
          el: '.s-result__slider .swiper-pagination',
          type: 'fraction',
        }"
        :breakpoints=" {
          768: {
            spaceBetween: windowWidth / 768 * 12
          },
          1200: {
            spaceBetween: windowWidth / 1920 * 24
          },
        }"
      >
        <swiper-slide
          v-for="doc, index in additionalDocuments"
          :key="index"
        >
          <p
            class=" a-font_h6"
            v-html="doc.title"
          />
          <div class="s-result__item-image">
            <AImg
              :src="DocImage"
              loading="lazy"
              decoding="async"
            />
          </div>
          <AButtonSecond
            :to="doc.link ?? ''"
            bg-color="transparent"
            data-fancybox
            data-class="--docs-popup"
          >
            <span>Смотреть образец</span>
          </AButtonSecond>
        </swiper-slide>
        <div class="swiper-navigation">
          <div class="swiper-pagination a-font_l" />
          <div class="swiper-button-prev">
            <ASvgMono name="simple-arrow" />
          </div>
          <div class="swiper-button-next">
            <ASvgMono name="simple-arrow" />
          </div>
        </div>
      </swiper>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import '../../program/SProgramResult/SProgramResult.scss';
</style>

<style lang="scss">
.--docs-popup .fancybox__content {
  @include desktop(min) {
    max-width: 80% !important;
  }
}
.fancybox__content {
  padding: calc(var(--scale)* 12) !important;

  @include desktop(min) {
    padding: calc(var(--scale)* 24) calc(var(--scale)* 24) calc(var(--scale)* 20) !important;
  }

  .fancybox-image {
    position: relative;
    box-sizing: border-box;
    object-fit: cover;
  }
}
</style>
