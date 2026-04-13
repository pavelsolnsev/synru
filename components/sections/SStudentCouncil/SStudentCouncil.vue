<script lang="ts" setup>
import { synergyApi } from '~/utils/mediaCdn';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

const studentCouncil = [{
  title: 'Организация студенческих мероприятий',
}, {
  title: 'Коммуникация с&nbsp;руководством Университета и&nbsp;деканатами',
}, {
  title: 'Развитие студенческих инициатив',
}, {
  title: 'Участие на&nbsp;всероссийских мероприятиях',
}];

const {
  swiperRef,
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
  resistance: true,
  resistanceRatio: 0,
},
);
</script>

<template>
  <MSection
    title="Студенческий совет"
    class="s-student-council"
  >
    <div class="s-student-council__wrap">
      <MCardText
        title="Станьте частью студенческой команды и&nbsp;помогайте реализовывать проекты для&nbsp;улучшения жизни обучающихся."
        title-class="a-font_h5"
        text="Студенческий совет организует образовательные и&nbsp;развлекательных мероприятия, помогает выстраивать учебный процесс, воплощать в&nbsp;жизнь полезные инициативы при&nbsp;поддержке департамента молодёжной политики."
        :tags="['Студсовет']"
        :icons="['simple-hat', 'simple-university']"
      />
      <AImg
        :src="synergyApi('uploads/content/s-student-council/student-council.webp')"
        class="s-student-council__banner"
      />
    </div>
    <Swiper
      ref="swiperRef"
      class="s-student-council__slider"
      v-bind="swiperConfig"
    >
      <SwiperSlide
        v-for="(item, index) in studentCouncil"
        :key="index"
      >
        <p
          class="a-font_h6"
          v-html="item.title"
        />
        <AImg :src="synergyApi(`uploads/content/s-student-council/${index + 1}.svg`)" />
      </SwiperSlide>
    </Swiper>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SStudentCouncil.scss';
</style>
