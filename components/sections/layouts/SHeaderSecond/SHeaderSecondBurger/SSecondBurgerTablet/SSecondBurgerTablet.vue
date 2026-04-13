<script setup lang="ts">
import { NuxtLink } from '#components';
import { menuLinks, additionalMenuLinks, type MenuLinks } from '~/components/sections/layouts/SHeaderSecond/sHeaderSecondData';
import { ROUTES } from '~/constants';

const activeMenuLink = ref<null | number>(null);
const activeNavIndex = ref(1);

const activeMenuLinkData = computed(() => {
  if (activeMenuLink.value === null) return null;

  return menuLinks[activeMenuLink.value] ?? null;
});

const activeMenuLinkDataItems = computed(() => {
  if (!activeMenuLinkData.value) return [];

  const additionalItemsMap: Record<string, string> = {
    [`${ROUTES.ABITURIENTAM}/newdesign`]: 'Страница «Абитуриентам»',
    [ROUTES.STUDENTS]: 'Страница «Студентам»',
    [ROUTES.ABOUT_UNIVERSITY]: 'Страница «Об университете»',
  };

  const additionalItem: {
    title?: string;
    to?: string;
    external?: boolean;
    description?: string;
  } = {};

  if (activeMenuLinkData.value?.to && additionalItemsMap[activeMenuLinkData.value?.to]) {
    additionalItem['title'] = additionalItemsMap[activeMenuLinkData.value?.to];
    additionalItem['to'] = activeMenuLinkData.value.to;
  }

  const allLinks = activeMenuLinkData.value.items?.flat() ?? [];

  return allLinks.length
    ? [
        additionalItem,
        ...allLinks,
      ]
    : [];
});

const activeMenuLinkDataNav = computed(() => {
  if (!activeMenuLinkData.value?.navMenu) return [];

  const allFaculties: MenuLinks['navMenu'] = [{
    title: 'Все факультеты',
    to: ROUTES.FACULTIES,
  }];

  return [
    ...allFaculties,
    ...activeMenuLinkData.value?.navMenu ?? [],
  ];
});
</script>

<template>
  <div class="s-second-burger-tablet">
    <div
      v-if="activeMenuLink === null"
      class="s-second-burger-tablet__main"
    >
      <div class="s-second-burger-tablet__main__left">
        <div class="s-second-burger-tablet__items">
          <component
            :is="item.items || item.navMenu ? 'div' : NuxtLink"
            v-for="item,index in menuLinks"
            :key="item.to"
            :to="item.items || item.navMenu ? undefined : item.to"
            class="s-second-burger-tablet__item"
            @click="activeMenuLink = index"
          >
            <div
              class="s-second-burger-tablet__item__title"
              v-html="item.title"
            />
            <ASvgMono
              v-if="item.items || item.navMenu"
              name="arr_right_second"
            />
          </component>
        </div>

        <div class="s-second-burger-tablet__additional-items">
          <div
            v-for="item in additionalMenuLinks"
            :key="item.title"
            class="s-second-burger-tablet__additional-item"
          >
            <NuxtLink :to="item.to">
              <span v-html="item.title" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="s-second-burger-tablet__main__line" />

      <div class="s-second-burger-tablet__main__right">
        <MBurgerContacts @feedback="showFeedBackPopup" />
      </div>
    </div>

    <div class="s-second-burger-tablet__inner">
      <template v-if="activeMenuLinkDataItems?.length">
        <div class="s-second-burger-tablet__simple-items">
          <MBurgerBackButton
            class="s-second-burger-tablet__button"
            @click="activeMenuLink = null"
          />

          <div
            class="s-second-burger-tablet__title"
            v-html="activeMenuLinkData?.title"
          />

          <div class="s-second-burger-tablet__simple-items__links">
            <NuxtLink
              v-for="item in activeMenuLinkDataItems"
              :key="item.title"

              class="s-second-burger-tablet__simple-items__link"
              :to="item.to"
              :external="item.external"
            >
              <span
                v-if="item.to"
                v-html="item.title"
              />

              <div
                v-else
                class="s-second-burger-tablet__simple-items__link-desc"
              >
                <span v-html="item.title" />
                <span v-html="item.description" />
              </div>
            </NuxtLink>
          </div>
        </div>
      </template>

      <template v-if="activeMenuLinkDataNav?.length">
        <div class="s-second-burger-tablet__nav-items">
          <MBurgerBackButton
            class="s-second-burger-tablet__button"
            @click="activeMenuLink = null"
          />

          <div
            class="s-second-burger-tablet__title"
            v-html="activeMenuLinkData?.title"
          />

          <div class="s-second-burger-tablet__nav-items__wrapper">
            <div class="s-second-burger-tablet__nav-items__aside">
              <component
                :is="item.to ? NuxtLink : 'div'"
                v-for="item, index in activeMenuLinkDataNav"
                :key="item.title"
                class="s-second-burger-tablet__nav-items__aside__item"
                :to="item.to"
                :class="[activeNavIndex === index && '--active']"
                @mouseover="activeNavIndex = index"
              >
                <span v-html="item.title" />
                <ASvgMono
                  v-if="!item.to"
                  name="arr_right_second"
                />
              </component>
            </div>

            <div
              class="s-second-burger-tablet__nav-items__line"
            />

            <div
              v-if="activeMenuLinkDataNav[activeNavIndex]?.items?.length"
              class="s-second-burger-tablet__nav-items__block"
            >
              <NuxtLink
                v-for="link in activeMenuLinkDataNav[activeNavIndex].items"
                :key="link.title"
                :to="link.to"
                class="s-second-burger-tablet__nav-items__block-item"
              >
                <span v-html="link.title" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SSecondBurgerTablet.scss';
</style>
