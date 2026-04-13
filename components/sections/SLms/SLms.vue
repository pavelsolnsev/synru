<script setup lang="ts">
import { synergyApi } from '~/utils/mediaCdn';

const learningItems = [{
  title: 'Автономность <br>лекций и&nbsp;заданий',
  text: 'Просматривайте расписание, учебный план и&nbsp;зачётку, даже если нет Интернета',
  icon: 'simple-book',
},{
  title: 'Расписание <br>и преподаватели',
  text: 'Узнавайте заранее, какой преподаватель будет вести занятия ещё до&nbsp;их начала',
  icon: 'simple-calendar',
},{
  title: 'Чат с&nbsp;куратором',
  text: 'Вы будете в&nbsp;курсе актуальных событий и&nbsp;мероприятий демо-вуза',
  icon: 'simple-chat',
},{
  title: 'Оплата обучения',
  text: 'Вы можете оплатить обучение в&nbsp;пару кликов, не&nbsp;выходя из&nbsp;дома.',
  icon: 'simple-wallet',
}];
</script>

<template>
  <MSection
    id="s-lms"
    class="s-lms scroll-margin-top"
  >
    <div class="s-lms__wrap">
      <div class="s-lms__item s-lms__banner">
        <h3 class="s-lms__banner-title a-font_h4">
          Образовательная платформа Demo LMS
        </h3>
        <p class="s-lms__banner-text a-font_l">
          В&nbsp;демо-вузе действует <span class="nobr">LMS-система,</span> которая объединяет студентов
          и&nbsp;преподавателей по&nbsp;всему миру. Приложение Demo LMS позволяет просматривать расписание занятий,
          учебный план, оплачивать обучение, следить за&nbsp;последними новостями и&nbsp;событиями университета.
          Приложение работает на&nbsp;всех устройствах&nbsp;— компьютер, планшет, телефон.
        </p>
        <picture>
          <source
            :srcset="synergyApi('uploads/content/lms/banner_lg.webp')"
            media="(min-width: 1200px)"
          >
          <source
            :srcset="synergyApi('uploads/content/lms/banner_md.webp')"
            media="(min-width: 768px)"
          >
          <AImg
            :src="synergyApi('uploads/content/lms/banner_sm.webp')"
            alt=""
          />
        </picture>
      </div>
      <div
        v-for="(item, index) in learningItems"
        :key="index"
        class="s-lms__item"
      >
        <p
          class="s-lms__item-title a-font_h5"
          v-html="item.title"
        />
        <p
          class="s-lms__item-text a-font_l"
          v-html="item.text"
        />
        <ASvgMono :name="item.icon" />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" src="./SLms.scss" />
