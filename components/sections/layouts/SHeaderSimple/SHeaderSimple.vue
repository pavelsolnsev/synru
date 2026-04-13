<script setup lang="ts">
import { HEADER_QUIZ_TEXT } from '~/constants/common';
import { links } from './sHeaderSimpleData';

const { reachGoal } = sendYandexMetricaGoal()

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'nomera_telefonov_v_stranitse',
    'telephone_number': phone,
  });
}

function onLinkClick(link: { title: string; class: string }) {
  if (!import.meta.client) return;

  const {
    class: className,
  } = link;

  const findBlock = document.querySelector(`.${className}`);

  if (!findBlock) return;
  const { top } = findBlock.getBoundingClientRect();

  window.scrollBy({ top: top - 120, behavior: 'smooth' });
}
</script>

<template>
  <header>
    <div
      class="s-header"
    >
      <div class="s-header__wrapper">
        <div class="s-header__top">
          <ALogo use-logo-min />

          <div class="s-header__top__nav">
            <AMenuLink
              v-for="link in links"
              :key="link.title"
              class="cursor-pointer"
              @click="onLinkClick(link)"
            >
              <span v-html="link.title" />
            </AMenuLink>
          </div>

          <AApplyBtn
            :title="HEADER_QUIZ_TEXT"
            class="s-header__top__program cursor-pointer"
            @click.stop="showQuizPopup"
          />

          <div class="s-header__phones a-font_s-r">
            <NuxtLink
              v-for="tel in ['+7 495 800-10-01', '8 800 100-00-11']"
              :key="tel"
              :to="`tel:${$phoneToLink(tel)}`"
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
          </div>
        </div>

        <div class="s-header__nav">
          <AMenuLink
            v-for="link in links"
            :key="link.title"
          >
            <span v-html="link.title" />
          </AMenuLink>
          <AApplyBtn
            :title="HEADER_QUIZ_TEXT"
            class="s-header__nav__program cursor-pointer"
            @click.stop="showQuizPopup"
          />
        </div>
      </div>
    </div>
    <SQuizPopup />
  </header>
</template>

<style lang="scss" scoped>
@import './SHeaderSimple.scss';
</style>
