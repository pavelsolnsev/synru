<script setup lang='ts'>
import Logo from '~/assets/images/main/s_main_about_university/logo.svg?url';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { defaultPartnersLogos } from '~/components/sections/shared/SPartners/partners-data';

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
});

const slides = [{
  title: 'Преподаватели-практики',
  icon: 'simple-hat3',
}, {
  title: 'Стажировки <br>в&nbsp;компаниях-партнёрах',
  icon: 'simple-partner',
}, {
  title: 'Практический опыт и&nbsp;подготовка к&nbsp;будущей работе',
  icon: 'simple-bag3',
}, {
  title: 'Конкурентное преимущество на&nbsp;старте карьеры',
  icon: 'simple-arrows',
}];

const index = shallowRef(0);
const currentImage = shallowRef(defaultPartnersLogos[index.value].image);
let intervalId: ReturnType<typeof setInterval>;

onMounted(() => {
  intervalId = setInterval(() => {
    index.value = (index.value + 1) % defaultPartnersLogos.length;
    currentImage.value = defaultPartnersLogos[index.value].image;
  }, 3000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <MSection class="about-practice">
    <h2 class="a-font_h3 about-practice__title">
      <AImg
        :src="Logo"
        alt="synergy"
        class="about-practice__title-logo"
        decoding="async"
      />
      Обучение у&nbsp;нас строится на&nbsp;реальных запросах работодателей
      <div class="about-practice__icons">
        <transition
          name="fade"
          mode="out-in"
        >
          <AImg
            :key="currentImage"
            :src="currentImage"
            alt=""
            decoding="async"
            loading="lazy"
          />
        </transition>
      </div>. Мы составляем программы вместе с&nbsp;ведущими российскими компаниями, поэтому вы учитесь только тому, что сейчас востребовано на&nbsp;рынке труда.
    </h2>
    <div class="about-practice__slider">
      <swiper v-bind="swiperConfig">
        <SwiperSlide
          v-for="slide in slides"
          :key="slide.title"
          class="about-practice__slide"
        >
          <p
            class="a-font_xl-m"
            v-html="slide.title"
          />
          <ASvgMono :name="slide.icon" />
        </SwiperSlide>
      </swiper>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@import './SAboutPractice.scss';
</style>
