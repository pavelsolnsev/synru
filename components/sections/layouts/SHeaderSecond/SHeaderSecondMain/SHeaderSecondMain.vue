<script setup lang="ts">
import { menuLinks, additionalMenuLinks } from '~/components/sections/layouts/SHeaderSecond/sHeaderSecondData';
import type { MenuLinks } from '../sHeaderSecondData';
import { ROUTES } from '~/constants';
import { HEADER_QUIZ_TEXT } from '~/constants/common';

const route = useRoute();
const path = computed(() => useRoute().path);

const activeMenuLink = defineModel<null | number>('activeMenuLink', { default: null });
const showBurgerMenu = defineModel<boolean>('showBurgerMenu', { default: false });

const { reachGoal } = sendYandexMetricaGoal()

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'nomera_telefonov_v_stranitse',
    'telephone_number': phone,
  });
}

function menuLinkHasItems(menuLink: MenuLinks) {
  return Boolean(menuLink?.items) || Boolean(menuLink?.navMenu);
};

function onLinkMouseLeave(menuLink: MenuLinks) {
  if (!menuLinkHasItems(menuLink)) activeMenuLink.value = null;
}
</script>

<template>
  <div class="s-header-second-main">
    <NuxtLink :to="path === ROUTES.HOMEPAGE ? '' : ROUTES.HOMEPAGE">
      <ALogo />
    </NuxtLink>

    <div class="s-header-second-main__links">
      <div class="s-header-second-main__links__main">
        <AMenuLinkSecond
          v-for="menuLink, index in menuLinks"
          :key="menuLink.title"
          :to="menuLink.to"
          :active-bg="
            activeMenuLink === index || route.path === menuLink.to
          "
          :active-icon="activeMenuLink === index"
          :show-icon="menuLinkHasItems(menuLink)"
          @mouseover="activeMenuLink = index"
          @mouseleave="onLinkMouseLeave(menuLink)"
        >
          {{ menuLink.title }}
        </AMenuLinkSecond>
      </div>

      <div class="s-header-second-main__links__additional">
        <AMenuLinkThird
          v-for="link in additionalMenuLinks"
          :key="link.title"
          :to="link.to"
        >
          <span v-html="link.title" />
        </AMenuLinkThird>
      </div>
    </div>

    <div class="s-header-second-main__tools">
      <div class="s-header-second-main__tools__header">
        <NuxtLink
          v-for="tel in ['+7 495 800-10-01', '8 800 100-00-11']"
          :key="tel"
          :to="`tel:${$phoneToLink(tel)}`"
          class="a-font_s"
          @click="sendReachGoal(tel)"
        >
          {{ tel }}
        </NuxtLink>

        <NuxtLink
          to="tel:88001000011"
          class="a-btn"
          @click="sendReachGoal('88001000011')"
        >
          <ASvgMono name="new-phone-outline" />
        </NuxtLink>

        <button
          class="s-header-second-main__tools__burger"
          @click="showBurgerMenu = !showBurgerMenu"
        >
          <span class="s-header-second-main__tools__burger-label a-font_m-m">
            Меню
          </span>
          <span
            class="s-header-second-main__tools__burger-icon"
            :class="[showBurgerMenu && '--menu-opened']"
          />
        </button>
      </div>
      <div class="s-header-second-main__tools__buttons">
        <AButtonThird
          bg-color="bordered"
          size="sm"
          :to="ROUTES.ADMISSION_COMMITTEE"
        >
          Приёмная комиссия
        </AButtonThird>

        <AButtonThird
          bg-color="red"
          size="sm"
          @click.stop="showQuizPopup"
        >
          {{ HEADER_QUIZ_TEXT }}
        </AButtonThird>
      </div>
    </div>

    <div class="s-header-second-main__nav-links">
      <AMenuLinkSecond
        :to="ROUTES.ADMISSION_COMMITTEE"
        :show-icon="false"
        class="--admission-committee"
      >
        Приёмная комиссия
      </AMenuLinkSecond>

      <AMenuLinkSecond
        class="--quiz"
        :show-icon="false"
        @click.stop="showQuizPopup"
      >
        {{ HEADER_QUIZ_TEXT }}
      </AMenuLinkSecond>

      <AMenuLinkSecond
        v-for="menuLink in menuLinks"
        :key="menuLink.title"
        :to="menuLink.to"
        :active-bg="route.path === menuLink.to"
        :show-icon="false"
      >
        {{ menuLink.title }}
      </AMenuLinkSecond>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SHeaderSecondMain.scss';
</style>
