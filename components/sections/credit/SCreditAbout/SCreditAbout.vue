<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode } from 'swiper/modules';

const aboutCredit = [
  {
    title: 'Ставка 3% годовых',
    text: 'Вместо 22,22% годовых по общей ставке вы платите 3% на протяжении всего срока кредитования. Остальные 19,22% банку компенсирует государство. Условия кредита не изменятся, даже если ключевая ставка вырастет.',
  },
  {
    title: 'На любой период обучения',
    text: 'Можно оплатить один семестр, год или&nbsp;всё обучение целиком.',
  },
  {
    title: 'Платёж от 300 ₽/мес.',
    text: 'Во&nbsp;время обучения и&nbsp;9 месяцев после вы платите только проценты. Основную сумму можно вернуть в&nbsp;течение 15 лет, когда у&nbsp;вас уже будет работа и&nbsp;стабильный доход.',
  },
  {
    title: 'Досрочное погашение',
    text: 'При&nbsp;желании вы можете выплатить кредит раньше срока без&nbsp;комиссии.',
  },
];

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Оставьте заявку, чтобы узнать больше об&nbsp;условиях кредитования с&nbsp;поддержкой государства',
    subtitle: 'Заполните форму, и&nbsp;наш менеджер свяжется с&nbsp;вами',
    subtitleClass: 'a-font_h6',
    btn: 'Отправить',
    formPhone: true,
    formName: true,
    actionParams: [
      {param: 'grcampaign=e_mail_chain_vpo'},
      {param: 'form=get_credit'},
    ],
  });
}
</script>

<template>
  <MSection class="s-about-credit">
    <MCardText
      title="О кредите"
      title-class="a-font_h4"
      text="Образовательный кредит с&nbsp;господдержкой&nbsp;— целевой заём, который можно потратить только на&nbsp;учёбу. Выдаётся под&nbsp;льготную процентную ставку&nbsp;— 3% годовых, а&nbsp;разницу между рыночной ставкой и&nbsp;льготной компенсирует государство."
      text-class="a-font_h6"
    >
      <ul class="a-font_l-m">
        <li>Ставка 3% на&nbsp;весь срок кредитования</li>
        <li>Оформление с&nbsp;14 лет без&nbsp;справки о&nbsp;доходах</li>
        <li>
          Для&nbsp;школьников, студентов колледжей и тех, кто хочет получить среднее профессиональное или&nbsp;высшее образование
        </li>
      </ul>
      <AButton @click="openForm()">
        <span>Узнать условия</span>
      </AButton>
    </MCardText>

    <div class="s-about-credit__slider">
      <swiper
        :modules="[FreeMode]"
        :resistance-ratio="0"
        :space-between="0"
        :breakpoints="{
          1200: {
            allowSlideNext: false,
            allowSlidePrev: false,
          }
        }"
        slides-per-view="auto"
        resistance
        grab-cursor
        free-mode
      >
        <swiper-slide
          v-for="item in aboutCredit"
          :key="item.title"
        >
          <div
            class="s-about-credit__slider-title a-font_h6"
            v-html="item.title"
          />
          <div
            class="s-about-credit__slider-text a-font_m-m"
            v-html="item.text"
          />
          <ASvgMono name="simple-check" />
        </swiper-slide>
      </swiper>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCreditAbout.scss';
</style>
