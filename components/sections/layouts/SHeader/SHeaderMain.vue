<script setup lang="ts">
import { ROUTES } from '~/constants';
import { topMenu } from './headerData';
import { HEADER_QUIZ_TEXT } from '~/constants/common';

const showMenu = defineModel('showMenu', {
  type: Boolean,
  default: false,
});

const showSearchInput = defineModel('showSearchInput', {
  type: Boolean,
  default: false,
});

const path = computed(() => useRoute().path);
const isShowQuizPopup = computed(() => !path.value.includes('thanks'));

const searchValue = ref('');

const { reachGoal } = sendYandexMetricaGoal()

watch(showSearchInput, () => {
  if (showSearchInput.value) {
    const input: HTMLInputElement | null = document.querySelector('.s-header__search .m-search input');
    if (input) input.focus();
  }
});

function sendReachGoal(phone: string) {
  reachGoal('click_call_button', {
    'button': 'kruglaya_konopka_telefona_sverkhu',
    'telephone_number': phone,
  });
}

function submitSearch() {
  if (searchValue.value.trim() === '') showSearchInput.value = false;
}

function onOutsideInputSearchClick() {
  if (showSearchInput.value) showSearchInput.value = false;
};
</script>

<template>
  <div class="s-header__main">
    <div class="s-header__logo">
      <NuxtLink :to="path === ROUTES.HOMEPAGE ? '' : ROUTES.HOMEPAGE">
        <ALogo />
      </NuxtLink>
    </div>

    <AApplyBtn
      v-if="isShowQuizPopup"
      :title="HEADER_QUIZ_TEXT"
      class="cursor-pointer s-header__apply_btn"
      @click.stop="showQuizPopup"
    />

    <nav
      class="s-header__menu"
      itemscope
      itemtype="https://schema.org/SiteNavigationElement"
    >
      <AMenuLink
        v-for="{ title, to, attributes, bgColor, textColor} in topMenu"
        :key="to"
        :to
        :text-color
        :bg-color
        :active="path === to || `${path}/` === to"
        itemprop="url"
        v-bind="attributes"
      >
        <span v-html="title" itemprop="name" />
      </AMenuLink>
    </nav>
    <div class="s-header__tools">
      <AMenuLink
        :to="ROUTES.ADMISSION_COMMITTEE"
        :active="path === ROUTES.ADMISSION_COMMITTEE"
        text-color="red"
        class="--priemnaya-komissiya"
      >
        <span>Приёмная комиссия</span>
      </AMenuLink>
      <AApplyBtn
        v-if="isShowQuizPopup"
        :title="HEADER_QUIZ_TEXT"
        class="cursor-pointer"
        @click.stop="showQuizPopup"
      />
      <div class="s-header__tools-phones a-font_s">
        <NuxtLink
          v-for="tel in ['+7 495 800-10-01', '8 800 100-00-11']"
          :key="tel"
          :to="`tel:${$phoneToLink(tel)}`"
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
      <div
        class="s-header__search"
        itemscope
        itemtype="https://schema.org/WebSite"
      >
        <link
          itemprop="url"
          href="/"
        >
        <!-- Временное отключение поиска -->
        <!-- <MSearch
          v-model="searchValue"
          v-click-outside="onOutsideInputSearchClick"
          :required="false"
          @submit="submitSearch"
        /> -->
        <button
          v-if="false"
          type="button"
          class="s-header__search-toggler"
          @click.stop="showSearchInput = !showSearchInput"
        >
          <ASvgMono name="loupe-outline" />
        </button>
      </div>
      <button
        class="s-header__burger"
        @click="showMenu = !showMenu"
      >
        <span class="s-header__burger-label a-font_m-m">
          Меню
        </span>
        <span class="s-header__burger-icon" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SHeader.scss';
</style>
