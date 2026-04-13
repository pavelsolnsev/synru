<script setup lang="ts">
interface Props {
  id: string;
  level?: string;
  faculty?: string;
  isNew?: boolean;
  isFree?: boolean;
  isPopular?: boolean;
  isOnline?: boolean;
  name?: string;
  link?: string;
  place?: string;
  isPartner?: boolean;
  isShowEnroll?: boolean;
  price?: string;
  presentationLink?: string;
  showPresentation?: boolean;
  ico?: string;
  btnText?: string;
}

const {
  level = '',
  faculty = '',
  isNew = false,
  isFree = false,
  name = '',
  link = '',
  place = '',
  isPartner = false,
  isOnline = false,
  isShowEnroll = false,
  price = '',
  presentationLink = '',
  showPresentation = false,
  btnText = 'Поступить',
} = defineProps<Props>();

const emits = defineEmits(['enroll']);
</script>

<template>
  <div
    class="specialty-card --landing"
    @click.prevent="emits('enroll')"
  >
    <span>
      <div class="specialty-card__inner">
        <div class="specialty-card__top">
          <div class="specialty-card__breadcrumb a-font_m-m">
            <span
              v-if="level"
              class="specialty-card__note"
              v-html="level"
            />
            <span
              v-if="faculty"
              class="specialty-card__label"
              v-html="faculty"
            />
          </div>
          <div class="specialty-card__info">
            <span
              v-if="isNew && !showPresentation"
              class="specialty-card__new a-font_xs-m"
            >
              Новая
            </span>
            <span
              v-if="isFree"
              class="specialty-card__free a-font_xs-m"
            >
              Бесплатно
            </span>
          </div>
        </div>
        <div class="specialty-card__content">
          <span class="specialty-card__title a-font_h5">
            <span v-html="name" />
          </span>
          <div
            v-if="!showPresentation"
            class="specialty-card__tags a-font_m-m"
          >
            <span
              v-if="place"
              class="specialty-card__tag specialty-card__place"
            >
              <ASvgMono name="speciality_place" />
              <span v-html="place" />
            </span>
            <span
              v-if="isOnline"
              class="specialty-card__tag specialty-card__online"
            >
              <ASvgMono name="speciality_online" />
              <span>Можно дистанционно</span>
            </span>
            <span
              v-if="isPartner"
              class="specialty-card__tag specialty-card__partner"
            >
              <ASvgMono name="speciality_partner" />
              <span>
                Партнёрская программа
              </span>
            </span>
          </div>
        </div>
        <MSpecialtyCardPresentationButtons
          v-if="showPresentation"
          :id
          :faculty
          :presentation-link
          :ico
        />
        <MSpecialtyCardButtons
          v-else
          :is-show-enroll
          :link
          :price
          :ico
          :btn-text
          @enroll="emits('enroll')"
        />
      </div>
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import './MSpecialtyCard.scss';
</style>
