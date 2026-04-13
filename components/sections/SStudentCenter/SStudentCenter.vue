<script lang="ts" setup>
import { synergyApi } from '~/utils/mediaCdn';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { useSwiperWrapper } from '~/composables/useSwiperWrapper.js';

const studentCenterPluses = [{
  title: 'Удобное расположение',
  text: 'Корпуса находятся рядом с&nbsp;университетом и&nbsp;метро',
}, {
  title: 'Безопасное проживание',
  text: 'На&nbsp;территории действует пропускная система с&nbsp;охраной',
}, {
  title: 'Выгодное размещение',
  text: 'Стоимость проживания в&nbsp;общежитии в&nbsp;разы ниже, чем в&nbsp;съёмных квартирах и&nbsp;отелях',
}, {
  title: 'Комфортная среда',
  text: 'Комнаты и&nbsp;другие помещения оборудованы всем необходимым для&nbsp;жизни',
}, {
  title: 'Быстрое заселение',
  text: 'Въехать в&nbsp;общежитие можно в&nbsp;день заключения договора',
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
});

const { reachGoal } = sendYandexMetricaGoal();

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'nomera_telefonov_v_stranitse',
    'telephone_number': phone,
  });
}
</script>

<template>
  <MSection
    title="Центр размещения студентов"
    class="s-student-center"
  >
    <div class="s-student-center__wrap">
      <MCardText
        title="Учитесь и&nbsp;живите рядом с&nbsp;Университетом"
        text="Центр размещения предлагает студентам уютные общежития, в&nbsp;которых есть все для&nbsp;комфортной жизни. В&nbsp;корпусах, которые расположились недалеко от&nbsp;учебных кампусов, доступны <span class=&quot;nobr&quot;>двух-,</span> трех- или&nbsp;шестиместные комнаты с&nbsp;мебелью, душевые, кухни, прачечные, зоны отдыха и&nbsp;спортивный зал."
        text-class="a-font_l-m"
        :icons="['simple-hat', 'simple-home']"
      />
      <MCardText title="Общежития">
        <div class="s-student-center__columns">
          <div class="s-student-center__cart">
            <p class="a-font_h6">
              «Аэропорт» Большой Коптевский проезд, д. 7 стр.&nbsp;1
            </p>
            <p class="a-font_l-m">
              <span>M</span>
              Сокол
            </p>
            <SvgMono name="simple-placemark-dot" />
          </div>
          <div class="s-student-center__cart">
            <p class="a-font_h6">
              ул. Погонный проезд, д. 5, стр.&nbsp;1
            </p>
            <p class="a-font_l-m">
              <span>M</span>
              Бульвар Рокоссовского
            </p>
            <SvgMono name="simple-placemark-dot" />
          </div>
        </div>
      </MCardText>
    </div>
    <p class="a-font_h4">
      Преимущества наших общежитий
    </p>
    <Swiper
      ref="swiperRef"
      v-bind="swiperConfig"
      class="s-student-center__slider"
    >
      <SwiperSlide
        v-for="(item, index) in studentCenterPluses"
        :key="index"
      >
        <p
          class="a-font_h6"
          v-html="item.title"
        />
        <p
          class="swiper-slide__text a-font_s-m"
          v-html="item.text"
        />
        <AImg :src="synergyApi(`uploads/content/center-careers/svg/${index + 1}.svg`)" />
      </SwiperSlide>
    </Swiper>
    <p class="a-font_h4">
      Контакты
    </p>
    <div class="s-student-center__wrap --contancts">
      <MCardText title="Телефон">
        <div class="s-student-center__columns">
          <div class="s-student-center__columns-bottom">
            <p class="a-font_s-m s-student-center__label">
              Пн-Пт 9:00–18:00
            </p>
            <AButtonThird
              to="tel:+74951000011"
              bg-color="light"
              rounding="rect"
              size="lg_m"
              @click="sendReachGoal('+74951000011')"
            >
              <span>
                +7 495 100-00-11
              </span>
            </AButtonThird>
          </div>
          <div class="s-student-center__columns-bottom">
            <p class="a-font_s-m s-student-center__label">
              Пн-Пт 9:00–18:00
            </p>
            <AButtonThird
              to="tel:88001000011"
              bg-color="light"
              rounding="rect"
              size="lg_m"
              @click="sendReachGoal('88001000011')"
            >
              <span>
                8 800 100-00-11
              </span>
            </AButtonThird>
          </div>
        </div>
      </MCardText>
      <MCardText title="Онлайн">
        <div class="s-student-center__columns">
          <div class="s-student-center__columns-bottom">
            <p class="a-font_s-m s-student-center__label">
              Официальный сайт
            </p>
            <AButtonThird
              to="https://studenthostel.ru/"
              bg-color="light"
              rounding="rect"
              size="lg_m"
            >
              <span>
                Перейти
              </span>
            </AButtonThird>
          </div>
          <div class="s-student-center__columns-bottom">
            <p class="a-font_s-m s-student-center__label">
              E-mail
            </p>
            <AButtonThird
              to="mailto:info@studenthostel.ru"
              bg-color="light"
              rounding="rect"
              size="lg_m"
            >
              <span>
                info@studenthostel.ru
              </span>
            </AButtonThird>
          </div>
          <div class="s-student-center__columns-bottom">
            <p class="a-font_s-m s-student-center__label">
              Сообщество VK
            </p>
            <AButtonThird
              to="https://vk.com/stud_hostel"
              bg-color="light"
              rounding="rect"
              size="lg_m"
            >
              <span>
                Присоединиться
              </span>
            </AButtonThird>
          </div>
        </div>
      </MCardText>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SStudentCenter.scss';
</style>
