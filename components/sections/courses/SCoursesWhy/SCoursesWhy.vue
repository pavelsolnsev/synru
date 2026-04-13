<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';

const whySynergyList = [
  {
    num: '70+',
    title: 'Наша сила&nbsp;— в&nbsp;практике',
    text: 'всех программ посвящены не&nbsp;сложной теории, а&nbsp;отработке практических заданий, чтобы вы не&nbsp;только получили знания, но&nbsp;и&nbsp;в&nbsp;совершенстве освоили все навыки новой профессии',
  },
  {
    num: '40+',
    title: 'Будь в тренде',
    text: 'программ по&nbsp;различным направлениям, чтобы вы смогли выбрать именно ту профессию, которая будет вам по&nbsp;душе, или&nbsp;ту, в&nbsp;которой вы давно хотели себя попробовать',
  },
  {
    num: '50+',
    title: 'Помощь специалистов&nbsp;24/7',
    text: 'кураторов, менеджеров и&nbsp;тьюторов, готовых помогать вам в&nbsp;течение учебного процесса. Даже на&nbsp;дистанционном обучении вы не&nbsp;останетесь без&nbsp;нашей поддержки',
  },
  {
    num: '20+',
    title: 'Персональные «горячие» вакансии',
    text: '<nobr>компаний-партнёров,</nobr> заинтересованных в&nbsp;новых сотрудниках и&nbsp;ищущих специалистов из&nbsp;разных сфер, регулярно предоставляют вакансии специально для&nbsp;вас',
  },
];
</script>

<template>
  <MSection
    class="s-why"
    title="Почему мы?"
  >
    <swiper
      class="s-why__list"
      :space-between="0"
      :resistance-ratio="0"
      slides-per-view="auto"
      resistance
      grab-cursor
    >
      <swiper-slide
        v-for="{ title, text, num } in whySynergyList"
        :key="title"
        class="s-why__card"
      >
        <div
          class="s-why__card-title a-font_h5"
          v-html="title"
        />
        <div
          class="s-why__card-num a-font_h2"
          v-html="num"
        />
        <div
          class="s-why__card-text a-font_l-m"
          v-html="text"
        />
      </swiper-slide>
    </swiper>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SCoursesWhy.scss';
</style>
