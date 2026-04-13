<script setup lang="ts">
import BannerImageLg from '~/assets/images/program/banner/banner_2_lg.webp';
import BannerImageMd from '~/assets/images/program/banner/banner_2_md.webp';
import BannerImageSm from '~/assets/images/program/banner/banner_2_sm.webp';
import GridBannerImageLg from '~/assets/images/program/learning_mobile/banner_lg.webp';
import GridBannerImageMd from '~/assets/images/program/learning_mobile/banner_md.webp';
import GridBannerImageSm from '~/assets/images/program/learning_mobile/banner_sm.webp';
import AppleStoreIcon from '~/assets/images/m_app_links/apple.svg?url';
import GooglePlayIcon from '~/assets/images/m_app_links/google.svg?url';
import { APP_LINKS } from '~/constants';

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

const learningItems = [
  {
    title: 'Автономность <br>лекций и&nbsp;заданий',
    text: 'Просматривайте расписание, учебный план и&nbsp;зачётку, даже если нет Интернета',
    icon: 'simple-book',
  },
  {
    title: 'Расписание <br>и преподаватели',
    text: 'Узнавайте заранее, какой преподаватель будет вести занятия ещё до&nbsp;их начала',
    icon: 'simple-calendar',
  },
  {
    title: 'Чат с&nbsp;куратором',
    text: 'Вы будете в&nbsp;курсе актуальных событий и&nbsp;мероприятий Университета',
    icon: 'simple-chat',
  },
  {
    title: 'Оплата обучения',
    text: 'Вы можете оплатить обучение в&nbsp;пару кликов, не&nbsp;выходя из&nbsp;дома',
    icon: 'simple-wallet',
  },
];
</script>

<template>
  <MSection
    class="s-learning-mobile"
  >
    <SBanner
      class="s-banner--learning-mobile"
      title="С&nbsp;мобильным приложением ещё удобнее!"
      title-class="a-font_h3"
      description="Расписание, домашние задания и&nbsp;обратная связь от&nbsp;преподавателей есть в&nbsp;электронном виде на&nbsp;сайте и&nbsp;в&nbsp;мобильном приложении."
      bg-color="red"
      :image-lg="BannerImageLg"
      :image-md="BannerImageMd"
      :image-sm="BannerImageSm"
    >
      <MAppLinks :app-links />
    </SBanner>

    <div class="s-learning-mobile__wrap">
      <div class="s-learning-mobile__item s-learning-mobile__banner">
        <h3 class="s-learning-mobile__banner-title a-font_h4">
          Обучение в&nbsp;вашем <br>мобильном телефоне
        </h3>
        <p class="s-learning-mobile__banner-text a-font_l-m">
          Демо-вуз позаботился о&nbsp;том, чтобы вам было удобно учиться. Расписание, домашние задания и&nbsp;обратная связь от&nbsp;преподавателей есть в&nbsp;электронном виде на&nbsp;сайте и&nbsp;в&nbsp;мобильном приложении.
        </p>
        <picture>
          <source
            :srcset="GridBannerImageLg"
            media="(min-width: 1200px)"
          >
          <source
            :srcset="GridBannerImageMd"
            media="(min-width: 768px)"
          >
          <AImg
            :src="GridBannerImageSm"
            alt="banner"
            decoding="async"
            loading="lazy"
          />
        </picture>
      </div>

      <div
        v-for="item in learningItems"
        :key="item.title"
        class="s-learning-mobile__item"
      >
        <p
          class="s-learning-mobile__item-title a-font_h5"
          v-html="item.title"
        />
        <p
          class="s-learning-mobile__item-text a-font_l"
          v-html="item.text"
        />
        <ASvgMono :name="item.icon" />
      </div>
    </div>
  </MSection>
</template>

<style lang="scss" scoped>
@import './SProgramLearningMobile.scss';
</style>
