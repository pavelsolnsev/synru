<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

const data = {
  title: 'Этапы взаимодействия',
  cards: [
    {
      title: 'Оставьте заявку на&nbsp;сайте или&nbsp;позвоните&nbsp;нам',
      icon: 'pen-filled',
    },
    {
      title: 'Уточним потребности <br>и&nbsp;детали сотрудничества: проанализируем вашу заявку, определим, сколько специалистов требуется, на&nbsp;каких условиях <br>и&nbsp;в&nbsp;какие сроки',
      icon: 'doc-filled',
    },
    {
      title: 'Согласуем все условия и&nbsp;подпишем договор, в&nbsp;котором зафиксируем обязательства',
      icon: 'bag-filled',
    },
    {
      title: 'Подберём кандидатов и&nbsp;проведём конкурсный <br>отбор; одобренные специалисты пройдут необходимое обучение <br>перед выездом',
      icon: 'star-filled',
    },
    {
      title: 'Подготовим полный пакет документов для&nbsp;каждого сотрудника и&nbsp;обеспечим легальное трудоустройство в&nbsp;соответствии с&nbsp;требованиями законодательства',
      icon: 'file-filled',
    },
    {
      title: 'Организуем транспортировку сотрудников в&nbsp;Россию, встретим и&nbsp;разместим.&nbsp;На&nbsp;первых этапах обеспечим сопровождение: поможем с&nbsp;адаптацией, решением бытовых вопросов и&nbsp;предоставим поддержку 24/7',
      icon: 'case-filled',
    },
  ],
};

const {
  swiperRef,
  swiperConfig,
  navRef,
} = useSwiperWrapper({
  modules: [Navigation],
  slidesPerView: 'auto',
  direction: 'horizontal',
  spaceBetween: 20,
  showSwiperNavigation: true,
});

const { openModal } = useModalStore();

const modalProps = {
  title: 'Заполните форму, мы свяжемся с&nbsp;вами и&nbsp;начнём подбор уже сегодня',
  actionParams: [
    {
      param: 'form=konsultatsija_etapu',
    },
  ],
};
</script>

<template>
  <MSectionNewResponsive
    class="s-international-contour-steps"
    :title="data.title"
    with-sides
  >
    <div class="s-international-contour-steps__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="(card, index) in data.cards"
          :key="card.title"
          class="s-international-contour-steps__slide"
        >
          <div class="s-international-contour-steps__top">
            <div class="s-international-contour-steps__number a-font_h5">{{ formatNumberWithLeadingZero(index+1) }}</div>
            <ASvgMono
              :name="card.icon"
              class="s-international-contour-steps__icon"
            />
          </div>
          <div
            class="s-international-contour-steps__title a-font_l-m"
            v-html="card.title"
          />
        </SwiperSlide>
      </Swiper>
      <MSwiperNav
        ref="navRef"
        class="s-international-contour-steps__navigation"
      />
    </div>
    <div class="s-international-contour-steps__list">
      <div
        v-for="(card, index) in data.cards"
        :key="card.title"
        class="s-international-contour-steps__slide"
      >
        <div class="s-international-contour-steps__top">
          <div class="s-international-contour-steps__number a-font_h5">{{ formatNumberWithLeadingZero(index+1) }}</div>
          <ASvgMono
            :name="card.icon"
            class="s-international-contour-steps__icon"
          />
        </div>
        <div
          class="s-international-contour-steps__title a-font_l-m"
          v-html="card.title"
        />
      </div>
    </div>
    <AButton
      class="s-international-contour-steps__btn"
      @click="openModal('MModalContourForm', modalProps)"
    >
      Оставить заявку
    </AButton>
  </MSectionNewResponsive>
</template>

<style scoped lang="scss">
@import './SInternationalContourSteps';
</style>


