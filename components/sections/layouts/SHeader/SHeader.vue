<script setup lang="ts">
import { useWindowScroll, useWindowSize, useDebounceFn  } from '@vueuse/core';
import { ROUTES } from '~/constants';

const showMenu = ref(false);
const showSearchInput = ref(false);
const showSvedenBlock = ref(true);
const showNav = ref(true);

const { y: scrollY } = useWindowScroll();
const { width: windowWidth } = useWindowSize();

let lastScrollPosition = 0;

watch([windowWidth, scrollY], () => {
  updateHeaderNav();
});

watch(showMenu, () => {
  const html = document.documentElement;

  if (showMenu.value) {
    html.classList.add('menu-opened');
    html.style.setProperty('overflow', 'hidden');
  } else {
    html.classList.remove('menu-opened');
    html.style.removeProperty('overflow');
  }
});

const router = useRouter();
const route = useRoute();

router.afterEach(() => {
  showMenu.value = false;
  showSearchInput.value = false;
});

const updateHeaderNav = useDebounceFn(() => {
  const html = document.documentElement;

  if (windowWidth.value >= 1200) {
    showSvedenBlock.value = scrollY.value < 30 ? true : false;

    const firstSectionHeight = document.querySelector('section')?.getBoundingClientRect().bottom || 0;

    if (scrollY.value < firstSectionHeight / 2 || scrollY.value <= lastScrollPosition) {
      showNav.value = true;
      html.classList.add('--visible-nav');
    } else {
      showNav.value = false;
      html.classList.remove('--visible-nav');
    }

  } else {
    showSvedenBlock.value = scrollY.value < 30 ? true : false;

    if (scrollY.value < 120 || scrollY.value <= lastScrollPosition) {
      showNav.value = true;
      html.classList.remove('--scroll-header');
      html.classList.add('--visible-nav');
    } else {
      html.classList.remove('--visible-nav');
      html.classList.add('--scroll-header');
      showNav.value = false;
    }
  }

  lastScrollPosition = scrollY.value;
}, 20);
</script>

<template>
  <header>
    <div
      id="header"
      class="s-header compensate-for-scrollbar"
      :class="{
        '--visible-search': showSearchInput,
        '--visible-sveden': showSvedenBlock,
        '--visible-nav': showNav,
      }"
    >
      <SHeaderMain
        v-model:show-menu="showMenu"
        v-model:show-search-input="showSearchInput"
      />
      <SHeaderNav>
        <SHeaderMenu v-model:show-menu="showMenu" />
      </SHeaderNav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import './SHeader.scss';
</style>
