<script setup lang="ts">
import { menuLinks } from './sHeaderSecondData';
import { useWindowScroll } from '@vueuse/core';

const activeMenuLink = ref<null | number>(null);
const showBurgerMenu = ref(false);

const { y: yScroll } = useWindowScroll();

const router = useRouter();

router.beforeEach(() => {
  activeMenuLink.value = null;
  showBurgerMenu.value = false;
});

let html: null | HTMLElement = null;

onMounted(() => {
  html = document.documentElement;
});

const activeMenuLinkHasItems = computed(() => {
  if (activeMenuLink.value === null) return false;
  return Boolean(menuLinks[activeMenuLink.value].items) || Boolean(menuLinks[activeMenuLink.value].navMenu);
});

watch(activeMenuLink, () => {
  if (activeMenuLink.value !== null && !activeMenuLinkHasItems.value) {
    switchHtmlOverflowHidden('remove');
    closeBurgerMenu();
  }

  if (activeMenuLink.value !== null && activeMenuLinkHasItems.value) {
    switchHtmlOverflowHidden('add');
    closeBurgerMenu();
    return;
  }

  if (activeMenuLink.value === null && showBurgerMenu.value === false) {
    switchHtmlOverflowHidden('remove');
  }
});

watch(showBurgerMenu, () => {
  if (showBurgerMenu.value) {
    resetActiveMenuLink();
    switchHtmlOverflowHidden('add');
    return;
  }

  if (activeMenuLink.value === null) switchHtmlOverflowHidden('remove');
});

watch(yScroll, () => {
  activeMenuLink.value = null;
});

function onHeaderBlockClick(e: Event) {
  const target = e.target as HTMLElement;

  if (target.id === 'header') {
    resetActiveMenuLink();
    showBurgerMenu.value = false;
  }
}

function resetActiveMenuLink() {
  activeMenuLink.value = null;
}

function closeBurgerMenu() {
  showBurgerMenu.value = false;
}

function switchHtmlOverflowHidden(value: 'add' | 'remove') {
  if (value === 'add') {
    html?.classList?.add('--overflow-hidden');
    return;
  }
  html?.classList?.remove('--overflow-hidden');

}
</script>

<template>
  <header>
    <div
      id="header"
      class="s-header-second"
      :class="[
        activeMenuLinkHasItems && activeMenuLink !== null && '--active-menu',
        showBurgerMenu && '--active-burger',
        yScroll > 0 && '--shadow'
      ]"
      @click.stop="onHeaderBlockClick($event)"
      @wheel="resetActiveMenuLink"
    >
      <div class="s-header-second__wrapper">
        <SHeaderSecondMain
          v-model:active-menu-link="activeMenuLink"
          v-model:show-burger-menu="showBurgerMenu"
        />
        <transition name="slide-fade">
          <SHeaderSecondExpandedMenu
            v-show="activeMenuLinkHasItems && activeMenuLink !== null"
            v-model="activeMenuLink"
          />
        </transition>

        <transition name="slide-fade">
          <SHeaderSecondBurger
            v-show="showBurgerMenu"
          />
        </transition>
      </div>
      <SQuizPopup />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import './SHeaderSecond.scss';

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(scale(-100));
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.1s ease;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.4s ease;
}
</style>

<style lang="scss">
html {
  &.--overflow-hidden {
    overflow: hidden;
  }
}
</style>
