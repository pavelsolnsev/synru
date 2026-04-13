<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';

const {
  swiperConfig,
} = useSwiperWrapper({
  enabled: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,

  breakpoints: {
    1200: {
      enabled: false,
    },
  },
});

const slides = [{
  title: 'Практика в&nbsp;300 + ведущих компаниях России',
  text: 'Среди которых VK, «Сбер», Kaspersky, X5 Retail Group, «Газпром» и&nbsp;т.&nbsp;д.',
  icon: 'simple-star2',
}, {
  title: 'Профильная подготовка',
  text: 'Например, студенты медицинского факультета практикуются в&nbsp;медицинских организациях Москвы и&nbsp;области',
  icon: 'simple-circles',
}, {
  title: 'Стажировки в&nbsp;зарубежных компаниях-партнёрах',
  text: 'В&nbsp;ОАЭ, Китае, Сербии, Турции, Малайзии и&nbsp;других странах',
  icon: 'simple-world',
}];

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: "Оставьте заявку&nbsp;— мы расскажем, как проходит практика у&nbsp;наших студентов",
    btn: 'Отправить',
    formName: true,
    formPhone: true,
    actionParams: [
      {param: 'form=industrial-practice'},
    ],
  });
}
</script>

<template>
  <MSection
    class="s-industrial-practice"
    title="Производственная практика"
  >
    <div class="s-industrial-practice__wrapper">
      <div class="s-industrial-practice__content">
        <h2 class="a-font_h2 s-industrial-practice__title">Производственная практика</h2>
        <p class="a-font_h6">На 2–3 курсе вы начинаете работать в настоящей компании. Это помогает понять, что ждёт после получения диплома, и оценить, насколько профессия вам подходит.</p>
        <AButton @click="openForm()">
          Подробнее
        </AButton>
      </div>
      <div class="s-industrial-practice__slider">
        <Swiper v-bind="swiperConfig">
          <SwiperSlide
            v-for="slide in slides"
            :key="slide.title"
            class="s-industrial-practice__slide"
          >
            <p
              class="a-font_h6"
              v-html="slide.title"
            />
            <p
              class="a-font_l-m"
              v-html="slide.text"
            />
            <ASvgMono :name="slide.icon" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SIndustrialPractice.scss';
</style>
