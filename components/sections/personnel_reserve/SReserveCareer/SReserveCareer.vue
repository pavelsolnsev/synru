<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Scrollbar, Navigation } from 'swiper/modules';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

const {
  swiperRef,
  swiperConfig,
  scrollbarRef,
  navRef,
} = useSwiperWrapper({
  modules: [Scrollbar, Navigation],
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

const items = [{
  title: '1 курс',
  img: '',
  list: ['Менеджер по продажам', 'Младший специалист', 'Менеджер отдела прямого маркетинга'],
}, {
  title: '2 курс',
  img: '',
  list: ['Аккаунт-менеджер', 'Старший специалист', 'Проектный менеджер', 'Младший бухгалтер'],
}, {
  title: '3 курс',
  img: '',
  list: ['Event-менеджер', 'Руководитель группы', 'Специалист по госпроектам', 'Тренинг-менеджер', 'Менеджер по работе с&nbsp;партнёрами'],
}, {
  title: '4 курс',
  img: '',
  list: ['Руководитель отдела', 'Продюсер', 'Экономист', 'Аналитик', 'Интернет-маркетолог', 'Ведущий проектный менеджер', 'Главный менеджер по продажам'],
}, {
  title: 'Магистратура',
  img: '',
  list: ['Руководитель департамента', 'Бизнес-тренер', 'Руководитель продукта', 'Заместитель директора', 'Руководитель проекта', 'Старший финансист'],
}, {
  title: 'Аспирантура',
  img: '',
  list: ['Коммерческий директор', 'Финансовый директор', 'Директор филиала'],
}];

const bannerItems = [{
  icon: 'simple-hat',
  title: 'Высшее образование',
}, {
  icon: 'simple-bag',
  title: 'Карьера <br>с&nbsp;<nobr>1-го</nobr> курса',
}, {
  icon: 'simple-home',
  title: 'Общежитие для студентов',
}, {
  icon: 'simple-plane',
  title: 'Учёба в&nbsp;Москве',
}];
</script>

<template>
  <MSection
    class="s-reserve-career"
    title="Карьера"
  >
    <div class="s-reserve-career__slider">
      <Swiper
        ref="swiperRef"
        v-bind="swiperConfig"
      >
        <SwiperSlide
          v-for="item, idx in items"
          :key="item.title"
          class="s-reserve-career__slide"
        >
          <div class="s-reserve-career__title a-font_h4">{{ item.title }}</div>
          <AImg
            :src="`/img/personnel_reserve/reserve-career-${idx+1}.webp`"
            alt=""
            decoding="async"
            loading="lazy"
          />
          <div class="a-font_h6">Твоя должность:</div>
          <ul class="s-reserve-career__list a-font_m-m">
            <li
              v-for="listItem in item.list"
              :key="listItem"
              class="s-reserve-career__list-item"
              v-html="listItem"
            />
          </ul>
        </SwiperSlide>
      </Swiper>
      <MSwiperNav ref="navRef" />
      <div
        ref="scrollbarRef"
        class="swiper-scrollbar"
      />
    </div>

    <div class="s-reserve-career__banner">
      <div class="s-reserve-career__banner-content">
        <div class="a-font_h4 red s-reserve-career__banner-title">«Кадровый резерв» —</div>
        <div class="a-font_h6 s-reserve-career__banner-subtitle">тщательно продуманная и&nbsp;успешно проверенная <br>на практике система подготовки опытных специалистов, <br>готовых к&nbsp;реализации сложных и&nbsp;неординарных проектов.</div>
        <div class="a-font_l-m s-reserve-career__banner-text">
          <p>Студенты трудоустраиваются в&nbsp;партнёрские организации одновременно с&nbsp;зачислением. Они начинают с&nbsp;рядовых позиций и&nbsp;по&nbsp;мере роста компетенций и&nbsp;навыков продвигаются по&nbsp;карьерной лестнице до&nbsp;должности руководителя группы, отдела или&nbsp;целого департамента.</p>
          <p>Выпускники программы занимают высокие позиции в&nbsp;партнёрских компаниях, а&nbsp;также в&nbsp;других ведущих отечественных и&nbsp;зарубежных компаниях, органах власти и&nbsp;государственных корпорациях.</p>
        </div>
      </div>
      <div class="s-reserve-career__banner-items">
        <div
          v-for="item in bannerItems"
          :key="item.title"
          class="s-reserve-career__banner-item"
        >
          <ASvgMono :name="item.icon" />
          <div
            class="a-font_l-m"
            v-html="item.title"
          />
        </div>
      </div>
      <picture>
        <source
          media="(min-width: 1200px)"
          srcset="/img/personnel_reserve/reserve-career-banner-lg.webp"
        >
        <AImg
          src="/img/personnel_reserve/reserve-career-banner-sm.webp"
          alt=""
        />
      </picture>
    </div>

    <MFormMin
      title="Заполни форму и узнай, как учиться и работать в Москве"
      bg-color="red"
      title-class="a-font_h3"
      :action-params="[
        {param: 'form=reserve_career'}
      ]"
    />
  </MSection>
</template>

<style lang="scss" src="./SReserveCareer.scss" scoped></style>
