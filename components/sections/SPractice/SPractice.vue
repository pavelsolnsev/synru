<script setup lang='ts'>
import { Swiper, SwiperSlide } from 'swiper/vue';

const {
  swiperConfig,
} = useSwiperWrapper({
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 0,
});

const slides = [{
  title: 'Индивидуальный подход',
  text: 'Предлагаем варианты стажировок на&nbsp;основе ваших интересов, навыков, рекомендаций и&nbsp;открытых конкурсов',
  icon: 'simple-target',
}, {
  title: 'Реальный опыт',
  text: 'Наша практика не&nbsp;для&nbsp;галочки: вы будете работать в&nbsp;структурных подразделениях Корпорации и&nbsp;выполнять текущие задачи под&nbsp;руководством сотрудников',
  icon: 'simple-rune',
}, {
  title: 'Множество направлений',
  text: 'Дизайн, SMM, видеопроизводство, организация мероприятий и&nbsp;другие варианты: Корпорации нужны разные специалисты',
  icon: 'simple-compas',
}, {
  title: 'Вы можете получить оффер ещё во&nbsp;время учёбы и&nbsp;начать работать сразу после получения диплома&nbsp;— или&nbsp;даже на&nbsp;последних курсах!',
  text: '',
  icon: '',
}];

const { openModal } = useModalStore();

function openForm() {
  openModal('MModalForm', {
    title: 'Узнайте, как начать карьеру в&nbsp;Корпорации уже во&nbsp;время учёбы',
    btn: 'Отправить',
    formName: true,
    formPhone: true,
    actionParams: [
      {param: 'form=practice'},
    ],
  });
}
</script>

<template>
  <MSection
    class="s-practice"
    title="Практика в&nbsp;демо-корпорации"
  >
    <div class="s-practice__wrapper">
      <div class="s-practice__content">
        <picture class="s-practice__image">
          <source
            media="(min-width: 1200px)"
            srcset="/img/practices/s-practice-lg.webp"
          >
          <source
            media="(min-width: 768px)"
            srcset="/img/practices/s-practice-md.webp"
          >
          <AImg
            src="/img/practices/s-practice-sm.webp"
            alt=""
          />
        </picture>
        <div class="s-practice__info">
          <h2 class="a-font_h2 s-practice__info-title">Практика в&nbsp;демо-корпорации</h2>
          <p class="a-font_h4 s-practice__info-text">Выберите стажировку в&nbsp;центре поддержки и&nbsp;развития студентов и&nbsp;начните карьеру в&nbsp;партнёрской организации.</p>
          <AButton @click="openForm()">
            Узнать больше о&nbsp;стажировках
          </AButton>
        </div>
      </div>
      <div class="s-practice__slider">
        <Swiper v-bind="swiperConfig">
          <SwiperSlide
            v-for="item in slides"
            :key="item.title"
            class="s-practice__slide"
          >
            <p
              class="a-font_h6"
              v-html="item.title"
            />
            <p
              v-if="item.text"
              class="a-font_m-m s-practice__slide-text"
              v-html="item.text"
            />
            <ASvgMono
              v-if="item.icon"
              :name="item.icon"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </MSection>
</template>

<style scoped lang='scss'>
@import './SPractice.scss';
</style>
