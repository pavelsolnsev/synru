<script setup lang="ts">
import AppleStoreIcon from '~/assets/images/m_app_links/apple.svg?url';
import GooglePlayIcon from '~/assets/images/m_app_links/google.svg?url';
import { APP_LINKS } from '~/constants';

const emits = defineEmits(['feedback']);

const address = [
  {
    metro: 'Сокол',
    address: 'г. Москва, Ленинградский пр-т, д. 80, корпуса Г, Ж',
  },
  {
    metro: 'Семеновская',
    address: 'г. Москва, ул. Измайловский вал, д. 2',
  },
];

const phones = [
  '+7 495 800-10-01',
  '8 800 100-00-11',
];

const schedule = [
  {
    day: 'Пн. — Пт.:',
    time: '09:00–20:00',
  },
  {
    day: 'Сб.:',
    time: '10:00–19:00',
  },
  {
    day: 'Вс.:',
    time: '10:00–17:00',
  },
];

const appLinks = [
  {
    name: 'App Store',
    link: APP_LINKS.APP_STORE,
    image: AppleStoreIcon,
  },
  {
    name: 'Google Play',
    link: APP_LINKS.GOOGLE_PLAY,
    image: GooglePlayIcon,
  },
];
</script>

<template>
  <div class="m-burger-contacts">
    <div class="m-burger-contacts__title a-font_h6">
      Приёмная комиссия
    </div>

    <div class="m-burger-contacts__main">
      <div class="m-burger-contacts__address">
        <div
          v-for="item in address"
          :key="item.address"
          class="m-burger-contacts__address__item"
        >
          <div class="m-burger-contacts__address__metro a-font_s-m">
            <span>М</span>
            <span v-html="item.metro" />
          </div>

          <div class="m-burger-contacts__address__city a-font_s-r">
            <span v-html="item.address" />
          </div>
        </div>
      </div>

      <div class="m-burger-contacts__phones a-font_s-m">
        <div
          v-for="item in phones"
          :key="item"
        >
          <NuxtLink :to="`tel:${$phoneToLink(item)}`">{{ item }}</NuxtLink>
        </div>
      </div>
    </div>

    <div class="m-burger-contacts__students a-font_l-m">
      Для студентов:
      <NuxtLink
        class="m-burger-contacts__students__phone"
        :to="`tel:${$phoneToLink('8 800 350-00-60')}`"
      >
        8 800 350-00-60
      </NuxtLink>
    </div>

    <div class="m-burger-contacts__schedule">
      <span class="a-font_l-m">График работы:</span>
      <div class="m-burger-contacts__schedule__block">
        <div
          v-for="item in schedule"
          :key="item.day"
        >
          <div
            class="m-burger-contacts__schedule__day a-font_s-r"
            v-html="item.day"
          />
          <div
            class="m-burger-contacts__schedule__time a-font_s-m"
            v-html="item.time"
          />
        </div>
      </div>
    </div>

    <div class="m-burger-contacts__buttons">
      <AButton
        class="m-burger-contacts__buttons__feedback"
        size="sm"
        @click="emits('feedback')"
      >
        <span>Обратная связь</span>
      </AButton>

      <MSocialLinks :show-title="false" />

      <MAppLinks :app-links="appLinks" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MBurgerContacts.scss';
</style>
