<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';
import Image1 from '~/assets/images/credit/how_get_credit/1.webp';
import Image2 from '~/assets/images/credit/how_get_credit/2.webp';
import Image3 from '~/assets/images/credit/how_get_credit/3.webp';
import Image4 from '~/assets/images/credit/how_get_credit/4.webp';
import type { Fonts } from '~/types';

interface Props {
  title?: string;
  titleClass?: Fonts;
  itemsClass?: string;
  items?: { text: string, image: string }[]
}

const {
  title = 'Как получить кредит',
  titleClass,
  itemsClass = '',
  items = [],
} = defineProps<Props>();

const defaultItems = [
  {
    text: 'Подпишите договор с&nbsp;вузом или&nbsp;колледжем о&nbsp;том, что будете учиться платно.',
    image: Image1,
  },
  {
    text: 'Приходите с&nbsp;паспортом, договором на&nbsp;обучение и&nbsp;счётом на&nbsp;оплату в&nbsp;офис СберБанка или&nbsp;оставьте заявку на&nbsp;сайте и&nbsp;менеджер перезвонит&nbsp;вам.',
    image: Image2,
  },
  {
    text: 'Подпишите кредитный договор с&nbsp;банком.',
    image: Image3,
  },
  {
    text: 'Банк перечислит деньги на&nbsp;счёт учебного заведения. Сохраните платёжный документ, в&nbsp;случае необходимости сможете подтвердить оплату.',
    image: Image4,
  },
];

const creditItems = items?.length
  ? items
  : defaultItems;
</script>

<template>
  <MSection
    class="s-how-get-credit"
    :title
    :title-class
  >
    <div class="s-how-get-credit__slider">
      <swiper
        :modules="[FreeMode]"
        :space-between="0"
        :resistance-ratio="0"
        :class="itemsClass"
        slides-per-view="auto"
        grab-cursor
        resistance
        free-mode
      >
        <swiper-slide
          v-for="item,index in creditItems"
          :key="item.text"
        >
          <AImg
            :src="item.image"
            alt="how_get_credit"
            decoding="async"
          />
          <div class="s-how-get-credit__slider-num a-font_h6">
            {{ formatNumberWithLeadingZero(index + 1) }}
          </div>
          <div
            class="s-how-get-credit__slider-text a-font_l-m"
            v-html="item.text"
          />
        </swiper-slide>
      </swiper>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCreditHowGet.scss';
</style>
