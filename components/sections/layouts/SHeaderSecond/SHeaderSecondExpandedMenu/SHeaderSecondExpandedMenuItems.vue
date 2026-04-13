<script setup lang="ts">
import { NuxtLink } from '#components';
import type { MenuLinks } from '~/components/sections/layouts/SHeaderSecond/sHeaderSecondData';

interface Props {
  items: MenuLinks['items'];
}

const {
  items = [],
} = defineProps<Props>();
</script>

<template>
  <div
    class="s-header-expanded-menu__blocks"
  >
    <template
      v-for="block, index in items"
      :key="index"
    >
      <div
        class="s-header-expanded-menu__block"
      >
        <component
          :is="item.to ? NuxtLink : 'div'"
          v-for="item in block"
          :key="item.title"
          :to="item.to"
          :external="true"
          class="a-font_m-m"
          :class="[
            item.to
              ? 's-header-expanded-menu__block__link'
              : 's-header-expanded-menu__block__text'
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
        v-if="index !== items.length - 1"
        class="s-header-expanded-menu__block__line"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import './SHeaderSecondExpandedMenu.scss';
</style>
