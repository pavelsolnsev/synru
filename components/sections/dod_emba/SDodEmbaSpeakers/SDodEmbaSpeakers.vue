<script lang="ts" setup>
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar } from 'swiper/modules';

interface Props {
  title: string
  speakers: {
    description: string
    name: string
    photo: string
    theme: string
  }[]
}

defineProps<Props>();

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
} = useSwiperWrapper({
  modules: [Scrollbar],
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
    class="s-dodemba-speakers"
    :title
  >
    <div class="s-dodemba-speakers__body">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="item in speakers"
          :key="item.name"
          class="s-dodemba-speakers__speaker"
        >
          <div class="s-dodemba-speakers__wrapper">
            <div class="s-dodemba-speakers__name">{{ item.name }}</div>
            <div class="s-dodemba-speakers__theme">
              <span>Тема выступления:<br> </span>
              <span>{{ item.theme }}</span>
            </div>
            <div class="s-dodemba-speakers__description s-dodemba-speakers__description_desktop">{{ item.description }}</div>
          </div>

          <div class="s-dodemba-speakers__mobile-wrapper">
            <AImg
              class="s-dodemba-speakers__img"
              :src="item.photo"
              :alt="item.name"
            />
            <div class="s-dodemba-speakers__description s-dodemba-speakers__description_mobile">{{ item.description }}</div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SDodEmbaSpeakers.scss';
</style>
