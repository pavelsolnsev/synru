<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import BgImageLg from '~/assets/images/s_cooperation/line_lg.svg?url';
import BgImageMd from '~/assets/images/s_cooperation/line_md.svg?url';
import BgImageSm from '~/assets/images/s_cooperation/line_sm.svg?url';

interface Props {
  title?: string;
  description?: string;
  btnText?: string;
  link?: string;
  cooperationItems?: Array<{
    icon?: string;
    image: string;
    title: string;
  }>
}

const {
  title = 'Международное сотрудничество',
  description = '',
  btnText = 'Узнать о партнёрах',
  link = '',
  cooperationItems = [],
} = defineProps<Props>();
</script>

<template>
  <MSection
    class="s-cooperation"
    :title
  >
    <div class="s-cooperation__wrap">
      <MCardText
        class="s-cooperation__card"
        :title="description"
        :bg-image="BgImageSm"
        :bg-image-md="BgImageMd"
        :bg-image-lg="BgImageLg"
      >
        <AButton
          :to="link"
        >
          <span v-html="btnText" />
        </AButton>
      </MCardText>

      <div class="s-cooperation__items">
        <swiper
          :space-between="0"
          :resistance="true"
          :resistance-ratio="0"
          slides-per-view="auto"
          grab-cursor
        >
          <swiper-slide
            v-for="item in cooperationItems"
            :key="item.title"
            class="cooperationItem"
          >
            <div class="cooperationItem__logo">
              <AImg
                :src="item.image"
                decoding="async"
              />
            </div>
            <div
              class="cooperationItem__text a-font_l-m"
              v-html="item.title"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCooperation.scss';
</style>
