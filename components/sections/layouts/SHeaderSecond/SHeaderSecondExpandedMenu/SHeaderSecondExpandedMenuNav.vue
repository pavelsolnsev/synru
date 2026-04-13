<script setup lang="ts">
import { NuxtLink } from '#components';
import type { MenuLinks } from '~/components/sections/layouts/SHeaderSecond/sHeaderSecondData';

interface Props {
  navMenuData: MenuLinks['navMenu'];
  defaultIndex?: number;
}

const {
  navMenuData = [],
  defaultIndex = null,
} = defineProps<Props>();

const activeNavIndex = ref<number | null>(defaultIndex);

const activeNavData = computed(() => {
  if (!navMenuData) return [];
  if (activeNavIndex.value === null) return [];
  return navMenuData[activeNavIndex.value]?.items;
});
</script>

<template>
  <div
    class="s-header-expanded-menu__nav"
  >
    <div class="s-header-expanded-menu__nav__aside">
      <template
        v-for="item, index in navMenuData"
        :key="item.title"
      >
        <component
          :is="item.to ? NuxtLink : 'div'"
          class="s-header-expanded-menu__nav__item"
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
      </template>
    </div>

    <div
      class="s-header-expanded-menu__block__line"
    />

    <div
      v-if="activeNavData?.length"
      class="s-header-expanded-menu__nav__block"
    >
      <NuxtLink
        v-for="link in activeNavData"
        :key="link.title"
        :to="link.to"
        class="s-header-expanded-menu__nav__block-item a-font_m-m"
      >
        <span v-html="link.title" />
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './SHeaderSecondExpandedMenu.scss';
</style>
