<script setup lang="ts">
import { NuxtLink } from '#components';
import { menuLinks, additionalMenuLinks, type MenuLinks } from '~/components/sections/layouts/SHeaderSecond/sHeaderSecondData';
import { ROUTES } from '~/constants';

interface FormatLinks {
  title?: string
  to?: string
  items?: FormatLinks[]
  external?: boolean
  description?: string
}

const mainMenu: FormatLinks[] = formatMenuLinks(menuLinks);

const currentPath = ref<FormatLinks[]>([]);

const burgerMenuTitle = computed(() => {
  if (!Array.isArray(currentPath.value) || !currentPath.value.length) return '';

  return currentPath.value
    .map((path) => path.title)
    .join(' / ');
});

const currentMenu = computed(() => {
  return currentPath.value.length === 0
    ? mainMenu
    : currentPath.value[currentPath.value.length - 1].items;
});

function formatMenuLinks(menuLinks: MenuLinks[]): FormatLinks[] {
  const additionalItemsMap: Record<string, string> = {
    [`${ROUTES.ABITURIENTAM}/newdesign`]: 'Страница «Абитуриентам»',
    [ROUTES.STUDENTS]: 'Страница «Студентам»',
    [ROUTES.ABOUT_UNIVERSITY]: 'Страница «Об университете»',
    [ROUTES.FACULTIES]: 'Все факультеты',
  };

  return menuLinks.map((item) => {
    const additionalItem: { title?: string; to?: string } = {};

    if (item.to && additionalItemsMap[item.to]) {
      additionalItem.title = additionalItemsMap[item.to];
      additionalItem.to = item.to;
    }

    if (item.items?.length) {
      return {
        title: item.title,
        items: Object.keys(additionalItem).length
          ? [additionalItem, ...item.items.flat()]
          : item.items.flat(),
      };
    }

    if (item.navMenu?.length) {
      return {
        title: item.title,
        items: Object.keys(additionalItem)
          ? [additionalItem, ...item.navMenu]
          : [],
      };
    }

    return {
      title: item.title,
      to: item.to,
    };
  });
}

function onItemClick(item: FormatLinks) {
  if (item.items) currentPath.value.push(item);
}
</script>

<template>
  <div class="s-second-burger-mobile">
    <NuxtLink
      :to="ROUTES.ADMISSION_COMMITTEE"
      class="s-second-burger-mobile__admission-committee"
    >
      Приёмная комиссия {{ new Date().getFullYear() }}
    </NuxtLink>
    <div
      v-if="!currentPath.length"
      class="s-second-burger-mobile__additional-items"
    >
      <div
        v-for="item in additionalMenuLinks"
        :key="item.title"
        class="s-second-burger-mobile__additional-item"
      >
        <NuxtLink :to="item.to">
          <span v-html="item.title" />
        </NuxtLink>
      </div>
    </div>

    <div
      class="s-second-burger-mobile__menu"
      :class="[currentPath.length && '--active']"
    >
      <MBurgerBackButton
        v-if="currentPath?.length"
        class="s-second-burger-mobile__button"
        @click="currentPath.pop()"
      />

      <div
        v-if="burgerMenuTitle"
        class="s-second-burger-mobile__menu__title"
        v-html="burgerMenuTitle"
      />

      <div class="s-second-burger-mobile__menu__items">
        <component
          :is="item.to ? NuxtLink : 'div'"
          v-for="item, index in currentMenu"
          :key="index"
          :to="item.to"
          :external="item.to ? item.external : undefined"
          class="s-second-burger-mobile__menu__item"
          @click="onItemClick(item)"
        >
          <template v-if="!item.description">
            <span v-html="item.title " />
            <ASvgMono
              v-if="!item.to"
              name="arr_right_second"
            />
          </template>
          <div
            v-else
            class="s-second-burger-mobile__menu__item-desc"
          >
            <span v-html="item.title" />
            <span v-html="item.description" />
          </div>
        </component>
      </div>
    </div>

    <MBurgerContacts @feedback="showFeedBackPopup" />
  </div>
</template>

<style lang="scss" scoped>
@import './SSecondBurgerMobile.scss';
</style>
