<script setup lang="ts">
import { ROUTES } from '~/constants';
import { menuLinks, type MenuLinks } from '~/components/sections/layouts/SHeaderSecond/sHeaderSecondData';
import { NuxtLink } from '#components';

interface BurgerItems extends MenuLinks {
  class?: string;
}

const links: BurgerItems[] = [
  {
    title: `Приёмная комиссия ${new Date().getFullYear()}`,
    to: ROUTES.ADMISSION_COMMITTEE,
    class: '--gray',
  },
  ...menuLinks,
];

const defaultLinks: BurgerItems[] = [{
  items: [
    [
      {
        title: 'Специальности',
        to: ROUTES.SPECIALTIES,
      },
      {
        title: 'Перевод из&nbsp;другого вуза',
        to: ROUTES.PEREVOD,
        external: true,
      },
      {
        title: 'Образование за&nbsp;рубежом',
        to: ROUTES.ABROAD_EDUCATION,
        external: true,
      },
    ],
    [
      {
        title: 'Кредитный калькулятор',
        to: ROUTES.CALCULATOR,
      },
      {
        title: 'Кредит на образование',
        to: ROUTES.CREDIT,
      },
    ],
    [
      {
        title: 'Личный кабинет',
        to: ROUTES.LK_REGISTRATION,
      },
      {
        title: 'Филиалы приёмных комиссий',
        to: ROUTES.FILIALS,
      },
      {
        title: 'Часто задаваемые вопросы',
        to: ROUTES.FAQ,
      },
    ],
  ],
}];

const isAsideNavMenu = ref(false);

const activeBurgerMenu = ref<null | number>(null);

const activeBurgerMenuData = computed(() => {
  if (!activeBurgerMenu.value) return defaultLinks[0];

  const activeMenuData = links[activeBurgerMenu.value];

  return activeMenuData;
});

function onItemMouseOver(item: BurgerItems, index: number) {
  isAsideNavMenu.value = item.navMenu ? true : false;

  activeBurgerMenu.value = index;
}
</script>

<template>
  <div
    class="s-header-second-burger__wrapper"
  >
    <div
      class="s-header-second-burger__aside"
    >
      <component
        :is="!item.items && !item.navMenu ? NuxtLink : 'div'"
        v-for="item, index in links"
        :key="item.title"
        :to="item.to"
        class="s-header-second-burger__aside__item"
        :class="[
          activeBurgerMenu === index && '--active',
          item.class
        ]"
        @mouseover="onItemMouseOver(item, index)"
      >
        <span v-html="item.title" />

        <ASvgMono
          v-if="item.items || item.navMenu"
          name="arr_right_second"
        />
      </component>
    </div>

    <div
      class="s-header-second-burger__blocks"
    >
      <template v-if="activeBurgerMenuData.items">
        <template
          v-for="block, index in activeBurgerMenuData.items"
          :key="index"
        >
          <div
            class="s-header-second-burger__block"
          >
            <component
              :is="item.to ? NuxtLink : 'div'"
              v-for="item in block"
              :key="item.title"
              :to="item.to"
              :external="item.external ? true : undefined"
              class="a-font_m-m"
              :class="[
                item.to ? 's-header-second-burger__block__link' : 's-header-second-burger__block__text'
              ]"
            >
              <span v-html="item.title" />
              <span
                v-if="item.description"
                v-html="item.description"
              />
            </component>
          </div>
          <div
            v-if="index !== activeBurgerMenuData.items?.length - 1"
            class="s-header-second-burger__block__line"
          />
        </template>
      </template>

      <div
        v-if="activeBurgerMenuData.navMenu"
        class="s-header-second-burger__block --nav"
      >
        <SHeaderSecondExpandedMenuNav
          :nav-menu-data="activeBurgerMenuData.navMenu ?? []"
        />
      </div>
    </div>

    <MBurgerContacts @feedback="showFeedBackPopup" />
  </div>
</template>

<style lang="scss" scoped>
@import './SSecondBurgerDesktop.scss';
</style>
