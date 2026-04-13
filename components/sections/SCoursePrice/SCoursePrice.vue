<script setup lang='ts'>
import type { CourseEntity } from '~/types';
import { LK_CHECKOUT } from '~/constants/routes';

interface Props {
  entity?: CourseEntity;
}

const {
  entity = null,
} = defineProps<Props>();

const slides = [{
  title: 'Введите номер телефона и&nbsp;оплатите&nbsp;курс',
  text: 'Номер станет вашим логином',
  image: '/img/courses/s-course-price_1.webp',
}, {
  title: 'Начните обучение',
  text: 'Доступ откроется автоматически после оплаты',
  image: '/img/courses/s-course-price_3.webp',
}];

const {
  external_id: externalId = null,
  price = 0,
  currency = '',
  is_express,
} = entity?.properties || {};

const hasPriceInfo = externalId && price && currency;
</script>

<template>
  <MSection
    v-if="hasPriceInfo && !is_express"
    class="s-course-price"
  >
    <div class="s-course-price__content">
      <div class="s-course-price__prices">
        <h2 class="a-font_h3">
          Стоимость: <span class="red">{{ price }} <span class="ruble-icon">Р</span></span>
        </h2>
        <div class="s-course-price__info">
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="s-course-price__info-item"
          >
            <p
              class="a-font_h6 s-course-price__info-title"
              v-html="slide.title"
            />
            <p
              class="a-font_m-m s-course-price__info-text"
              v-html="slide.text"
            />

            <AImg
              :src="slide.image"
              decoding="async"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <MForm
        title=""
        title-class="a-font_h4"
        subtitle=""
        subtitle-class="a-font_m-m"
        bg-color="white"
        :form-name="false"
        btn="Отправить"
        :redirect-path="`${LK_CHECKOUT}/${entity?.id}`"
        :action-params="[
          {param: 'form=course_pay'},
        ]"
      />
    </div>
  </MSection>
</template>
<style scoped lang='scss'>
@import './SCoursePrice.scss';
</style>
