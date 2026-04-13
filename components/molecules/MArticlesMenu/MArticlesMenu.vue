<script setup lang="ts">
import type { MArticlesMenu } from '~/types';

interface Props {
  collapsed?: boolean;
  menu?: MArticlesMenu[]
  activeRoutes?: string[];
  open?: boolean;
  defaultOpenedMenu?: number[];
}

const {
  collapsed = false,
  menu = [],
  activeRoutes = [],
  open,
  defaultOpenedMenu = [],
} = defineProps<Props>();

const openedMenu = ref(new Set<number>(defaultOpenedMenu));
</script>

<template>
  <div
    class="m-articles-menu"
    :class="{
      '--collapsed': collapsed,
      '--open': open
    }"
  >
    <div class="m-articles-menu__inner">
      <ul class="m-articles-menu__list">
        <li
          v-for="item, index in menu"
          :key="item.title"
          class="m-articles-menu__item a-font_xl-m"
          :class="[
            {
              '--is-active': activeRoutes.includes(item.to),
              '--parent-opened': openedMenu.has(index)
            }
          ]"
        >
          <NuxtLink :to="item.to">
            <ASvgMono :name="item.icon" />
            <span v-html="item.title" />
          </NuxtLink>

          <button
            v-if="item.child?.length"
            class="m-articles-menu__toggle"
            @click="openedMenu.has(index) ? openedMenu.delete(index) : openedMenu.add(index)"
          >
            <ASvgMono name="chevron-down-second" />
          </button>

          <div
            v-if="item.child?.length"
            class="m-articles-menu__childs-wrap"
          >
            <ul class="m-articles-menu__childs">
              <li
                v-for="child in item.child"
                :key="child.title"
                class="m-articles-menu__child a-font_l"
              >
                <NuxtLink
                  :href="child.to"
                  :class="{
                    '--is-active': activeRoutes.includes(child.to),
                  }"
                >
                  <span v-html="child.title" />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './MArticlesMenu.scss';
</style>
