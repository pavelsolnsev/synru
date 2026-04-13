<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Scrollbar } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

interface Props {
  items: {
    image: string,
    title: string,
    text: string
  }[],
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

const { openModal } = useModalStore();

function openFormReserve() {
  openModal('MModalForm', {
    title: 'Оставить заявку',
    btn: 'Отправить',
    formName: true,
    formPhone: true,
    actionParams: [
      { param: 'form=personnel_reserve' },
    ]
  });
}
</script>

<template>
  <MSection
    v-if="items?.length"
    title="Как поступить"
    class="s-reserve-how-proceed"
  >
    <Swiper
      ref="swiperRef"
      v-bind="swiperConfig"
    >
      <SwiperSlide
        v-for="(item, index) in items"
        :key="index"
        class="s-reserve-how-proceed__slide"
      >
        <div class="s-reserve-how-proceed__content">
          <div
            class="s-reserve-how-proceed__title a-font_h5"
            v-html="item.title"
          />
          <div
            class="s-reserve-how-proceed__text a-font_l-m"
            v-html="item.text"
          />
          <ATag
            :text="formatNumberWithLeadingZero(index + 1)"
            class="s-reserve-how-proceed__num a-tag--white a-tag--blur"
          />
        </div>
        <AImg
          class="s-reserve-how-proceed__image"
          :src="item.image"
          alt=""
          decoding="async"
          loading="lazy"
        />
        <AButton
          v-if="!index"
          class="s-reserve-how-proceed__btn"
          @click="openFormReserve()"
        >
          Оставить заявку
        </AButton>
      </SwiperSlide>
    </Swiper>
    <MSwiperNav ref="navRef" />
    <div
      ref="scrollbarRef"
      class="swiper-scrollbar"
    />
  </MSection>
</template>

<style lang="scss" scoped>
  @import './SReserveHowProceed.scss';
</style>
