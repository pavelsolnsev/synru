<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar } from 'swiper/modules';
import type { SectionConditionalGroup } from '~/types';

interface Props {
  conditionalGroup?: SectionConditionalGroup[];
  entity?: {
    id?: number;
  };
  routeName?: string;
}

const {
  conditionalGroup = [],
  entity = {},
  routeName = '',
} = defineProps<Props>();

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
    horizontalClass: 'swiper-scrollbar',
  },
});

const slides = [{
  img: '/img/SCombineLife/image.webp',
}, {
  img: '/img/SCombineLife/image-1.webp',
}, {
  img: '/img/SCombineLife/image-2.webp',
}, {
  img: '/img/SCombineLife/image-3.webp',
}, {
  img: '/img/SCombineLife/image-4.webp',
}];

const showSection = needRenderSection({ conditionalGroup, data: { entityId: entity?.id } });

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Оставьте контакты, мы свяжемся с&nbsp;вами и&nbsp;расскажем про&nbsp;общежития подробнее',
    btn: 'Отправить заявку',
    formName: true,
    formPhone: true,
    actionParams: [
      { param: 'form=Obshchezhitiya_form' },
    ],
    routeName: routeName,
  });
}
</script>

<template>
  <MSection
    v-if="showSection"
    class="s-combine-life"
  >
    <div class="s-combine-life__banner">
      <h2 class="s-combine-life__banner-title a-font_h3">Общежития и&nbsp;коливинги с&nbsp;отличными условиями</h2>
      <div class="s-combine-life__banner-text a-font_l-m">
        <ul>
          <li>Свежий ремонт и хорошая мебель</li>
          <li>Бесплатный Wi-Fi</li>
          <li>Оборудованные кухни и постирочные</li>
          <li>Клининг общих зон</li>
          <li>Комнаты отдыха</li>
          <li>Мероприятия и мастер-классы</li>
        </ul>
        <p class="a-font_h6">И всё это — близко к учебным корпусам!</p>
      </div>
      <AButton @click="openForm()">
        Узнать больше
      </AButton>
    </div>

    <div class="s-combine-life__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="slide in slides"
          :key="slide.img"
          class="s-combine-life__slide"
        >
          <AImg
            :src="slide.img"
            loading="lazy"
            decoding="async"
          />
        </SwiperSlide>
      </Swiper>
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SCombineLife.scss';
</style>
